import { inngest } from "../../../inngest/client";
import { courseOutlineAIModel, generateNotesAiModel } from "../../../configs/AiModel";
import { db } from "../../../configs/db";
import { CHAPTER_NOTES_TABLE, STUDY_MATERIAL_TABLE } from "../../../configs/schema";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

export async function POST(req) {
  try {
    const { courseId, topic, courseType, difficultyLevel, createdBy } =
      await req.json();

    if (!courseId || !topic || !courseType || !createdBy) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    console.log("Received data:", {
      courseId,
      topic,
      courseType,
      difficultyLevel,
      createdBy,
    });

    const PROMPT = `Generate a study material with course title for ${topic} for ${courseType} and level of difficulty will be ${difficultyLevel} with summary of course, List of Chapters along with summary and Emoji icon for each chapter, Topic list in each chapter in JSON format`;

    const aiResp = await courseOutlineAIModel.sendMessage(PROMPT);
    console.log("AI response:", aiResp);

    let aiResult;
    try {
      aiResult = JSON.parse(aiResp.response.text());
      console.log("Parsed AI result:", aiResult);
    } catch (parseError) {
      console.error("Failed to parse AI response:", parseError);
      return NextResponse.json(
        { error: "Failed to parse AI response" },
        { status: 500 }
      );
    }

    const dbResult = await db
      .insert(STUDY_MATERIAL_TABLE)
      .values({
        courseId,
        courseType,
        createdBy,
        topic,
        courseLayout: aiResult, // Ensure the AI response contains 'courseLayout'
      })
      .returning();

    console.log("Database insertion result:", dbResult);

    try {
      console.log("Attempting to directly generate course notes without Inngest");
      
      // Start generating notes for each chapter synchronously
      const course = dbResult[0];
      const chapters = course.courseLayout.chapters;
      
      // Create the promise but don't await it so we can return the response immediately
      (async () => {
        try {
          // Process each chapter one by one
          for (let i = 0; i < chapters.length; i++) {
            const chapter = chapters[i];
            console.log(`Processing chapter ${i+1}/${chapters.length}: ${chapter.title}`);
            
            const PROMPT = `Generate a JSON object that represents study notes for a course chapter. The JSON should meet the following requirements:
0. Provided Chapters:
${JSON.stringify(chapter)}

1. Structure:
The JSON must include the following fields:
chapterTitle: The title of the chapter.
chapterSummary: A brief summary of the chapter.
emoji: A relevant emoji to visually represent the chapter.
topics: A list of topics covered in the chapter. Each topic must be an object with:
topicTitle (string): The title of the topic.
content (string): Detailed content for the topic written in Md format, and ready for rendering in a React.js component.`;

            // Generate notes for this chapter
            const noteResponse = await generateNotesAiModel.sendMessage(PROMPT);
            let noteResult;
            
            try {
              noteResult = JSON.parse(noteResponse.response.text());
              console.log(`Successfully generated notes for chapter ${i+1}`);
              
              // Save the notes to database
              await db
                .insert(CHAPTER_NOTES_TABLE)
                .values({
                  courseId: course.courseId,
                  chapterTitle: noteResult.chapterTitle,
                  chapterSummary: noteResult.chapterSummary,
                  emoji: noteResult.emoji,
                  topics: noteResult.topics,
                })
                .returning();
                
            } catch (parseError) {
              console.error(`Failed to parse AI response for chapter ${i+1}:`, parseError);
            }
          }
          
          // When all chapters are done, update the course status
          await db
            .update(STUDY_MATERIAL_TABLE)
            .set({ status: "Ready" })
            .where(eq(STUDY_MATERIAL_TABLE.courseId, course.courseId))
            .returning();
            
          console.log("All chapters generated successfully and course marked as Ready");
          
        } catch (error) {
          console.error("Error in background note generation:", error);
        }
      })();
      
      // Try to send Inngest event as a backup method, but we don't rely on it
      try {
        await inngest.send({
          name: "notes.generate",
          data: {
            course: dbResult[0]
          }
        });
      } catch (e) {
        console.log("Inngest backup sending failed, but direct generation is still working");
      }
    } catch (genError) {
      console.error("Failed to start direct note generation:", genError);
      console.log("Error details:", {
        message: genError.message,
        stack: genError.stack,
        name: genError.name
      });
      // Continue execution even if generation fails - don't block the response
    }

    return NextResponse.json({ result: dbResult[0] });
  } catch (error) {
    console.error("Error processing the request:", error);
    console.log("Error details:", {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    return NextResponse.json({ error: error.message, details: "Check server logs for more information" }, { status: 500 });
  }
}

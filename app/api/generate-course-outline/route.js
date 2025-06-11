import { inngest } from "../../../inngest/client";
import { courseOutlineAIModel } from "../../../configs/AiModel";
import { db } from "../../../configs/db";
import { STUDY_MATERIAL_TABLE } from "../../../configs/schema";
import { NextResponse } from "next/server";

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
      console.log("Attempting to send Inngest event with key:", process.env.NEXT_PUBLIC_INNGEST_EVENT_KEY ? "Available" : "Not available");
      const eventResult = await inngest.send({
        name: "notes.generate",
        data: {
          course: dbResult[0], // Adjusting for the correct returned object structure
        }
      });
      console.log("Inngest event sent successfully:", eventResult);
    } catch (inngestError) {
      console.error("Failed to send Inngest event:", inngestError);
      console.log("Inngest error details:", {
        message: inngestError.message,
        stack: inngestError.stack,
        name: inngestError.name
      });
      // Continue execution even if Inngest fails - don't block the response
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

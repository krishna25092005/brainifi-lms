import { CHAPTER_NOTES_TABLE } from "/configs/schema";
import { db } from "/configs/db";
import { eq, and } from "drizzle-orm";
import { NextResponse } from "next/server";
import { STUDY_TYPE_CONTENT_TABLE } from "../../../configs/schema";

export async function POST(req) {
  try {
    const { courseId, studyType } = await req.json();

    // Validate input
    if (!courseId) {
      return NextResponse.json(
        { error: "The 'courseId' field is required." },
        { status: 400 }
      );
    }

    console.log("Incoming Data:", { courseId, studyType });

    // Handling "ALL" case
    if (studyType === "ALL") {
      const notes = await db
        .select()
        .from(CHAPTER_NOTES_TABLE)
        .where(eq(CHAPTER_NOTES_TABLE.courseId, courseId));

      console.log("Fetched Notes:", notes);

      const contentList = await db
        .select()
        .from(STUDY_TYPE_CONTENT_TABLE)
        .where(eq(STUDY_TYPE_CONTENT_TABLE.courseId, courseId));

      console.log("Fetched Study Content:", contentList);

      const result = {
        notes: notes,
        flashcard: contentList.filter((item) => item.type === "Flashcard"),
        quiz: contentList.filter((item) => item.type === "Quiz"),
        qa: contentList.filter((item) => item.type === "Question/Answer"),
      };

      return NextResponse.json(result);
    }

    // Handling specific study types
    else if (studyType === "notes") {
      const notes = await db
        .select()
        .from(CHAPTER_NOTES_TABLE)
        .where(eq(CHAPTER_NOTES_TABLE.courseId, courseId));

      console.log("Notes for courseId:", courseId, notes);
      
      // Ensure each note has valid JSON
      const processedNotes = notes.map(note => {
        if (!note.notes) {
          // Create default notes object for empty notes
          note.notes = JSON.stringify({
            emoji: "📝",
            chapterTitle: `Chapter ${note.chapterId}`,
            chapterSummary: "No summary available.",
            topics: []
          });
          return note;
        }
        
        // Function to thoroughly fix common JSON syntax issues
        const fixJsonString = (str) => {
          let fixed = str;
          
          try {
            // If it's already a valid JSON, no need to fix
            JSON.parse(str);
            return str;
          } catch (e) {
            console.log(`Fixing JSON for chapter ${note.chapterId}: ${e.message}`);
            
            // Advanced JSON fixing
            
            // Fix trailing commas in objects/arrays
            fixed = fixed.replace(/,(\s*[\]}])/g, '$1');
            
            // Fix missing commas between items
            fixed = fixed.replace(/}(\s*){/g, '},{');
            fixed = fixed.replace(/](\s*)\[/g, '],[');
            fixed = fixed.replace(/}(\s*)\[/g, '},\[');
            fixed = fixed.replace(/](\s*){/g, '],{');
            
            // Handle unescaped control characters
            fixed = fixed.replace(/[\u0000-\u001F]+/g, ' ');
            
            // Fix incorrect escape sequences
            fixed = fixed.replace(/([^\\])\\(?!["\\/bfnrt]|u[0-9a-fA-F]{4})/g, '$1\\\\');
            
            // Handle unescaped quotes within strings (basic cases only)
            fixed = fixed.replace(/"([^"]*?)(?<!\\)"([^"]*?)"/g, '"$1\\"$2"');
            
            // Check for unbalanced brackets - add missing ones if needed
            const countChar = (str, char) => (str.match(new RegExp('\\' + char, 'g')) || []).length;
            
            const openBraces = countChar(fixed, '{');
            const closeBraces = countChar(fixed, '}');
            const openBrackets = countChar(fixed, '[');
            const closeBrackets = countChar(fixed, ']');
            
            // Add missing closing braces/brackets
            if (openBraces > closeBraces) {
              fixed = fixed + '}'.repeat(openBraces - closeBraces);
            }
            if (openBrackets > closeBrackets) {
              fixed = fixed + ']'.repeat(openBrackets - closeBrackets);
            }
            
            return fixed;
          }
        };
        
        // Try to parse and re-stringify to ensure valid JSON
        try {
          if (typeof note.notes === 'string') {
            const cleanedString = fixJsonString(note.notes);
            
            // Attempt to parse the fixed string
            try {
              const parsed = JSON.parse(cleanedString);
              note.notes = JSON.stringify(parsed);
              console.log(`Successfully fixed JSON for chapter ${note.chapterId}`);
            } catch (parseErr) {
              console.error(`Could not fix JSON for chapter ${note.chapterId}: ${parseErr.message}`);
              
              // If parsing still fails, provide a valid fallback
              note.notes = JSON.stringify({
                emoji: "📝",
                chapterTitle: `Chapter ${note.chapterId}`,
                chapterSummary: "This content couldn't be properly processed due to formatting issues.",
                topics: [{
                  topicTitle: "Content Recovery Notice",
                  content: "The original content had formatting issues and couldn't be displayed correctly. Please try regenerating this notes section."
                }]
              });
            }
          } else if (typeof note.notes === 'object' && note.notes !== null) {
            // If it's already an object, stringify it to ensure consistent format
            note.notes = JSON.stringify(note.notes);
          }
        } catch (e) {
          console.error(`Fatal error processing note for chapter ${note.chapterId}:`, e.message);
          // Provide valid fallback for any critical errors
          note.notes = JSON.stringify({
            emoji: "⚠️",
            chapterTitle: `Chapter ${note.chapterId} (Error)`,
            chapterSummary: "There was an error processing this content.",
            topics: [{
              topicTitle: "Error Information",
              content: `Error details: ${e.message}`
            }]
          });
        }
        
        return note;
      });

      return NextResponse.json(processedNotes);
    } else {
      const result = await db
        .select()
        .from(STUDY_TYPE_CONTENT_TABLE)
        .where(
          and(
            eq(STUDY_TYPE_CONTENT_TABLE.courseId, courseId),
            eq(STUDY_TYPE_CONTENT_TABLE.type, studyType)
          )
        );

      console.log(`Content for type ${studyType}:`, result);

      return NextResponse.json(result[0]);
    }
  } catch (error) {
    console.error("Error in POST /api/study-type:", error.message);
    console.error("Full error details:", error); // Log full error details

    return NextResponse.json(
      { error: "Failed to fetch study materials. Please try again later." },
      { status: 500 }
    );
  }
}

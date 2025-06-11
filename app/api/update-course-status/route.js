import { db } from "../../../configs/db";
import { STUDY_MATERIAL_TABLE } from "../../../configs/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

// API route to update a course status from "Generating" to "Ready"
export async function POST(req) {
  try {
    const { courseId } = await req.json();

    if (!courseId) {
      return NextResponse.json(
        { error: "The 'courseId' field is required." },
        { status: 400 }
      );
    }

    // Update the course status in the database
    const result = await db
      .update(STUDY_MATERIAL_TABLE)
      .set({
        status: "Ready"
      })
      .where(eq(STUDY_MATERIAL_TABLE.courseId, courseId))
      .returning();

    if (!result || result.length === 0) {
      return NextResponse.json(
        { error: "Course not found or status update failed." },
        { status: 404 }
      );
    }

    return NextResponse.json({ result: result[0] });
  } catch (error) {
    console.error("Error updating course status:", error);
    return NextResponse.json(
      { error: "Failed to update course status. Please try again later." },
      { status: 500 }
    );
  }
}

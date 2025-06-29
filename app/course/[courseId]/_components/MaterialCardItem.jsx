import axios from "axios";
import { useState } from "react";

import Link from "next/link";
import { Loader } from "lucide-react";

function MaterialCardItem({ item, studyTypeContent, course, refreshData }) {
  const [loading, setLoading] = useState(false);
  const [contentGenerated, setContentGenerated] = useState(false);

  // Determine current type content dynamically
  const getCurrentTypeContent = () => {
    try {
      if (item.type === "notes") {
        return studyTypeContent?.notes?.length ?? null;
      } else if (item.type === "flashcard") {
        return studyTypeContent?.flashcard?.[0]?.content?.length ?? null;
      } else if (item.type === "quiz") {
        return studyTypeContent?.quiz?.length ?? null;
      } else if (item.type === "qa") {
        return studyTypeContent?.qa?.length ?? null;
      }
    } catch (error) {
      console.error(`Error getting content for type ${item.type}:`, error);
      return null;
    }
  };

  const isContentGenerated =
    contentGenerated ||
    (getCurrentTypeContent() !== null && getCurrentTypeContent() > 0);

  // Function to generate chapters string
  const getChapters = () => {
    if (!course?.courseLayout?.chapters) return ""; // Handle empty or undefined course layout
    return course.courseLayout.chapters
      .map((chapter) => chapter.chapterTitle)
      .join(", "); // Return as a comma-separated string
  };

  // Polling function to check if content is generated
  const pollForContent = async (pollInterval = 2000, maxRetries = 15) => {
    let retries = 0;
    while (retries < maxRetries) {
      await new Promise((resolve) => setTimeout(resolve, pollInterval)); // Wait for pollInterval
      const updatedContent = getCurrentTypeContent();
      if (updatedContent !== null && updatedContent > 0) {
        setContentGenerated(true);
        refreshData(true); // Refresh the parent data
        break;
      }
      retries++;
    }
    setLoading(false); // Stop loading regardless of the polling outcome
  };

  // Generate content for the material type
  const GenerateContent = async (e) => {
    e.preventDefault();

    // Get chapters for the course
    const chapters = getChapters();
    console.log("Chapters:", chapters);

    try {
      setLoading(true); // Set loading state to true
      await axios.post("/api/study-type-content", {
        courseId: course.courseId,
        type: item.name,
        chapter: chapters, // Send chapters as part of the payload
      });

      console.log("Content generation initiated.");
      pollForContent(); // Start polling for content
    } catch (error) {
      console.error("Error generating content:", error);
    }
  };

  return (
    <Link href={`/course/${course.courseId}${item.path}`}>
      <div
        className={`border dark:border-gray-700 shadow-md rounded-lg bg-gray-100 dark:bg-gray-800 p-3 sm:p-5 h-full flex flex-col items-center justify-between gap-2 ${
          !isContentGenerated ? "grayscale" : ""
        }`}
      >
        <h2
          className={`p-1 px-2 rounded-full text-[10px] mb-1 ${
            isContentGenerated
              ? "bg-green-500 text-white"
              : "bg-gray-500 text-white"
          }`}
        >
          {isContentGenerated ? "Ready" : "Generate"}
        </h2>
        <img src={item.icon} alt={item.name} width={40} height={40} className="sm:w-[50px] sm:h-[50px]" />
        <h2 className="font-medium text-sm sm:text-base text-gray-800 dark:text-gray-100 text-center">{item.name}</h2>
        <h2 className="text-gray-500 dark:text-gray-300 text-xs text-center">{item.desc}</h2>
        {!isContentGenerated ? (
          <button
            className="btn btn-block btn-outline-primary mt-auto text-xs sm:text-sm hover:cursor-pointer w-full px-1 sm:px-2 py-1.5"
            onClick={GenerateContent}
            disabled={loading} // Disable button while loading
          >
            {loading ? <Loader className="animate-spin w-4 h-4 mx-auto" /> : "Generate"}
          </button>
        ) : (
          <button className="btn btn-block btn-outline-primary mt-auto text-xs sm:text-sm hover:cursor-pointer w-full px-1 sm:px-2 py-1.5">
            View
          </button>
        )}
      </div>
    </Link>
  );
}

export default MaterialCardItem;

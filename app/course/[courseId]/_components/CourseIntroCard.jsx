import React from "react";

function CourseIntroCard({ course }) {
  return (
    <div className="flex flex-col sm:flex-row gap-6 items-center p-6 border dark:border-gray-700 shadow-md rounded-lg bg-gray-100 dark:bg-gray-800 w-full mx-auto">

      <div className="w-full sm:w-[120px] flex flex-col justify-center items-center">
        <img
          src="/knowledge.png"
          alt="knowledge"
          width={70}
          height={70}
          className="mb-4"
        />
        <h2 className="text-xs text-blue-600 dark:text-blue-400 font-semibold">
          Total Chapters: {course.courseLayout.chapters.length}
        </h2>
      </div>

      <div className="flex flex-col justify-between w-full text-center sm:text-left">
        <h2 className="font-bold text-xl text-gray-800 dark:text-gray-100">
          {course.courseLayout.courseTitle}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
          {course.courseLayout.courseSummary}
        </p>
      </div>
    </div>
  );
}

export default CourseIntroCard;

import React from "react";
import Loader from "./Loader";
import Link from "next/link";
import { BookOpen, Clock, ArrowUpRight, BookCheck } from "lucide-react";

function CourseCardItem({ course }) {
  // Function to determine color based on course difficulty or type
  const getCardColor = () => {
    const title = course.courseLayout.courseTitle.toLowerCase();
    
    if (title.includes('math') || title.includes('calculus') || title.includes('algebra')) {
      return {
        bg: "from-blue-500 to-blue-600",
        icon: <BookOpen className="text-blue-500" size={24} />,
        iconBg: "bg-blue-100"
      };
    } else if (title.includes('science') || title.includes('physics') || title.includes('chemistry')) {
      return {
        bg: "from-green-500 to-green-600",
        icon: <BookCheck className="text-green-500" size={24} />,
        iconBg: "bg-green-100"
      };
    } else if (title.includes('program') || title.includes('code') || title.includes('develop')) {
      return {
        bg: "from-purple-500 to-purple-600",
        icon: <BookOpen className="text-purple-500" size={24} />,
        iconBg: "bg-purple-100"
      };
    } else {
      return {
        bg: "from-amber-500 to-amber-600",
        icon: <BookOpen className="text-amber-500" size={24} />,
        iconBg: "bg-amber-100"
      };
    }
  };
  
  const cardStyle = getCardColor();
  const randomProgress = Math.floor(Math.random() * 100);
  
  return (
    <div className="w-full h-full overflow-hidden transition-all bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm rounded-xl hover:shadow-md">
      {/* Card Header with colored gradient */}
      <div className={`h-2 bg-gradient-to-r ${cardStyle.bg}`}></div>
      
      <div className="p-5">
        <div className="flex items-start gap-4 mb-4">
          <div className={`${cardStyle.iconBg} dark:bg-opacity-20 p-3 rounded-lg`}>
            {cardStyle.icon}
          </div>
          
          <h2 className="flex-1 text-lg font-bold line-clamp-2 text-gray-800 dark:text-gray-100">
            {course.courseLayout.courseTitle}
          </h2>
        </div>

        <div className="mb-4 text-sm text-gray-600 dark:text-gray-300">
          <p className="line-clamp-3">{course.courseLayout.courseSummary}</p>
        </div>
        
        {/* Progress indicator */}
        {course.status !== "Generating" && (
          <div className="mb-4">
            <div className="flex justify-between mb-1 text-xs text-gray-500 dark:text-gray-400">
              <span>Progress</span>
              <span>{randomProgress}%</span>
            </div>
            <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-1.5">
              <div 
                className={`h-1.5 rounded-full bg-gradient-to-r ${cardStyle.bg}`}
                style={{ width: `${randomProgress}%` }}
              ></div>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
            <Clock size={14} />
            <span>Updated {Math.floor(Math.random() * 5) + 1}d ago</span>
          </div>
          
          {course.status === "Generating" ? (
            <div className="flex items-center justify-center gap-2">
              <span className="text-sm text-gray-500 dark:text-gray-400">Generating</span>
              <Loader />
            </div>
          ) : (
            <Link href={`course/${course.courseId}`}>
              <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 transition-colors border border-gray-100 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600">
                Study <ArrowUpRight size={14} />
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default CourseCardItem;

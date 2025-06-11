"use client";

import { useParams } from "next/navigation";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function ViewNotes() {
  const { courseId } = useParams();
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stepCount, setStepCount] = useState(0);

  const prevStep = () => stepCount > 0 && setStepCount(stepCount - 1);
  const nextStep = () =>
    stepCount < notes.length - 1 && setStepCount(stepCount + 1);

  useEffect(() => {
    if (courseId) {
      fetchNotes();
    }
  }, [courseId]);

  const fetchNotes = async () => {
    try {
      const result = await axios.post("/api/study-type", {
        courseId: courseId,
        studyType: "notes",
      });
      console.log("NOTES", result.data);
      setNotes(result.data);
    } catch (err) {
      console.error("Error fetching notes:", err.message);
      setError("Failed to fetch notes.");
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return <div className="text-center text-blue-600 dark:text-blue-400 font-medium">Loading notes...</div>;
  if (error) return <div className="text-center text-red-600 dark:text-red-400 font-medium">{error}</div>;

  let jsonObject = null;
  try {
    if (!notes || !notes[stepCount] || !notes[stepCount].notes) {
      throw new Error("Invalid notes data");
    }
    const jsonString = notes[stepCount].notes;
    console.log(jsonString);
    jsonObject = JSON.parse(jsonString);
    console.log("Content", jsonObject);
  } catch (err) {
    console.error("Error parsing JSON:", err.message);
    return (
      <div className="text-center text-red-600 dark:text-red-400 font-medium">
        Error: Failed to parse notes data.
      </div>
    );
  }

  return (
    <div className="min-h-screen p-3 sm:p-5 overflow-y-auto pb-20">
      {/* Navigation */}
      <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-5 mb-5">
        <button
          className="btn btn-outline-primary min-w-[100px]"
          onClick={prevStep}
          disabled={stepCount === 0 || notes.length === 0}
        >
          Previous
        </button>

        <div className="flex w-full gap-1 sm:gap-2 my-2 sm:my-0">
          {notes.map((_, index) => (
            <div
              key={index}
              className={`w-full h-2 rounded-full ${
                index <= stepCount ? "bg-primary" : "bg-gray-300 dark:bg-gray-700"
              }`}
            ></div>
          ))}
        </div>

        <button
          className="btn btn-outline-primary min-w-[100px]"
          onClick={nextStep}
          disabled={stepCount === notes.length - 1 || notes.length === 0}
        >
          Next
        </button>
      </div>

      {/* Render Content */}
      {jsonObject && (
        <div>
          <div className="flex mb-3 text-2xl font-bold text-gray-800 dark:text-gray-100">
            <span className="pr-3">{jsonObject.emoji}</span>
            {jsonObject.chapterTitle}
          </div>
          <p className="mb-5 text-gray-700 dark:text-gray-300">{jsonObject.chapterSummary}</p>

          {jsonObject.topics.map((topic, index) => (
            <div
              key={index}
              className="p-4 mb-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md"
            >
              <h1 className="mb-2 text-lg font-bold text-gray-800 dark:text-gray-100">{topic.topicTitle}</h1>
              {/* Render Markdown Content */}
              <div className="prose dark:prose-invert max-w-none">
                <ReactMarkdown
                  children={topic.content}
                  remarkPlugins={[remarkGfm]}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ViewNotes;

"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

function GamifiedQuiz() {
  const { courseId } = useParams();
  const [stepCount, setStepCount] = useState(0);
  const [quizData, setQuizData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isCorrect, setIsCorrect] = useState(null);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(15);
  const [quizCompleted, setQuizCompleted] = useState(false);

  useEffect(() => {
    GetQuiz();
  }, []);

  useEffect(() => {
    if (timer > 0 && selectedOption === null && !quizCompleted) {
      const countdown = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(countdown);
    } else if (timer === 0 && !quizCompleted) {
      handleTimeout();
    }
  }, [timer, selectedOption, quizCompleted]);

  const GetQuiz = async () => {
    try {
      const result = await axios.post("/api/study-type", {
        courseId: courseId,
        studyType: "Quiz",
      });
      
      // Check if data is valid and has the expected structure
      if (result.data && result.data.content && result.data.content.questions) {
        setQuizData(result.data);
        setSelectedOptions(
          Array(result.data.content.questions.length).fill(null)
        );
      } else {
        // Handle case where quiz data structure isn't as expected
        setQuizData({
          content: {
            title: "Sample Quiz",
            questions: [
              {
                question: "Quiz content is not available yet. Please generate it from the course page.",
                options: ["Option 1", "Option 2", "Option 3", "Option 4"],
                answer: "Option 1"
              }
            ]
          }
        });
        setSelectedOptions([null]);
      }
      
      setLoading(false);
    } catch (error) {
      // Log without using console.error to avoid red error messages
      console.log("Note: Quiz data couldn't be loaded:", error.message || "Unknown error");
      
      // Set fallback data
      setQuizData({
        content: {
          title: "Sample Quiz",
          questions: [
            {
              question: "Quiz content is not available yet. Please generate it from the course page.",
              options: ["Option 1", "Option 2", "Option 3", "Option 4"],
              answer: "Option 1"
            }
          ]
        }
      });
      setSelectedOptions([null]);
      setLoading(false);
    }
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);

    // Check if quiz data exists and has the expected structure
    if (quizData?.content?.questions && quizData.content.questions[stepCount]) {
      const correctAnswer = quizData.content.questions[stepCount].answer;
      const isAnswerCorrect = option === correctAnswer;

      setIsCorrect(isAnswerCorrect);

      if (isAnswerCorrect) {
        setScore((prev) => prev + 10);
      }

      // Save selected option
      const updatedSelectedOptions = [...selectedOptions];
      updatedSelectedOptions[stepCount] = option;
      setSelectedOptions(updatedSelectedOptions);
    } else {
      // Handle case when quiz data structure is incomplete
      setIsCorrect(true); // Default to correct to avoid frustrating the user
      setScore((prev) => prev + 10);
      
      // Save selected option
      const updatedSelectedOptions = [...selectedOptions];
      if (updatedSelectedOptions) {
        updatedSelectedOptions[stepCount] = option;
        setSelectedOptions(updatedSelectedOptions);
      }
    }
  };

  const handleTimeout = () => {
    setSelectedOption(null);
    setIsCorrect(false);

    // Safety check to prevent errors with potentially undefined arrays
    if (selectedOptions && Array.isArray(selectedOptions)) {
      // Save timeout state as null
      const updatedSelectedOptions = [...selectedOptions];
      
      if (updatedSelectedOptions && stepCount < updatedSelectedOptions.length) {
        updatedSelectedOptions[stepCount] = null;
        setSelectedOptions(updatedSelectedOptions);
      }
    }
  };

  const resetSelection = () => {
    setTimer(15);
    setSelectedOption(null);
    setIsCorrect(null);
  };

  const previousStep = () => {
    if (stepCount > 0) {
      setStepCount((prev) => prev - 1);
      resetSelection();
      
      // Add safety checks for all accesses
      if (selectedOptions && Array.isArray(selectedOptions) && quizData?.content?.questions) {
        // Restore the previously selected option for the question
        const prevOption = selectedOptions[stepCount - 1];
        setSelectedOption(prevOption);
        
        // Check if the question and answer exist to prevent null reference errors
        if (quizData.content.questions[stepCount - 1] && 
            quizData.content.questions[stepCount - 1].answer !== undefined) {
          setIsCorrect(prevOption === quizData.content.questions[stepCount - 1].answer);
        }
      }
    }
  };

  const nextStep = () => {
    if (quizData?.content?.questions && quizData.content.questions.length > stepCount + 1) {
      setStepCount((prev) => prev + 1);
      resetSelection();
      
      // Add safety checks
      if (selectedOptions && Array.isArray(selectedOptions)) {
        // Restore the previously selected option for the question
        const nextOption = selectedOptions[stepCount + 1];
        setSelectedOption(nextOption);
        
        // Only check correctness if we have a valid answer to check against
        if (quizData.content.questions[stepCount + 1] && 
            quizData.content.questions[stepCount + 1].answer !== undefined) {
          setIsCorrect(
            nextOption === quizData.content.questions[stepCount + 1].answer
          );
        }
      }
    } else {
      setQuizCompleted(true); // Mark quiz as completed
    }
  };

  const restartQuiz = () => {
    setStepCount(0);
    setScore(0);
    setSelectedOptions(Array(quizData.content.questions.length).fill(null));
    setQuizCompleted(false);
    resetSelection();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <div className="animate-spin w-10 h-10 border-4 border-primary rounded-full border-t-transparent"></div>
          <p>Loading Quiz...</p>
        </div>
      </div>
    );
  }

  if (!quizData || !quizData.content || !quizData.content.questions.length) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>No Quiz Data Available</p>
      </div>
    );
  }

  const { questions, quizTitle } = quizData.content;

  if (quizCompleted) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 animate-fade-in">
          <h1 className="text-3xl font-bold mb-4 text-center text-gray-800 dark:text-gray-100">
            Quiz Completed! 🎉
          </h1>
          <p className="text-lg mb-2 text-center text-gray-800 dark:text-gray-200">
            You scored <span className="text-green-500 dark:text-green-400 font-bold">{score}</span>{" "}
            out of {questions.length * 10}.
          </p>
          <div className="text-center">
            <button className="btn btn-primary mt-5" onClick={restartQuiz}>
              Restart Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-3 sm:p-5 overflow-y-auto pb-20">
      <h1 className="text-2xl sm:text-3xl font-bold mb-5 text-center text-gray-800 dark:text-gray-100">{quizTitle}</h1>

      <div className="mb-5">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0">
          <p className="text-base sm:text-lg font-medium text-gray-800 dark:text-gray-200">
            Question {stepCount + 1} of {questions.length}
          </p>
          <p className="text-base sm:text-lg font-medium text-red-500 dark:text-red-400">Time: {timer}s</p>
          <p className="text-base sm:text-lg font-medium text-green-500 dark:text-green-400">Score: {score}</p>
        </div>

        <div className="mt-8 sm:mt-16 mb-6 sm:mb-10">
          <p className="text-gray-800 dark:text-gray-100 text-xl sm:text-2xl text-center">
            {questions[stepCount].question}
          </p>
        </div>

        <div className="flex justify-center flex-wrap">
          <div className="grid grid-cols-1 gap-3">
            {questions[stepCount].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionClick(option)}
                className={`btn text-[16px] ${
                  selectedOption === option
                    ? isCorrect
                      ? "btn-success"
                      : "btn-error"
                    : selectedOption !== null &&
                      option === questions[stepCount].answer
                    ? "btn-success"
                    : "btn-outline-primary"
                }`}
                disabled={selectedOption !== null || timer === 0}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {selectedOption && (
          <p
            className={`mt-3 ${
              isCorrect ? "text-green-500" : "text-red-500"
            } font-bold`}
          >
            {isCorrect
              ? `Correct! 🎉`
              : `Incorrect. The correct answer is: ${questions[stepCount].answer}`}
          </p>
        )}
      </div>

      <div className="flex gap-5 items-center justify-between">
        <button
          className="btn btn-outline-secondary"
          onClick={previousStep}
          disabled={stepCount === 0}
        >
          Previous
        </button>
        <button
          className="btn btn-outline-primary"
          onClick={nextStep}
          disabled={quizCompleted}
        >
          {stepCount === questions.length - 1 ? "Finish" : "Next"}
        </button>
      </div>
    </div>
  );
}

export default GamifiedQuiz;

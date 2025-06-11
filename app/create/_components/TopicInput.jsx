"use client";

import React, { useState } from 'react'

function TopicInput({setTopic, setDifficultyLevel}) {
    const [currentLevel, setCurrentLevel] = useState("Easy");
    const handleChange = (event) => {
      setDifficultyLevel(event.target.value);
      setCurrentLevel(event.target.value);
    };
  return (
    <div className='mt-10 w-full flex flex-col'>
        <h2 className='text-gray-800 dark:text-gray-100'>Enter topic or paste the content for which you want to generate study material</h2>
        <textarea 
          onChange={(event) => setTopic(event.target.value)} 
          className="textarea textarea-block bg-white dark:bg-gray-800 text-black dark:text-white mt-2 border dark:border-gray-700 p-3 rounded-lg min-h-[150px] resize-y placeholder-gray-500 dark:placeholder-gray-300" 
          placeholder="Start writing here"
          data-suppress-hydration-warning
        />
        <h2 className='mt-5 mb-2 text-gray-800 dark:text-gray-100'>Select the difficulty level</h2>
        <select 
          value={currentLevel}
          onChange={handleChange} 
          className="select bg-white dark:bg-gray-800 text-black dark:text-white border dark:border-gray-700 p-2 rounded-lg w-full max-w-xs"
          data-suppress-hydration-warning
        >
            <option value="Easy">Easy</option> 
            <option value="Moderate">Moderate</option> 
            <option value="Hard">Hard</option>
        </select>
    </div>
  )
}

export default TopicInput
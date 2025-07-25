import React from 'react'

function ChapterList({ course }) {
    const CHAPTERS = course.courseLayout.chapters
    console.log(CHAPTERS)
  return (
    <div className='mt-5'>
        <h2 className='font-medium text-xl text-gray-800 dark:text-gray-100'>Chapters</h2>
        <div className='mt-3 hover:cursor-pointer'>
            {CHAPTERS.map((chapter, index) => (
                <div key={index} className='flex flex-col sm:flex-row gap-3 sm:gap-5 items-start sm:items-center p-4 border dark:border-gray-700 shadow-md mb-2 rounded-lg bg-gray-100 dark:bg-gray-800 overflow-hidden'>
                    <h2 className='text-2xl'>{chapter.emoji}</h2>
                    <div className='w-full'>
                        <h2 className='font-medium text-gray-800 dark:text-gray-100'>{chapter.chapterTitle}</h2>
                        <p className='text-gray-400 dark:text-gray-300 text-sm break-words'>{chapter.chapterSummary}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default ChapterList
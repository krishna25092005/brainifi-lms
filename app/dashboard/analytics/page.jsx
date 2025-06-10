"use client";

import React from 'react';

export default function AnalyticsPage() {
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">Analytics Dashboard</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-8">Track your learning progress and activities</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Course Progress</h2>
          <div className="h-40 flex items-center justify-center">
            <p className="text-gray-500 dark:text-gray-400">Analytics features coming soon!</p>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Study Time</h2>
          <div className="h-40 flex items-center justify-center">
            <p className="text-gray-500 dark:text-gray-400">Analytics features coming soon!</p>
          </div>
        </div>
      </div>
    </div>
  );
}

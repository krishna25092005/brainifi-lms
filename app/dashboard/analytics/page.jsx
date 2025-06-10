"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, LineChart, PieChart, TrendingUp, BookOpen, Award, Calendar, Clock } from 'lucide-react';

export default function AnalyticsPage() {
  // Sample data for visualization
  const courseProgress = [
    { name: 'Mathematics', progress: 85 },
    { name: 'Physics', progress: 60 },
    { name: 'Computer Science', progress: 75 },
    { name: 'Biology', progress: 45 },
  ];
  
  const weeklyActivity = [
    { day: 'Mon', hours: 2.5 },
    { day: 'Tue', hours: 1.8 },
    { day: 'Wed', hours: 3.2 },
    { day: 'Thu', hours: 2.0 },
    { day: 'Fri', hours: 2.7 },
    { day: 'Sat', hours: 4.5 },
    { day: 'Sun', hours: 3.8 },
  ];
  
  // Stats cards data
  const statsCards = [
    {
      title: 'Study Hours',
      value: '24.5',
      unit: 'hrs',
      description: 'Last 7 days',
      icon: Clock,
      color: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
    },
    {
      title: 'Courses',
      value: '4',
      unit: '',
      description: 'In progress',
      icon: BookOpen,
      color: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400'
    },
    {
      title: 'Quizzes',
      value: '12',
      unit: '',
      description: 'Completed',
      icon: Award,
      color: 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400'
    },
    {
      title: 'Streak',
      value: '8',
      unit: 'days',
      description: 'Current streak',
      icon: Calendar,
      color: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400'
    }
  ];
  
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="mb-2 text-2xl font-bold text-gray-800 dark:text-gray-100">Analytics Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-300">Track your learning progress and activities</p>
      </motion.div>
      
      {/* Stats Cards */}
      <motion.div 
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        {statsCards.map((stat, index) => (
          <motion.div
            key={index}
            className="p-6 bg-white border border-gray-100 shadow-sm dark:bg-gray-800 rounded-xl dark:border-gray-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.1 }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`rounded-lg p-2 ${stat.color}`}>
                <stat.icon size={20} />
              </div>
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{stat.description}</span>
            </div>
            <div className="flex items-end gap-1">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">{stat.value}</h3>
              <span className="text-gray-600 dark:text-gray-300 mb-0.5">{stat.unit}</span>
            </div>
            <p className="mt-1 text-sm font-medium text-gray-600 dark:text-gray-400">{stat.title}</p>
          </motion.div>
        ))}
      </motion.div>
      
      {/* Placeholder for charts - in a real app, you'd use a library like Chart.js or Recharts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Progress by Course */}
        <motion.div
          className="p-6 bg-white border border-gray-100 shadow-sm dark:bg-gray-800 rounded-xl dark:border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Course Progress</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Completion percentage</p>
            </div>
            <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20">
              <BarChart3 className="text-blue-600 dark:text-blue-400" size={20} />
            </div>
          </div>
          
          <div className="space-y-4">
            {courseProgress.map((course, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-gray-700 dark:text-gray-300">{course.name}</span>
                  <span className="text-gray-600 dark:text-gray-400">{course.progress}%</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full dark:bg-gray-700">
                  <div 
                    className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-blue-600"
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
        
        {/* Weekly Activity */}
        <motion.div
          className="p-6 bg-white border border-gray-100 shadow-sm dark:bg-gray-800 rounded-xl dark:border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Weekly Activity</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Hours spent studying</p>
            </div>
            <div className="p-2 rounded-lg bg-purple-50 dark:bg-purple-900/20">
              <LineChart className="text-purple-600 dark:text-purple-400" size={20} />
            </div>
          </div>
          
          <div className="flex items-end justify-between h-48">
            {weeklyActivity.map((day, index) => (
              <div key={index} className="flex flex-col items-center flex-1">
                <div 
                  className="w-full max-w-[30px] mx-auto rounded-t-md bg-gradient-to-t from-purple-500 to-purple-600"
                  style={{ height: `${(day.hours / 5) * 100}%` }}
                ></div>
                <p className="mt-2 text-xs font-medium text-gray-600 dark:text-gray-400">{day.day}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
      
      <motion.div
        className="p-6 bg-white border border-gray-100 shadow-sm dark:bg-gray-800 rounded-xl dark:border-gray-700"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <div className="py-10 text-center">
          <h3 className="mb-2 text-gray-600 dark:text-gray-300">More analytics features coming soon!</h3>
          <p className="text-gray-500 dark:text-gray-400">We're working on adding more detailed insights about your learning journey.</p>
        </div>
      </motion.div>
    </div>
  );
}
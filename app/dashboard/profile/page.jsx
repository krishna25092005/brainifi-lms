"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useUser } from "@clerk/nextjs";
import { 
  BookOpen, Award, Clock, TrendingUp, Settings, Edit2, User, 
  BookCheck, GraduationCap, Zap, Calendar, GitBranch, BrainCircuit,
  BarChart, Check, ChevronRight, CircleUser, Sparkles, Medal,
  Lock
} from 'lucide-react';
import Link from 'next/link';
import { db } from "../../../configs/db";
import { STUDY_MATERIAL_TABLE } from "../../../configs/schema";
import { eq } from "drizzle-orm";

// Badge component
const Badge = ({ icon: Icon, text, color }) => (
  <div className={`flex items-center gap-1.5 text-xs font-medium ${color} rounded-full py-1 px-2`}>
    <Icon size={12} />
    <span>{text}</span>
  </div>
);

export default function ProfilePage() {
  const { user, isLoaded } = useUser();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  
  // Stats (some dummy data + real data)
  const stats = [
    { 
      name: "Courses", 
      value: courses.length, 
      icon: BookOpen, 
      color: "bg-gradient-to-r from-blue-500 to-blue-600 text-white",
      secondaryText: "Active Learning"
    },
    { 
      name: "Achievements", 
      value: "7", 
      icon: Award, 
      color: "bg-gradient-to-r from-amber-500 to-orange-500 text-white",
      secondaryText: "Unlocked"
    },
    { 
      name: "Study Time", 
      value: "24.5", 
      icon: Clock, 
      color: "bg-gradient-to-r from-green-500 to-emerald-600 text-white",
      secondaryText: "Hours this month"
    },
    { 
      name: "Progress", 
      value: "85%", 
      icon: TrendingUp, 
      color: "bg-gradient-to-r from-violet-500 to-purple-600 text-white",
      secondaryText: "Average completion"
    },
  ];
  
  // Achievements
  const achievements = [
    { 
      name: "Fast Learner", 
      icon: Zap, 
      color: "text-amber-500 bg-amber-100",
      earned: true,
      date: "June 2, 2025"
    },
    { 
      name: "Math Master", 
      icon: BrainCircuit, 
      color: "text-blue-500 bg-blue-100",
      earned: true,
      date: "May 27, 2025"
    },
    { 
      name: "Quiz Champion", 
      icon: Award, 
      color: "text-purple-500 bg-purple-100",
      earned: true,
      date: "May 20, 2025"
    },
    { 
      name: "Perfect Attendance", 
      icon: Calendar, 
      color: "text-green-500 bg-green-100",
      earned: true,
      date: "May 15, 2025"
    },
    { 
      name: "Study Marathon", 
      icon: Clock, 
      color: "text-rose-500 bg-rose-100",
      earned: true,
      date: "May 8, 2025"
    },
    { 
      name: "Persistent Scholar", 
      icon: GitBranch, 
      color: "text-cyan-500 bg-cyan-100",
      earned: true,
      date: "May 5, 2025"
    },
    { 
      name: "Knowledge Explorer", 
      icon: GraduationCap, 
      color: "text-emerald-500 bg-emerald-100",
      earned: true,
      date: "April 29, 2025"
    },
  ];
  
  // Fetch user's courses
  useEffect(() => {
    const fetchUserCourses = async () => {
      if (user && user.primaryEmailAddress) {
        try {
          const userEmail = user.primaryEmailAddress.emailAddress;
          const userCourses = await db
            .select()
            .from(STUDY_MATERIAL_TABLE)
            .where(eq(STUDY_MATERIAL_TABLE.createdBy, userEmail));
          
          setCourses(userCourses || []);
        } catch (error) {
          console.error("Error fetching user courses:", error);
          // Add some sample courses for better visualization
          setCourses([
            { id: 1, topic: "Introduction to Machine Learning", courseType: "Computer Science", difficultyLevel: "Intermediate" },
            { id: 2, topic: "Advanced JavaScript Concepts", courseType: "Programming", difficultyLevel: "Advanced" },
            { id: 3, topic: "Calculus for Data Science", courseType: "Mathematics", difficultyLevel: "Advanced" }
          ]);
        } finally {
          setLoading(false);
        }
      } else if (isLoaded && !user) {
        // If the user is not authenticated, show sample data
        setLoading(false);
        setCourses([
          { id: 1, topic: "Introduction to JavaScript", courseType: "Programming", difficultyLevel: "Beginner" },
          { id: 2, topic: "Advanced React Patterns", courseType: "Web Development", difficultyLevel: "Advanced" },
          { id: 3, topic: "Data Structures and Algorithms", courseType: "Computer Science", difficultyLevel: "Intermediate" },
          { id: 4, topic: "Machine Learning Basics", courseType: "Data Science", difficultyLevel: "Beginner" }
        ]);
      }
    };
    
    fetchUserCourses();
  }, [user, isLoaded]);

  // Display loading state
  if (!isLoaded || loading) {
    return (
      <div className="h-[calc(100vh-180px)] flex items-center justify-center">
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 rounded-full border-4 border-t-blue-500 border-r-purple-500 border-b-green-500 border-l-amber-500 animate-spin"></div>
          <div className="absolute inset-3 rounded-full bg-white flex items-center justify-center">
            <GraduationCap className="text-blue-600 h-8 w-8" />
          </div>
        </div>
      </div>
    );
  }
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-6xl mx-auto space-y-8"
    >
      {/* Profile Header - Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 shadow-xl overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 right-10 w-64 h-64 bg-white opacity-5 rounded-full blur-2xl"></div>
          <div className="absolute bottom-10 left-10 w-48 h-48 bg-purple-300 opacity-10 rounded-full blur-2xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-300 opacity-10 rounded-full blur-3xl"></div>
        </div>
        
        {/* Content */}
        <div className="relative flex flex-col md:flex-row items-center gap-8">
          {/* Avatar */}
          <motion.div 
            initial={{ scale: 0.8 }} 
            animate={{ scale: 1 }} 
            transition={{ duration: 0.5, type: "spring" }}
            className="relative z-10"
          >
            <div className="relative h-32 w-32 md:h-40 md:w-40">
              {/* Circular progress indicator */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                <circle 
                  cx="50" cy="50" r="48" 
                  fill="none" 
                  stroke="rgba(255,255,255,0.2)" 
                  strokeWidth="4"
                />
                <circle 
                  cx="50" cy="50" r="48" 
                  fill="none" 
                  stroke="white" 
                  strokeWidth="4"
                  strokeDasharray="300"
                  strokeDashoffset="45"
                  strokeLinecap="round"
                  transform="rotate(-90 50 50)"
                />
              </svg>
              
              {/* Avatar image or initial */}
              <div className="absolute inset-2 rounded-full bg-gradient-to-br from-white/80 to-white/90 flex items-center justify-center shadow-inner overflow-hidden backdrop-blur-sm">
                {user?.imageUrl ? (
                  <img 
                    src={user.imageUrl} 
                    alt={user?.fullName || "User"} 
                    className="h-full w-full object-cover" 
                  />
                ) : (
                  <span className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                    {user?.fullName?.charAt(0) || "B"}
                  </span>
                )}
              </div>
              
              {/* Edit button */}
              <button className="absolute bottom-0 right-0 z-20 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition-colors">
                <Edit2 size={18} className="text-gray-700" />
              </button>
            </div>
          </motion.div>
          
          {/* User Info */}
          <div className="flex-1 text-center md:text-left text-white z-10">
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex flex-col md:flex-row md:items-center gap-2">
                <h1 className="text-3xl md:text-4xl font-bold">
                  {user?.fullName || "BrainiFi Learner"}
                </h1>
                <div className="flex items-center gap-1 md:ml-3">
                  <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                    <Sparkles className="h-3.5 w-3.5 text-amber-300" />
                    Premium Member
                  </span>
                </div>
              </div>
            </motion.div>
            <motion.p 
              initial={{ y: -10, opacity: 0 }} 
              animate={{ y: 0, opacity: 1 }} 
              transition={{ delay: 0.2 }}
              className="text-white/80 mt-1"
            >
              {user?.primaryEmailAddress?.emailAddress || "guest@example.com"}
            </motion.p>
            
            <div className="flex flex-wrap gap-3 justify-center md:justify-start mt-4">
              <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-lg transition-all flex items-center gap-2">
                <Settings size={16} /> Account Settings
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Stats Grid */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.name}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all"
          >
            <div className={`rounded-full w-12 h-12 ${stat.color} flex items-center justify-center mb-4`}>
              <stat.icon className="text-white" size={24} />
            </div>
            <h3 className="text-lg font-semibold text-gray-700">{stat.name}</h3>
            <div className="flex flex-col">
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.secondaryText}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
      
      {/* Achievements Section */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-2xl p-6 shadow-md mb-8"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold flex items-center">
            <Medal className="mr-2 text-amber-500" size={20} /> 
            Achievements
          </h2>
          <span className="text-sm text-purple-600 font-medium">7 of 12 Unlocked</span>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.name}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 + index * 0.05 }}
              className="relative p-4 rounded-xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-all group"
            >
              <div className={`${achievement.color} p-3 rounded-full w-12 h-12 flex items-center justify-center mb-3`}>
                <achievement.icon size={20} />
              </div>
              <h3 className="font-semibold">{achievement.name}</h3>
              <p className="text-xs text-gray-500 mt-1">Earned {achievement.date}</p>
              
              {achievement.earned ? (
                <div className="absolute top-3 right-3 bg-green-100 text-green-600 p-1 rounded-full">
                  <Check size={12} />
                </div>
              ) : (
                <div className="absolute top-3 right-3 bg-gray-100 text-gray-400 p-1 rounded-full">
                  <Lock size={12} />
                </div>
              )}
              
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity"></div>
            </motion.div>
          ))}
        </div>
      </motion.div>
      
      {/* Enrolled Courses */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="bg-white rounded-2xl p-6 shadow-md mb-8"
      >
        <h2 className="text-xl font-bold mb-4 flex items-center">
          <BookOpen className="mr-2 text-blue-600" size={20} /> 
          My Courses
        </h2>
        
        {courses.length > 0 ? (
          <div className="space-y-4">
            {courses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="p-4 border border-gray-100 rounded-lg hover:bg-gray-50 hover:shadow-sm transition-all"
              >
                <Link href={`/course/${course.id}`}>
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold text-gray-800">{course.topic}</h3>
                      <div className="flex gap-2 mt-1">
                        <span className="inline-block px-2 py-1 text-xs bg-gray-100 rounded-full text-gray-600">
                          {course.courseType}
                        </span>
                        <span className="inline-block px-2 py-1 text-xs bg-blue-100 rounded-full text-blue-600">
                          {course.difficultyLevel}
                        </span>
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 mb-1 text-right">
                        {Math.floor(Math.random() * 100)}% Complete
                      </div>
                      <div className="w-32 md:w-48 bg-gray-200 rounded-full h-2.5 overflow-hidden">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-purple-600 h-2.5 rounded-full" 
                          style={{ width: `${Math.floor(Math.random() * 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="mb-4 mx-auto w-16 h-16 bg-blue-50 flex items-center justify-center rounded-full">
              <BookOpen size={24} className="text-blue-500" />
            </div>
            <p className="text-gray-500 mb-4">You haven't enrolled in any courses yet.</p>
            <Link href="/dashboard" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90 transition-opacity text-white px-6 py-2 rounded-lg inline-flex items-center gap-2">
              Browse Courses <ChevronRight size={16} />
            </Link>
          </div>
        )}
      </motion.div>
      
      {/* Recent Activity */}
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="bg-white rounded-2xl p-6 shadow-md"
      >
        <h2 className="text-xl font-bold mb-6 flex items-center">
          <BarChart className="mr-2 text-purple-600" size={20} />
          Recent Activity
        </h2>
        <ul className="space-y-5">
          <li className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
            <div className="bg-green-100 p-2 rounded-full text-green-500">
              <BookCheck size={16} />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <p className="font-medium">Completed Chapter 3: Neural Networks</p>
                <span className="bg-green-100 text-green-600 text-xs px-2 py-0.5 rounded-full">+25 XP</span>
              </div>
              <p className="text-sm text-gray-500">June 8, 2025 (2 days ago)</p>
            </div>
          </li>
          <li className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
            <div className="bg-blue-100 p-2 rounded-full text-blue-500">
              <Award size={16} />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <p className="font-medium">Earned "Fast Learner" badge</p>
                <span className="bg-blue-100 text-blue-600 text-xs px-2 py-0.5 rounded-full">Achievement</span>
              </div>
              <p className="text-sm text-gray-500">June 2, 2025 (8 days ago)</p>
            </div>
          </li>
          <li className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
            <div className="bg-purple-100 p-2 rounded-full text-purple-500">
              <TrendingUp size={16} />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <p className="font-medium">Achieved 85% quiz score in Advanced Calculus</p>
                <span className="bg-purple-100 text-purple-600 text-xs px-2 py-0.5 rounded-full">+50 XP</span>
              </div>
              <p className="text-sm text-gray-500">May 28, 2025 (13 days ago)</p>
            </div>
          </li>
        </ul>
        <div className="mt-6 text-center">
          <button className="text-purple-600 font-medium hover:underline text-sm flex items-center gap-1 mx-auto">
            View All Activity <ChevronRight size={14} />
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

"use client";

import React from 'react';
import { motion } from 'framer-motion';
import WelcomeBanner from './_components/WelcomeBanner';
import CourseList from './_components/CourseList';
import { Brain, Sparkles, GraduationCap, Crown, TrendingUp, BookOpen, ChevronRight } from 'lucide-react';
import Link from 'next/link';

function Dashboard() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <WelcomeBanner />
      
      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Link href="/dashboard/mathai">
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="p-5 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white flex items-center gap-3 shadow-sm hover:shadow-md transition-all"
          >
            <div className="p-3 bg-white/20 rounded-lg">
              <Brain size={24} />
            </div>
            <div>
              <h3 className="font-medium">MathAI</h3>
              <p className="text-sm text-white/80">Ask any math question</p>
            </div>
          </motion.div>
        </Link>
        
        <Link href="/create">
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="p-5 rounded-xl bg-gradient-to-r from-purple-500 to-purple-600 text-white flex items-center gap-3 shadow-sm hover:shadow-md transition-all"
          >
            <div className="p-3 bg-white/20 rounded-lg">
              <Sparkles size={24} />
            </div>
            <div>
              <h3 className="font-medium">Create Course</h3>
              <p className="text-sm text-white/80">Generate custom content</p>
            </div>
          </motion.div>
        </Link>
        
        <Link href="/dashboard/courses">
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="p-5 rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white flex items-center gap-3 shadow-sm hover:shadow-md transition-all"
          >
            <div className="p-3 bg-white/20 rounded-lg">
              <BookOpen size={24} />
            </div>
            <div>
              <h3 className="font-medium">My Courses</h3>
              <p className="text-sm text-white/80">Continue learning</p>
            </div>
          </motion.div>
        </Link>
        
        <Link href="/dashboard/analytics">
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="p-5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-white flex items-center gap-3 shadow-sm hover:shadow-md transition-all"
          >
            <div className="p-3 bg-white/20 rounded-lg">
              <TrendingUp size={24} />
            </div>
            <div>
              <h3 className="font-medium">Analytics</h3>
              <p className="text-sm text-white/80">Track your progress</p>
            </div>
          </motion.div>
        </Link>
      </div>
      
      <CourseList />
      
      {/* Learning Path Section */}
      <div className="mt-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-2xl">Recommended Paths</h2>
          <Link href="/dashboard/courses" className="text-blue-600 hover:underline flex items-center">
            View all <ChevronRight size={16} />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
          >
            <div className="h-3 bg-gradient-to-r from-blue-500 to-purple-600"></div>
            <div className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
                  <GraduationCap size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg">AI Fundamentals</h3>
                  <p className="text-gray-600 text-sm">Learn the basics of artificial intelligence</p>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-6">
                <div className="text-sm">
                  <span className="font-bold text-lg">5</span>
                  <span className="text-gray-500 ml-1">Courses</span>
                </div>
                <div className="text-sm">
                  <span className="font-bold text-lg">32</span>
                  <span className="text-gray-500 ml-1">Hours</span>
                </div>
                <div className="text-sm">
                  <span className="font-bold text-lg">Beginner</span>
                </div>
              </div>
              <button className="w-full mt-4 bg-gray-50 hover:bg-gray-100 text-blue-600 py-2 rounded-lg font-medium transition-colors border border-gray-100 flex items-center justify-center gap-1">
                Explore Path <ChevronRight size={16} />
              </button>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
          >
            <div className="h-3 bg-gradient-to-r from-amber-500 to-orange-600"></div>
            <div className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-amber-100 text-amber-600 rounded-xl">
                  <Crown size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Advanced Data Science</h3>
                  <p className="text-gray-600 text-sm">Master statistical analysis and ML algorithms</p>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-6">
                <div className="text-sm">
                  <span className="font-bold text-lg">8</span>
                  <span className="text-gray-500 ml-1">Courses</span>
                </div>
                <div className="text-sm">
                  <span className="font-bold text-lg">56</span>
                  <span className="text-gray-500 ml-1">Hours</span>
                </div>
                <div className="text-sm">
                  <span className="font-bold text-lg">Advanced</span>
                </div>
              </div>
              <button className="w-full mt-4 bg-gray-50 hover:bg-gray-100 text-blue-600 py-2 rounded-lg font-medium transition-colors border border-gray-100 flex items-center justify-center gap-1">
                Explore Path <ChevronRight size={16} />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default Dashboard;
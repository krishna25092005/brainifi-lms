"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Filter, Search, GraduationCap, Star, Clock, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useUser } from "@clerk/nextjs";

export default function CoursesPage() {
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  
  // Sample courses data
  const sampleCourses = [
    {
      id: 1,
      title: "Introduction to Machine Learning",
      category: "Data Science",
      difficulty: "Intermediate",
      instructor: "Dr. Maya Johnson",
      progress: 65,
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2070&auto=format&fit=crop",
      rating: 4.8,
      estimatedTime: "12 hours"
    },
    {
      id: 2,
      title: "Advanced JavaScript Concepts",
      category: "Programming",
      difficulty: "Advanced",
      instructor: "Alex Wright",
      progress: 42,
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop",
      rating: 4.9,
      estimatedTime: "15 hours"
    },
    {
      id: 3,
      title: "Calculus for Data Science",
      category: "Mathematics",
      difficulty: "Advanced",
      instructor: "Prof. Sarah Chen",
      progress: 78,
      image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2070&auto=format&fit=crop",
      rating: 4.6,
      estimatedTime: "18 hours"
    },
    {
      id: 4,
      title: "Introduction to Python Programming",
      category: "Programming",
      difficulty: "Beginner",
      instructor: "James Wilson",
      progress: 92,
      image: "https://images.unsplash.com/photo-1649180556628-9ba704115795?q=80&w=2062&auto=format&fit=crop",
      rating: 4.7,
      estimatedTime: "10 hours"
    },
    {
      id: 5,
      title: "Web Development with React",
      category: "Web Development",
      difficulty: "Intermediate",
      instructor: "Emily Rodriguez",
      progress: 25,
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop",
      rating: 4.9,
      estimatedTime: "14 hours"
    },
    {
      id: 6,
      title: "Statistics for Data Analysis",
      category: "Data Science",
      difficulty: "Intermediate",
      instructor: "Dr. Michael Brown",
      progress: 15,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
      rating: 4.5,
      estimatedTime: "12 hours"
    }
  ];
  
  // Categories for filtering
  const categories = ['all', 'Programming', 'Data Science', 'Mathematics', 'Web Development'];
  
  useEffect(() => {
    // Simulate loading for demonstration
    const timer = setTimeout(() => {
      setCourses(sampleCourses);
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Filter courses based on search query and category
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'all' || course.category === filterCategory;
    return matchesSearch && matchesCategory;
  });
  
  if (loading) {
    return (
      <div className="h-[calc(100vh-180px)] flex items-center justify-center">
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 rounded-full border-4 border-t-blue-500 border-r-purple-500 border-b-green-500 border-l-amber-500 animate-spin"></div>
          <div className="absolute inset-3 rounded-full bg-white flex items-center justify-center">
            <BookOpen className="text-blue-600 h-8 w-8" />
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
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">My Courses</h1>
          <p className="text-gray-600 mt-1">Continue learning from where you left off</p>
        </div>
        <Link href="/create">
          <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center gap-2">
            <GraduationCap size={18} />
            New Course
          </button>
        </Link>
      </div>
      
      {/* Search and Filter Section */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search courses..." 
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="relative">
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 cursor-pointer bg-white">
            <Filter size={16} className="text-gray-500" />
            <select 
              className="appearance-none bg-transparent pr-8 focus:outline-none"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      {/* Courses Grid */}
      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <motion.div
              key={course.id}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-gray-100"
            >
              {/* Course Image */}
              <div className="relative h-40 w-full overflow-hidden">
                <img 
                  src={course.image} 
                  alt={course.title} 
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
                <div className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm px-2 py-1 rounded-md flex items-center text-sm">
                  <Star size={14} className="fill-yellow-400 text-yellow-400 mr-1" />
                  <span className="font-medium">{course.rating}</span>
                </div>
              </div>
              
              {/* Course Info */}
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                    course.difficulty === 'Beginner' ? 'bg-green-100 text-green-700' : 
                    course.difficulty === 'Intermediate' ? 'bg-blue-100 text-blue-700' : 
                    'bg-purple-100 text-purple-700'
                  }`}>
                    {course.difficulty}
                  </span>
                  <span className="text-xs text-gray-500 flex items-center">
                    <Clock size={12} className="mr-1" />
                    {course.estimatedTime}
                  </span>
                </div>
                
                <h3 className="font-bold text-lg mb-1 line-clamp-1">{course.title}</h3>
                <p className="text-sm text-gray-600 mb-3">by {course.instructor}</p>
                
                {/* Progress bar */}
                <div className="mb-3">
                  <div className="flex justify-between text-xs text-gray-600 mb-1">
                    <span>Progress</span>
                    <span>{course.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full" 
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </div>
                
                <Link href={`/course/${course.id}`}>
                  <button className="w-full mt-2 bg-gray-50 hover:bg-gray-100 text-blue-600 py-2 rounded-lg font-medium flex items-center justify-center gap-1 transition-colors border border-gray-100">
                    Continue Learning <ChevronRight size={16} />
                  </button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-xl shadow-sm">
          <div className="mx-auto w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center mb-4">
            <BookOpen size={32} className="text-blue-500" />
          </div>
          <h3 className="text-xl font-bold mb-2">No courses found</h3>
          <p className="text-gray-500 mb-6">Try adjusting your search or filter criteria</p>
          <button onClick={() => {setSearchQuery(''); setFilterCategory('all');}} className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors">
            Clear filters
          </button>
        </div>
      )}
    </motion.div>
  );
}

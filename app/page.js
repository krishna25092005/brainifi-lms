"use client";

import { SignInButton, UserButton } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { ArrowRight, ArrowUpRight, Brain, ChevronRight, Code, FileQuestion, Fingerprint, GraduationCap, MessageSquare, Moon, Star, Sun, User } from 'lucide-react';
import { useTheme } from "next-themes";

// Feature data
const features = [
  {
    name: "AI-powered Math Solver",
    description:
      "Get step-by-step solutions to any math problem instantly with our Gemini-powered MathAI assistant.",
    icon: Brain,
    color: "bg-gradient-to-r from-blue-500 to-indigo-600 shadow-blue-500/25",
  },
  {
    name: "Personalized Study Materials",
    description:
      "BrainiFi adapts to your learning style, creating customized notes, flashcards, and quizzes.",
    icon: FileQuestion,
    color: "bg-gradient-to-r from-purple-500 to-pink-500 shadow-purple-500/25",
  },
  {
    name: "Interactive Chat Interface",
    description:
      "Ask questions, get explanations, and deepen your understanding through natural conversations.",
    icon: MessageSquare,
    color: "bg-gradient-to-r from-green-400 to-teal-500 shadow-green-400/25",
  },
  {
    name: "Google Gemini Integration",
    description:
      "Powered by Google's advanced AI to provide the most accurate and helpful learning assistance.",
    icon: Code,
    color: "bg-gradient-to-r from-amber-500 to-orange-500 shadow-amber-500/25",
  },
];

// Testimonial data
const testimonials = [
  {
    content:
      "BrainiFi completely transformed how I study. The AI explanations are clear and I love how it adapts to my learning style.",
    author: "Alex Johnson",
    role: "Computer Science Student",
    avatar: "https://i.pravatar.cc/100?img=1",
    rating: 5,
  },
  {
    content:
      "The MathAI solver saved me countless hours. It doesn't just give answers - it explains concepts in ways I can understand.",
    author: "Priya Sharma",
    role: "Engineering Major",
    avatar: "https://i.pravatar.cc/100?img=5",
    rating: 5,
  },
  {
    content:
      "As a teacher, I recommend BrainiFi to all my students. It helps them practice and gain confidence in subjects they struggle with.",
    author: "Michael Rodriguez",
    role: "High School Teacher",
    avatar: "https://i.pravatar.cc/100?img=3",
    rating: 4,
  },
];

export default function Home() {
  const { isSignedIn, user } = useUser();
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  
  // Handle theme toggle
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };
  
  // Handle component mount to prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  return (
    <>
      {/* Navbar */}
      <header className="fixed w-full top-0 z-50 backdrop-blur-lg bg-white/80 dark:bg-gray-900/80 border-b border-gray-100 dark:border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                <GraduationCap className="text-white h-6 w-6" />
              </div>
              <span className="font-bold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                BrainiFi
              </span>
            </div>
            
            <nav className="hidden md:flex items-center gap-8">
              <Link href="#features" className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition">
                Features
              </Link>
              <Link href="#testimonials" className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition">
                Testimonials
              </Link>
              <Link href="#pricing" className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition">
                Pricing
              </Link>
              <Link href="#faq" className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition">
                FAQ
              </Link>
            </nav>
            
            <div className="flex items-center gap-4">
              {/* Theme Toggle Button */}
              {mounted && (
                <button 
                  onClick={toggleTheme}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  aria-label="Toggle theme"
                >
                  {theme === 'dark' ? <Sun className="text-gray-200" size={20} /> : <Moon size={20} />}
                </button>
              )}
              
              {isSignedIn ? (
                <div className="flex items-center gap-3">
                  <Link
                    href="/dashboard"
                    className="hidden sm:flex items-center gap-1 px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition"
                  >
                    Dashboard
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <UserButton afterSignOutUrl="/" />
                </div>
              ) : (
                <div>
                  <SignInButton mode="modal">
                    <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium px-4 sm:px-6 py-2 rounded-lg transition-all shadow-lg hover:shadow-blue-500/25">
                      Get Started
                    </button>
                  </SignInButton>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            <motion.div 
              className="lg:w-1/2" 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight text-gray-900 dark:text-white">
                Meet <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">BrainiFi</span>,<br />
                Your Smartest Learning Buddy
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-lg">
                AI-powered personalized learning that adapts to your style. Get instant help with any subject, anytime.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
                  <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium px-6 sm:px-8 py-3 rounded-lg transition-all shadow-lg hover:shadow-blue-500/25 flex items-center justify-center gap-2 w-full sm:w-auto">
                    Start Learning Now
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </Link>
                <Link href="#features">
                  <button className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 font-medium px-6 sm:px-8 py-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all shadow-sm flex items-center justify-center gap-2 w-full sm:w-auto">
                    Explore Features
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </Link>
              </div>
            </motion.div>
            
            <motion.div 
              className="lg:w-1/2"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur-lg opacity-20 animate-pulse"></div>
                <div className="relative bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-xl overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 py-2 px-4">
                    <div className="flex gap-1.5">
                      <div className="h-3 w-3 rounded-full bg-red-500"></div>
                      <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                      <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    </div>
                  </div>
                  <div className="p-4 sm:p-6">
                    <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 mb-4">
                      <p className="text-gray-800 dark:text-gray-100 font-medium">
                        How do I solve the quadratic equation x² + 5x + 6 = 0?
                      </p>
                    </div>
                    <div className="flex gap-3 mb-3">
                      <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                        B
                      </div>
                      <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg rounded-tl-none p-3 text-sm max-w-md">
                        <p className="text-gray-800 dark:text-gray-100">To solve x² + 5x + 6 = 0, I'll use factoring:</p>
                        <p className="mt-2 font-medium text-gray-800 dark:text-gray-100">Step 1: Find two numbers that multiply to give 6 and add up to 5.</p>
                        <p className="mt-1 text-gray-700 dark:text-gray-200">These numbers are 2 and 3 (2×3=6 and 2+3=5)</p>
                        <p className="mt-2 font-medium text-gray-800 dark:text-gray-100">Step 2: Rewrite the equation as factored expression.</p>
                        <p className="mt-1 text-gray-700 dark:text-gray-200">x² + 5x + 6 = 0</p>
                        <p className="mt-1 text-gray-700 dark:text-gray-200">x² + 2x + 3x + 6 = 0</p>
                        <p className="mt-1 text-gray-700 dark:text-gray-200">x(x + 2) + 3(x + 2) = 0</p>
                        <p className="mt-1 text-gray-700 dark:text-gray-200">(x + 3)(x + 2) = 0</p>
                        <p className="mt-2 font-medium text-gray-800 dark:text-gray-100">Step 3: Set each factor equal to zero and solve.</p>
                        <p className="mt-1 text-gray-700 dark:text-gray-200">x + 3 = 0 → x = -3</p>
                        <p className="mt-1 text-gray-700 dark:text-gray-200">x + 2 = 0 → x = -2</p>
                        <p className="mt-2 text-blue-600 dark:text-blue-400 font-semibold">The solutions are x = -3 and x = -2</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl mb-4"
            >
              Supercharge Your Learning
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-500 dark:text-gray-300 max-w-2xl mx-auto"
            >
              BrainiFi combines cutting-edge AI with proven learning methods to help you master any subject.
            </motion.p>
          </div>

          <motion.div 
            className="grid md:grid-cols-2 gap-6 md:gap-8 lg:gap-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.name}
                className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all overflow-hidden group hover:-translate-y-1"
                variants={itemVariants}
              >
                <div className="p-6 sm:p-8">
                  <div className={`${feature.color} h-12 w-12 rounded-lg shadow-lg mb-5 flex items-center justify-center text-white group-hover:scale-110 transition-transform`}>
                    <feature.icon size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{feature.name}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{feature.description}</p>
                  <Link 
                    href={isSignedIn ? "/dashboard" : "/sign-up"} 
                    className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 font-medium hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                  >
                    Try it out <ArrowUpRight size={16} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl mb-4"
            >
              Loved by Students & Teachers
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-500 dark:text-gray-300 max-w-2xl mx-auto"
            >
              Hear what our users have to say about their experience with BrainiFi.
            </motion.p>
          </div>

          <div className="max-w-4xl mx-auto px-4 sm:px-0">
            <motion.div 
              className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-6 sm:p-8 relative overflow-hidden"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-purple-600"></div>
              
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8">
                <div className="h-16 w-16 rounded-full overflow-hidden">
                  <img 
                    src={testimonials[activeTestimonial].avatar} 
                    alt={testimonials[activeTestimonial].author}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white">{testimonials[activeTestimonial].author}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{testimonials[activeTestimonial].role}</p>
                  <div className="flex gap-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-4 w-4 ${i < testimonials[activeTestimonial].rating ? 'text-amber-400 fill-amber-400' : 'text-gray-300 dark:text-gray-600'}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              
              <p className="text-gray-700 dark:text-gray-300 text-lg italic mb-8">
                "{testimonials[activeTestimonial].content}"
              </p>
              
              <div className="flex justify-center gap-2">
                {testimonials.map((_, index) => (
                  <button 
                    key={index}
                    onClick={() => setActiveTestimonial(index)}
                    className={`h-2 rounded-full transition-all ${
                      activeTestimonial === index 
                        ? 'w-8 bg-blue-600 dark:bg-blue-500' 
                        : 'w-2 bg-gray-300 dark:bg-gray-600'
                    }`}
                    aria-label={`Testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6"
            >
              Ready to transform your learning experience?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl opacity-90 mb-8 max-w-lg mx-auto px-4 sm:px-0"
            >
              Join thousands of students who are already studying smarter, not harder with BrainiFi.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
                <button className="bg-white text-blue-600 font-bold px-6 sm:px-8 py-3 rounded-lg hover:bg-blue-50 transition-all shadow-lg hover:shadow-blue-700/25">
                  Get Started Free
                </button>
              </Link>
              <p className="text-sm mt-3 opacity-80">No credit card required</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between gap-8">
            <div className="md:w-1/3">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                  <GraduationCap className="text-white h-6 w-6" />
                </div>
                <span className="font-bold text-2xl text-white">
                  BrainiFi
                </span>
              </div>
              <p className="text-gray-400 mb-6 max-w-sm">
                The smartest learning buddy powered by Google Gemini AI. Helping students master any subject with personalized assistance.
              </p>
              <div className="flex gap-4">
                <a href="https://www.linkedin.com/in/krishna-chauhan-hustler/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path>
                  </svg>
                </a>
                <a href="https://x.com/hustlercrishna" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="https://github.com/krishna25092005" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8 md:w-2/3">
              <div>
                <h3 className="font-medium text-white mb-4">Product</h3>
                <ul className="space-y-2">
                  <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                  <li><a href="#testimonials" className="hover:text-white transition-colors">Testimonials</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-medium text-white mb-4">Resources</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Tutorials</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
                </ul>
              </div>
              
              <div className="col-span-2 sm:col-span-1 mt-6 sm:mt-0">
                <h3 className="font-medium text-white mb-4">Company</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} BrainiFi. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}

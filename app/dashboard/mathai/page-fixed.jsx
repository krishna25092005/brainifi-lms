"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Brain, ChevronRight, Lightbulb, RotateCcw, Send, Sparkles } from 'lucide-react';

const mathSuggestions = [
  "Solve x² - 7x + 12 = 0",
  "Find the derivative of f(x) = x³ + 4x² - 2x + 7",
  "Calculate the integral of sin(x)cos(x)",
  "Find the limit of (x² - 1)/(x - 1) as x approaches 1"
];

// Gemini AI implementation
const genAI = async (query) => {
  try {
    const response = await fetch('/api/mathai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data.result;
  } catch (error) {
    console.error("Error calling MathAI API:", error);
    return "I encountered an error processing your request. Please try again.";
  }
};

export default function MathAiPage() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hello! I'm your BrainiFi Math AI assistant powered by Google Gemini. Ask me any math problem, and I'll help you solve it step by step!"
    }
  ]);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  const [showSuggestions, setShowSuggestions] = useState(true);

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!query.trim()) return;
    
    setShowSuggestions(false);
    
    // Add user message
    const userMessage = {
      role: 'user',
      content: query
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setQuery('');
    
    // Show typing indicator
    const response = await genAI(query);
    
    // Add AI response
    setMessages(prev => [
      ...prev,
      {
        role: 'assistant',
        content: response
      }
    ]);
    
    setIsLoading(false);
  };
  
  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    handleSubmit();
  };
  
  const clearChat = () => {
    setMessages([
      {
        role: 'assistant',
        content: "Hello! I'm your BrainiFi Math AI assistant powered by Google Gemini. Ask me any math problem, and I'll help you solve it step by step!"
      }
    ]);
    setShowSuggestions(true);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-180px)]">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-6 mb-6 bg-white dark:bg-gray-800 border border-purple-100 dark:border-gray-700 shadow-md rounded-xl"
      >
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center text-white shadow-lg h-14 w-14 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-purple-200 dark:shadow-purple-900/20">
            <Brain size={28} className="text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text">MathAI Assistant</h1>
            <p className="text-gray-500 dark:text-gray-300">Powered by Google Gemini | Solves any math problem step by step</p>
          </div>
          <button 
            onClick={clearChat}
            className="flex items-center gap-1 px-3 py-2 ml-auto text-sm text-gray-700 dark:text-gray-200 transition-colors bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600"
          >
            <RotateCcw size={14} /> Clear Chat
          </button>
        </div>
      </motion.div>
      
      {/* Chat Container */}
      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto mb-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-lg relative bg-[#f8fafc] dark:bg-gray-800 bg-opacity-80 backdrop-blur-md"
      >
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none bg-gradient-to-b from-blue-50/10 to-purple-50/10 dark:from-blue-900/5 dark:to-purple-900/5"></div>
        <div className="relative z-10 p-6 space-y-6">
          {/* Suggestions */}
          {showSuggestions && messages.length === 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mb-8"
            >
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb size={16} className="text-amber-500 dark:text-amber-400" />
                <p className="font-medium text-gray-700 dark:text-gray-200">Try asking one of these:</p>
              </div>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {mathSuggestions.map((suggestion, idx) => (
                  <motion.button
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + idx * 0.1 }}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="flex items-center p-3 text-left transition-colors bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-sm hover:bg-blue-50 dark:hover:bg-gray-600 group"
                  >
                    <span className="text-gray-700 dark:text-gray-200">{suggestion}</span>
                    <ChevronRight size={16} className="ml-auto text-gray-400 dark:text-gray-300 transition-colors group-hover:text-blue-500" />
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
          
          {/* Messages */}
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`
                ${message.role === 'assistant' ? 'flex items-start gap-3 max-w-[85%]' : 'max-w-[75%]'}
              `}>
                {message.role === 'assistant' && (
                  <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
                    <Brain size={16} className="text-white" />
                  </div>
                )}
                <div className={`
                  rounded-2xl p-4 shadow-sm 
                  ${message.role === 'user' 
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-br-none' 
                    : 'bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-bl-none'
                  }
                `}>
                  {message.role === 'assistant' && message.content.includes('step by step') && index === 0 && (
                    <div className="flex items-center gap-1 mb-1">
                      <Sparkles size={14} className="text-amber-400" />
                      <span className="text-xs font-medium text-amber-500 dark:text-amber-400">BrainiFi Math Assistant</span>
                    </div>
                  )}
                  <div className={`prose-sm prose whitespace-pre-wrap max-w-none ${message.role === 'assistant' ? 'text-gray-800 dark:text-gray-100' : ''}`}>
                    {message.content}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          
          {/* Loading indicator */}
          {isLoading && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start gap-3"
            >
              <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
                <Brain size={16} className="text-white" />
              </div>
              <div className="p-4 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-bl-none shadow-sm rounded-2xl">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-blue-400 dark:bg-blue-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-blue-500 dark:bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </motion.div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Form */}
      <motion.form 
        onSubmit={handleSubmit} 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex gap-3 p-2 bg-white dark:bg-gray-800 border border-purple-100 dark:border-gray-700 shadow-lg rounded-xl"
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask any math question... (e.g., 'Solve x² + 7x + 12 = 0')"
          className="flex-1 p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-500 dark:placeholder-gray-300"
          disabled={isLoading}
        />
        <button 
          type="submit"
          disabled={isLoading || !query.trim()}
          className="flex-shrink-0 p-4 text-white transition-all rounded-lg shadow-md bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-blue-500/25"
        >
          <Send size={20} />
        </button>
      </motion.form>
    </div>
  );
}

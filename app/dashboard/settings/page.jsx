"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useUser } from "@clerk/nextjs";
import { useTheme } from 'next-themes';
import { 
  Settings, Save, Bell, Sun, Moon, Laptop, 
  Clock, Globe, Eye, EyeOff, BookOpen, 
  BrainCircuit, Check, X, Sparkles, UserCog
} from 'lucide-react';

export default function SettingsPage() {
  const { user } = useUser();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState(null); // null, 'saving', 'success', 'error'
  
  // User preference states
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: true,
      courseUpdates: true,
      newFeatures: true,
      achievements: true,
    },
    appearance: {
      theme: 'system', // 'light', 'dark', 'system'
      fontSize: 'medium', // 'small', 'medium', 'large'
      animationsEnabled: true,
    },
    learning: {
      difficultyLevel: 'adaptive', // 'beginner', 'intermediate', 'advanced', 'adaptive'
      showHints: true,
      studyReminders: true,
      studySessionLength: 25, // in minutes
    },
    privacy: {
      shareProgress: true,
      showProfileActivity: true,
      allowDataCollection: true,
    }
  });

  // Update states when component mounts
  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => {
      // In a real application, we'd fetch user settings from an API
      // For now, let's simulate a delay in loading user preferences
      setLoading(false);
      
      // Update theme setting based on the current theme
      setSettings(prev => ({
        ...prev,
        appearance: {
          ...prev.appearance,
          theme: theme || 'system'
        }
      }));
    }, 800);
    
    return () => clearTimeout(timer);
  }, [theme]);

  // Handle settings changes
  const updateSetting = (category, setting, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: value
      }
    }));
  };

  // Handle theme change
  const handleThemeChange = (newTheme) => {
    updateSetting('appearance', 'theme', newTheme);
    setTheme(newTheme);
  };
  
  // Handle save settings
  const saveSettings = () => {
    setSaveStatus('saving');
    
    // Simulate API call
    setTimeout(() => {
      // In a real app, we would save to a database here
      setSaveStatus('success');
      
      // Reset status after showing success message
      setTimeout(() => {
        setSaveStatus(null);
      }, 2000);
    }, 1000);
  };
  
  // Display loading state
  if (!mounted || loading) {
    return (
      <div className="h-[calc(100vh-180px)] flex items-center justify-center">
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 rounded-full border-4 border-t-blue-500 border-r-purple-500 border-b-green-500 border-l-amber-500 animate-spin"></div>
          <div className="absolute inset-3 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center">
            <Settings className="text-blue-600 dark:text-blue-400 h-8 w-8" />
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
      className="max-w-6xl mx-auto space-y-8 pb-12"
    >
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
            <UserCog className="text-blue-600" size={28} />
            Account Settings
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Customize your learning experience
          </p>
        </div>
        
        {/* Save button */}
        <button
          onClick={saveSettings}
          disabled={saveStatus === 'saving'}
          className={`px-5 py-2 rounded-lg font-medium flex items-center gap-2 transition-all ${
            saveStatus === 'saving' 
              ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
              : saveStatus === 'success'
              ? 'bg-green-500 text-white'
              : saveStatus === 'error'
              ? 'bg-red-500 text-white'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {saveStatus === 'saving' ? (
            <>
              <div className="h-4 w-4 border-2 border-gray-600 border-t-transparent rounded-full animate-spin"></div>
              Saving...
            </>
          ) : saveStatus === 'success' ? (
            <>
              <Check size={18} />
              Saved!
            </>
          ) : saveStatus === 'error' ? (
            <>
              <X size={18} />
              Failed!
            </>
          ) : (
            <>
              <Save size={18} />
              Save Settings
            </>
          )}
        </button>
      </div>

      {/* Settings grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main settings panel - Takes 2/3 of the space */}
        <div className="lg:col-span-2 space-y-8">
          {/* Notifications Settings */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6"
          >
            <h2 className="text-lg font-semibold flex items-center gap-2 mb-6">
              <Bell className="text-amber-500" size={20} />
              Notification Preferences
            </h2>
            
            <div className="space-y-5">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">Email Notifications</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Receive important updates via email</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={settings.notifications.email} 
                    onChange={() => updateSetting('notifications', 'email', !settings.notifications.email)} 
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">Push Notifications</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Get real-time alerts on your device</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={settings.notifications.push} 
                    onChange={() => updateSetting('notifications', 'push', !settings.notifications.push)} 
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">Course Updates</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Notify when courses are updated</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={settings.notifications.courseUpdates} 
                    onChange={() => updateSetting('notifications', 'courseUpdates', !settings.notifications.courseUpdates)} 
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">New Features</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Get notified about new BrainiFi features</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={settings.notifications.newFeatures} 
                    onChange={() => updateSetting('notifications', 'newFeatures', !settings.notifications.newFeatures)} 
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">Achievements</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Celebrate when you earn achievements</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={settings.notifications.achievements} 
                    onChange={() => updateSetting('notifications', 'achievements', !settings.notifications.achievements)} 
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </motion.div>
          
          {/* Learning Preferences */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6"
          >
            <h2 className="text-lg font-semibold flex items-center gap-2 mb-6">
              <BrainCircuit className="text-purple-500" size={20} />
              Learning Preferences
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-2">Difficulty Level</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Set your preferred difficulty for new courses</p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {['beginner', 'intermediate', 'advanced', 'adaptive'].map(level => (
                    <button
                      key={level}
                      onClick={() => updateSetting('learning', 'difficultyLevel', level)}
                      className={`py-2 px-3 rounded-lg border ${
                        settings.learning.difficultyLevel === level
                          ? 'bg-blue-50 border-blue-500 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                          : 'border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700/50'
                      } transition-colors capitalize text-sm`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Study Session Length</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Set your preferred study session duration (minutes)</p>
                
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="5"
                    max="60"
                    step="5"
                    value={settings.learning.studySessionLength}
                    onChange={(e) => updateSetting('learning', 'studySessionLength', parseInt(e.target.value, 10))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                  />
                  <span className="text-lg font-bold min-w-[50px] text-center">
                    {settings.learning.studySessionLength}
                  </span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">Show Learning Hints</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Display hints when you're stuck</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={settings.learning.showHints} 
                    onChange={() => updateSetting('learning', 'showHints', !settings.learning.showHints)} 
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">Study Reminders</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Get reminders for scheduled study sessions</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={settings.learning.studyReminders} 
                    onChange={() => updateSetting('learning', 'studyReminders', !settings.learning.studyReminders)} 
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </motion.div>
          
          {/* Privacy Settings */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6"
          >
            <h2 className="text-lg font-semibold flex items-center gap-2 mb-6">
              <Eye className="text-green-500" size={20} />
              Privacy Settings
            </h2>
            
            <div className="space-y-5">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">Share Learning Progress</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Let others see your learning achievements</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={settings.privacy.shareProgress} 
                    onChange={() => updateSetting('privacy', 'shareProgress', !settings.privacy.shareProgress)} 
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">Show Activity in Profile</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Display recent learning activities in your profile</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={settings.privacy.showProfileActivity} 
                    onChange={() => updateSetting('privacy', 'showProfileActivity', !settings.privacy.showProfileActivity)} 
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">Allow Data Collection</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Help us improve by sharing anonymous usage data</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={settings.privacy.allowDataCollection} 
                    onChange={() => updateSetting('privacy', 'allowDataCollection', !settings.privacy.allowDataCollection)} 
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Right sidebar - Takes 1/3 of the space */}
        <div className="space-y-8">
          {/* Appearance Settings */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6"
          >
            <h2 className="text-lg font-semibold flex items-center gap-2 mb-6">
              <Sparkles className="text-amber-500" size={20} />
              Appearance
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-3">Theme</h3>
                
                <div className="grid grid-cols-3 gap-3">
                  <button
                    onClick={() => handleThemeChange('light')}
                    className={`aspect-video bg-gradient-to-br from-gray-100 to-gray-200 flex flex-col justify-center items-center rounded-lg p-2 border-2 ${
                      settings.appearance.theme === 'light' 
                        ? 'border-blue-500 shadow-sm' 
                        : 'border-transparent hover:border-gray-300'
                    }`}
                  >
                    <Sun size={20} className="text-amber-500 mb-2" />
                    <span className="text-xs font-medium text-gray-700">Light</span>
                  </button>
                  
                  <button
                    onClick={() => handleThemeChange('dark')}
                    className={`aspect-video bg-gradient-to-br from-gray-700 to-gray-900 flex flex-col justify-center items-center rounded-lg p-2 border-2 ${
                      settings.appearance.theme === 'dark' 
                        ? 'border-blue-500 shadow-sm' 
                        : 'border-transparent hover:border-gray-600'
                    }`}
                  >
                    <Moon size={20} className="text-gray-100 mb-2" />
                    <span className="text-xs font-medium text-gray-100">Dark</span>
                  </button>
                  
                  <button
                    onClick={() => handleThemeChange('system')}
                    className={`aspect-video bg-gradient-to-br from-blue-50 to-purple-50 flex flex-col justify-center items-center rounded-lg p-2 border-2 ${
                      settings.appearance.theme === 'system' 
                        ? 'border-blue-500 shadow-sm' 
                        : 'border-transparent hover:border-gray-300'
                    }`}
                  >
                    <Laptop size={20} className="text-blue-500 mb-2" />
                    <span className="text-xs font-medium text-gray-700">System</span>
                  </button>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-3">Font Size</h3>
                
                <div className="grid grid-cols-3 gap-3">
                  {['small', 'medium', 'large'].map(size => (
                    <button
                      key={size}
                      onClick={() => updateSetting('appearance', 'fontSize', size)}
                      className={`py-2 rounded-lg border ${
                        settings.appearance.fontSize === size
                          ? 'bg-blue-50 border-blue-500 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                          : 'border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700/50'
                      } transition-colors capitalize`}
                    >
                      {size === 'small' && 'Small'}
                      {size === 'medium' && 'Medium'}
                      {size === 'large' && 'Large'}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">Enable Animations</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Toggle UI animations</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={settings.appearance.animationsEnabled} 
                    onChange={() => updateSetting('appearance', 'animationsEnabled', !settings.appearance.animationsEnabled)} 
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </motion.div>
          
          {/* Connected Accounts */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6"
          >
            <h2 className="text-lg font-semibold mb-6">Connected Accounts</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="bg-[#4285F4] text-white p-1.5 rounded">
                    <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium">Google</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Connected</p>
                  </div>
                </div>
                <button className="text-sm text-red-500 hover:underline">Disconnect</button>
              </div>
              
              <div className="flex justify-between items-center p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="bg-[#1DA1F2] text-white p-1.5 rounded">
                    <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium">Twitter</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Not connected</p>
                  </div>
                </div>
                <button className="text-sm text-blue-500 hover:underline">Connect</button>
              </div>
              
              <div className="flex justify-between items-center p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="bg-[#4267B2] text-white p-1.5 rounded">
                    <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium">Facebook</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Not connected</p>
                  </div>
                </div>
                <button className="text-sm text-blue-500 hover:underline">Connect</button>
              </div>
            </div>
          </motion.div>
          
          {/* Account Management */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6"
          >
            <h2 className="text-lg font-semibold mb-6">Account Management</h2>
            
            <div className="space-y-4">
              <button className="w-full text-left px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <h3 className="font-medium">Download My Data</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">Export all your learning data</p>
              </button>
              
              <button className="w-full text-left px-4 py-3 border border-red-200 dark:border-red-900/50 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                <h3 className="font-medium">Delete Account</h3>
                <p className="text-xs text-red-500 dark:text-red-400">Permanently delete your account and all data</p>
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

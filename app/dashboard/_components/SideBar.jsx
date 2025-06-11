"use client"
import React from 'react'
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Brain, 
  UserCircle, 
  BookOpen, 
  Settings, 
  LogOut, 
  PlusCircle, 
  GraduationCap,
  BarChart,
  Sparkles
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

function SideBar() {
    const MenuList = [
        {
            name: 'Dashboard',
            icon: LayoutDashboard,
            path: '/dashboard',
        },
        {
            name: 'MathAI',
            icon: Brain,
            path: '/dashboard/mathai',
        },
        {
            name: 'Profile',
            icon: UserCircle,
            path: '/dashboard/profile',
        },
        {
            name: 'My Courses',
            icon: BookOpen,
            path: '/dashboard/courses',
        },
        {
            name: 'Analytics',
            icon: BarChart,
            path: '/dashboard/analytics',
        },
        {
            name: 'Settings',
            icon: Settings,
            path: '/dashboard/settings',
        }
    ]

    const path = usePathname();

  return (
    <div className="flex flex-col h-full p-6 bg-white dark:bg-gray-900 dark:text-gray-100">
      {/* Logo section */}
      <Link href="/" className="flex items-center gap-3 mb-10">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600">
          <GraduationCap className="text-white" size={24} />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">BrainiFi</h2>
      </Link>
      
      {/* Create new button */}
      <Link href='/create' className='w-full mb-8'>
        <button className="flex items-center justify-center w-full gap-2 py-3 font-medium text-white transition-all shadow-sm bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl hover:shadow-md">
          <PlusCircle size={18} />
          Create New Course
        </button>
      </Link>

      {/* Menu items */}
      <div className='space-y-1.5'>
        {MenuList.map((menu, index) => (
          <Link key={index} href={menu.path}>
            <motion.div
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 * index }}
              className={`flex gap-3 items-center p-3.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl cursor-pointer group transition-all ${
                path === menu.path 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' 
                  : 'text-gray-700 dark:text-gray-200'
              }`}
            >
                <menu.icon size={20} className={path === menu.path ? 'text-white' : 'text-gray-700 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400'} />
                <span className="font-medium">{menu.name}</span>
                {menu.path === '/dashboard/mathai' && (
                  <span className="ml-auto bg-amber-500/20 text-amber-600 text-xs px-2 py-0.5 rounded-full flex items-center">
                    <Sparkles size={10} className="mr-1" />
                    New
                  </span>
                )}
            </motion.div>
          </Link>
        ))}
      </div>

      {/* User section at bottom */}
      <div className="pt-6 mt-auto border-t border-gray-100 dark:border-gray-800">
        <button
          onClick={() => window.Clerk.signOut()}
          className="flex items-center w-full gap-3 p-3.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl cursor-pointer text-gray-700 dark:text-gray-200"
        >
          <LogOut size={20} />
          <span className="font-medium">Log Out</span>
        </button>
      </div>
    </div>
  )
}

export default SideBar
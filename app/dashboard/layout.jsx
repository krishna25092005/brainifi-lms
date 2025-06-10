import React from 'react'
import SideBar from './_components/SideBar'
import DashboardHeader from './_components/DashboardHeader'

function DashboardLayout({children}) {
  return (
    <div className='min-h-screen bg-gray-50 dark:bg-gray-900'>
      <div className='md:w-72 hidden md:block fixed h-full shadow-lg dark:shadow-gray-900 z-10'>
        <SideBar />
      </div>
      <div className='md:ml-72'>
        <DashboardHeader />
        <div className='p-6 md:p-10 max-w-[1500px] mx-auto'>
            {children}
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout
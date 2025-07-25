import React from 'react'
import DashboardHeader from '../dashboard/_components/DashboardHeader';

function CourseViewLayout({children}) {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <DashboardHeader />
      <div className="mx-10 md:mx-36 lg:px-60 mt-10">{children}</div>
    </div>
  );
}

export default CourseViewLayout
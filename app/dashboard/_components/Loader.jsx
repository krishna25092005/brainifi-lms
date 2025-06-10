import React from 'react'

function Loader() {
  return (
    <div className="flex items-center justify-center">
      <div className="relative h-5 w-5">
        <div className="absolute inset-0 rounded-full border-2 border-t-blue-500 border-r-transparent border-b-green-500 border-l-transparent animate-spin"></div>
      </div>
    </div>
  );
}

export default Loader
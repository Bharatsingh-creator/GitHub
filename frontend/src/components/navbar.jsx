import React from 'react'
import sidebar from '../assets/menu-burger.png'
import bell from '../assets/bell.png'
import logout from '../assets/user-logout.png'

const navbar = ({ onMenuClick }) => {
  return (
<div className='border-b p-3 border-gray-800 flex items-center justify-between gap-4 font-poppins bg-black '>
  
  
  <div className="shrink-0" onClick={onMenuClick}>
    <img 
      src={sidebar} 
      alt="sidebar" 
      className='invert w-6 md:w-8 lg:hidden h-auto cursor-pointer hover:opacity-80 transition-opacity' 
    />
  </div>

  
  <div className='flex-1 flex justify-center md:justify-start max-w-xl'>
    <input 
      type="text" 
      placeholder='Search anything...' 
      className='w-full border  border-gray-200 outline-0 rounded-xl bg-gray-50 p-2 px-4 focus:bg-white focus:ring-2 focus:ring-purple-600 transition-all text-sm' 
    />
  </div>

 
  <div className='flex items-center gap-3 md:gap-6 shrink-0 '>
    <button className="relative p-1 rounded-full transition-colors">
      <img src={bell} alt="notification" className='invert w-5 md:w-6 h-auto' />
    
      <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
    </button>
    
    <button className="flex items-center gap-2 p-1  rounded-lg transition-colors group">
      <img src={logout} alt="logout" className='invert w-5 md:w-6 h-auto group-hover:brightness-75' />
      <span className="hidden lg:block text-sm font-medium text-gray-600">Logout</span>
    </button>
  </div>

</div>
  )
}

export default navbar

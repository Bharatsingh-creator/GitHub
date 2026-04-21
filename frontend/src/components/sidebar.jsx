import React from 'react';
import { X } from 'lucide-react'; 

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <>
    
      <div 
        className={`fixed inset-0 bg-black/50  z-40 transition-opacity duration-300 lg:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none '}`}
        onClick={toggleSidebar}
      />

    
      <aside className={`fixed top-0 left-0  h-screen w-64 bg-black border-r border-gray-800 text-white z-50 transform transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        
        <div className="p-2 flex justify-between items-center  border-gray-800">
         <h1 className="text-xl md:text-lg lg:text-2xl font-extrabold text-center mt-2">
          <span className="text-[#64748B]"> &lt;</span>
          <span className="text-[#308cc5]">Dev</span>
          <span className="text-[#C1121F]">Sync</span>
          <span className="text-[#64748B]">/&gt;</span>
        </h1>
     
          <button onClick={toggleSidebar} className="lg:hidden p-1">
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="p-4 space-y-2 font-poppins">
          <a href="#" className="block p-3 rounded-lg hover:bg-purple-600 transition-colors">Dashboard</a>
          <a href="#" className="block p-3 rounded-lg hover:bg-purple-600 transition-colors">Chat</a>
          <a href="#" className="block p-3 rounded-lg hover:bg-purple-600 transition-colors">Tasks</a>
          <a href="#" className="block p-3 rounded-lg hover:bg-purple-600 transition-colors">Notes</a>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;

import React, { useState } from "react";
import Sidebar from "../components/sidebar";
import Navbar from "../components/navbar";

const Chats = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="flex min-h-screen bg-black w-full overflow-x-hidden">
      
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Section */}
      <div className="flex-1 flex flex-col min-h-screen bg-black">
        
        {/* Navbar */}
        <Navbar onMenuClick={toggleSidebar} />

        {/* Page Content */}
        <main className="p-4 md:p-6 text-white font-poppins">
          <h1 className="text-2xl font-bold">Chats</h1>
        </main>

      </div>
    </div>
  );
};

export default Chats;
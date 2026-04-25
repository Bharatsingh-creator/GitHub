import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [username, setUsername] = useState("User");

  useEffect(() => {
    const data = localStorage.getItem("user");
    if (data) {
      const storedUser = JSON.parse(data);
      if (storedUser?.name) {
        setUsername(storedUser.name.split(" ")[0]);
      }
    }
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
   
    <div className="flex min-h-screen bg-black w-full overflow-x-hidden">
      
      {/* Sidebar Component */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="flex-1 flex flex-col min-h-screen bg-black">
        {/* Navbar */}
        <Navbar onMenuClick={toggleSidebar} />

       
        <main className="p-4 md:p-6 text-white font-poppins flex flex-col h-auto md:h-[calc(100vh-64px)] overflow-y-auto min-h-fit">
          
          {/* Header Section */}
          <div className="shrink-0">
            <h5 className="text-2xl md:text-3xl font-bold">Welcome back, {username}! 👋</h5>
            <p className="text-gray-400 text-sm md:text-base">
              Here's what's happening with your team today.
            </p>
          </div>

          {/* Row 1: Stats Cards (Scrollable on mobile, fixed grid on desktop) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-4 shrink-0">
            <div className="h-32 bg-gray-900 rounded-xl border border-gray-800 p-4 font-bold hover:border-purple-500/50 transition-all cursor-pointer shadow-lg">
              <span className="text-gray-400 text-sm">Messages</span>
              <p className="text-2xl mt-2">234</p>
            </div>
            <div className="h-32 bg-gray-900 rounded-xl border border-gray-800 p-4 font-bold hover:border-blue-500/50 transition-all cursor-pointer shadow-lg">
              <span className="text-gray-400 text-sm">Tasks Done</span>
              <p className="text-2xl mt-2">47</p>
            </div>
            <div className="h-32 bg-gray-900 rounded-xl border border-gray-800 p-4 font-bold hover:border-indigo-500/50 transition-all cursor-pointer shadow-lg">
              <span className="text-gray-400 text-sm">Team Members</span>
              <p className="text-2xl mt-2">24</p>
            </div>
            <div className="h-32 bg-gray-900 rounded-xl border border-gray-800 p-4 font-bold hover:border-pink-500/50 transition-all cursor-pointer shadow-lg">
              <span className="text-gray-400 text-sm">Active Projects</span>
              <p className="text-2xl mt-2">12</p>
            </div>
          </div>

         
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 min-h-100 md:min-h-0 pb-6  md:pb-0">
            <div className="bg-gray-900 rounded-xl border border-gray-800 p-6 font-extrabold hover:border-gray-600 transition-all cursor-pointer flex flex-col shadow-xl">
              <h3 className="text-xl mb-4">Recent Activity</h3>
              <div className="flex-1 bg-black/20 rounded-lg border border-gray-800/50 border-dashed flex items-center justify-center">
                 <p className="text-gray-600 font-normal text-sm italic">No recent activity to show</p>
              </div>
            </div>
            
            <div className="bg-gray-900 rounded-xl border border-gray-800 p-6 font-extrabold hover:border-gray-600 transition-all cursor-pointer flex flex-col shadow-xl">
              <h3 className="text-xl mb-4">Upcoming This Week</h3>
              <div className="flex-1 bg-black/20 rounded-lg border border-gray-800/50 border-dashed flex items-center justify-center">
                 <p className="text-gray-600 font-normal text-sm italic">You're all caught up!</p>
              </div>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
};

export default Dashboard;
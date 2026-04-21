import React from "react";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import { useState } from "react";

const dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <div className="flex min-h-screen ">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-1 flex flex-col">
        <Navbar onMenuClick={toggleSidebar} />
        <main className="p-6 text-white font-poppins">
           <div className="grid grid-rows-3">
            <div className="grid grid-cols-4">

            </div>
           </div>
        </main>
      </div>
    </div>
  );
};

export default dashboard;

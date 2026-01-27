"use client";
import React, { useState } from "react";
import Header from "@/components/common/Header";
import Sidebar from "@/components/common/Sidebar";
import CalendarInteractive from "./components/CalendarInteractive";

export default function CalendarViewPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleMenuClick = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };
  return (
    <div className="min-h-screen bg-background">
      <Header onMenuClick={handleMenuClick} />
      <Sidebar isOpen={isSidebarOpen} onClose={handleCloseSidebar} />

      <main className="lg:ml-64 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <CalendarInteractive />
        </div>
      </main>
    </div>
  );
}

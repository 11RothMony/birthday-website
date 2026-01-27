"use client";

import React, { useState } from "react";
import Header from "@/components/common/Header";
import Sidebar from "@/components/common/Sidebar";
import DashboardInteractive from "./components/DashboardInteractive";

export default function DashboardHubClient() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleMenuClick = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <>
      <Header onMenuClick={handleMenuClick} />
      <Sidebar isOpen={isSidebarOpen} onClose={handleCloseSidebar} />
      <DashboardInteractive />
    </>
  );
}

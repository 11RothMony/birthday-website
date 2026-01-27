"use client";

import React, { useState } from "react";
import Header from "@/components/common/Header";
import Sidebar from "@/components/common/Sidebar";
import SettingsInteractive from "./components/SettingsInteractive";
export default function SettingsPanelPage() {
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
       <main className="lg:ml-64 pt-16">
        <SettingsInteractive />
      </main>
    </>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import CalendarHeader from "./CalendarHeader";
import CalendarFilters from "./CalendarFilters";
import CalendarLegend from "./CalendarLegend";
import DayView from "./DayView";
import WeekView from "./WeekView";
import MonthView from "./MonthView";
import YearView from "./YearView";
import CelebrationModal from "./CelebrationModal";
import QuickActions from "./QuickActions";
import mockData from "@/data/staff-mock-data.json";

interface Celebration {
  id: string;
  name: string;
  type: "Birthday" | "Work Anniversary" | "Milestone";
  date: string;
  time?: string;
  department: string;
  status: "Planned" | "In Progress" | "Completed";
  image: string;
  alt: string;
  notes?: string;
  cakeStatus?: string;
  giftStatus?: string;
}

const CalendarInteractive = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<"day" | "week" | "month" | "year">(
    "month",
  );
  const [selectedDepartment, setSelectedDepartment] =
    useState("All Departments");
  const [selectedCelebrationType, setSelectedCelebrationType] =
    useState("All Types");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [selectedCelebration, setSelectedCelebration] =
    useState<Celebration | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [celebrations, setCelebrations] = useState<Celebration[]>([]);

  useEffect(() => {
    setIsHydrated(true);

    // Load celebrations from staff mock data
    const mockCelebrations: Celebration[] = mockData.staff.map((staff) => ({
      id: staff.id,
      name: staff.name,
      type: "Birthday" as const,
      date: staff.birthday,
      time: "10:00", // Default time
      department: staff.department,
      status:
        staff.cakeStatus === "ordered"
          ? ("In Progress" as const)
          : ("Planned" as const),
      image: staff.image,
      alt: staff.alt,
      notes: staff.notes,
      cakeStatus: staff.cakeStatus || "Not Ordered",
      giftStatus: "Not Started",
    }));

    setCelebrations(mockCelebrations);
  }, []);

  if (!isHydrated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading calendar...</p>
        </div>
      </div>
    );
  }

  const handlePrevious = () => {
    const newDate = new Date(currentDate);
    switch (viewMode) {
      case "day":
        newDate.setDate(currentDate.getDate() - 1);
        break;
      case "week":
        newDate.setDate(currentDate.getDate() - 7);
        break;
      case "month":
        newDate.setMonth(currentDate.getMonth() - 1);
        break;
      case "year":
        newDate.setFullYear(currentDate.getFullYear() - 1);
        break;
    }
    setCurrentDate(newDate);
  };

  const handleNext = () => {
    const newDate = new Date(currentDate);
    switch (viewMode) {
      case "day":
        newDate.setDate(currentDate.getDate() + 1);
        break;
      case "week":
        newDate.setDate(currentDate.getDate() + 7);
        break;
      case "month":
        newDate.setMonth(currentDate.getMonth() + 1);
        break;
      case "year":
        newDate.setFullYear(currentDate.getFullYear() + 1);
        break;
    }
    setCurrentDate(newDate);
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const handleViewModeChange = (mode: "day" | "week" | "month" | "year") => {
    setViewMode(mode);
  };

  const handleResetFilters = () => {
    setSelectedDepartment("All Departments");
    setSelectedCelebrationType("All Types");
    setSelectedStatus("All Status");
  };

  const handleCelebrationClick = (celebration: Celebration) => {
    setSelectedCelebration(celebration);
    setIsModalOpen(true);
  };

  const handleStatusChange = (
    id: string,
    status: "Planned" | "In Progress" | "Completed",
  ) => {
    setCelebrations((prev) =>
      prev.map((cel) => (cel.id === id ? { ...cel, status } : cel)),
    );
    if (selectedCelebration && selectedCelebration.id === id) {
      setSelectedCelebration({ ...selectedCelebration, status });
    }
  };

  const handleDayClick = (date: Date) => {
    setCurrentDate(date);
    setViewMode("day");
  };

  const handleMonthClick = (month: number) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(month);
    setCurrentDate(newDate);
    setViewMode("month");
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(filteredCelebrations, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `celebrations-${currentDate.toISOString().split("T")[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleShare = () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      navigator.share({
        title: "BirthdayDesk Calendar",
        text: `Check out the celebrations calendar for ${currentDate.toLocaleDateString(
          "en-US",
          {
            month: "long",
            year: "numeric",
          },
        )}`,
        url: window.location.href,
      });
    } else {
      alert("Sharing is not supported on this device");
    }
  };

  const filteredCelebrations = celebrations.filter((cel) => {
    const departmentMatch =
      selectedDepartment === "All Departments" ||
      cel.department === selectedDepartment;
    const typeMatch =
      selectedCelebrationType === "All Types" ||
      cel.type === selectedCelebrationType;
    const statusMatch =
      selectedStatus === "All Status" || cel.status === selectedStatus;
    return departmentMatch && typeMatch && statusMatch;
  });

  const legendItems = [
    {
      color: "bg-primary",
      label: "Birthday",
      count: celebrations.filter((c) => c.type === "Birthday").length,
    },
    {
      color: "bg-secondary",
      label: "Work Anniversary",
      count: celebrations.filter((c) => c.type === "Work Anniversary").length,
    },
    {
      color: "bg-accent",
      label: "Milestone",
      count: celebrations.filter((c) => c.type === "Milestone").length,
    },
    {
      color: "bg-success",
      label: "Completed",
      count: celebrations.filter((c) => c.status === "Completed").length,
    },
    {
      color: "bg-warning",
      label: "In Progress",
      count: celebrations.filter((c) => c.status === "In Progress").length,
    },
    {
      color: "bg-muted",
      label: "Planned",
      count: celebrations.filter((c) => c.status === "Planned").length,
    },
  ];

  return (
    <div className="space-y-6">
      <CalendarHeader
        currentDate={currentDate}
        viewMode={viewMode}
        onViewModeChange={handleViewModeChange}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onToday={handleToday}
      />

      <CalendarFilters
        selectedDepartment={selectedDepartment}
        selectedCelebrationType={selectedCelebrationType}
        selectedStatus={selectedStatus}
        onDepartmentChange={setSelectedDepartment}
        onCelebrationTypeChange={setSelectedCelebrationType}
        onStatusChange={setSelectedStatus}
        onReset={handleResetFilters}
      />
      <QuickActions
        onPrint={handlePrint}
        onExport={handleExport}
        onShare={handleShare}
      />

      {viewMode === "day" && (
        <DayView
          celebrations={filteredCelebrations}
          currentDate={currentDate}
          onCelebrationClick={handleCelebrationClick}
        />
      )}

      {viewMode === "week" && (
        <WeekView
          celebrations={filteredCelebrations}
          currentDate={currentDate}
          onCelebrationClick={handleCelebrationClick}
        />
      )}

      {viewMode === "month" && (
        <MonthView
          celebrations={filteredCelebrations}
          currentDate={currentDate}
          onDayClick={handleDayClick}
        />
      )}

      {viewMode === "year" && (
        <YearView
          celebrations={filteredCelebrations}
          currentDate={currentDate}
          onMonthClick={handleMonthClick}
        />
      )}

      <CelebrationModal
        celebration={selectedCelebration}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onStatusChange={handleStatusChange}
      />
    </div>
  );
};

export default CalendarInteractive;

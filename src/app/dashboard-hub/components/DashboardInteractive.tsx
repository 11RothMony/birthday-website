"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import TodaysBirthdayCard from "./TodaysBirthdayCard";
import StatCard from "./StatCard";
import NotificationBanner from "./NotificationBanner";
import Icon from "@/components/ui/AppIcon";
import mockData from "@/data/staff-mock-data.json";

interface Birthday {
  id: number;
  name: string;
  department: string;
  image: string;
  alt: string;
  age: number;
  cakeStatus: "ordered" | "ready" | "delivered" | "not-ordered";
  preferences: string;
}

interface UpcomingCelebration {
  id: number;
  name: string;
  department: string;
  image: string;
  alt: string;
  date: string;
  daysUntil: number;
}

interface TimelineEvent {
  id: number;
  name: string;
  action: string;
  time: string;
  icon: string;
  color: "primary" | "trust" | "celebration" | "success";
}

const DashboardInteractive = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [showNotification, setShowNotification] = useState(true);
  const [todaysBirthdays, setTodaysBirthdays] = useState<Birthday[]>([]);
  const [upcomingCelebrations, setUpcomingCelebrations] = useState<
    UpcomingCelebration[]
  >([]);
  const [timelineEvents, setTimelineEvents] = useState<TimelineEvent[]>([]);

  // Helper function to check if birthday is this month
  const isBirthdayThisMonth = (birthdayString: string): boolean => {
    const today = new Date();
    const birthday = new Date(birthdayString);

    return birthday.getMonth() === today.getMonth();
  };

  // Helper function to calculate days until birthday
  const getDaysUntilBirthday = (birthdayString: string): number => {
    const today = new Date();
    const birthday = new Date(birthdayString);

    // Set birthday to current year
    birthday.setFullYear(today.getFullYear());

    // If birthday already passed this year, set to next year
    if (birthday < today) {
      birthday.setFullYear(today.getFullYear() + 1);
    }

    const diffTime = birthday.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays;
  };

  // Format date for display
  const formatDate = (birthdayString: string): string => {
    const date = new Date(birthdayString);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  useEffect(() => {
    setIsHydrated(true);

    // Filter staff with birthdays this month
    const birthdaysData: Birthday[] = mockData.staff
      .filter((staff) => isBirthdayThisMonth(staff.birthday))
      .map((staff) => ({
        id: parseInt(staff.id),
        name: staff.name,
        department: staff.department,
        image: staff.image,
        alt: staff.alt,
        age: staff.age,
        cakeStatus:
          (staff.cakeStatus as
            | "ordered"
            | "ready"
            | "delivered"
            | "not-ordered") || "not-ordered",
      }))
      .sort((a, b) => {
        const dateA = new Date(
          mockData.staff.find((s) => parseInt(s.id) === a.id)!.birthday,
        ).getDate();
        const dateB = new Date(
          mockData.staff.find((s) => parseInt(s.id) === b.id)!.birthday,
        ).getDate();
        return dateA - dateB;
      });

    // Filter upcoming birthdays (next 30 days, excluding today)
    const upcomingData: UpcomingCelebration[] = mockData.staff
      .filter((staff) => {
        const daysUntil = getDaysUntilBirthday(staff.birthday);
        return daysUntil > 0 && daysUntil <= 30;
      })
      .map((staff) => ({
        id: parseInt(staff.id),
        name: staff.name,
        department: staff.department,
        image: staff.image,
        alt: staff.alt,
        date: formatDate(staff.birthday),
        daysUntil: getDaysUntilBirthday(staff.birthday),
      }))
      .sort((a, b) => a.daysUntil - b.daysUntil)
      .slice(0, 4); // Show only first 4 upcoming

    // Generate timeline events based on today's birthdays
    const eventsData: TimelineEvent[] = birthdaysData.map((birthday, index) => {
      const statusMap: Record<
        string,
        {
          icon: string;
          color: "primary" | "trust" | "celebration" | "success";
          action: string;
        }
      > = {
        delivered: {
          icon: "CheckCircleIcon",
          color: "success",
          action: "cake delivered successfully",
        },
        ready: {
          icon: "ClockIcon",
          color: "trust",
          action: "cake is ready for pickup",
        },
        ordered: {
          icon: "SparklesIcon",
          color: "celebration",
          action: "cake order confirmed",
        },
        "not-ordered": {
          icon: "BellIcon",
          color: "primary",
          action: "birthday reminder sent",
        },
      };

      const status = statusMap[birthday.cakeStatus];
      const time = `${10 - index}:${30 - index * 15} AM`;

      return {
        id: birthday.id,
        name: birthday.name,
        action: status.action,
        time: time,
        icon: status.icon,
        color: status.color,
      };
    });

    setTodaysBirthdays(birthdaysData);
    setUpcomingCelebrations(upcomingData);
    setTimelineEvents(eventsData);
  }, []);

  const handleUpdateStatus = (
    id: number,
    status: "ordered" | "ready" | "delivered" | "not-ordered",
  ) => {
    setTodaysBirthdays((prev) =>
      prev.map((birthday) =>
        birthday.id === id ? { ...birthday, cakeStatus: status } : birthday,
      ),
    );
  };

  const handleQuickAction = (action: string) => {
    console.log(`Quick action: ${action}`);
  };

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background pt-16 lg:pl-64">
        <div className="p-6 space-y-6">
          <div className="h-8 bg-muted rounded w-48 animate-pulse" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-32 bg-card rounded-lg animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Calculate stats
  const thisWeekBirthdays = mockData.staff.filter((staff) => {
    const daysUntil = getDaysUntilBirthday(staff.birthday);
    return daysUntil >= 0 && daysUntil <= 7;
  }).length;

  const completedCelebrations = todaysBirthdays.filter(
    (b) => b.cakeStatus === "delivered",
  ).length;

  return (
    <div className="min-h-screen bg-background pt-16 lg:pl-64">
      <div className="p-4 lg:p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-heading font-semibold text-foreground mb-1">
              Dashboard Hub
            </h1>
            <p className="text-sm text-muted-foreground">
              Welcome back! Here's what's happening today
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
        </div>

        {/* Notification Banner */}
        {showNotification && todaysBirthdays.length > 0 && (
          <NotificationBanner
            type="info"
            message={`${todaysBirthdays.length} birthday${todaysBirthdays.length > 1 ? "s" : ""} this month! Don't forget to check cake delivery status.`}
            onDismiss={() => setShowNotification(false)}
          />
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 gap-4">
          <StatCard
            icon="CakeIcon"
            label="This Month"
            value={
              mockData.staff.filter((s) => {
                const month = new Date(s.birthday).getMonth();
                const currentMonth = new Date().getMonth();
                return month === currentMonth;
              }).length
            }
            color="celebration"
          />
          <StatCard
            icon="UsersIcon"
            label="Total Staff"
            value={mockData.staff.length}
            color="trust"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - This Month's Birthdays */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-card rounded-lg border border-border p-4 lg:p-6 shadow-warm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Icon
                    name="CakeIcon"
                    size={24}
                    className="text-celebration"
                  />
                  <h2 className="text-lg font-heading font-semibold text-foreground">
                    This Month's Birthdays
                  </h2>
                </div>
                <Link
                  href="/today-s-birthdays"
                  className="text-sm font-medium text-primary hover:underline"
                >
                  View All →
                </Link>
              </div>
              {todaysBirthdays.length === 0 ? (
                <div className="text-center py-8">
                  <Icon
                    name="CakeIcon"
                    size={48}
                    className="text-muted-foreground mx-auto mb-3"
                  />
                  <p className="text-foreground font-medium mb-1">
                    No birthdays this month
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Check upcoming celebrations
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {todaysBirthdays.map((birthday) => (
                    <TodaysBirthdayCard
                      key={birthday.id}
                      birthday={birthday}
                      onUpdateStatus={handleUpdateStatus}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardInteractive;

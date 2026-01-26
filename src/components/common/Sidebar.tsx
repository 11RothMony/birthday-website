"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Icon from "@/components/ui/AppIcon";
import mockData from "@/data/staff-mock-data.json";

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

interface NavItem {
  label: string;
  href: string;
  icon: string;
  badge?: string;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

const Sidebar = ({ isOpen = false, onClose }: SidebarProps) => {
  const pathname = usePathname();
  const [thisMonthCount, setThisMonthCount] = useState(0);
  const [celebrationProgress, setCelebrationProgress] = useState(0);

  useEffect(() => {
    // Get current month's birthdays
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    const thisMonthBirthdays = mockData.staff.filter((staff) => {
      const birthday = new Date(staff.birthday);
      return birthday.getMonth() === currentMonth;
    });

    setThisMonthCount(thisMonthBirthdays.length);

    // Calculate progress (how many have passed or are today)
    const today = new Date();
    const celebratedCount = thisMonthBirthdays.filter((staff) => {
      const birthday = new Date(staff.birthday);
      const thisYearBirthday = new Date(currentYear, birthday.getMonth(), birthday.getDate());
      return thisYearBirthday <= today;
    }).length;

    const progress =
      thisMonthBirthdays.length > 0
        ? Math.round((celebratedCount / thisMonthBirthdays.length) * 100)
        : 0;

    setCelebrationProgress(progress);
  }, []);

  const navSections: NavSection[] = [
    {
      title: "Main",
      items: [
        { label: "Dashboard", href: "/dashboard-hub", icon: "HomeIcon" },
        {
          label: "This Month's HBD",
          href: "/today-s-birthdays",
          icon: "CakeIcon",
          badge: thisMonthCount.toString(),
        },
      ],
    },
    {
      title: "Management",
      items: [
        {
          label: "Staff Directory",
          href: "/staff-directory",
          icon: "UsersIcon",
        },
        {
          label: "Calendar View",
          href: "/calendar-view",
          icon: "CalendarDaysIcon",
        },
      ],
    },
    {
      title: "Settings",
      items: [
        {
          label: "Settings Panel",
          href: "/settings-panel",
          icon: "Cog6ToothIcon",
        },
      ],
    },
  ];

  const isActive = (href: string) => pathname === href;

  const currentMonthName = new Date().toLocaleDateString("en-US", {
    month: "long",
  });

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && <div className="fixed inset-0 bg-background z-40 lg:hidden" onClick={onClose} />}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-16 bottom-0 w-64 bg-card border-r border-border z-50 transition-transform duration-300 lg:fixed ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Celebration Stats */}
          <div className="p-4 celebration-gradient rounded-lg m-4 relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-20 h-20 bg-celebration rounded-full blur-2xl animate-pulse" />
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-primary rounded-full blur-xl animate-pulse delay-1000" />
            </div>

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">{currentMonthName}</span>
                <Icon name="SparklesIcon" size={20} className="text-celebration animate-pulse" />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-heading font-semibold text-foreground">
                  {thisMonthCount}
                </span>
                <span className="text-sm text-muted-foreground">
                  celebration{thisMonthCount !== 1 ? "s" : ""}
                </span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto px-3 py-2">
            {navSections.map((section) => (
              <div key={section.title} className="mb-6">
                <h3 className="px-3 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  {section.title}
                </h3>
                <div className="space-y-1">
                  {section.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onClose}
                      className={`flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg transition-all duration-300 ${
                        isActive(item.href)
                          ? "bg-primary text-primary-foreground shadow-warm"
                          : "text-foreground hover:bg-muted"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon name={item.icon as any} size={20} />
                        <span className="text-sm font-medium">{item.label}</span>
                      </div>
                      {item.badge && (
                        <span
                          className={`flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-semibold rounded-full ${
                            parseInt(item.badge) > 0
                              ? "bg-celebration text-white animate-pulse"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </nav>

          {/* Quick Actions */}
          <div className="p-4 border-t border-border">
            <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-trust text-trust-foreground rounded-lg font-medium transition-all duration-300 hover:shadow-warm-lg hover:scale-105">
              <Icon name="PlusIcon" size={20} />
              <span className="text-sm">Add Birthday</span>
            </button>
          </div>

          {/* Help Section */}
          <div className="p-4 bg-muted/50 m-4 rounded-lg">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-premium/10 rounded-lg flex items-center justify-center">
                <Icon name="QuestionMarkCircleIcon" size={20} className="text-premium" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-1">Need Help?</h4>
                <p className="text-xs text-muted-foreground mb-2">Check our celebration guide</p>
                <button className="text-xs font-medium text-premium hover:underline">
                  View Guide →
                </button>
              </div>
            </div>
          </div>
        </div>
      </aside>

      <style jsx>{`
        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </>
  );
};

export default Sidebar;

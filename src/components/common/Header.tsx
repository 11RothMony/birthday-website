"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Icon from "@/components/ui/AppIcon";
import AppImage from "@/components/ui/AppImage";

interface HeaderProps {
  onMenuClick?: () => void;
}

interface NavItem {
  label: string;
  href: string;
  icon: string;
}

const Header = ({ onMenuClick }: HeaderProps) => {
  const pathname = usePathname();
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);

  const primaryNavItems: NavItem[] = [
    { label: "Dashboard", href: "/dashboard-hub", icon: "HomeIcon" },
    { label: "This Month's HBD", href: "/today-s-birthdays", icon: "CakeIcon" },
    { label: "Staff Directory", href: "/staff-directory", icon: "UsersIcon" },
    {
      label: "Calendar View",
      href: "/calendar-view",
      icon: "CalendarDaysIcon",
    },
    { label: "Settings", href: "/settings-panel", icon: "Cog6ToothIcon" },
  ];

  const secondaryNavItems: NavItem[] = [
    {
      label: "Calendar View",
      href: "/calendar-view",
      icon: "CalendarDaysIcon",
    },
    { label: "Settings", href: "/settings-panel", icon: "Cog6ToothIcon" },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card shadow-warm">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Mobile Menu Button */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors duration-300"
          aria-label="Toggle menu"
        >
          <Icon name="Bars3Icon" size={24} className="text-foreground" />
        </button>

        {/* Logo */}
        <Link href="/dashboard-hub" className="flex items-center group">
          <div className="relative">
            <AppImage src="images/logo2.png" alt="logo" className=" w-16 h-16object-cover" />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {primaryNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                isActive(item.href)
                  ? "bg-primary text-primary-foreground shadow-warm"
                  : "text-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <Icon name={item.icon as any} size={20} />
              <span className="text-sm">{item.label}</span>
            </Link>
          ))}

          {/* More Menu */}
          <div className="relative">
            <button
              onClick={() => setIsMoreMenuOpen(!isMoreMenuOpen)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-foreground hover:bg-muted transition-all duration-300"
            >
              <Icon name="EllipsisHorizontalIcon" size={20} />
              <span className="text-sm">More</span>
            </button>

            {isMoreMenuOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setIsMoreMenuOpen(false)} />
                <div className="absolute right-0 top-full mt-2 w-56 bg-popover rounded-lg shadow-warm-lg z-50 py-2">
                  {secondaryNavItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMoreMenuOpen(false)}
                      className={`flex items-center gap-3 px-4 py-2.5 transition-colors duration-300 ${
                        isActive(item.href)
                          ? "bg-primary/10 text-primary"
                          : "text-foreground hover:bg-muted"
                      }`}
                    >
                      <Icon name={item.icon as any} size={20} />
                      <span className="text-sm font-medium">{item.label}</span>
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>
        </nav>

        {/* User Profile */}
        <div className="flex items-center gap-3">
          <button className="relative p-2 rounded-lg hover:bg-muted transition-colors duration-300">
            <Icon name="BellIcon" size={24} className="text-foreground" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-celebration rounded-full animate-pulse-gentle" />
          </button>

          <div className="hidden sm:flex items-center gap-3 pl-3 border-l border-border">
            <div className="text-right">
              <p className="text-sm font-medium text-foreground">Thach_Bopha</p>
              <p className="text-xs text-muted-foreground">receptionist</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold">
              BP
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <nav className="lg:hidden border-t border-border bg-card">
        <div className="flex items-center justify-around py-2 px-2">
          {primaryNavItems.slice(0, 4).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all duration-300 ${
                isActive(item.href)
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon name={item.icon as any} size={20} />
              <span className="text-xs font-medium">{item.label.split(" ")[0]}</span>
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Header;

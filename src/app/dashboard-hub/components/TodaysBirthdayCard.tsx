"use client";

import React, { useState, useEffect } from "react";
import AppImage from "@/components/ui/AppImage";
import Icon from "@/components/ui/AppIcon";

interface Birthday {
  id: number;
  name: string;
  department: string;
  image: string;
  alt: string;
  age: number;

  cakeStatus: "ordered" | "ready" | "delivered";
  preferences: string;
}

interface TodaysBirthdayCardProps {
  birthday: Birthday;
  onUpdateStatus: (
    id: number,
    status: "ordered" | "ready" | "delivered",
  ) => void;
}

const TodaysBirthdayCard = ({
  birthday,
  onUpdateStatus,
}: TodaysBirthdayCardProps) => {
  const [isHydrated, setIsHydrated] = React.useState(false);

  React.useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Calculate age from year of birth
  const calculateAge = (yearOfBirth: number): number => {
    const currentYear = new Date().getFullYear();
    return currentYear - yearOfBirth;
  };

  const age = calculateAge(birthday.age);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ordered":
        return "bg-warning/10 text-warning border-warning/20";
      case "ready":
        return "bg-trust/10 text-trust border-trust/20";
      case "delivered":
        return "bg-success/10 text-success border-success/20";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "ordered":
        return "ClockIcon";
      case "ready":
        return "CheckCircleIcon";
      case "delivered":
        return "SparklesIcon";
      default:
        return "QuestionMarkCircleIcon";
    }
  };

  if (!isHydrated) {
    return (
      <div className="bg-card rounded-lg border border-border p-4 shadow-warm">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-full bg-muted animate-pulse" />
          <div className="flex-1 space-y-2">
            <div className="h-5 bg-muted rounded w-32 animate-pulse" />
            <div className="h-4 bg-muted rounded w-24 animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg border border-border p-4 shadow-warm hover:shadow-warm-lg transition-all duration-300">
      <div className="flex items-start gap-4">
        <div className="relative">
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary">
            <AppImage
              src={birthday.image}
              alt={birthday.alt}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -top-1 -right-1 w-6 h-6 bg-celebration rounded-full flex items-center justify-center">
            <Icon
              name="CakeIcon"
              size={14}
              className="text-celebration-foreground"
            />
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div>
              <h3 className="text-base font-semibold text-foreground truncate">
                {birthday.name}
              </h3>
              <p className="text-sm text-muted-foreground">
                {birthday.department}
              </p>
            </div>
            <span className="flex-shrink-0 px-2 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
              {age} years
            </span>
          </div>

          <div className="flex items-center gap-2 mb-3">
            <Icon
              name="InformationCircleIcon"
              size={16}
              className="text-muted-foreground"
            />
            <p className="text-xs text-muted-foreground">
              {birthday.preferences}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-foreground">
              Cake Status:
            </span>
            <button
              onClick={() => {
                const statuses: Array<"ordered" | "ready" | "delivered"> = [
                  "ordered",
                  "ready",
                  "delivered",
                ];
                const currentIndex = statuses.indexOf(birthday.cakeStatus);
                const nextStatus =
                  statuses[(currentIndex + 1) % statuses.length];
                onUpdateStatus(birthday.id, nextStatus);
              }}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border transition-all duration-300 hover:scale-105 ${getStatusColor(
                birthday.cakeStatus,
              )}`}
            >
              <Icon
                name={getStatusIcon(birthday.cakeStatus) as any}
                size={14}
              />
              <span className="capitalize">{birthday.cakeStatus}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodaysBirthdayCard;

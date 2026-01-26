import React from "react";

import AppImage from "@/components/ui/AppImage";

interface Celebration {
  id: string;
  name: string;
  type: "Birthday" | "Work Anniversary" | "Milestone";
  date: string;
  department: string;
  status: "Planned" | "In Progress" | "Completed";
  image: string;
  alt: string;
}

interface WeekViewProps {
  celebrations: Celebration[];
  currentDate: Date;
  onCelebrationClick: (celebration: Celebration) => void;
}

const WeekView = ({ celebrations, currentDate, onCelebrationClick }: WeekViewProps) => {
  const getWeekDays = () => {
    const days = [];
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());

    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      days.push(day);
    }
    return days;
  };

  const weekDays = getWeekDays();

  const getCelebrationsForDay = (date: Date) => {
    const dateStr = date.toISOString().split("T")[0];
    return celebrations.filter((cel) => cel.date === dateStr);
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-success/10 border-success";
      case "In Progress":
        return "bg-warning/10 border-warning";
      default:
        return "bg-primary/10 border-primary";
    }
  };

  return (
    <div className="bg-card rounded-lg shadow-warm overflow-hidden">
      <div className="overflow-x-auto">
        <div className="min-w-[800px]">
          <div className="grid grid-cols-7 border-b border-border">
            {weekDays.map((day, index) => (
              <div
                key={index}
                className={`p-4 text-center border-r border-border last:border-r-0 ${
                  isToday(day) ? "bg-primary/5" : ""
                }`}
              >
                <p className="text-xs font-medium text-muted-foreground uppercase">
                  {day.toLocaleDateString("en-US", { weekday: "short" })}
                </p>
                <p
                  className={`text-2xl font-semibold mt-1 ${
                    isToday(day) ? "text-primary" : "text-foreground"
                  }`}
                >
                  {day.getDate()}
                </p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7">
            {weekDays.map((day, index) => {
              const dayCelebrations = getCelebrationsForDay(day);
              return (
                <div
                  key={index}
                  className={`min-h-[400px] p-3 border-r border-border last:border-r-0 ${
                    isToday(day) ? "bg-primary/5" : ""
                  }`}
                >
                  <div className="space-y-2">
                    {dayCelebrations.map((celebration) => (
                      <button
                        key={celebration.id}
                        onClick={() => onCelebrationClick(celebration)}
                        className={`w-full flex flex-col gap-2 p-2 rounded-lg border-2 transition-all duration-300 hover:shadow-warm ${getStatusColor(
                          celebration.status
                        )}`}
                      >
                        <div className="w-8 h-8 rounded-full overflow-hidden mx-auto bg-background">
                          <AppImage
                            src={celebration.image}
                            alt={celebration.alt}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <p className="text-xs font-semibold text-foreground text-center line-clamp-2">
                          {celebration.name}
                        </p>
                        <p className="text-xs text-muted-foreground text-center">
                          {celebration.type}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeekView;

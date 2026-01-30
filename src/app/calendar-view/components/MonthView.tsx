import React from "react";

interface Celebration {
  id: string;
  name: string;
  type: "Birthday" | "Work Anniversary" | "Milestone";
  date: string;
  department: string;
  status: "Planned" | "In Progress" | "Completed";
}

interface MonthViewProps {
  celebrations: Celebration[];
  currentDate: Date;
  onDayClick: (date: Date) => void;
}

const MonthView = ({ celebrations, currentDate, onDayClick }: MonthViewProps) => {
  const getDaysInMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    return days;
  };

  const days = getDaysInMonth();
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const getCelebrationsForDay = (date: Date | null) => {
  if (!date) return [];
  
  const day = date.getDate();
  const month = date.getMonth(); // 0-indexed (0 = January)
  
  return celebrations.filter((cel) => {
    const celDate = new Date(cel.date);
    return celDate.getDate() === day && celDate.getMonth() === month;
  });
};

  const isToday = (date: Date | null) => {
    if (!date) return false;
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const getStatusDot = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-success";
      case "In Progress":
        return "bg-warning";
      default:
        return "bg-primary";
    }
  };

  return (
    <div className="bg-card rounded-lg shadow-warm overflow-hidden">
      <div className="grid grid-cols-7 border-b border-border">
        {weekDays.map((day) => (
          <div key={day} className="p-4 text-center border-r border-border last:border-r-0">
            <p className="text-sm font-semibold text-foreground">{day}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7">
        {days.map((day, index) => {
          const dayCelebrations = getCelebrationsForDay(day);
          const today = isToday(day);

          return (
            <button
              key={index}
              onClick={() => day && onDayClick(day)}
              disabled={!day}
              className={`min-h-[120px] p-2 border-r border-b border-border last:border-r-0 transition-all duration-300 ${
                day ? "hover:bg-muted/50 cursor-pointer" : "bg-muted/20 cursor-not-allowed"
              } ${today ? "bg-primary/5" : ""}`}
            >
              {day && (
                <div className="h-full flex flex-col">
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`text-sm font-semibold ${
                        today
                          ? "w-7 h-7 flex items-center justify-center rounded-full bg-primary text-primary-foreground"
                          : "text-foreground"
                      }`}
                    >
                      {day.getDate()}
                    </span>
                    {dayCelebrations.length > 0 && (
                      <span className="text-xs font-medium text-muted-foreground">
                        {dayCelebrations.length}
                      </span>
                    )}
                  </div>

                  <div className="flex-1 space-y-1">
                    {dayCelebrations.slice(0, 3).map((celebration) => (
                      <div key={celebration.id} className="flex items-center gap-1 text-left">
                        <div
                          className={`w-2 h-2 rounded-full flex-shrink-0 ${getStatusDot(celebration.status)}`}
                        />
                        <p className="text-xs text-foreground truncate flex-1">
                          {celebration.name}
                        </p>
                      </div>
                    ))}
                    {dayCelebrations.length > 3 && (
                      <p className="text-xs text-muted-foreground">
                        +{dayCelebrations.length - 3} more
                      </p>
                    )}
                  </div>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MonthView;

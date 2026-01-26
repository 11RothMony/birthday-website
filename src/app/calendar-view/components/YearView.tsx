import React from "react";

interface Celebration {
  id: string;
  date: string;
  status: "Planned" | "In Progress" | "Completed";
}

interface YearViewProps {
  celebrations: Celebration[];
  currentDate: Date;
  onMonthClick: (month: number) => void;
}

const YearView = ({ celebrations, currentDate, onMonthClick }: YearViewProps) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const getCelebrationsForMonth = (monthIndex: number) => {
    return celebrations.filter((cel) => {
      const celDate = new Date(cel.date);
      return (
        celDate.getMonth() === monthIndex && celDate.getFullYear() === currentDate.getFullYear()
      );
    });
  };

  const getMonthStats = (monthIndex: number) => {
    const monthCelebrations = getCelebrationsForMonth(monthIndex);
    return {
      total: monthCelebrations.length,
      completed: monthCelebrations.filter((c) => c.status === "Completed").length,
      inProgress: monthCelebrations.filter((c) => c.status === "In Progress").length,
      planned: monthCelebrations.filter((c) => c.status === "Planned").length,
    };
  };

  const getCurrentMonth = () => {
    const today = new Date();
    return today.getFullYear() === currentDate.getFullYear() ? today.getMonth() : -1;
  };

  const currentMonth = getCurrentMonth();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {months.map((month, index) => {
        const stats = getMonthStats(index);
        const isCurrentMonth = index === currentMonth;

        return (
          <button
            key={month}
            onClick={() => onMonthClick(index)}
            className={`bg-card rounded-lg shadow-warm p-6 transition-all duration-300 hover:shadow-warm-lg hover:scale-105 text-left ${
              isCurrentMonth ? "ring-2 ring-primary" : ""
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-heading font-semibold text-foreground">{month}</h3>
              {isCurrentMonth && (
                <span className="px-2 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
                  Current
                </span>
              )}
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total Events</span>
                <span className="text-2xl font-semibold text-foreground">{stats.total}</span>
              </div>

              {stats.total > 0 && (
                <>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full flex">
                      {stats.completed > 0 && (
                        <div
                          className="bg-success"
                          style={{
                            width: `${(stats.completed / stats.total) * 100}%`,
                          }}
                        />
                      )}
                      {stats.inProgress > 0 && (
                        <div
                          className="bg-warning"
                          style={{
                            width: `${(stats.inProgress / stats.total) * 100}%`,
                          }}
                        />
                      )}
                      {stats.planned > 0 && (
                        <div
                          className="bg-primary"
                          style={{
                            width: `${(stats.planned / stats.total) * 100}%`,
                          }}
                        />
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-success" />
                      <span className="text-muted-foreground">{stats.completed}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-warning" />
                      <span className="text-muted-foreground">{stats.inProgress}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <span className="text-muted-foreground">{stats.planned}</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default YearView;

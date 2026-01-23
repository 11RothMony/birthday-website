import React from "react";
import Icon from "@/components/ui/AppIcon";

interface CalendarHeaderProps {
  currentDate: Date;
  viewMode: "day" | "week" | "month" | "year";
  onViewModeChange: (mode: "day" | "week" | "month" | "year") => void;
  onPrevious: () => void;
  onNext: () => void;
  onToday: () => void;
}

const CalendarHeader = ({
  currentDate,
  viewMode,
  onViewModeChange,
  onPrevious,
  onNext,
  onToday,
}: CalendarHeaderProps) => {
  const formatTitle = () => {
    const options: Intl.DateTimeFormatOptions =
      viewMode === "year"
        ? { year: "numeric" }
        : viewMode === "month"
          ? { month: "long", year: "numeric" }
          : viewMode === "week"
            ? { month: "short", day: "numeric", year: "numeric" }
            : {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric",
              };

    return currentDate.toLocaleDateString("en-US", options);
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl lg:text-3xl font-heading font-semibold text-foreground">
          {formatTitle()}
        </h1>
        <button
          onClick={onToday}
          className="px-4 py-2 text-sm font-medium text-foreground bg-muted hover:bg-muted/80 rounded-lg transition-colors duration-300"
        >
          Today
        </button>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
          <button
            onClick={onPrevious}
            className="p-2 hover:bg-background rounded-md transition-colors duration-300"
            aria-label="Previous period"
          >
            <Icon
              name="ChevronLeftIcon"
              size={20}
              className="text-foreground"
            />
          </button>
          <button
            onClick={onNext}
            className="p-2 hover:bg-background rounded-md transition-colors duration-300"
            aria-label="Next period"
          >
            <Icon
              name="ChevronRightIcon"
              size={20}
              className="text-foreground"
            />
          </button>
        </div>

        <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
          {(["day", "week", "month", "year"] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => onViewModeChange(mode)}
              className={`px-3 py-2 text-sm font-medium rounded-md transition-all duration-300 ${
                viewMode === mode
                  ? "bg-primary text-primary-foreground shadow-warm"
                  : "text-foreground hover:bg-background"
              }`}
            >
              {mode.charAt(0).toUpperCase() + mode.slice(1)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CalendarHeader;

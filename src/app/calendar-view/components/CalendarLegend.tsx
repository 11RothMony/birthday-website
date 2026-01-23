import React from "react";

interface LegendItem {
  color: string;
  label: string;
  count: number;
}

interface CalendarLegendProps {
  items: LegendItem[];
}

const CalendarLegend = ({ items }: CalendarLegendProps) => {
  return (
    <div className="bg-card rounded-lg shadow-warm p-4 mb-6">
      <h3 className="text-sm font-semibold text-foreground mb-3">Legend</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className={`w-4 h-4 rounded ${item.color}`} />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-foreground truncate">
                {item.label}
              </p>
              <p className="text-xs text-muted-foreground">
                {item.count} events
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarLegend;

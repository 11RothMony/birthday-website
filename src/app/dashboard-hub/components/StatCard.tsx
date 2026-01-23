import React from "react";
import Icon from "@/components/ui/AppIcon";

interface StatCardProps {
  icon: string;
  label: string;
  value: string | number;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  color: "primary" | "trust" | "celebration" | "success";
}

const StatCard = ({ icon, label, value, trend, color }: StatCardProps) => {
  const colorClasses = {
    primary: "bg-primary/10 text-primary",
    trust: "bg-trust/10 text-trust",
    celebration: "bg-celebration/10 text-celebration",
    success: "bg-success/10 text-success",
  };

  return (
    <div className="bg-card rounded-lg border border-border p-4 shadow-warm">
      <div className="flex items-start justify-between mb-3">
        <div
          className={`w-10 h-10 rounded-lg ${colorClasses[color]} flex items-center justify-center`}
        >
          <Icon name={icon as any} size={20} />
        </div>
        {trend && (
          <div
            className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
              trend.isPositive
                ? "bg-success/10 text-success"
                : "bg-error/10 text-error"
            }`}
          >
            <Icon
              name={trend.isPositive ? "ArrowUpIcon" : "ArrowDownIcon"}
              size={12}
            />
            <span>{trend.value}</span>
          </div>
        )}
      </div>
      <div>
        <p className="text-2xl font-heading font-semibold text-foreground mb-1">
          {value}
        </p>
        <p className="text-sm text-muted-foreground">{label}</p>
      </div>
    </div>
  );
};

export default StatCard;

import React from "react";
import Icon from "@/components/ui/AppIcon";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: string;
  color: string;
  subtitle?: string;
}

const StatsCard = ({ title, value, icon, color, subtitle }: StatsCardProps) => {
  return (
    <div className="bg-card rounded-lg border border-border p-4 hover:shadow-warm transition-all duration-300">
      <div className="flex items-start justify-between mb-3">
        <div
          className={`w-10 h-10 rounded-lg ${color} flex items-center justify-center`}
        >
          <Icon
            name={icon as any}
            size={20}
            variant="solid"
            className="text-white"
          />
        </div>
      </div>
      <div>
        <p className="text-2xl font-heading font-semibold text-foreground mb-1">
          {value}
        </p>
        <p className="text-sm text-muted-foreground">{title}</p>
        {subtitle && (
          <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
        )}
      </div>
    </div>
  );
};

export default StatsCard;

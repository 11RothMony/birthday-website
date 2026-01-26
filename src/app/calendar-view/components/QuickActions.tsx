"use client";

import React from "react";
import Icon from "@/components/ui/AppIcon";

interface QuickActionsProps {
  onPrint: () => void;
  onExport: () => void;
  onShare: () => void;
}

const QuickActions = ({ onPrint, onExport, onShare }: QuickActionsProps) => {
  return (
    <div className="bg-card rounded-lg shadow-warm p-4 mb-6">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <h3 className="text-sm font-semibold text-foreground">Quick Actions</h3>
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={onPrint}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-foreground bg-muted hover:bg-muted/80 rounded-lg transition-colors duration-300"
          >
            <Icon name="PrinterIcon" size={16} />
            Print
          </button>
          <button
            onClick={onExport}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-foreground bg-muted hover:bg-muted/80 rounded-lg transition-colors duration-300"
          >
            <Icon name="ArrowDownTrayIcon" size={16} />
            Export
          </button>
          <button
            onClick={onShare}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-trust text-trust-foreground rounded-lg transition-all duration-300 hover:shadow-warm-lg"
          >
            <Icon name="ShareIcon" size={16} />
            Share
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;

"use client";

import React from "react";
import Icon from "@/components/ui/AppIcon";

interface QuickAction {
  id: number;
  label: string;
  icon: string;
  color: string;
  bgColor: string;
  action: string;
}

interface QuickActionsProps {
  onActionClick: (action: string) => void;
}

const QuickActions = ({ onActionClick }: QuickActionsProps) => {
  const actions: QuickAction[] = [
    {
      id: 1,
      label: "Send Team Alert",
      icon: "BellAlertIcon",
      color: "text-trust",
      bgColor: "bg-trust/10 hover:bg-trust/20",
      action: "send-alert",
    },
    {
      id: 2,
      label: "Order Cake",
      icon: "ShoppingCartIcon",
      color: "text-celebration",
      bgColor: "bg-celebration/10 hover:bg-celebration/20",
      action: "order-cake",
    },
    {
      id: 3,
      label: "Capture Photo",
      icon: "CameraIcon",
      color: "text-premium",
      bgColor: "bg-premium/10 hover:bg-premium/20",
      action: "capture-photo",
    },
    {
      id: 4,
      label: "Voice Note",
      icon: "MicrophoneIcon",
      color: "text-success",
      bgColor: "bg-success/10 hover:bg-success/20",
      action: "voice-note",
    },
  ];

  return (
    <div className="bg-card rounded-xl shadow-warm p-6 border border-border">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
          <Icon name="BoltIcon" size={20} className="text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-heading font-semibold text-foreground">
            Quick Actions
          </h3>
          <p className="text-sm text-muted-foreground">
            Fast celebration management
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {actions.map((action) => (
          <button
            key={action.id}
            onClick={() => onActionClick(action.action)}
            className={`flex flex-col items-center gap-3 p-4 rounded-lg border border-border transition-all duration-300 ${action.bgColor}`}
          >
            <div
              className={`w-12 h-12 rounded-full bg-background flex items-center justify-center ${action.color}`}
            >
              <Icon name={action.icon as any} size={24} />
            </div>
            <span className="text-sm font-medium text-foreground text-center">
              {action.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;

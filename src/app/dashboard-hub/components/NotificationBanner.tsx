"use client";

import React, { useState, useEffect } from "react";
import Icon from "@/components/ui/AppIcon";

interface NotificationBannerProps {
  type: "info" | "success" | "warning" | "error";
  message: string;
  onDismiss: () => void;
}

const NotificationBanner = ({
  type,
  message,
  onDismiss,
}: NotificationBannerProps) => {
  const [isHydrated, setIsHydrated] = React.useState(false);

  React.useEffect(() => {
    setIsHydrated(true);
  }, []);

  const typeConfig = {
    info: {
      bg: "bg-trust/10",
      border: "border-trust/20",
      text: "text-trust",
      icon: "InformationCircleIcon",
    },
    success: {
      bg: "bg-success/10",
      border: "border-success/20",
      text: "text-success",
      icon: "CheckCircleIcon",
    },
    warning: {
      bg: "bg-warning/10",
      border: "border-warning/20",
      text: "text-warning",
      icon: "ExclamationTriangleIcon",
    },
    error: {
      bg: "bg-error/10",
      border: "border-error/20",
      text: "text-error",
      icon: "XCircleIcon",
    },
  };

  const config = typeConfig[type];

  if (!isHydrated) {
    return null;
  }

  return (
    <div
      className={`${config.bg} ${config.border} border rounded-lg p-4 flex items-start gap-3`}
    >
      <Icon name={config.icon as any} size={20} className={config.text} />
      <p className={`flex-1 text-sm ${config.text} font-medium`}>{message}</p>
      <button
        onClick={onDismiss}
        className={`${config.text} hover:opacity-70 transition-opacity duration-300`}
        aria-label="Dismiss notification"
      >
        <Icon name="XMarkIcon" size={20} />
      </button>
    </div>
  );
};

export default NotificationBanner;

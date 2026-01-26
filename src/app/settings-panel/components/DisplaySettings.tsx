"use client";

import React, { useState, useEffect } from "react";
import Icon from "@/components/ui/AppIcon";

interface DisplayOption {
  id: string;
  label: string;
  description: string;
  value: string;
  options: { value: string; label: string }[];
  icon: string;
}

interface DisplaySettingsProps {
  onSave?: (settings: Record<string, string>) => void;
}

const DisplaySettings = ({ onSave }: DisplaySettingsProps) => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [settings, setSettings] = useState<Record<string, string>>({
    theme: "light",
    dateFormat: "MM/DD/YYYY",
    timeFormat: "12h",
    numberFormat: "US",
    fontSize: "medium",
    density: "comfortable",
  });

  const displayOptions: DisplayOption[] = [
    {
      id: "theme",
      label: "Theme",
      description: "Choose your preferred color scheme",
      value: settings.theme,
      options: [
        { value: "light", label: "Light" },
        { value: "dark", label: "Dark" },
        { value: "auto", label: "Auto (System)" },
      ],
      icon: "SunIcon",
    },
    {
      id: "dateFormat",
      label: "Date Format",
      description: "How dates are displayed throughout the app",
      value: settings.dateFormat,
      options: [
        { value: "MM/DD/YYYY", label: "MM/DD/YYYY (01/21/2026)" },
        { value: "DD/MM/YYYY", label: "DD/MM/YYYY (21/01/2026)" },
        { value: "YYYY-MM-DD", label: "YYYY-MM-DD (2026-01-21)" },
      ],
      icon: "CalendarIcon",
    },
    {
      id: "timeFormat",
      label: "Time Format",
      description: "Choose between 12-hour or 24-hour time",
      value: settings.timeFormat,
      options: [
        { value: "12h", label: "12-hour (2:30 PM)" },
        { value: "24h", label: "24-hour (14:30)" },
      ],
      icon: "ClockIcon",
    },
    {
      id: "numberFormat",
      label: "Number Format",
      description: "How numbers and currency are formatted",
      value: settings.numberFormat,
      options: [
        { value: "US", label: "US (1,000.00)" },
        { value: "EU", label: "EU (1.000,00)" },
        { value: "IN", label: "IN (1,00,000.00)" },
      ],
      icon: "HashtagIcon",
    },
    {
      id: "fontSize",
      label: "Font Size",
      description: "Adjust text size for better readability",
      value: settings.fontSize,
      options: [
        { value: "small", label: "Small" },
        { value: "medium", label: "Medium" },
        { value: "large", label: "Large" },
      ],
      icon: "AdjustmentsHorizontalIcon",
    },
    {
      id: "density",
      label: "Display Density",
      description: "Control spacing and information density",
      value: settings.density,
      options: [
        { value: "compact", label: "Compact" },
        { value: "comfortable", label: "Comfortable" },
        { value: "spacious", label: "Spacious" },
      ],
      icon: "Squares2X2Icon",
    },
  ];

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;

    const saved = localStorage.getItem("display-settings");
    if (saved) {
      setSettings(JSON.parse(saved));
    }
  }, [isHydrated]);

  const handleChange = (id: string, value: string) => {
    if (!isHydrated) return;

    const updated = { ...settings, [id]: value };
    setSettings(updated);
    localStorage.setItem("display-settings", JSON.stringify(updated));
    onSave?.(updated);
  };

  if (!isHydrated) {
    return (
      <div className="bg-card rounded-lg p-6 shadow-warm">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
            <div className="w-5 h-5 bg-secondary/20 rounded animate-pulse" />
          </div>
          <div>
            <div className="h-6 w-48 bg-muted rounded animate-pulse mb-2" />
            <div className="h-4 w-64 bg-muted rounded animate-pulse" />
          </div>
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 bg-muted rounded-lg animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg p-6 shadow-warm">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
          <Icon name="PaintBrushIcon" size={24} className="text-secondary" />
        </div>
        <div>
          <h2 className="text-xl font-heading font-semibold text-foreground">Display Options</h2>
          <p className="text-sm text-muted-foreground">Customize how information is displayed</p>
        </div>
      </div>

      <div className="space-y-6">
        {displayOptions.map((option) => (
          <div key={option.id} className="space-y-3">
            <div className="flex items-center gap-2">
              <Icon name={option.icon as any} size={18} className="text-foreground" />
              <div>
                <h3 className="text-sm font-semibold text-foreground">{option.label}</h3>
                <p className="text-xs text-muted-foreground">{option.description}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {option.options.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => handleChange(option.id, opt.value)}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                    settings[option.id] === opt.value
                      ? "bg-secondary text-secondary-foreground shadow-warm"
                      : "bg-muted/30 text-foreground hover:bg-muted/50"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-secondary/5 rounded-lg">
        <div className="flex items-start gap-3">
          <Icon name="SparklesIcon" size={20} className="text-secondary flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-1">Preview Changes</h3>
            <p className="text-xs text-muted-foreground mb-3">
              Changes are applied immediately. Refresh the page to see all updates.
            </p>
            <div className="flex items-center gap-4 text-xs">
              <span className="text-muted-foreground">Sample Date:</span>
              <span className="font-medium text-foreground">
                {settings.dateFormat === "MM/DD/YYYY" && "01/21/2026"}
                {settings.dateFormat === "DD/MM/YYYY" && "21/01/2026"}
                {settings.dateFormat === "YYYY-MM-DD" && "2026-01-21"}
              </span>
              <span className="text-muted-foreground">Sample Number:</span>
              <span className="font-medium text-foreground">
                {settings.numberFormat === "US" && "1,000.00"}
                {settings.numberFormat === "EU" && "1.000,00"}
                {settings.numberFormat === "IN" && "1,00,000.00"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplaySettings;

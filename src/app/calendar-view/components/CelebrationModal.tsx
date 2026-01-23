"use client";

import React from "react";
import Icon from "@/components/ui/AppIcon";
import AppImage from "@/components/ui/AppImage";

interface Celebration {
  id: string;
  name: string;
  type: "Birthday" | "Work Anniversary" | "Milestone";
  date: string;
  time?: string;
  department: string;
  status: "Planned" | "In Progress" | "Completed";
  image: string;
  alt: string;
  notes?: string;
  cakeStatus?: string;
  giftStatus?: string;
}

interface CelebrationModalProps {
  celebration: Celebration | null;
  isOpen: boolean;
  onClose: () => void;
  onStatusChange: (
    id: string,
    status: "Planned" | "In Progress" | "Completed",
  ) => void;
}

const CelebrationModal = ({
  celebration,
  isOpen,
  onClose,
  onStatusChange,
}: CelebrationModalProps) => {
  if (!isOpen || !celebration) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-success text-success-foreground";
      case "In Progress":
        return "bg-warning text-warning-foreground";
      default:
        return "bg-primary text-primary-foreground";
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
        onClick={onClose}
      />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-card rounded-lg shadow-warm-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-card border-b border-border p-6 flex items-center justify-between">
            <h2 className="text-2xl font-heading font-semibold text-foreground">
              Celebration Details
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-muted rounded-lg transition-colors duration-300"
              aria-label="Close modal"
            >
              <Icon name="XMarkIcon" size={24} className="text-foreground" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0 bg-muted">
                <AppImage
                  src={celebration.image}
                  alt={celebration.alt}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {celebration.name}
                </h3>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
                    {celebration.type}
                  </span>
                  <span className="px-3 py-1 bg-muted text-foreground text-sm font-medium rounded-full">
                    {celebration.department}
                  </span>
                  <span
                    className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(
                      celebration.status,
                    )}`}
                  >
                    {celebration.status}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                <Icon name="CalendarIcon" size={24} className="text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Date</p>
                  <p className="text-sm font-medium text-foreground">
                    {formatDate(celebration.date)}
                  </p>
                </div>
              </div>

              {celebration.time && (
                <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                  <Icon name="ClockIcon" size={24} className="text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Time</p>
                    <p className="text-sm font-medium text-foreground">
                      {celebration.time}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {(celebration.cakeStatus || celebration.giftStatus) && (
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-foreground">
                  Preparation Status
                </h4>
                {celebration.cakeStatus && (
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Icon
                        name="CakeIcon"
                        size={20}
                        className="text-celebration"
                      />
                      <span className="text-sm text-foreground">Cake</span>
                    </div>
                    <span className="text-sm font-medium text-foreground">
                      {celebration.cakeStatus}
                    </span>
                  </div>
                )}
                {celebration.giftStatus && (
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Icon
                        name="GiftIcon"
                        size={20}
                        className="text-celebration"
                      />
                      <span className="text-sm text-foreground">Gift</span>
                    </div>
                    <span className="text-sm font-medium text-foreground">
                      {celebration.giftStatus}
                    </span>
                  </div>
                )}
              </div>
            )}

            {celebration.notes && (
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-2">
                  Notes
                </h4>
                <p className="text-sm text-muted-foreground p-4 bg-muted/50 rounded-lg">
                  {celebration.notes}
                </p>
              </div>
            )}

            <div>
              <h4 className="text-sm font-semibold text-foreground mb-3">
                Update Status
              </h4>
              <div className="flex flex-wrap gap-2">
                {(["Planned", "In Progress", "Completed"] as const).map(
                  (status) => (
                    <button
                      key={status}
                      onClick={() => onStatusChange(celebration.id, status)}
                      className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                        celebration.status === status
                          ? getStatusColor(status)
                          : "bg-muted text-foreground hover:bg-muted/80"
                      }`}
                    >
                      {status}
                    </button>
                  ),
                )}
              </div>
            </div>
          </div>

          <div className="sticky bottom-0 bg-card border-t border-border p-6 flex items-center justify-end gap-3">
            <button
              onClick={onClose}
              className="px-6 py-2 text-sm font-medium text-foreground bg-muted hover:bg-muted/80 rounded-lg transition-colors duration-300"
            >
              Close
            </button>
            <button className="px-6 py-2 text-sm font-medium bg-trust text-trust-foreground rounded-lg transition-all duration-300 hover:shadow-warm-lg">
              Edit Details
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CelebrationModal;

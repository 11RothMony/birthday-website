"use client";

import React from "react";
import AppImage from "@/components/ui/AppImage";
import Icon from "@/components/ui/AppIcon";

interface StaffMember {
  id: string;
  name: string;
  department: string;
  position: string;
  birthday: string;
  image: string;
  alt: string;
}

interface StaffDetailsModalProps {
  staff: StaffMember | null;
  isOpen: boolean;
  onClose: () => void;
}

const StaffDetailsModal = ({ staff, isOpen, onClose }: StaffDetailsModalProps) => {
  if (!isOpen || !staff) return null;

  return (
    <>
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-card rounded-lg shadow-warm-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-card border-b border-border p-4 flex items-center justify-between">
            <h2 className="text-xl font-heading font-semibold text-foreground">Staff Details</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-muted rounded-lg transition-colors duration-300"
            >
              <Icon name="XMarkIcon" size={24} className="text-foreground" />
            </button>
          </div>

          <div className="p-6">
            <div className="flex items-start gap-6 mb-6">
              <div className="w-24 h-24 rounded-full overflow-hidden bg-muted flex-shrink-0">
                <AppImage
                  src={staff.image}
                  alt={staff.alt}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-heading font-semibold text-foreground mb-2">
                  {staff.name}
                </h3>
                <p className="text-base text-muted-foreground mb-1">{staff.position}</p>
                <p className="text-sm text-muted-foreground">{staff.department}</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Icon name="InformationCircleIcon" size={20} className="text-primary" />
                  Contact Information
                </h4>
                <div className="space-y-2 pl-7">
                  <div className="flex items-center gap-2">
                    <Icon name="EnvelopeIcon" size={16} className="text-muted-foreground" />
                    {/* <span className="text-sm text-foreground">{staff.email}</span> */}
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="PhoneIcon" size={16} className="text-muted-foreground" />
                    {/* <span className="text-sm text-foreground">{staff.phone}</span> */}
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="CalendarIcon" size={16} className="text-muted-foreground" />
                    <span className="text-sm text-foreground">
                      Birthday:{" "}
                      {new Date(staff.birthday).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Icon name="CakeIcon" size={20} className="text-celebration" />
                  Celebration Preferences
                </h4>
                <div className="space-y-3 pl-7">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Cake Preference</p>
                    <p className="text-sm text-foreground">
                     
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Gift Preference</p>
                    <p className="text-sm text-foreground">
                      
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Party Preference</p>
                    <p className="text-sm text-foreground">
                      
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StaffDetailsModal;

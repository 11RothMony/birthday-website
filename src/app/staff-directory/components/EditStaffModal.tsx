"use client";

import React, { useState, useEffect } from "react";
import Icon from "@/components/ui/AppIcon";

interface StaffMember {
  id: string;
  name: string;
  // email: string;
  // phone: string;
  department: string;
  position: string;
  birthday: string;
  image: string;
  alt: string;
}

interface EditStaffModalProps {
  staff: StaffMember | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (staff: StaffMember) => void;
}

const EditStaffModal = ({ staff, isOpen, onClose, onSave }: EditStaffModalProps) => {
  const [formData, setFormData] = useState<StaffMember | null>(null);

  useEffect(() => {
    if (staff) {
      setFormData({ ...staff });
    }
  }, [staff]);

  if (!isOpen || !formData) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => (prev ? { ...prev, [field]: value } : null));
  };

  const handlePreferenceChange = (field: string, value: string) => {
    setFormData((prev) =>
      prev
        ? {
            ...prev,
            celebrationPreferences: {
              [field]: value,
            },
          }
        : null
    );
  };

  return (
    <>
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-card rounded-lg shadow-warm-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-card border-b border-border p-4 flex items-center justify-between">
            <h2 className="text-xl font-heading font-semibold text-foreground">
              Edit Staff Member
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-muted rounded-lg transition-colors duration-300"
            >
              <Icon name="XMarkIcon" size={24} className="text-foreground" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className="w-full px-3 py-2 bg-background border border-input rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  required
                />
              </div>

              {/* <div>
                <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className="w-full px-3 py-2 bg-background border border-input rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  required
                />
              </div> */}

              {/* <div>
                <label className="block text-sm font-medium text-foreground mb-2">Phone</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  className="w-full px-3 py-2 bg-background border border-input rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  required
                />
              </div> */}

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Birthday</label>
                <input
                  type="date"
                  value={formData.birthday}
                  onChange={(e) => handleChange("birthday", e.target.value)}
                  className="w-full px-3 py-2 bg-background border border-input rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Department</label>
                <input
                  type="text"
                  value={formData.department}
                  onChange={(e) => handleChange("department", e.target.value)}
                  className="w-full px-3 py-2 bg-background border border-input rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Position</label>
                <input
                  type="text"
                  value={formData.position}
                  onChange={(e) => handleChange("position", e.target.value)}
                  className="w-full px-3 py-2 bg-background border border-input rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  required
                />
              </div>
            </div>
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 bg-muted text-foreground rounded-lg font-medium hover:bg-muted/80 transition-colors duration-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-trust text-trust-foreground rounded-lg font-medium hover:shadow-warm-lg transition-all duration-300"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditStaffModal;

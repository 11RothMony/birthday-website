import React from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface StaffMember {
  id: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  position: string;
  birthday: string;
  image: string;
  alt: string;
  dietaryRestrictions: string[];
  celebrationPreferences: {
    cakePreference: string;
    giftPreference: string;
    partyPreference: string;
  };
  notes: string;
}

interface StaffCardProps {
  staff: StaffMember;
  onEdit: (staff: StaffMember) => void;
  onView: (staff: StaffMember) => void;
}

const StaffCard = ({ staff, onEdit, onView }: StaffCardProps) => {
  const getBirthdayStatus = (birthday: string) => {
    const today = new Date();
    const birthDate = new Date(birthday);
    const daysUntil = Math.ceil((birthDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysUntil === 0) return { text: 'Today!', color: 'bg-celebration text-celebration-foreground' };
    if (daysUntil > 0 && daysUntil <= 7) return { text: `${daysUntil} days`, color: 'bg-warning text-warning-foreground' };
    if (daysUntil > 7 && daysUntil <= 30) return { text: `${daysUntil} days`, color: 'bg-trust text-trust-foreground' };
    return { text: 'Upcoming', color: 'bg-muted text-muted-foreground' };
  };

  const status = getBirthdayStatus(staff.birthday);

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden hover:shadow-warm-lg transition-all duration-300">
      <div className="p-4">
        <div className="flex items-start gap-4">
          <div className="relative flex-shrink-0">
            <div className="w-16 h-16 rounded-full overflow-hidden bg-muted">
              <AppImage
                src={staff.image}
                alt={staff.alt}
                className="w-full h-full object-cover"
              />
            </div>
            <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full ${status.color} flex items-center justify-center`}>
              <Icon name="CakeIcon" size={14} variant="solid" />
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-1">
              <h3 className="text-base font-semibold text-foreground truncate">{staff.name}</h3>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${status.color} whitespace-nowrap`}>
                {status.text}
              </span>
            </div>
            <p className="text-sm text-muted-foreground mb-1">{staff.position}</p>
            <p className="text-xs text-muted-foreground">{staff.department}</p>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-border space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <Icon name="CalendarIcon" size={16} className="text-muted-foreground" />
            <span className="text-foreground">{new Date(staff.birthday).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Icon name="EnvelopeIcon" size={16} className="text-muted-foreground" />
            <span className="text-foreground truncate">{staff.email}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Icon name="PhoneIcon" size={16} className="text-muted-foreground" />
            <span className="text-foreground">{staff.phone}</span>
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          <button
            onClick={() => onView(staff)}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:shadow-warm transition-all duration-300"
          >
            <Icon name="EyeIcon" size={16} />
            View Details
          </button>
          <button
            onClick={() => onEdit(staff)}
            className="flex items-center justify-center gap-2 px-3 py-2 bg-muted text-foreground rounded-lg text-sm font-medium hover:bg-muted/80 transition-all duration-300"
          >
            <Icon name="PencilIcon" size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default StaffCard;
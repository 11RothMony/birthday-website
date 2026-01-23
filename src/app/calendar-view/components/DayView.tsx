import React from 'react';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';

interface Celebration {
  id: string;
  name: string;
  type: 'Birthday' | 'Work Anniversary' | 'Milestone';
  time: string;
  department: string;
  status: 'Planned' | 'In Progress' | 'Completed';
  image: string;
  alt: string;
  notes?: string;
}

interface DayViewProps {
  celebrations: Celebration[];
  currentDate: Date;
  onCelebrationClick: (celebration: Celebration) => void;
}

const DayView = ({ celebrations, currentDate, onCelebrationClick }: DayViewProps) => {
  const hours = Array.from({ length: 24 }, (_, i) => i);

  const getCelebrationsForHour = (hour: number) => {
    return celebrations.filter((cel) => {
      const celHour = parseInt(cel.time.split(':')[0]);
      return celHour === hour;
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-success/10 border-success text-success';
      case 'In Progress':
        return 'bg-warning/10 border-warning text-warning';
      default:
        return 'bg-primary/10 border-primary text-primary';
    }
  };

  return (
    <div className="bg-card rounded-lg shadow-warm overflow-hidden">
      <div className="overflow-x-auto">
        <div className="min-w-[600px]">
          {hours.map((hour) => {
            const hourCelebrations = getCelebrationsForHour(hour);
            const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
            const period = hour < 12 ? 'AM' : 'PM';

            return (
              <div key={hour} className="flex border-b border-border last:border-b-0">
                <div className="w-24 flex-shrink-0 p-4 bg-muted/30 border-r border-border">
                  <p className="text-sm font-medium text-foreground">
                    {displayHour}:00 {period}
                  </p>
                </div>
                <div className="flex-1 p-4 min-h-[80px]">
                  {hourCelebrations.length > 0 ? (
                    <div className="space-y-2">
                      {hourCelebrations.map((celebration) => (
                        <button
                          key={celebration.id}
                          onClick={() => onCelebrationClick(celebration)}
                          className={`w-full flex items-center gap-3 p-3 rounded-lg border-2 transition-all duration-300 hover:shadow-warm ${getStatusColor(
                            celebration.status
                          )}`}
                        >
                          <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 bg-background">
                            <AppImage
                              src={celebration.image}
                              alt={celebration.alt}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 text-left min-w-0">
                            <p className="text-sm font-semibold text-foreground truncate">
                              {celebration.name}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs text-muted-foreground">
                                {celebration.type}
                              </span>
                              <span className="text-xs text-muted-foreground">•</span>
                              <span className="text-xs text-muted-foreground">
                                {celebration.department}
                              </span>
                            </div>
                          </div>
                          <Icon name="ChevronRightIcon" size={16} className="flex-shrink-0" />
                        </button>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground italic">No celebrations</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DayView;
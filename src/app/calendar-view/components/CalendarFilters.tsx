import React from 'react';
import Icon from '@/components/ui/AppIcon';

interface CalendarFiltersProps {
  selectedDepartment: string;
  selectedCelebrationType: string;
  selectedStatus: string;
  onDepartmentChange: (dept: string) => void;
  onCelebrationTypeChange: (type: string) => void;
  onStatusChange: (status: string) => void;
  onReset: () => void;
}

const CalendarFilters = ({
  selectedDepartment,
  selectedCelebrationType,
  selectedStatus,
  onDepartmentChange,
  onCelebrationTypeChange,
  onStatusChange,
  onReset,
}: CalendarFiltersProps) => {
  const departments = ['All Departments', 'Engineering', 'Marketing', 'Sales', 'HR', 'Operations'];
  const celebrationTypes = ['All Types', 'Birthday', 'Work Anniversary', 'Milestone'];
  const statuses = ['All Status', 'Planned', 'In Progress', 'Completed'];

  const hasActiveFilters = 
    selectedDepartment !== 'All Departments' ||
    selectedCelebrationType !== 'All Types' ||
    selectedStatus !== 'All Status';

  return (
    <div className="bg-card rounded-lg shadow-warm p-4 mb-6">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Icon name="FunnelIcon" size={20} className="text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">Filters</span>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
          <select
            value={selectedDepartment}
            onChange={(e) => onDepartmentChange(e.target.value)}
            className="px-4 py-2 bg-background border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
          >
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>

          <select
            value={selectedCelebrationType}
            onChange={(e) => onCelebrationTypeChange(e.target.value)}
            className="px-4 py-2 bg-background border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
          >
            {celebrationTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => onStatusChange(e.target.value)}
            className="px-4 py-2 bg-background border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
          >
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>

          {hasActiveFilters && (
            <button
              onClick={onReset}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-foreground bg-muted hover:bg-muted/80 rounded-lg transition-colors duration-300"
            >
              <Icon name="XMarkIcon" size={16} />
              Reset
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CalendarFilters;
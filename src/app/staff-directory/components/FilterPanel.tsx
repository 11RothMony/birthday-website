'use client';

import React from 'react';
import Icon from '@/components/ui/AppIcon';

interface FilterPanelProps {
  selectedDepartment: string;
  selectedMonth: string;
  onDepartmentChange: (value: string) => void;
  onMonthChange: (value: string) => void;
  onReset: () => void;
}

const FilterPanel = ({
  selectedDepartment,
  selectedMonth,
  onDepartmentChange,
  onMonthChange,
  onReset,
}: FilterPanelProps) => {
  const departments = [
    'All Departments',
    'Engineering',
    'Marketing',
    'Sales',
    'Human Resources',
    'Finance',
    'Operations',
    'Customer Support',
  ];

  const months = [
    'All Months',
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <Icon name="FunnelIcon" size={18} className="text-primary" />
          Filters
        </h3>
        <button onClick={onReset} className="text-xs text-trust hover:underline font-medium">
          Reset All
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-muted-foreground mb-2">Department</label>
          <select
            value={selectedDepartment}
            onChange={(e) => onDepartmentChange(e.target.value)}
            className="w-full px-3 py-2 bg-background border border-input rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-muted-foreground mb-2">
            Birthday Month
          </label>
          <select
            value={selectedMonth}
            onChange={(e) => onMonthChange(e.target.value)}
            className="w-full px-3 py-2 bg-background border border-input rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {months.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;

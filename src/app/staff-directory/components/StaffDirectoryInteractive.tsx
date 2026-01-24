'use client';

import React, { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';
import mockData from '@/data/staff-mock-data.json';
import StaffCard from './StaffCard';
import StaffDetailsModal from './StaffDetailsModal';
import EditStaffModal from './EditStaffModal';
import SearchBar from './SearchBar';
import FilterPanel from './FilterPanel';
import StatsCard from './StatsCard';

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

const StaffDirectoryInteractive = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [staffMembers, setStaffMembers] = useState<StaffMember[]>([]);
  const [filteredStaff, setFilteredStaff] = useState<StaffMember[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All Departments');
  const [selectedMonth, setSelectedMonth] = useState('All Months');
  const [selectedStaff, setSelectedStaff] = useState<StaffMember | null>(null);
  const [editingStaff, setEditingStaff] = useState<StaffMember | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [sortBy, setSortBy] = useState('name');

  useEffect(() => {
    setIsHydrated(true);

    const mockStaff: StaffMember[] = mockData.staff.map((staff) => ({
      id: staff.id,
      name: staff.name,
      email: staff.email,
      phone: staff.phone,
      department: staff.department,
      position: staff.position,
      birthday: staff.birthday,
      image: staff.image,
      alt: staff.alt,
      dietaryRestrictions: staff.dietaryRestrictions,
      notes: staff.notes,
    }));

    setStaffMembers(mockStaff);
    setFilteredStaff(mockStaff);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;

    let filtered = [...staffMembers];

    if (searchTerm) {
      filtered = filtered.filter(
        (staff) =>
          staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          staff.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
          staff.position.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedDepartment !== 'All Departments') {
      filtered = filtered.filter((staff) => staff.department === selectedDepartment);
    }

    if (selectedMonth !== 'All Months') {
      const monthIndex = [
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
      ].indexOf(selectedMonth);

      filtered = filtered.filter((staff) => {
        const birthMonth = new Date(staff.birthday).getMonth();
        return birthMonth === monthIndex;
      });
    }

    filtered.sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortBy === 'birthday') {
        return new Date(a.birthday).getTime() - new Date(b.birthday).getTime();
      } else if (sortBy === 'department') {
        return a.department.localeCompare(b.department);
      }
      return 0;
    });

    setFilteredStaff(filtered);
  }, [searchTerm, selectedDepartment, selectedMonth, sortBy, staffMembers, isHydrated]);

  const handleViewDetails = (staff: StaffMember) => {
    setSelectedStaff(staff);
    setIsDetailsModalOpen(true);
  };

  const handleEdit = (staff: StaffMember) => {
    setEditingStaff(staff);
    setIsEditModalOpen(true);
  };

  const handleSave = (updatedStaff: StaffMember) => {
    setStaffMembers((prev) =>
      prev.map((staff) => (staff.id === updatedStaff.id ? updatedStaff : staff))
    );
  };

  const handleResetFilters = () => {
    setSelectedDepartment('All Departments');
    setSelectedMonth('All Months');
    setSearchTerm('');
  };

  const handleExportData = () => {
    const dataStr = JSON.stringify(staffMembers, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'staff-directory-export.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-12 bg-muted rounded-lg w-1/3" />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-32 bg-muted rounded-lg" />
              ))}
            </div>
            <div className="h-96 bg-muted rounded-lg" />
          </div>
        </div>
      </div>
    );
  }

  const upcomingBirthdays = staffMembers.filter((staff) => {
    const today = new Date();
    const birthday = new Date(staff.birthday);
    const daysUntil = Math.ceil((birthday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return daysUntil >= 0 && daysUntil <= 30;
  }).length;

  const thisMonthBirthdays = staffMembers.filter((staff) => {
    const today = new Date();
    const birthday = new Date(staff.birthday);
    return birthday.getMonth() === today.getMonth();
  }).length;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-3xl font-heading font-semibold text-foreground">Staff Directory</h1>
            <button
              onClick={handleExportData}
              className="flex items-center gap-2 px-4 py-2 bg-trust text-trust-foreground rounded-lg font-medium hover:shadow-warm-lg transition-all duration-300"
            >
              <Icon name="ArrowDownTrayIcon" size={20} />
              Export Data
            </button>
          </div>
          <p className="text-muted-foreground">
            Manage staff birthdays and celebration preferences
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatsCard
            title="Total Staff"
            value={staffMembers.length}
            icon="UsersIcon"
            color="bg-primary"
          />
          <StatsCard
            title="This Month"
            value={thisMonthBirthdays}
            icon="CakeIcon"
            color="bg-celebration"
            subtitle="birthdays"
          />
          <StatsCard
            title="Next 30 Days"
            value={upcomingBirthdays}
            icon="CalendarIcon"
            color="bg-trust"
            subtitle="upcoming"
          />
          <StatsCard
            title="Departments"
            value={new Set(staffMembers.map((s) => s.department)).size}
            icon="BuildingOfficeIcon"
            color="bg-premium"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
          <div className="lg:col-span-1">
            <FilterPanel
              selectedDepartment={selectedDepartment}
              selectedMonth={selectedMonth}
              onDepartmentChange={setSelectedDepartment}
              onMonthChange={setSelectedMonth}
              onReset={handleResetFilters}
            />
          </div>

          <div className="lg:col-span-3 space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 bg-background border border-input rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="name">Sort by Name</option>
                <option value="birthday">Sort by Birthday</option>
                <option value="department">Sort by Department</option>
              </select>
            </div>

            <div className="bg-card rounded-lg border border-border p-4">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-muted-foreground">
                  Showing {filteredStaff.length} of {staffMembers.length} staff members
                </p>
              </div>

              {filteredStaff.length === 0 ? (
                <div className="text-center py-12">
                  <Icon
                    name="UserGroupIcon"
                    size={48}
                    className="text-muted-foreground mx-auto mb-4"
                  />
                  <p className="text-foreground font-medium mb-2">No staff members found</p>
                  <p className="text-sm text-muted-foreground">
                    Try adjusting your search or filters
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {filteredStaff.map((staff) => (
                    <StaffCard
                      key={staff.id}
                      staff={staff}
                      onEdit={handleEdit}
                      onView={handleViewDetails}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <StaffDetailsModal
        staff={selectedStaff}
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
      />

      <EditStaffModal
        staff={editingStaff}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSave}
      />
    </div>
  );
};

export default StaffDirectoryInteractive;

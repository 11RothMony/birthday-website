'use client';

import React, { useState } from 'react';
import NotificationSettings from './NotificationSettings';
import DisplaySettings from './DisplaySettings';
import Icon from '@/components/ui/AppIcon';

const SettingsInteractive = () => {
  const [activeTab, setActiveTab] = useState<
    'notifications' | 'display' | 'data' | 'accessibility'
  >('notifications');
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);

  const tabs = [
    { id: 'notifications' as const, label: 'Notifications', icon: 'BellIcon' },
    { id: 'display' as const, label: 'Display', icon: 'PaintBrushIcon' },
  ];

  const handleSave = () => {
    setShowSaveSuccess(true);
    setTimeout(() => setShowSaveSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="Cog6ToothIcon" size={28} className="text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-heading font-semibold text-foreground">Settings</h1>
              <p className="text-sm text-muted-foreground">
                Customize your BirthdayDesk experience
              </p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6 border-b border-border overflow-x-auto">
          <div className="flex gap-1 min-w-max">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 font-medium transition-all duration-300 border-b-2 ${
                  activeTab === tab.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
                }`}
              >
                <Icon name={tab.icon as any} size={20} />
                <span className="text-sm">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="space-y-6">
          {activeTab === 'notifications' && <NotificationSettings onSave={handleSave} />}
          {activeTab === 'display' && <DisplaySettings onSave={handleSave} />}
        </div>

        {/* Success Toast */}
        {showSaveSuccess && (
          <div className="fixed bottom-6 right-6 z-50 animate-slide-up">
            <div className="bg-success text-success-foreground px-6 py-4 rounded-lg shadow-warm-lg flex items-center gap-3">
              <Icon name="CheckCircleIcon" size={24} />
              <div>
                <p className="font-semibold text-sm">Settings Saved</p>
                <p className="text-xs opacity-90">Your preferences have been updated</p>
              </div>
            </div>
          </div>
        )}

        {/* Help Section */}
        <div className="mt-8 bg-card rounded-lg p-6 shadow-warm">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-trust/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Icon name="QuestionMarkCircleIcon" size={28} className="text-trust" />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-heading font-semibold text-foreground mb-2">
                Need Help?
              </h2>
              <p className="text-sm text-muted-foreground mb-4">
                If you have questions about any settings or need assistance, check out our help
                resources or contact support.
              </p>
              <div className="flex flex-wrap gap-3">
                <button className="px-4 py-2 bg-trust text-trust-foreground rounded-lg text-sm font-medium hover:shadow-warm transition-all duration-300">
                  View Help Guide
                </button>
                <button className="px-4 py-2 bg-muted text-foreground rounded-lg text-sm font-medium hover:bg-muted/80 transition-colors duration-300">
                  Contact Support
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Tips */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 bg-primary/5 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Icon name="LightBulbIcon" size={20} className="text-primary" />
              <h3 className="text-sm font-semibold text-foreground">Pro Tip</h3>
            </div>
            <p className="text-xs text-muted-foreground">
              Enable browser notifications to never miss a birthday celebration
            </p>
          </div>
          <div className="p-4 bg-celebration/5 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Icon name="ShieldCheckIcon" size={20} className="text-celebration" />
              <h3 className="text-sm font-semibold text-foreground">Data Safety</h3>
            </div>
            <p className="text-xs text-muted-foreground">
              Regular backups ensure your celebration data is always safe
            </p>
          </div>
          <div className="p-4 bg-secondary/5 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Icon name="SparklesIcon" size={20} className="text-secondary" />
              <h3 className="text-sm font-semibold text-foreground">Customization</h3>
            </div>
            <p className="text-xs text-muted-foreground">
              Adjust display settings to match your workflow preferences
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsInteractive;

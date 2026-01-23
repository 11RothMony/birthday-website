'use client';

import React, { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

interface NotificationPreference {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
  icon: string;
}

interface NotificationSettingsProps {
  onSave?: (preferences: NotificationPreference[]) => void;
}

const NotificationSettings = ({ onSave }: NotificationSettingsProps) => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [preferences, setPreferences] = useState<NotificationPreference[]>([
    {
      id: 'birthday-today',
      label: 'Today\'s Birthdays',
      description: 'Get notified when you open the dashboard about today\'s celebrations',
      enabled: true,
      icon: 'CakeIcon'
    },
    {
      id: 'birthday-upcoming',
      label: 'Upcoming Birthdays',
      description: 'Receive reminders 3 days before upcoming birthdays',
      enabled: true,
      icon: 'CalendarIcon'
    },
    {
      id: 'cake-reminder',
      label: 'Cake Preparation',
      description: 'Reminders to order or prepare birthday cakes',
      enabled: true,
      icon: 'BellAlertIcon'
    },
    {
      id: 'celebration-complete',
      label: 'Celebration Completion',
      description: 'Prompt to mark celebrations as complete',
      enabled: false,
      icon: 'CheckCircleIcon'
    },
    {
      id: 'weekly-summary',
      label: 'Weekly Summary',
      description: 'Get a summary of upcoming celebrations every Monday',
      enabled: true,
      icon: 'DocumentTextIcon'
    }
  ]);

  const [browserNotifications, setBrowserNotifications] = useState<'granted' | 'denied' | 'default'>('default');

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;

    const saved = localStorage.getItem('notification-preferences');
    if (saved) {
      setPreferences(JSON.parse(saved));
    }

    if ('Notification' in window) {
      setBrowserNotifications(Notification.permission);
    }
  }, [isHydrated]);

  const handleToggle = (id: string) => {
    if (!isHydrated) return;

    const updated = preferences.map(pref =>
      pref.id === id ? { ...pref, enabled: !pref.enabled } : pref
    );
    setPreferences(updated);
    localStorage.setItem('notification-preferences', JSON.stringify(updated));
    onSave?.(updated);
  };

  const requestBrowserPermission = async () => {
    if (!isHydrated || !('Notification' in window)) return;

    try {
      const permission = await Notification.requestPermission();
      setBrowserNotifications(permission);
      
      if (permission === 'granted') {
        new Notification('BirthdayDesk Notifications Enabled', {
          body: 'You will now receive birthday celebration reminders',
          icon: '/favicon.ico'
        });
      }
    } catch (error) {
      console.error('Error requesting notification permission:', error);
    }
  };

  if (!isHydrated) {
    return (
      <div className="bg-card rounded-lg p-6 shadow-warm">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <div className="w-5 h-5 bg-primary/20 rounded animate-pulse" />
          </div>
          <div>
            <div className="h-6 w-48 bg-muted rounded animate-pulse mb-2" />
            <div className="h-4 w-64 bg-muted rounded animate-pulse" />
          </div>
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-16 bg-muted rounded-lg animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg p-6 shadow-warm">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon name="BellIcon" size={24} className="text-primary" />
        </div>
        <div>
          <h2 className="text-xl font-heading font-semibold text-foreground">Notification Preferences</h2>
          <p className="text-sm text-muted-foreground">Manage how you receive celebration reminders</p>
        </div>
      </div>

      {browserNotifications !== 'granted' && (
        <div className="mb-6 p-4 bg-warning/10 border border-warning/20 rounded-lg">
          <div className="flex items-start gap-3">
            <Icon name="ExclamationTriangleIcon" size={20} className="text-warning flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-foreground mb-1">Browser Notifications Disabled</h3>
              <p className="text-xs text-muted-foreground mb-3">
                Enable browser notifications to receive real-time birthday reminders
              </p>
              <button
                onClick={requestBrowserPermission}
                className="px-4 py-2 bg-warning text-warning-foreground rounded-lg text-sm font-medium hover:shadow-warm transition-all duration-300"
              >
                Enable Notifications
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {preferences.map((pref) => (
          <div
            key={pref.id}
            className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors duration-300"
          >
            <div className="flex items-start gap-3 flex-1">
              <div className="w-8 h-8 bg-background rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                <Icon name={pref.icon as any} size={18} className="text-foreground" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-foreground mb-1">{pref.label}</h3>
                <p className="text-xs text-muted-foreground">{pref.description}</p>
              </div>
            </div>
            <button
              onClick={() => handleToggle(pref.id)}
              className={`relative w-12 h-6 rounded-full transition-colors duration-300 flex-shrink-0 ${
                pref.enabled ? 'bg-success' : 'bg-border'
              }`}
              aria-label={`Toggle ${pref.label}`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-300 ${
                  pref.enabled ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-primary/5 rounded-lg">
        <div className="flex items-start gap-3">
          <Icon name="InformationCircleIcon" size={20} className="text-primary flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-1">Notification Tips</h3>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• Notifications appear when you open the dashboard</li>
              <li>• Browser notifications work even when the app is closed</li>
              <li>• You can customize notification timing in advanced settings</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;
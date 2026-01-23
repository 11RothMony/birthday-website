'use client';

import React, { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

interface NotificationPanelProps {
  birthdayCount: number;
}

const NotificationPanel = ({ birthdayCount }: NotificationPanelProps) => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [notificationPermission, setNotificationPermission] = useState<NotificationPermission>('default');
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;

    if ('Notification' in window) {
      setNotificationPermission(Notification.permission);
      const savedState = localStorage.getItem('birthdayNotifications');
      setIsEnabled(savedState === 'enabled');
    }
  }, [isHydrated]);

  const requestNotificationPermission = async () => {
    if (!isHydrated || !('Notification' in window)) return;

    try {
      const permission = await Notification.requestPermission();
      setNotificationPermission(permission);
      
      if (permission === 'granted') {
        setIsEnabled(true);
        localStorage.setItem('birthdayNotifications', 'enabled');
        
        new Notification('BirthdayDesk Notifications Enabled', {
          body: `You'll receive reminders for ${birthdayCount} celebration${birthdayCount !== 1 ? 's' : ''} today!`,
          icon: '/favicon.ico',
        });
      }
    } catch (error) {
      console.error('Notification permission error:', error);
    }
  };

  const toggleNotifications = () => {
    if (!isHydrated) return;

    if (notificationPermission === 'granted') {
      const newState = !isEnabled;
      setIsEnabled(newState);
      localStorage.setItem('birthdayNotifications', newState ? 'enabled' : 'disabled');
    } else {
      requestNotificationPermission();
    }
  };

  if (!isHydrated) {
    return (
      <div className="bg-card rounded-xl shadow-warm p-6 border border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <Icon name="BellIcon" size={24} className="text-primary" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">Browser Notifications</h3>
              <p className="text-xs text-muted-foreground">Loading...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-xl shadow-warm p-6 border border-border">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
            isEnabled ? 'bg-success/10' : 'bg-primary/10'
          }`}>
            <Icon 
              name={isEnabled ? 'BellAlertIcon' : 'BellIcon'} 
              size={24} 
              className={isEnabled ? 'text-success' : 'text-primary'} 
            />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">Browser Notifications</h3>
            <p className="text-xs text-muted-foreground">
              {notificationPermission === 'granted' 
                ? isEnabled 
                  ? 'Active for celebration reminders' 
                  : 'Paused' :'Enable to receive celebration alerts'}
            </p>
          </div>
        </div>
        <button
          onClick={toggleNotifications}
          className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors duration-300 ${
            isEnabled ? 'bg-success' : 'bg-muted'
          }`}
        >
          <span
            className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-sm transition-transform duration-300 ${
              isEnabled ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </div>

      {notificationPermission === 'denied' && (
        <div className="flex items-start gap-3 p-4 bg-warning/10 rounded-lg border border-warning/20">
          <Icon name="ExclamationTriangleIcon" size={20} className="text-warning flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-warning mb-1">Notifications Blocked</p>
            <p className="text-xs text-muted-foreground">
              Please enable notifications in your browser settings to receive celebration alerts.
            </p>
          </div>
        </div>
      )}

      {isEnabled && notificationPermission === 'granted' && (
        <div className="flex items-start gap-3 p-4 bg-success/10 rounded-lg border border-success/20">
          <Icon name="CheckCircleIcon" size={20} className="text-success flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-success mb-1">Notifications Active</p>
            <p className="text-xs text-muted-foreground">
              You'll receive reminders 30 minutes before each celebration time.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationPanel;
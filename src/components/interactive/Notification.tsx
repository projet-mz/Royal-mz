'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

export type NotificationType = 'success' | 'warning' | 'error' | 'info';

export interface NotificationProps {
  id: string;
  title: string;
  message: string;
  type?: NotificationType;
  duration?: number; // in milliseconds
  onClose?: () => void;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export interface NotificationContainerProps {
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
  notifications: NotificationProps[];
  onClose: (id: string) => void;
}

export function Notification({
  id,
  title,
  message,
  type = 'info',
  duration = 5000,
  onClose,
  action,
}: NotificationProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  
  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsVisible(false);
      if (onClose) {
        onClose();
      }
    }, 300); // Animation duration
  };
  
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [duration]);
  
  const getIcon = () => {
    switch (type) {
      case 'success':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        );
      case 'warning':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-warning" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        );
      case 'error':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-destructive" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        );
      case 'info':
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };
  
  const getBackgroundColor = () => {
    switch (type) {
      case 'success':
        return 'bg-success/10 border-success/20';
      case 'warning':
        return 'bg-warning/10 border-warning/20';
      case 'error':
        return 'bg-destructive/10 border-destructive/20';
      case 'info':
      default:
        return 'bg-primary/10 border-primary/20';
    }
  };
  
  if (!isVisible) return null;
  
  return (
    <div
      className={`max-w-sm w-full bg-background border rounded-lg shadow-lg overflow-hidden transition-all duration-300 ${
        isExiting ? 'opacity-0 transform translate-x-full' : 'opacity-100'
      } ${getBackgroundColor()}`}
    >
      <div className="p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            {getIcon()}
          </div>
          <div className="ml-3 w-0 flex-1">
            <p className="text-sm font-medium">{title}</p>
            <p className="mt-1 text-sm text-muted-foreground">{message}</p>
            {action && (
              <div className="mt-3">
                <button
                  type="button"
                  className="text-sm font-medium text-primary hover:text-primary/80 focus:outline-none"
                  onClick={action.onClick}
                >
                  {action.label}
                </button>
              </div>
            )}
          </div>
          <div className="ml-4 flex-shrink-0 flex">
            <button
              type="button"
              className="inline-flex text-muted-foreground hover:text-foreground focus:outline-none"
              onClick={handleClose}
            >
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function NotificationContainer({
  position = 'top-right',
  notifications,
  onClose,
}: NotificationContainerProps) {
  const getPositionClasses = () => {
    switch (position) {
      case 'top-left':
        return 'top-0 left-0';
      case 'bottom-right':
        return 'bottom-0 right-0';
      case 'bottom-left':
        return 'bottom-0 left-0';
      case 'top-center':
        return 'top-0 left-1/2 transform -translate-x-1/2';
      case 'bottom-center':
        return 'bottom-0 left-1/2 transform -translate-x-1/2';
      case 'top-right':
      default:
        return 'top-0 right-0';
    }
  };
  
  const [isBrowser, setIsBrowser] = useState(false);
  
  useEffect(() => {
    setIsBrowser(true);
  }, []);
  
  if (!isBrowser) return null;
  
  const container = document.getElementById('notification-container') || document.body;
  
  return createPortal(
    <div
      className={`fixed z-50 p-4 space-y-4 pointer-events-none ${getPositionClasses()}`}
      style={{ maxWidth: '24rem' }}
    >
      {notifications.map((notification) => (
        <div key={notification.id} className="pointer-events-auto">
          <Notification
            {...notification}
            onClose={() => onClose(notification.id)}
          />
        </div>
      ))}
    </div>,
    container
  );
}

export function useNotifications() {
  const [notifications, setNotifications] = useState<NotificationProps[]>([]);
  
  const addNotification = (notification: Omit<NotificationProps, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    setNotifications((prev) => [...prev, { ...notification, id }]);
    return id;
  };
  
  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id));
  };
  
  const showSuccess = (title: string, message: string, options?: Partial<NotificationProps>) => {
    return addNotification({
      title,
      message,
      type: 'success',
      ...options,
    });
  };
  
  const showWarning = (title: string, message: string, options?: Partial<NotificationProps>) => {
    return addNotification({
      title,
      message,
      type: 'warning',
      ...options,
    });
  };
  
  const showError = (title: string, message: string, options?: Partial<NotificationProps>) => {
    return addNotification({
      title,
      message,
      type: 'error',
      ...options,
    });
  };
  
  const showInfo = (title: string, message: string, options?: Partial<NotificationProps>) => {
    return addNotification({
      title,
      message,
      type: 'info',
      ...options,
    });
  };
  
  return {
    notifications,
    addNotification,
    removeNotification,
    showSuccess,
    showWarning,
    showError,
    showInfo,
  };
}

// 
//   
//   

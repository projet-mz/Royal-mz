'use client';

import React, { useState } from 'react';
import { format, startOfWeek, addDays, isSameDay } from 'date-fns';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';

export interface TimetableEvent {
  id: string;
  subject: string;
  teacher?: string;
  location?: string;
  startTime: string; // Format: "HH:MM"
  endTime: string; // Format: "HH:MM"
  day: number; // 0-6 (Sunday-Saturday)
  color?: string;
}

export interface TimetableViewerProps {
  events: TimetableEvent[];
  title?: string;
  description?: string;
  showTeacher?: boolean;
  showLocation?: boolean;
  startHour?: number;
  endHour?: number;
  currentDate?: Date;
  onEventClick?: (event: TimetableEvent) => void;
}

export function TimetableViewer({
  events,
  title = 'Weekly Timetable',
  description,
  showTeacher = true,
  showLocation = true,
  startHour = 8,
  endHour = 16,
  currentDate = new Date(),
  onEventClick,
}: TimetableViewerProps) {
  const [viewMode, setViewMode] = useState<'week' | 'day'>('week');
  const [selectedDate, setSelectedDate] = useState<Date>(currentDate);
  
  const timeSlots = Array.from({ length: (endHour - startHour) * 2 }, (_, i) => {
    const hour = Math.floor(i / 2) + startHour;
    const minute = i % 2 === 0 ? '00' : '30';
    return `${hour.toString().padStart(2, '0')}:${minute}`;
  });
  
  const weekStart = startOfWeek(selectedDate, { weekStartsOn: 1 }); // Start from Monday
  const weekDays = Array.from({ length: 5 }, (_, i) => addDays(weekStart, i)); // Monday to Friday
  
  const getEventsForDay = (day: number) => {
    return events.filter(event => event.day === day);
  };
  
  const getDayViewEvents = () => {
    const dayOfWeek = selectedDate.getDay();
    const adjustedDay = dayOfWeek === 0 ? 6 : dayOfWeek;
    return getEventsForDay(adjustedDay);
  };
  
  const isEventAtTimeSlot = (event: TimetableEvent, timeSlot: string) => {
    const [eventStartHour, eventStartMinute] = event.startTime.split(':').map(Number);
    const [eventEndHour, eventEndMinute] = event.endTime.split(':').map(Number);
    const [slotHour, slotMinute] = timeSlot.split(':').map(Number);
    
    const eventStartTime = eventStartHour * 60 + eventStartMinute;
    const eventEndTime = eventEndHour * 60 + eventEndMinute;
    const slotTime = slotHour * 60 + slotMinute;
    
    return slotTime >= eventStartTime && slotTime < eventEndTime;
  };
  
  const getEventDuration = (event: TimetableEvent) => {
    const [startHour, startMinute] = event.startTime.split(':').map(Number);
    const [endHour, endMinute] = event.endTime.split(':').map(Number);
    
    const startTimeInMinutes = startHour * 60 + startMinute;
    const endTimeInMinutes = endHour * 60 + endMinute;
    
    return Math.ceil((endTimeInMinutes - startTimeInMinutes) / 30);
  };
  
  const getEventColor = (event: TimetableEvent) => {
    if (event.color) return event.color;
    
    const subjectHash = event.subject.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const colors = [
      'bg-primary/10 text-primary',
      'bg-secondary/10 text-secondary-foreground',
      'bg-accent/10 text-accent-foreground',
      'bg-success/10 text-success',
      'bg-warning/10 text-warning',
    ];
    
    return colors[subjectHash % colors.length];
  };
  
  const renderWeekView = () => {
    return (
      <div className="overflow-x-auto -mx-4 sm:mx-0">
        <div className="min-w-[800px] px-4 sm:px-0">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="w-16 sm:w-20 p-1 sm:p-2 border bg-muted/50 sticky left-0 z-10 bg-background"></th>
                {weekDays.map((day, index) => (
                  <th key={index} className="p-1 sm:p-2 border bg-muted/50 text-center">
                    <div className="font-medium text-sm sm:text-base">{format(day, 'EEE')}</div>
                    <div className="text-xs text-muted-foreground">{format(day, 'MMM d')}</div>
                    <div className="text-xs text-muted-foreground hidden sm:block">{format(day, 'yyyy')}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {timeSlots.map((timeSlot, timeIndex) => (
                <tr key={timeIndex}>
                  <td className="p-1 sm:p-2 border text-center text-xs sm:text-sm text-muted-foreground sticky left-0 z-10 bg-background">
                    {timeSlot}
                  </td>
                  {weekDays.map((day, dayIndex) => {
                    const dayEvents = getEventsForDay(dayIndex + 1); // +1 because we start from Monday (1)
                    const eventsAtTimeSlot = dayEvents.filter(event => isEventAtTimeSlot(event, timeSlot));
                    
                    return (
                      <td key={dayIndex} className="p-0 border relative min-h-[50px] sm:min-h-[60px]">
                        {eventsAtTimeSlot.map((event, eventIndex) => {
                          const isFirstSlotOfEvent = event.startTime === timeSlot;
                          if (!isFirstSlotOfEvent) return null;
                          
                          const duration = getEventDuration(event);
                          const eventColor = getEventColor(event);
                          
                          return (
                            <div
                              key={eventIndex}
                              className={`p-1 sm:p-2 m-1 rounded-md ${eventColor} cursor-pointer transition-colors hover:bg-muted overflow-hidden`}
                              style={{ height: `${Math.max(duration * 25, 25)}px` }}
                              onClick={() => onEventClick && onEventClick(event)}
                            >
                              <div className="font-medium text-xs sm:text-sm truncate">{event.subject}</div>
                              <div className="flex justify-between text-xs">
                                <span className="text-[10px] sm:text-xs">{event.startTime} - {event.endTime}</span>
                                {showLocation && event.location && (
                                  <span className="text-[10px] sm:text-xs truncate hidden sm:inline-block">{event.location}</span>
                                )}
                              </div>
                              {showTeacher && event.teacher && (
                                <div className="text-[10px] sm:text-xs mt-1 truncate hidden sm:block">{event.teacher}</div>
                              )}
                            </div>
                          );
                        })}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  
  const renderDayView = () => {
    const dayEvents = getDayViewEvents();
    
    return (
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            className="w-full sm:w-auto h-9"
            onClick={() => setSelectedDate(addDays(selectedDate, -1))}
          >
            <span className="hidden sm:inline">Previous Day</span>
            <span className="sm:hidden">Prev</span>
          </Button>
          <div className="text-center">
            <div className="font-medium">{format(selectedDate, 'EEEE')}</div>
            <div className="text-sm text-muted-foreground">{format(selectedDate, 'MMMM d, yyyy')}</div>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="w-full sm:w-auto h-9"
            onClick={() => setSelectedDate(addDays(selectedDate, 1))}
          >
            <span className="hidden sm:inline">Next Day</span>
            <span className="sm:hidden">Next</span>
          </Button>
        </div>
        
        <div className="space-y-2">
          {timeSlots.map((timeSlot, timeIndex) => {
            const eventsAtTimeSlot = dayEvents.filter(event => isEventAtTimeSlot(event, timeSlot));
            
            if (eventsAtTimeSlot.length === 0) {
              return (
                <div key={timeIndex} className="flex items-center p-2 border-b">
                  <div className="w-16 sm:w-20 text-xs sm:text-sm text-muted-foreground">{timeSlot}</div>
                  <div className="flex-1 h-10 sm:h-12 border-l pl-2 text-xs sm:text-sm text-muted-foreground flex items-center">
                    No scheduled classes
                  </div>
                </div>
              );
            }
            
            return (
              <div key={timeIndex} className="flex items-start p-2 border-b">
                <div className="w-16 sm:w-20 text-xs sm:text-sm text-muted-foreground pt-2">{timeSlot}</div>
                <div className="flex-1 space-y-2">
                  {eventsAtTimeSlot.map((event, eventIndex) => {
                    const eventColor = getEventColor(event);
                    
                    return (
                      <div
                        key={eventIndex}
                        className={`p-2 sm:p-3 rounded-md ${eventColor} cursor-pointer transition-colors hover:bg-muted`}
                        onClick={() => onEventClick && onEventClick(event)}
                      >
                        <div className="font-medium text-sm sm:text-base">{event.subject}</div>
                        <div className="flex flex-col sm:flex-row sm:justify-between text-xs sm:text-sm mt-1 gap-1">
                          <span>{event.startTime} - {event.endTime}</span>
                          {showLocation && event.location && (
                            <span className="truncate">{event.location}</span>
                          )}
                        </div>
                        {showTeacher && event.teacher && (
                          <div className="text-xs sm:text-sm mt-1 truncate">{event.teacher}</div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <Card>
      <CardHeader className="px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            {title && <CardTitle className="text-xl">{title}</CardTitle>}
            {description && <CardDescription>{description}</CardDescription>}
          </div>
          <div className="flex space-x-2 w-full sm:w-auto">
            <Button
              variant={viewMode === 'week' ? 'default' : 'outline'}
              size="sm"
              className="flex-1 sm:flex-none h-9"
              onClick={() => setViewMode('week')}
            >
              Week
            </Button>
            <Button
              variant={viewMode === 'day' ? 'default' : 'outline'}
              size="sm"
              className="flex-1 sm:flex-none h-9"
              onClick={() => setViewMode('day')}
            >
              Day
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {viewMode === 'week' ? renderWeekView() : renderDayView()}
      </CardContent>
    </Card>
  );
}

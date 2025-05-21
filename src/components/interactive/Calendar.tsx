'use client';

import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths, parseISO, isToday } from 'date-fns';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';

export interface CalendarEvent {
  id: string;
  title: string;
  date: string; // ISO date string
  time?: string;
  description?: string;
  type?: 'academic' | 'holiday' | 'exam' | 'event' | 'meeting' | 'other';
  color?: string;
}

export interface CalendarProps {
  events?: CalendarEvent[];
  onDateSelect?: (date: Date) => void;
  onEventClick?: (event: CalendarEvent) => void;
  onAddEvent?: (date: Date) => void;
  title?: string;
  description?: string;
  initialDate?: Date;
  allowEventCreation?: boolean;
}

export function Calendar({
  events = [],
  onDateSelect,
  onEventClick,
  onAddEvent,
  title = 'School Calendar',
  description,
  initialDate = new Date(),
  allowEventCreation = false,
}: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState<Date>(initialDate);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });
  
  const getEventsForDate = (date: Date): CalendarEvent[] => {
    return events.filter(event => isSameDay(parseISO(event.date), date));
  };
  
  const getEventColor = (type?: string): string => {
    switch (type) {
      case 'academic':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'holiday':
        return 'bg-success/10 text-success border-success/20';
      case 'exam':
        return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'event':
        return 'bg-secondary/10 text-secondary-foreground border-secondary/20';
      case 'meeting':
        return 'bg-accent/10 text-accent-foreground border-accent/20';
      default:
        return 'bg-muted text-muted-foreground border-muted';
    }
  };
  
  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    if (onDateSelect) {
      onDateSelect(date);
    }
  };
  
  const handleEventClick = (event: CalendarEvent, e: React.MouseEvent) => {
    e.stopPropagation();
    if (onEventClick) {
      onEventClick(event);
    }
  };
  
  const handleAddEvent = () => {
    if (selectedDate && onAddEvent) {
      onAddEvent(selectedDate);
    }
  };
  
  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };
  
  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };
  
  const goToToday = () => {
    setCurrentMonth(new Date());
    setSelectedDate(new Date());
    if (onDateSelect) {
      onDateSelect(new Date());
    }
  };
  
  const renderHeader = () => {
    const dateFormat = 'MMMM yyyy';
    return (
      <div className="flex items-center justify-between mb-4">
        <Button variant="outline" size="sm" onClick={prevMonth}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Button>
        <div className="text-lg font-medium">
          {format(currentMonth, dateFormat)}
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={goToToday}>
            Today
          </Button>
          <Button variant="outline" size="sm" onClick={nextMonth}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Button>
        </div>
      </div>
    );
  };
  
  const renderDaysOfWeek = () => {
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return (
      <div className="grid grid-cols-7 mb-2">
        {daysOfWeek.map((day, index) => (
          <div
            key={index}
            className="text-center py-2 text-sm font-medium text-muted-foreground"
          >
            {day}
          </div>
        ))}
      </div>
    );
  };
  
  const renderCells = () => {
    const startDate = startOfMonth(currentMonth);
    const startDay = startDate.getDay();
    
    const blanks = Array.from({ length: startDay }, (_, i) => (
      <div key={`blank-${i}`} className="p-2 border border-muted/20"></div>
    ));
    
    const days = monthDays.map((day, i) => {
      const dayEvents = getEventsForDate(day);
      const isSelected = selectedDate ? isSameDay(day, selectedDate) : false;
      const isCurrent = isToday(day);
      
      return (
        <div
          key={i}
          className={`min-h-[100px] p-2 border border-muted/20 transition-colors cursor-pointer ${
            isSelected
              ? 'bg-primary/5 border-primary'
              : isCurrent
              ? 'bg-muted/10'
              : 'hover:bg-muted/5'
          }`}
          onClick={() => handleDateClick(day)}
        >
          <div className="flex justify-between items-start">
            <span
              className={`inline-flex items-center justify-center h-6 w-6 rounded-full text-xs ${
                isCurrent
                  ? 'bg-primary text-primary-foreground'
                  : isSelected
                  ? 'bg-primary/20 text-primary'
                  : ''
              }`}
            >
              {format(day, 'd')}
            </span>
            
            {dayEvents.length > 0 && (
              <span className="text-xs text-muted-foreground">
                {dayEvents.length} {dayEvents.length === 1 ? 'event' : 'events'}
              </span>
            )}
          </div>
          
          <div className="mt-2 space-y-1 max-h-[80px] overflow-y-auto">
            {dayEvents.map((event) => (
              <div
                key={event.id}
                className={`px-2 py-1 rounded-md text-xs truncate border ${getEventColor(event.type)}`}
                onClick={(e) => handleEventClick(event, e)}
              >
                {event.time && <span className="font-medium mr-1">{event.time}</span>}
                {event.title}
              </div>
            ))}
          </div>
        </div>
      );
    });
    
    return (
      <div className="grid grid-cols-7 gap-0">
        {[...blanks, ...days]}
      </div>
    );
  };
  
  const renderSelectedDateDetails = () => {
    if (!selectedDate) return null;
    
    const selectedEvents = getEventsForDate(selectedDate);
    
    return (
      <div className="mt-6 border-t pt-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">
            {format(selectedDate, 'EEEE, MMMM d, yyyy')}
          </h3>
          {allowEventCreation && (
            <Button size="sm" onClick={handleAddEvent}>
              Add Event
            </Button>
          )}
        </div>
        
        {selectedEvents.length > 0 ? (
          <div className="space-y-3">
            {selectedEvents.map((event) => (
              <div
                key={event.id}
                className={`p-3 rounded-md border ${getEventColor(event.type)}`}
                onClick={() => onEventClick && onEventClick(event)}
              >
                <div className="flex justify-between items-start">
                  <h4 className="font-medium">{event.title}</h4>
                  {event.time && (
                    <span className="text-sm">{event.time}</span>
                  )}
                </div>
                {event.description && (
                  <p className="text-sm mt-1">{event.description}</p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 text-muted-foreground">
            No events scheduled for this day.
            {allowEventCreation && (
              <div className="mt-2">
                <Button variant="outline" size="sm" onClick={handleAddEvent}>
                  Add Event
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="space-y-4">
        {renderHeader()}
        {renderDaysOfWeek()}
        {renderCells()}
        {renderSelectedDateDetails()}
      </CardContent>
    </Card>
  );
}

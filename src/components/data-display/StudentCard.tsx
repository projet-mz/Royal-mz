'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';

export interface StudentCardProps {
  id: string;
  firstName: string;
  lastName: string;
  admissionNumber: string;
  grade: string;
  className?: string;
  gender?: string;
  age?: number;
  parentName?: string;
  contactNumber?: string;
  email?: string;
  address?: string;
  image?: string;
  attendance?: number;
  performanceScore?: number;
  onViewDetails?: (id: string) => void;
  onEdit?: (id: string) => void;
}

export function StudentCard({
  id,
  firstName,
  lastName,
  admissionNumber,
  grade,
  className,
  gender,
  age,
  parentName,
  contactNumber,
  email,
  address,
  image,
  attendance,
  performanceScore,
  onViewDetails,
  onEdit,
}: StudentCardProps) {
  const fullName = `${firstName} ${lastName}`;
  
  const profileImage = image || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(fullName) + '&background=0F3460&color=fff';
  
  const getPerformanceColor = (score?: number) => {
    if (!score) return 'bg-muted text-muted-foreground';
    if (score >= 80) return 'bg-success/10 text-success';
    if (score >= 60) return 'bg-primary/10 text-primary';
    if (score >= 40) return 'bg-warning/10 text-warning';
    return 'bg-destructive/10 text-destructive';
  };
  
  const getAttendanceColor = (percent?: number) => {
    if (!percent) return 'bg-muted text-muted-foreground';
    if (percent >= 90) return 'bg-success/10 text-success';
    if (percent >= 75) return 'bg-primary/10 text-primary';
    if (percent >= 60) return 'bg-warning/10 text-warning';
    return 'bg-destructive/10 text-destructive';
  };

  return (
    <Card className="card-3d h-full">
      <CardHeader className="pb-2 sm:pb-3 gradient-primary text-white">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
          <div className="space-y-1 flex-1">
            <CardTitle className="text-base sm:text-lg">{fullName}</CardTitle>
            <CardDescription className="text-xs sm:text-sm text-white/80">
              {admissionNumber} • {grade} {className && `• ${className}`}
            </CardDescription>
          </div>
          <div className="h-12 w-12 rounded-full overflow-hidden flex-shrink-0 border-2 border-white">
            <img 
              src={profileImage} 
              alt={fullName} 
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="bg-cream">
        <div className="space-y-4">
          {(gender || age) && (
            <div className="grid grid-cols-2 gap-2 text-sm">
              {gender && (
                <div className="min-h-[40px] flex flex-col justify-center">
                  <p className="text-xs text-secondary font-medium">Gender</p>
                  <p className="text-secondary">{gender}</p>
                </div>
              )}
              {age && (
                <div className="min-h-[40px] flex flex-col justify-center">
                  <p className="text-xs text-secondary font-medium">Age</p>
                  <p className="text-secondary">{age} years</p>
                </div>
              )}
            </div>
          )}
          
          {(parentName || contactNumber) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
              {parentName && (
                <div className="min-h-[40px] flex flex-col justify-center">
                  <p className="text-xs text-secondary font-medium">Parent/Guardian</p>
                  <p className="truncate text-secondary">{parentName}</p>
                </div>
              )}
              {contactNumber && (
                <div className="min-h-[40px] flex flex-col justify-center">
                  <p className="text-xs text-secondary font-medium">Contact</p>
                  <p className="text-secondary">{contactNumber}</p>
                </div>
              )}
            </div>
          )}
          
          {(attendance !== undefined || performanceScore !== undefined) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {attendance !== undefined && (
                <div className="min-h-[40px]">
                  <p className="text-xs text-secondary font-medium mb-1">Attendance</p>
                  <div className="flex items-center space-x-2">
                    <div className="h-3 flex-1 rounded-full bg-white overflow-hidden shadow-inner">
                      <div 
                        className="h-full bg-accent" 
                        style={{ width: `${attendance}%` }}
                      />
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${getAttendanceColor(attendance)}`}>
                      {attendance}%
                    </span>
                  </div>
                </div>
              )}
              
              {performanceScore !== undefined && (
                <div className="min-h-[40px]">
                  <p className="text-xs text-secondary font-medium mb-1">Performance</p>
                  <div className="flex items-center space-x-2">
                    <div className="h-3 flex-1 rounded-full bg-white overflow-hidden shadow-inner">
                      <div 
                        className="h-full bg-primary" 
                        style={{ width: `${performanceScore}%` }}
                      />
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${getPerformanceColor(performanceScore)}`}>
                      {performanceScore}%
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="bg-white px-4 sm:px-6 py-3">
        <div className="flex flex-col sm:flex-row gap-2 w-full">
          {onViewDetails && (
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full sm:flex-1 h-9 button-3d"
              onClick={() => onViewDetails(id)}
            >
              View Details
            </Button>
          )}
          {onEdit && (
            <Button 
              size="sm" 
              className="w-full sm:flex-1 h-9 button-3d gradient-primary"
              onClick={() => onEdit(id)}
            >
              Edit
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}

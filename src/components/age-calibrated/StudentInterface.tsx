import React, { ReactNode } from 'react';
import { Student } from '../../lib/types';

interface StudentInterfaceProps {
  student: Student;
  children: ReactNode;
}

/**
 * Age-calibrated interface component for students
 * Provides different UI experiences based on student age/grade
 */
export function StudentInterface({ student, children }: StudentInterfaceProps) {
  const getAgeGroup = (grade: string) => {
    if (grade.startsWith('Creche') || grade.startsWith('KG')) {
      return 'early-childhood';
    } else if (grade.startsWith('Primary')) {
      return 'primary';
    } else if (grade.startsWith('JHS')) {
      return 'junior-high';
    } else {
      return 'default';
    }
  };

  const ageGroup = getAgeGroup(student.grade);

  const getAgeAppropriateStyles = () => {
    switch (ageGroup) {
      case 'early-childhood':
        return {
          fontSize: 'text-xl',
          colors: 'bg-cream text-primary',
          iconSize: 'w-8 h-8',
          borderRadius: 'rounded-3xl',
          animation: 'animate-bounce',
          padding: 'p-6',
          spacing: 'space-y-6',
          buttonSize: 'h-16 min-w-16',
          buttonText: 'text-lg',
        };
      case 'primary':
        return {
          fontSize: 'text-lg',
          colors: 'bg-white text-secondary',
          iconSize: 'w-6 h-6',
          borderRadius: 'rounded-xl',
          animation: '',
          padding: 'p-4',
          spacing: 'space-y-4',
          buttonSize: 'h-12 min-w-12',
          buttonText: 'text-base',
        };
      case 'junior-high':
        return {
          fontSize: 'text-base',
          colors: 'bg-white text-secondary',
          iconSize: 'w-5 h-5',
          borderRadius: 'rounded-lg',
          animation: '',
          padding: 'p-3',
          spacing: 'space-y-3',
          buttonSize: 'h-10 min-w-10',
          buttonText: 'text-sm',
        };
      default:
        return {
          fontSize: 'text-base',
          colors: 'bg-white text-secondary',
          iconSize: 'w-5 h-5',
          borderRadius: 'rounded-lg',
          animation: '',
          padding: 'p-3',
          spacing: 'space-y-3',
          buttonSize: 'h-10 min-w-10',
          buttonText: 'text-sm',
        };
    }
  };

  const styles = getAgeAppropriateStyles();

  return (
    <div className={`student-interface ${ageGroup} ${styles.colors} ${styles.padding} ${styles.spacing}`}>
      {children}
    </div>
  );
}

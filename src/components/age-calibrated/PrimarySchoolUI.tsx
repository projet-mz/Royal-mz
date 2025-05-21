import React, { ReactNode } from 'react';
import { Student } from '../../lib/types';
import { Button } from '../ui/button';
import { StudentInterface } from './StudentInterface';

interface PrimarySchoolUIProps {
  student: Student;
  children?: ReactNode;
}

/**
 * Specialized UI for Primary School (Ages 6-12)
 * Features:
 * - Progressive Reading Levels based on grade
 * - Guided Workflows with step-by-step processes
 * - Achievement System with visual rewards
 * - Visual Schedules with icons
 * - Simplified Data Visualization
 * - Reading Support with read-aloud functionality
 * - Limited Options to avoid overwhelming
 */
export function PrimarySchoolUI({ student, children }: PrimarySchoolUIProps) {
  const [readingLevel, setReadingLevel] = React.useState<'basic' | 'intermediate' | 'advanced'>('intermediate');
  const [audioEnabled, setAudioEnabled] = React.useState(true);

  React.useEffect(() => {
    const grade = student.grade;
    if (grade.includes('1') || grade.includes('2')) {
      setReadingLevel('basic');
    } else if (grade.includes('3') || grade.includes('4')) {
      setReadingLevel('intermediate');
    } else {
      setReadingLevel('advanced');
    }
  }, [student.grade]);

  const readAloud = (text: string) => {
    if (audioEnabled && window.speechSynthesis) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <StudentInterface student={student}>
      <div className="flex justify-between items-center mb-6">
        <h1 className={`font-bold ${readingLevel === 'basic' ? 'text-2xl' : readingLevel === 'intermediate' ? 'text-xl' : 'text-lg'}`}>
          Welcome, {student.firstName}!
        </h1>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setAudioEnabled(!audioEnabled)}
          className="rounded-full h-10 w-10 p-0 flex items-center justify-center"
          aria-label={audioEnabled ? "Mute audio" : "Enable audio"}
        >
          {audioEnabled ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-volume-2">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-volume-x">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <line x1="23" x2="17" y1="9" y2="15" />
              <line x1="17" x2="23" y1="9" y2="15" />
            </svg>
          )}
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div 
          className="bg-blue-50 rounded-xl p-4 border border-blue-200 hover:bg-blue-100 transition-colors cursor-pointer"
          onClick={() => readAloud("Here is your schedule for today")}
        >
          <div className="flex items-center mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-calendar-days mr-2 text-blue-600">
              <path d="M8 2v4" />
              <path d="M16 2v4" />
              <rect width="18" height="18" x="3" y="4" rx="2" />
              <path d="M3 10h18" />
              <path d="M8 14h.01" />
              <path d="M12 14h.01" />
              <path d="M16 14h.01" />
              <path d="M8 18h.01" />
              <path d="M12 18h.01" />
              <path d="M16 18h.01" />
            </svg>
            <h2 className="font-semibold text-blue-800">Today's Schedule</h2>
          </div>
          <p className={`${readingLevel === 'basic' ? 'text-base' : 'text-sm'} text-blue-700`}>
            {readingLevel === 'basic' 
              ? 'See what you will do today!' 
              : 'Check your classes and activities for today'}
          </p>
        </div>

        <div 
          className="bg-green-50 rounded-xl p-4 border border-green-200 hover:bg-green-100 transition-colors cursor-pointer"
          onClick={() => readAloud("Let's check your homework and assignments")}
        >
          <div className="flex items-center mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-book-open-check mr-2 text-green-600">
              <path d="M8 3H2v15h7c1.7 0 3 1.3 3 3V7c0-2.2-1.8-4-4-4Z" />
              <path d="m16 12 2 2 4-4" />
              <path d="M22 6V3h-6c-2.2 0-4 1.8-4 4v14c0-1.7 1.3-3 3-3h7v-2.3" />
            </svg>
            <h2 className="font-semibold text-green-800">Homework</h2>
          </div>
          <p className={`${readingLevel === 'basic' ? 'text-base' : 'text-sm'} text-green-700`}>
            {readingLevel === 'basic' 
              ? 'See your homework!' 
              : 'Check your assignments and due dates'}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl p-4 border mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold">Your Progress</h2>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => readAloud("This shows how well you are doing in your subjects")}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-info">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4" />
              <path d="M12 8h.01" />
            </svg>
          </Button>
        </div>
        
        <div className="space-y-3">
          <div>
            <div className="flex justify-between mb-1">
              <span className={`${readingLevel === 'basic' ? 'text-base' : 'text-sm'}`}>Math</span>
              <span className="text-sm font-medium">85%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div className="bg-blue-600 h-4 rounded-full" style={{ width: '85%' }}></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <span className={`${readingLevel === 'basic' ? 'text-base' : 'text-sm'}`}>Reading</span>
              <span className="text-sm font-medium">92%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div className="bg-green-600 h-4 rounded-full" style={{ width: '92%' }}></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <span className={`${readingLevel === 'basic' ? 'text-base' : 'text-sm'}`}>Science</span>
              <span className="text-sm font-medium">78%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div className="bg-purple-600 h-4 rounded-full" style={{ width: '78%' }}></div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
        <div className="flex items-center mb-3">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trophy mr-2 text-yellow-600">
            <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
            <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
            <path d="M4 22h16" />
            <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
            <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
            <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
          </svg>
          <h2 className="font-semibold text-yellow-800">Your Achievements</h2>
        </div>
        
        <div className="flex space-x-3 overflow-x-auto pb-2">
          <div className="flex flex-col items-center min-w-[80px]">
            <div className="w-12 h-12 bg-yellow-200 rounded-full flex items-center justify-center mb-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-star text-yellow-600">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            </div>
            <span className="text-xs text-center">Math Star</span>
          </div>
          
          <div className="flex flex-col items-center min-w-[80px]">
            <div className="w-12 h-12 bg-green-200 rounded-full flex items-center justify-center mb-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-book-open text-green-600">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
              </svg>
            </div>
            <span className="text-xs text-center">Reading Pro</span>
          </div>
          
          <div className="flex flex-col items-center min-w-[80px]">
            <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center mb-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-medal text-blue-600">
                <path d="M7.21 15 2.66 7.14a2 2 0 0 1 .13-2.2L4.4 2.8A2 2 0 0 1 6 2h12a2 2 0 0 1 1.6.8l1.6 2.14a2 2 0 0 1 .14 2.2L16.79 15" />
                <path d="M11 12 5.12 2.2" />
                <path d="m13 12 5.88-9.8" />
                <path d="M8 7h8" />
                <circle cx="12" cy="17" r="5" />
                <path d="M12 18v-2h-.5" />
              </svg>
            </div>
            <span className="text-xs text-center">Perfect Attendance</span>
          </div>
          
          <div className="flex flex-col items-center min-w-[80px]">
            <div className="w-12 h-12 bg-purple-200 rounded-full flex items-center justify-center mb-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-flask-conical text-purple-600">
                <path d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2" />
                <path d="M8.5 2h7" />
                <path d="M7 16h10" />
              </svg>
            </div>
            <span className="text-xs text-center">Science Explorer</span>
          </div>
        </div>
      </div>

      {children}
    </StudentInterface>
  );
}

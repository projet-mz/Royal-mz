import React, { ReactNode } from 'react';
import { Student } from '../../lib/types';
import { Button } from '../ui/button';
import { StudentInterface } from './StudentInterface';

interface EarlyChildhoodUIProps {
  student: Student;
  children?: ReactNode;
}

/**
 * Specialized UI for Creche/Kindergarten (Ages 1-5)
 * Features:
 * - Visual-First Navigation with icon-based navigation
 * - Color Coding for different activities
 * - Audio Feedback with voice guidance
 * - Limited Text for pre-readers
 * - Parent Mode toggle
 * - Large Touch Targets (60px × 60px)
 * - Simple Animation for engagement
 */
export function EarlyChildhoodUI({ student, children }: EarlyChildhoodUIProps) {
  const [parentMode, setParentMode] = React.useState(false);
  const [audioEnabled, setAudioEnabled] = React.useState(true);

  const playAudio = (text: string) => {
    if (audioEnabled && window.speechSynthesis) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9; // Slightly slower for children
      utterance.pitch = 1.2; // Slightly higher pitch for children
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <StudentInterface student={student}>
      <div className="flex justify-end space-x-2 mb-6">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setAudioEnabled(!audioEnabled)}
          className="rounded-full h-12 w-12 p-0 flex items-center justify-center"
          aria-label={audioEnabled ? "Mute audio" : "Enable audio"}
        >
          {audioEnabled ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-volume-2">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-volume-x">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <line x1="23" x2="17" y1="9" y2="15" />
              <line x1="17" x2="23" y1="9" y2="15" />
            </svg>
          )}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setParentMode(!parentMode)}
          className="rounded-full h-12 w-12 p-0 flex items-center justify-center"
          aria-label={parentMode ? "Exit parent mode" : "Enter parent mode"}
        >
          {parentMode ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user">
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-users">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          )}
        </Button>
      </div>

      {parentMode ? (
        <div className="parent-mode bg-white rounded-lg p-4 mb-6 border border-primary">
          <h3 className="text-lg font-semibold mb-2">Parent Mode</h3>
          <p className="text-sm mb-4">
            This view provides detailed information for parents. Your child sees a simplified, age-appropriate interface.
          </p>
          {children}
        </div>
      ) : (
        <div className="child-mode">
          <div className="grid grid-cols-2 gap-6">
            <button
              className="activity-button bg-red-100 hover:bg-red-200 text-red-800 rounded-3xl p-6 flex flex-col items-center justify-center min-h-[150px] transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-red-300"
              onClick={() => playAudio("Let's see your schedule for today!")}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-calendar-days mb-3 animate-bounce">
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
              <span className="text-xl font-bold">Today</span>
            </button>
            
            <button
              className="activity-button bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-3xl p-6 flex flex-col items-center justify-center min-h-[150px] transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300"
              onClick={() => playAudio("Let's look at your activities!")}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-puzzle mb-3 animate-bounce">
                <path d="M19.439 7.85c-.049.322.059.648.289.878l1.568 1.568c.47.47.706 1.087.706 1.704s-.235 1.233-.706 1.704l-1.611 1.611a.98.98 0 0 1-.837.276c-.47-.07-.802-.48-.743-.95l.235-1.873a1.95 1.95 0 0 0-1.929-2.2l-1.974.04a.762.762 0 0 1-.749-.748c-.038-.749.678-1.33 1.427-1.26l2.03.19a1.95 1.95 0 0 0 2.1-1.929l-.04-1.546c-.01-.524.27-1.01.73-1.27.735-.417 1.66-.152 2.065.544Z" />
                <path d="M8.46 7.74c-.04.277.05.557.248.756l1.346 1.345c.405.404.595.94.595 1.466s-.19 1.062-.595 1.465l-1.384 1.383a.841.841 0 0 1-.719.237c-.404-.06-.69-.412-.638-.816l.202-1.609a1.675 1.675 0 0 0-1.657-1.89l-1.695.035a.654.654 0 0 1-.644-.644c-.032-.645.582-1.143 1.226-1.083l1.743.162a1.675 1.675 0 0 0 1.805-1.656l-.035-1.327c-.009-.45.232-.867.627-1.091.63-.359 1.424-.13 1.773.467Z" />
                <path d="M12.5 15h.5a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-6a2 2 0 0 1-2-2v-1.89a1.998 1.998 0 0 1 1.03-1.75L7.5 15" />
              </svg>
              <span className="text-xl font-bold">Activities</span>
            </button>
            
            <button
              className="activity-button bg-green-100 hover:bg-green-200 text-green-800 rounded-3xl p-6 flex flex-col items-center justify-center min-h-[150px] transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-300"
              onClick={() => playAudio("Let's see your stars and rewards!")}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-star mb-3 animate-bounce">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              <span className="text-xl font-bold">Stars</span>
            </button>
            
            <button
              className="activity-button bg-purple-100 hover:bg-purple-200 text-purple-800 rounded-3xl p-6 flex flex-col items-center justify-center min-h-[150px] transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-300"
              onClick={() => playAudio("Let's look at your messages!")}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-circle mb-3 animate-bounce">
                <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
              </svg>
              <span className="text-xl font-bold">Messages</span>
            </button>
          </div>
        </div>
      )}
    </StudentInterface>
  );
}

import React, { ReactNode } from 'react';
import { Student } from '../../lib/types';
import { Button } from '../ui/button';
import { StudentInterface } from './StudentInterface';

interface JuniorHighSchoolUIProps {
  student: Student;
  children?: ReactNode;
}

/**
 * Specialized UI for Junior High School (Ages 13-15)
 * Features:
 * - More Sophisticated UI with detailed data presentations
 * - Self-Management Tools for planning and goal setting
 * - Peer Collaboration features for group work
 * - Academic Analytics with detailed performance metrics
 * - Digital Literacy Focus with organization skills
 * - Developing Agency with customization options
 */
export function JuniorHighSchoolUI({ student, children }: JuniorHighSchoolUIProps) {
  const [activeTab, setActiveTab] = React.useState<'dashboard' | 'academics' | 'planner' | 'collaboration'>('dashboard');
  const [theme, setTheme] = React.useState<'default' | 'focus' | 'creative' | 'dark'>('default');

  const themeStyles = {
    default: {
      bg: 'bg-white',
      text: 'text-gray-900',
      accent: 'bg-blue-600',
      card: 'bg-gray-50 border-gray-200',
      button: 'bg-blue-600 hover:bg-blue-700 text-white',
    },
    focus: {
      bg: 'bg-gray-100',
      text: 'text-gray-900',
      accent: 'bg-indigo-600',
      card: 'bg-white border-gray-300',
      button: 'bg-indigo-600 hover:bg-indigo-700 text-white',
    },
    creative: {
      bg: 'bg-purple-50',
      text: 'text-gray-900',
      accent: 'bg-purple-600',
      card: 'bg-white border-purple-200',
      button: 'bg-purple-600 hover:bg-purple-700 text-white',
    },
    dark: {
      bg: 'bg-gray-900',
      text: 'text-gray-100',
      accent: 'bg-blue-500',
      card: 'bg-gray-800 border-gray-700',
      button: 'bg-blue-500 hover:bg-blue-600 text-white',
    },
  };

  const currentTheme = themeStyles[theme];

  return (
    <StudentInterface student={student}>
      <div className={`${currentTheme.bg} rounded-lg p-4 transition-colors duration-300`}>
        <div className="flex justify-between items-center mb-6">
          <h1 className={`text-lg font-bold ${currentTheme.text}`}>
            Welcome, {student.firstName}
          </h1>
          <div className="flex space-x-2">
            <div className="dropdown relative">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-palette mr-1">
                  <circle cx="13.5" cy="6.5" r="2.5" />
                  <circle cx="19" cy="13" r="2.5" />
                  <circle cx="6" cy="12" r="2.5" />
                  <circle cx="10" cy="20" r="2.5" />
                  <path d="m2 2 20 20" />
                  <path d="M7.5 10.5 12 6" />
                  <path d="m12 6 4.5 4.5" />
                  <path d="m12 12 4.5 4.5" />
                  <path d="M7.5 10.5 12 15" />
                  <path d="m12 15 4.5 4.5" />
                </svg>
                Theme
              </Button>
              <div className="dropdown-menu absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 p-2 space-y-1 z-10 hidden">
                <button 
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                  onClick={() => setTheme('default')}
                >
                  Default
                </button>
                <button 
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                  onClick={() => setTheme('focus')}
                >
                  Focus Mode
                </button>
                <button 
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                  onClick={() => setTheme('creative')}
                >
                  Creative
                </button>
                <button 
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                  onClick={() => setTheme('dark')}
                >
                  Dark Mode
                </button>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bell">
                <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
              </svg>
            </Button>
          </div>
        </div>

        <div className="flex border-b mb-4">
          <button
            className={`px-4 py-2 font-medium text-sm ${activeTab === 'dashboard' ? `border-b-2 ${currentTheme.accent} -mb-px ${currentTheme.text}` : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('dashboard')}
          >
            Dashboard
          </button>
          <button
            className={`px-4 py-2 font-medium text-sm ${activeTab === 'academics' ? `border-b-2 ${currentTheme.accent} -mb-px ${currentTheme.text}` : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('academics')}
          >
            Academics
          </button>
          <button
            className={`px-4 py-2 font-medium text-sm ${activeTab === 'planner' ? `border-b-2 ${currentTheme.accent} -mb-px ${currentTheme.text}` : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('planner')}
          >
            Planner
          </button>
          <button
            className={`px-4 py-2 font-medium text-sm ${activeTab === 'collaboration' ? `border-b-2 ${currentTheme.accent} -mb-px ${currentTheme.text}` : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('collaboration')}
          >
            Collaboration
          </button>
        </div>

        {activeTab === 'dashboard' && (
          <div className="space-y-4">
            <div className={`border rounded-lg p-4 ${currentTheme.card}`}>
              <h2 className={`text-md font-semibold mb-3 ${currentTheme.text}`}>Academic Progress</h2>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Mathematics</span>
                    <span className="text-sm font-medium">85%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className={`${currentTheme.accent} h-2.5 rounded-full`} style={{ width: '85%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Science</span>
                    <span className="text-sm font-medium">92%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className={`${currentTheme.accent} h-2.5 rounded-full`} style={{ width: '92%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">English</span>
                    <span className="text-sm font-medium">78%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className={`${currentTheme.accent} h-2.5 rounded-full`} style={{ width: '78%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Social Studies</span>
                    <span className="text-sm font-medium">88%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className={`${currentTheme.accent} h-2.5 rounded-full`} style={{ width: '88%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className={`border rounded-lg p-4 ${currentTheme.card}`}>
                <h2 className={`text-md font-semibold mb-3 ${currentTheme.text}`}>Upcoming Assignments</h2>
                <ul className="space-y-2">
                  <li className="text-sm">
                    <div className="font-medium">Math Quiz</div>
                    <div className="text-gray-500">Due: Tomorrow</div>
                  </li>
                  <li className="text-sm">
                    <div className="font-medium">Science Project</div>
                    <div className="text-gray-500">Due: Next Monday</div>
                  </li>
                  <li className="text-sm">
                    <div className="font-medium">English Essay</div>
                    <div className="text-gray-500">Due: Friday</div>
                  </li>
                </ul>
              </div>

              <div className={`border rounded-lg p-4 ${currentTheme.card}`}>
                <h2 className={`text-md font-semibold mb-3 ${currentTheme.text}`}>Today's Schedule</h2>
                <ul className="space-y-2">
                  <li className="text-sm">
                    <div className="font-medium">Mathematics</div>
                    <div className="text-gray-500">8:00 AM - 9:30 AM</div>
                  </li>
                  <li className="text-sm">
                    <div className="font-medium">Science</div>
                    <div className="text-gray-500">9:45 AM - 11:15 AM</div>
                  </li>
                  <li className="text-sm">
                    <div className="font-medium">Lunch Break</div>
                    <div className="text-gray-500">11:15 AM - 12:00 PM</div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'academics' && (
          <div className="space-y-4">
            <div className={`border rounded-lg p-4 ${currentTheme.card}`}>
              <h2 className={`text-md font-semibold mb-3 ${currentTheme.text}`}>Performance Analytics</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">Grade Distribution</h3>
                  <div className="flex h-24">
                    <div className="w-1/5 flex flex-col justify-end">
                      <div className={`${currentTheme.accent} w-full h-[60%]`}></div>
                      <div className="text-xs text-center mt-1">A</div>
                    </div>
                    <div className="w-1/5 flex flex-col justify-end">
                      <div className={`${currentTheme.accent} w-full h-[80%]`}></div>
                      <div className="text-xs text-center mt-1">B</div>
                    </div>
                    <div className="w-1/5 flex flex-col justify-end">
                      <div className={`${currentTheme.accent} w-full h-[40%]`}></div>
                      <div className="text-xs text-center mt-1">C</div>
                    </div>
                    <div className="w-1/5 flex flex-col justify-end">
                      <div className={`${currentTheme.accent} w-full h-[20%]`}></div>
                      <div className="text-xs text-center mt-1">D</div>
                    </div>
                    <div className="w-1/5 flex flex-col justify-end">
                      <div className={`${currentTheme.accent} w-full h-[5%]`}></div>
                      <div className="text-xs text-center mt-1">F</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-2">Attendance Rate</h3>
                  <div className="flex items-center">
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                      <div className={`${currentTheme.accent} h-2.5 rounded-full`} style={{ width: '95%' }}></div>
                    </div>
                    <span className="text-sm font-medium">95%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className={`border rounded-lg p-4 ${currentTheme.card}`}>
              <h2 className={`text-md font-semibold mb-3 ${currentTheme.text}`}>Subject Performance</h2>
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-2">
                  <div className="border rounded p-3 text-center">
                    <div className="text-2xl font-bold">A-</div>
                    <div className="text-xs text-gray-500">Mathematics</div>
                  </div>
                  <div className="border rounded p-3 text-center">
                    <div className="text-2xl font-bold">A</div>
                    <div className="text-xs text-gray-500">Science</div>
                  </div>
                  <div className="border rounded p-3 text-center">
                    <div className="text-2xl font-bold">B+</div>
                    <div className="text-xs text-gray-500">English</div>
                  </div>
                  <div className="border rounded p-3 text-center">
                    <div className="text-2xl font-bold">A</div>
                    <div className="text-xs text-gray-500">Social Studies</div>
                  </div>
                  <div className="border rounded p-3 text-center">
                    <div className="text-2xl font-bold">B</div>
                    <div className="text-xs text-gray-500">Physical Ed</div>
                  </div>
                  <div className="border rounded p-3 text-center">
                    <div className="text-2xl font-bold">A-</div>
                    <div className="text-xs text-gray-500">Art</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'planner' && (
          <div className="space-y-4">
            <div className={`border rounded-lg p-4 ${currentTheme.card}`}>
              <div className="flex justify-between items-center mb-3">
                <h2 className={`text-md font-semibold ${currentTheme.text}`}>My Goals</h2>
                <Button size="sm" className={currentTheme.button}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plus mr-1">
                    <path d="M5 12h14" />
                    <path d="M12 5v14" />
                  </svg>
                  Add Goal
                </Button>
              </div>
              <div className="space-y-2">
                <div className="flex items-center p-2 border rounded">
                  <input type="checkbox" className="mr-2" />
                  <div>
                    <div className="text-sm font-medium">Improve math grade to A</div>
                    <div className="text-xs text-gray-500">Due: End of term</div>
                  </div>
                </div>
                <div className="flex items-center p-2 border rounded">
                  <input type="checkbox" className="mr-2" checked />
                  <div>
                    <div className="text-sm font-medium line-through">Complete science project</div>
                    <div className="text-xs text-gray-500">Completed on May 10</div>
                  </div>
                </div>
                <div className="flex items-center p-2 border rounded">
                  <input type="checkbox" className="mr-2" />
                  <div>
                    <div className="text-sm font-medium">Read 5 books this month</div>
                    <div className="text-xs text-gray-500">Progress: 3/5</div>
                  </div>
                </div>
              </div>
            </div>

            <div className={`border rounded-lg p-4 ${currentTheme.card}`}>
              <div className="flex justify-between items-center mb-3">
                <h2 className={`text-md font-semibold ${currentTheme.text}`}>Weekly Schedule</h2>
                <Button size="sm" variant="outline">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-calendar mr-1">
                    <path d="M8 2v4" />
                    <path d="M16 2v4" />
                    <rect width="18" height="18" x="3" y="4" rx="2" />
                    <path d="M3 10h18" />
                  </svg>
                  View Calendar
                </Button>
              </div>
              <div className="grid grid-cols-7 gap-1 text-center mb-2">
                <div className="text-xs font-medium">Mon</div>
                <div className="text-xs font-medium">Tue</div>
                <div className="text-xs font-medium">Wed</div>
                <div className="text-xs font-medium">Thu</div>
                <div className="text-xs font-medium">Fri</div>
                <div className="text-xs font-medium">Sat</div>
                <div className="text-xs font-medium">Sun</div>
              </div>
              <div className="grid grid-cols-7 gap-1 text-center">
                <div className="h-20 border rounded p-1 text-xs overflow-hidden">
                  <div className="text-xs mb-1">15</div>
                  <div className={`${currentTheme.accent} text-white rounded px-1 py-0.5 mb-1 truncate`}>Math</div>
                  <div className="bg-green-100 text-green-800 rounded px-1 py-0.5 truncate">Science</div>
                </div>
                <div className="h-20 border rounded p-1 text-xs overflow-hidden">
                  <div className="text-xs mb-1">16</div>
                  <div className="bg-purple-100 text-purple-800 rounded px-1 py-0.5 mb-1 truncate">English</div>
                  <div className="bg-yellow-100 text-yellow-800 rounded px-1 py-0.5 truncate">History</div>
                </div>
                <div className="h-20 border rounded p-1 text-xs overflow-hidden">
                  <div className="text-xs mb-1">17</div>
                  <div className={`${currentTheme.accent} text-white rounded px-1 py-0.5 mb-1 truncate`}>Math</div>
                  <div className="bg-red-100 text-red-800 rounded px-1 py-0.5 truncate">PE</div>
                </div>
                <div className="h-20 border rounded p-1 text-xs overflow-hidden">
                  <div className="text-xs mb-1">18</div>
                  <div className="bg-purple-100 text-purple-800 rounded px-1 py-0.5 mb-1 truncate">English</div>
                  <div className="bg-green-100 text-green-800 rounded px-1 py-0.5 truncate">Science</div>
                </div>
                <div className="h-20 border rounded p-1 text-xs overflow-hidden">
                  <div className="text-xs mb-1">19</div>
                  <div className={`${currentTheme.accent} text-white rounded px-1 py-0.5 mb-1 truncate`}>Math</div>
                  <div className="bg-yellow-100 text-yellow-800 rounded px-1 py-0.5 truncate">History</div>
                </div>
                <div className="h-20 border rounded p-1 text-xs overflow-hidden">
                  <div className="text-xs mb-1">20</div>
                  <div className="bg-indigo-100 text-indigo-800 rounded px-1 py-0.5 truncate">Study Group</div>
                </div>
                <div className="h-20 border rounded p-1 text-xs overflow-hidden">
                  <div className="text-xs mb-1">21</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'collaboration' && (
          <div className="space-y-4">
            <div className={`border rounded-lg p-4 ${currentTheme.card}`}>
              <div className="flex justify-between items-center mb-3">
                <h2 className={`text-md font-semibold ${currentTheme.text}`}>Study Groups</h2>
                <Button size="sm" className={currentTheme.button}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-users mr-1">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                  Create Group
                </Button>
              </div>
              <div className="space-y-2">
                <div className={`border rounded p-3 ${currentTheme.card}`}>
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">Science Project Team</h3>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Active</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">5 members • Next meeting: Tomorrow, 4 PM</div>
                  <div className="flex mt-2">
                    <Button size="sm" variant="outline" className="text-xs mr-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-square mr-1">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                      </svg>
                      Chat
                    </Button>
                    <Button size="sm" variant="outline" className="text-xs">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file mr-1">
                        <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
                        <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                      </svg>
                      Files
                    </Button>
                  </div>
                </div>

                <div className={`border rounded p-3 ${currentTheme.card}`}>
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">Math Study Group</h3>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Upcoming</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">3 members • Next meeting: Friday, 5 PM</div>
                  <div className="flex mt-2">
                    <Button size="sm" variant="outline" className="text-xs mr-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-square mr-1">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                      </svg>
                      Chat
                    </Button>
                    <Button size="sm" variant="outline" className="text-xs">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file mr-1">
                        <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
                        <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                      </svg>
                      Files
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className={`border rounded-lg p-4 ${currentTheme.card}`}>
              <h2 className={`text-md font-semibold mb-3 ${currentTheme.text}`}>Shared Documents</h2>
              <div className="space-y-2">
                <div className="flex items-center p-2 border rounded">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-text mr-3 text-blue-600">
                    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
                    <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                    <path d="M10 9H8" />
                    <path d="M16 9h-4" />
                    <path d="M16 13H8" />
                    <path d="M10 17H8" />
                  </svg>
                  <div className="flex-1">
                    <div className="text-sm font-medium">Science Project Notes</div>
                    <div className="text-xs text-gray-500">Shared by: Alex • 2 days ago</div>
                  </div>
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-download">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" x2="12" y1="15" y2="3" />
                    </svg>
                  </Button>
                </div>

                <div className="flex items-center p-2 border rounded">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-spreadsheet mr-3 text-green-600">
                    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
                    <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                    <path d="M8 13h2" />
                    <path d="M14 13h2" />
                    <path d="M8 17h2" />
                    <path d="M14 17h2" />
                    <path d="M8 9h8" />
                  </svg>
                  <div className="flex-1">
                    <div className="text-sm font-medium">Math Study Guide</div>
                    <div className="text-xs text-gray-500">Shared by: You • 1 week ago</div>
                  </div>
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-download">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" x2="12" y1="15" y2="3" />
                    </svg>
                  </Button>
                </div>

                <div className="flex items-center p-2 border rounded">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-image mr-3 text-purple-600">
                    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
                    <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                    <circle cx="10" cy="13" r="2" />
                    <path d="m20 17-1.5-1.5c-.83-.83-2.17-.83-3 0L8 23" />
                  </svg>
                  <div className="flex-1">
                    <div className="text-sm font-medium">History Presentation</div>
                    <div className="text-xs text-gray-500">Shared by: Jamie • Yesterday</div>
                  </div>
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-download">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" x2="12" y1="15" y2="3" />
                    </svg>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {children}
      </div>
    </StudentInterface>
  );
}

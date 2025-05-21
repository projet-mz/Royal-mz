'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '../../../components/layout/DashboardLayout';
import { Button } from '../../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '../../../components/ui/card';
import { Input } from '../../../components/ui/input';

export default function ParentCommunicationPage() {
  const [activeTab, setActiveTab] = useState('messages');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedChild, setSelectedChild] = useState('all');
  
  const mockChildren = [
    {
      id: '1',
      name: 'Emma Johnson',
      grade: 'Primary 3',
      admissionNumber: 'P3-2024-001',
      image: '/avatars/emma.jpg'
    },
    {
      id: '2',
      name: 'Daniel Johnson',
      grade: 'Primary 1',
      admissionNumber: 'P1-2024-045',
      image: '/avatars/daniel.jpg'
    }
  ];
  
  const mockMessages = [
    {
      id: '1',
      childId: '1',
      sender: 'Mrs. Davis',
      senderRole: 'Class Teacher',
      subject: 'Upcoming Mathematics Test',
      content: 'Dear Parent, This is to inform you that there will be a Mathematics test next week Tuesday. Please ensure Emma revises the topics covered in class.',
      date: new Date('2024-04-10T14:30:00'),
      isRead: true,
      isStarred: false,
      hasAttachment: false
    },
    {
      id: '2',
      childId: '1',
      sender: 'Mr. Wilson',
      senderRole: 'Principal',
      subject: 'School Closing Early on Friday',
      content: 'Dear Parents, Please note that school will close at 12:00 PM this Friday due to a scheduled teacher training session. Kindly make arrangements to pick up your child early.',
      date: new Date('2024-04-08T09:15:00'),
      isRead: true,
      isStarred: true,
      hasAttachment: false
    },
    {
      id: '3',
      childId: '2',
      sender: 'Ms. Thompson',
      senderRole: 'Class Teacher',
      subject: 'Reading Assignment Feedback',
      content: 'Dear Parent, I wanted to share that Daniel has been making excellent progress with his reading assignments. He completed all tasks with enthusiasm and accuracy.',
      date: new Date('2024-04-05T16:45:00'),
      isRead: false,
      isStarred: false,
      hasAttachment: false
    },
    {
      id: '4',
      childId: '1',
      sender: 'Mrs. Roberts',
      senderRole: 'School Nurse',
      subject: 'Health Check-up Reminder',
      content: 'Dear Parent, This is a reminder that the annual health check-up for students will take place next week. Please ensure Emma brings her health card.',
      date: new Date('2024-04-03T11:20:00'),
      isRead: true,
      isStarred: false,
      hasAttachment: true
    },
    {
      id: '5',
      childId: '2',
      sender: 'Mr. Johnson',
      senderRole: 'Sports Coach',
      subject: 'Sports Day Participation',
      content: 'Dear Parent, I am pleased to inform you that Daniel has been selected to participate in the upcoming Sports Day event. Please find attached the schedule and consent form.',
      date: new Date('2024-04-01T13:10:00'),
      isRead: true,
      isStarred: true,
      hasAttachment: true
    }
  ];
  
  const mockAnnouncements = [
    {
      id: '1',
      title: 'End of Term Examination Schedule',
      content: 'The end of term examinations will commence on May 15th and end on May 26th. The detailed timetable has been uploaded to the school portal.',
      date: new Date('2024-04-12T10:00:00'),
      sender: 'Academic Office',
      priority: 'high'
    },
    {
      id: '2',
      title: 'School Facility Maintenance',
      content: 'The school swimming pool will be closed for maintenance from April 20th to April 25th. Regular swimming classes will resume on April 26th.',
      date: new Date('2024-04-10T14:30:00'),
      sender: 'Administration',
      priority: 'medium'
    },
    {
      id: '3',
      title: 'Parent-Teacher Association Meeting',
      content: 'The next PTA meeting will be held on April 28th at 4:00 PM in the school auditorium. All parents are encouraged to attend.',
      date: new Date('2024-04-08T09:15:00'),
      sender: 'PTA Secretary',
      priority: 'medium'
    },
    {
      id: '4',
      title: 'School Excursion to Science Museum',
      content: 'A school excursion to the National Science Museum has been scheduled for May 5th. Permission slips will be sent home with students next week.',
      date: new Date('2024-04-05T16:45:00'),
      sender: 'Events Coordinator',
      priority: 'low'
    },
    {
      id: '5',
      title: 'New Library Books Arrival',
      content: 'The school library has received a new collection of books. Students are encouraged to visit the library and explore the new additions.',
      date: new Date('2024-04-03T11:20:00'),
      sender: 'Librarian',
      priority: 'low'
    }
  ];
  
  const mockEvents = [
    {
      id: '1',
      title: 'Annual Sports Day',
      date: new Date('2024-05-10'),
      time: '9:00 AM - 3:00 PM',
      location: 'School Sports Field',
      description: 'The annual sports day featuring track and field events, team sports, and award ceremony.',
      category: 'Sports'
    },
    {
      id: '2',
      title: 'Science Fair',
      date: new Date('2024-05-15'),
      time: '10:00 AM - 2:00 PM',
      location: 'School Hall',
      description: 'Students will showcase their science projects and experiments. Parents are invited to attend.',
      category: 'Academic'
    },
    {
      id: '3',
      title: 'Cultural Day Celebration',
      date: new Date('2024-05-20'),
      time: '11:00 AM - 4:00 PM',
      location: 'School Auditorium',
      description: 'A celebration of diverse cultures featuring performances, food, and traditional attire.',
      category: 'Cultural'
    },
    {
      id: '4',
      title: 'Parent-Teacher Conference',
      date: new Date('2024-05-25'),
      time: '2:00 PM - 6:00 PM',
      location: 'Classrooms',
      description: 'Individual meetings between parents and teachers to discuss student progress.',
      category: 'Meeting'
    },
    {
      id: '5',
      title: 'End of Term Ceremony',
      date: new Date('2024-06-01'),
      time: '10:00 AM - 12:00 PM',
      location: 'School Auditorium',
      description: 'Ceremony to mark the end of the term, featuring awards and performances.',
      category: 'Ceremony'
    }
  ];
  
  const filteredMessages = mockMessages.filter(message => {
    const matchesSearch = 
      message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.content.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesChild = selectedChild === 'all' || message.childId === selectedChild;
    
    return matchesSearch && matchesChild;
  });
  
  const filteredAnnouncements = mockAnnouncements.filter(announcement => 
    announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    announcement.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    announcement.sender.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const filteredEvents = mockEvents.filter(event => 
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.location.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-destructive/10 text-destructive';
      case 'medium':
        return 'bg-warning/10 text-warning';
      case 'low':
        return 'bg-success/10 text-success';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };
  
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Sports':
        return 'bg-success/10 text-success';
      case 'Academic':
        return 'bg-primary/10 text-primary';
      case 'Cultural':
        return 'bg-secondary/10 text-secondary-foreground';
      case 'Meeting':
        return 'bg-accent/10 text-accent-foreground';
      case 'Ceremony':
        return 'bg-warning/10 text-warning';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };
  
  const formatDate = (date: Date) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.getTime() >= today.getTime()) {
      return `Today at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else if (date.getTime() >= yesterday.getTime()) {
      return `Yesterday at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };
  
  const unreadCount = mockMessages.filter(message => !message.isRead).length;

  return (
    <DashboardLayout role="parent">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-heading font-bold">Communication</h1>
            <p className="text-muted-foreground">
              Stay updated with school communications and events.
            </p>
          </div>
          <Button className="bg-primary hover:bg-primary/90">
            New Message
          </Button>
        </div>
        
        <div className="flex space-x-1 rounded-md bg-muted p-1">
          <Button
            variant={activeTab === 'messages' ? "default" : "ghost"}
            onClick={() => setActiveTab('messages')}
            className="flex-1"
          >
            Messages
            {unreadCount > 0 && (
              <span className="ml-2 rounded-full bg-primary px-1.5 py-0.5 text-xs text-white">
                {unreadCount}
              </span>
            )}
          </Button>
          <Button
            variant={activeTab === 'announcements' ? "default" : "ghost"}
            onClick={() => setActiveTab('announcements')}
            className="flex-1"
          >
            Announcements
          </Button>
          <Button
            variant={activeTab === 'events' ? "default" : "ghost"}
            onClick={() => setActiveTab('events')}
            className="flex-1"
          >
            Events
          </Button>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
          <div className="relative flex-1">
            <Input
              placeholder={`Search ${activeTab}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          
          {activeTab === 'messages' && (
            <select
              value={selectedChild}
              onChange={(e) => setSelectedChild(e.target.value)}
              className="flex h-10 w-full md:w-auto rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="all">All Children</option>
              {mockChildren.map(child => (
                <option key={child.id} value={child.id}>{child.name}</option>
              ))}
            </select>
          )}
        </div>
        
        {activeTab === 'messages' && (
          <div className="space-y-4">
            {filteredMessages.length > 0 ? (
              filteredMessages.map(message => {
                const child = mockChildren.find(c => c.id === message.childId);
                
                return (
                  <Card key={message.id} className={`overflow-hidden ${!message.isRead ? 'border-primary/50 bg-primary/5' : ''}`}>
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <CardTitle className="text-lg flex items-center">
                            {!message.isRead && (
                              <span className="mr-2 h-2 w-2 rounded-full bg-primary"></span>
                            )}
                            {message.subject}
                            {message.hasAttachment && (
                              <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-4 w-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                              </svg>
                            )}
                          </CardTitle>
                          <CardDescription>
                            From: {message.sender} ({message.senderRole}) • To: {child?.name || 'Unknown Child'}
                          </CardDescription>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button className="text-muted-foreground hover:text-primary">
                            <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${message.isStarred ? 'fill-warning text-warning' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                            </svg>
                          </button>
                          <span className="text-xs text-muted-foreground">
                            {formatDate(message.date)}
                          </span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">
                        {message.content}
                      </p>
                      
                      {message.hasAttachment && (
                        <div className="mt-4 flex items-center rounded-md border p-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                          </svg>
                          <span className="ml-2 text-sm">Attachment.pdf</span>
                          <Button variant="ghost" size="sm" className="ml-auto">
                            Download
                          </Button>
                        </div>
                      )}
                    </CardContent>
                    <CardFooter className="bg-muted/20 px-6 py-3">
                      <div className="flex justify-between items-center w-full">
                        <Button variant="outline" size="sm">Mark as {message.isRead ? 'Unread' : 'Read'}</Button>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">Reply</Button>
                          <Button size="sm">Forward</Button>
                        </div>
                      </div>
                    </CardFooter>
                  </Card>
                );
              })
            ) : (
              <div className="py-12 text-center text-muted-foreground">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mx-auto h-12 w-12 text-muted-foreground/50"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <h3 className="mt-4 text-lg font-medium">No messages found</h3>
                <p className="mt-1 text-sm">
                  Try adjusting your search or filters to find messages.
                </p>
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'announcements' && (
          <div className="space-y-4">
            {filteredAnnouncements.length > 0 ? (
              filteredAnnouncements.map(announcement => (
                <Card key={announcement.id} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-lg">{announcement.title}</CardTitle>
                        <CardDescription>
                          From: {announcement.sender} • {formatDate(announcement.date)}
                        </CardDescription>
                      </div>
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getPriorityColor(announcement.priority)}`}>
                        {announcement.priority.charAt(0).toUpperCase() + announcement.priority.slice(1)} Priority
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">
                      {announcement.content}
                    </p>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="py-12 text-center text-muted-foreground">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mx-auto h-12 w-12 text-muted-foreground/50"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
                  />
                </svg>
                <h3 className="mt-4 text-lg font-medium">No announcements found</h3>
                <p className="mt-1 text-sm">
                  Try adjusting your search to find announcements.
                </p>
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'events' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
                <CardDescription>
                  School events for the coming months
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="px-4 py-3 text-left font-medium">Event</th>
                        <th className="px-4 py-3 text-left font-medium">Date</th>
                        <th className="px-4 py-3 text-left font-medium">Time</th>
                        <th className="px-4 py-3 text-left font-medium">Location</th>
                        <th className="px-4 py-3 text-left font-medium">Category</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredEvents.length > 0 ? (
                        filteredEvents.map(event => (
                          <tr key={event.id} className="border-b hover:bg-muted/50">
                            <td className="px-4 py-3 font-medium">{event.title}</td>
                            <td className="px-4 py-3">{event.date.toLocaleDateString()}</td>
                            <td className="px-4 py-3">{event.time}</td>
                            <td className="px-4 py-3">{event.location}</td>
                            <td className="px-4 py-3">
                              <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getCategoryColor(event.category)}`}>
                                {event.category}
                              </span>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">
                            No events found. Try adjusting your search.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredEvents.map(event => (
                <Card key={event.id} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-lg">{event.title}</CardTitle>
                        <CardDescription>
                          {event.date.toLocaleDateString()} • {event.time}
                        </CardDescription>
                      </div>
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getCategoryColor(event.category)}`}>
                        {event.category}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-1">Location</h4>
                        <p className="text-sm">{event.location}</p>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-1">Description</h4>
                        <p className="text-sm">{event.description}</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="bg-muted/20 px-6 py-3">
                    <div className="flex justify-between items-center w-full">
                      <Button variant="outline" size="sm">Add to Calendar</Button>
                      <Button size="sm">View Details</Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

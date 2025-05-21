'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '../../../components/layout/DashboardLayout';
import { Button } from '../../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState('general');
  
  const [schoolSettings, setSchoolSettings] = useState({
    name: 'Amarck Royal International School',
    address: '123 Education Street, Accra, Ghana',
    phone: '+233 20 1234 5678',
    email: 'info@amarckroyal.edu.gh',
    website: 'www.amarckroyal.edu.gh',
    logo: '/logo.png',
    academicYear: '2023-2024',
    currentTerm: '2',
    termStartDate: '2024-01-10',
    termEndDate: '2024-04-15',
    nextTermStartDate: '2024-05-10',
    schoolColors: {
      primary: '#0F3460',
      secondary: '#FFD700',
      accent: '#4A1D75'
    }
  });
  
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: true,
    attendanceAlerts: true,
    gradeAlerts: true,
    feeReminders: true,
    systemUpdates: false,
    newsletterFrequency: 'monthly'
  });
  
  const userRoles = [
    {
      id: '1',
      name: 'Administrator',
      description: 'Full access to all system features',
      permissions: ['view_all', 'edit_all', 'delete_all', 'manage_users', 'manage_settings']
    },
    {
      id: '2',
      name: 'Teacher',
      description: 'Access to teaching-related features',
      permissions: ['view_classes', 'edit_grades', 'view_students', 'manage_attendance', 'upload_materials']
    },
    {
      id: '3',
      name: 'Student',
      description: 'Limited access to student features',
      permissions: ['view_grades', 'view_assignments', 'view_timetable', 'view_materials']
    },
    {
      id: '4',
      name: 'Parent',
      description: 'Access to child-related information',
      permissions: ['view_children', 'view_grades', 'view_attendance', 'view_fees']
    }
  ];
  
  const systemModules = [
    { id: '1', name: 'Academic Management', enabled: true },
    { id: '2', name: 'Student Management', enabled: true },
    { id: '3', name: 'Teacher Management', enabled: true },
    { id: '4', name: 'Financial Management', enabled: true },
    { id: '5', name: 'Attendance Tracking', enabled: true },
    { id: '6', name: 'Examination System', enabled: true },
    { id: '7', name: 'Library Management', enabled: false },
    { id: '8', name: 'Transportation Management', enabled: false },
    { id: '9', name: 'Hostel Management', enabled: false },
    { id: '10', name: 'SMS Notifications', enabled: true },
    { id: '11', name: 'Parent Portal', enabled: true },
    { id: '12', name: 'Online Payments', enabled: false }
  ];
  
  const backupHistory = [
    { id: '1', date: new Date('2024-04-01T08:00:00'), size: '256 MB', status: 'Completed', type: 'Automatic' },
    { id: '2', date: new Date('2024-03-25T08:00:00'), size: '254 MB', status: 'Completed', type: 'Automatic' },
    { id: '3', date: new Date('2024-03-18T08:00:00'), size: '250 MB', status: 'Completed', type: 'Automatic' },
    { id: '4', date: new Date('2024-03-15T14:30:00'), size: '248 MB', status: 'Completed', type: 'Manual' },
    { id: '5', date: new Date('2024-03-11T08:00:00'), size: '245 MB', status: 'Completed', type: 'Automatic' }
  ];

  return (
    <DashboardLayout role="admin">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-heading font-bold">System Settings</h1>
            <p className="text-muted-foreground">
              Configure and manage school system settings.
            </p>
          </div>
          <Button className="bg-primary hover:bg-primary/90">
            Save Changes
          </Button>
        </div>
        
        <div className="flex space-x-1 rounded-md bg-muted p-1">
          <Button
            variant={activeTab === 'general' ? "default" : "ghost"}
            onClick={() => setActiveTab('general')}
            className="flex-1"
          >
            General
          </Button>
          <Button
            variant={activeTab === 'notifications' ? "default" : "ghost"}
            onClick={() => setActiveTab('notifications')}
            className="flex-1"
          >
            Notifications
          </Button>
          <Button
            variant={activeTab === 'users' ? "default" : "ghost"}
            onClick={() => setActiveTab('users')}
            className="flex-1"
          >
            Users &amp; Roles
          </Button>
          <Button
            variant={activeTab === 'modules' ? "default" : "ghost"}
            onClick={() => setActiveTab('modules')}
            className="flex-1"
          >
            Modules
          </Button>
          <Button
            variant={activeTab === 'backup' ? "default" : "ghost"}
            onClick={() => setActiveTab('backup')}
            className="flex-1"
          >
            Backup &amp; Restore
          </Button>
        </div>
        
        {activeTab === 'general' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>School Information</CardTitle>
                <CardDescription>
                  Basic information about your school
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="schoolName">School Name</Label>
                    <Input 
                      id="schoolName" 
                      value={schoolSettings.name}
                      onChange={(e) => setSchoolSettings({...schoolSettings, name: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="schoolEmail">Email Address</Label>
                    <Input 
                      id="schoolEmail" 
                      type="email"
                      value={schoolSettings.email}
                      onChange={(e) => setSchoolSettings({...schoolSettings, email: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="schoolPhone">Phone Number</Label>
                    <Input 
                      id="schoolPhone" 
                      value={schoolSettings.phone}
                      onChange={(e) => setSchoolSettings({...schoolSettings, phone: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="schoolWebsite">Website</Label>
                    <Input 
                      id="schoolWebsite" 
                      value={schoolSettings.website}
                      onChange={(e) => setSchoolSettings({...schoolSettings, website: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="schoolAddress">Address</Label>
                    <Input 
                      id="schoolAddress" 
                      value={schoolSettings.address}
                      onChange={(e) => setSchoolSettings({...schoolSettings, address: e.target.value})}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Academic Calendar</CardTitle>
                <CardDescription>
                  Configure academic year and term dates
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="academicYear">Academic Year</Label>
                    <Input 
                      id="academicYear" 
                      value={schoolSettings.academicYear}
                      onChange={(e) => setSchoolSettings({...schoolSettings, academicYear: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="currentTerm">Current Term</Label>
                    <select
                      id="currentTerm"
                      value={schoolSettings.currentTerm}
                      onChange={(e) => setSchoolSettings({...schoolSettings, currentTerm: e.target.value})}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="1">Term 1</option>
                      <option value="2">Term 2</option>
                      <option value="3">Term 3</option>
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="termStartDate">Term Start Date</Label>
                    <Input 
                      id="termStartDate" 
                      type="date"
                      value={schoolSettings.termStartDate}
                      onChange={(e) => setSchoolSettings({...schoolSettings, termStartDate: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="termEndDate">Term End Date</Label>
                    <Input 
                      id="termEndDate" 
                      type="date"
                      value={schoolSettings.termEndDate}
                      onChange={(e) => setSchoolSettings({...schoolSettings, termEndDate: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="nextTermStartDate">Next Term Start Date</Label>
                    <Input 
                      id="nextTermStartDate" 
                      type="date"
                      value={schoolSettings.nextTermStartDate}
                      onChange={(e) => setSchoolSettings({...schoolSettings, nextTermStartDate: e.target.value})}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Appearance</CardTitle>
                <CardDescription>
                  Customize the look and feel of your school system
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="primaryColor">Primary Color</Label>
                    <div className="flex items-center gap-2">
                      <Input 
                        id="primaryColor" 
                        type="color"
                        value={schoolSettings.schoolColors.primary}
                        onChange={(e) => setSchoolSettings({
                          ...schoolSettings, 
                          schoolColors: {...schoolSettings.schoolColors, primary: e.target.value}
                        })}
                        className="w-12 h-10 p-1"
                      />
                      <Input 
                        value={schoolSettings.schoolColors.primary}
                        onChange={(e) => setSchoolSettings({
                          ...schoolSettings, 
                          schoolColors: {...schoolSettings.schoolColors, primary: e.target.value}
                        })}
                        className="flex-1"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="secondaryColor">Secondary Color</Label>
                    <div className="flex items-center gap-2">
                      <Input 
                        id="secondaryColor" 
                        type="color"
                        value={schoolSettings.schoolColors.secondary}
                        onChange={(e) => setSchoolSettings({
                          ...schoolSettings, 
                          schoolColors: {...schoolSettings.schoolColors, secondary: e.target.value}
                        })}
                        className="w-12 h-10 p-1"
                      />
                      <Input 
                        value={schoolSettings.schoolColors.secondary}
                        onChange={(e) => setSchoolSettings({
                          ...schoolSettings, 
                          schoolColors: {...schoolSettings.schoolColors, secondary: e.target.value}
                        })}
                        className="flex-1"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="accentColor">Accent Color</Label>
                    <div className="flex items-center gap-2">
                      <Input 
                        id="accentColor" 
                        type="color"
                        value={schoolSettings.schoolColors.accent}
                        onChange={(e) => setSchoolSettings({
                          ...schoolSettings, 
                          schoolColors: {...schoolSettings.schoolColors, accent: e.target.value}
                        })}
                        className="w-12 h-10 p-1"
                      />
                      <Input 
                        value={schoolSettings.schoolColors.accent}
                        onChange={(e) => setSchoolSettings({
                          ...schoolSettings, 
                          schoolColors: {...schoolSettings.schoolColors, accent: e.target.value}
                        })}
                        className="flex-1"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="schoolLogo">School Logo</Label>
                  <div className="flex items-center gap-4">
                    <div className="h-20 w-20 rounded-md border flex items-center justify-center bg-muted">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-10 w-10 text-muted-foreground"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <Button variant="outline">Upload New Logo</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
        
        {activeTab === 'notifications' && (
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Configure how and when notifications are sent
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Notification Channels</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between rounded-md border p-4">
                    <div className="space-y-0.5">
                      <label className="text-sm font-medium" htmlFor="emailNotifications">
                        Email Notifications
                      </label>
                      <p className="text-xs text-muted-foreground">
                        Receive notifications via email
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      id="emailNotifications"
                      checked={notificationSettings.emailNotifications}
                      onChange={(e) => setNotificationSettings({
                        ...notificationSettings,
                        emailNotifications: e.target.checked
                      })}
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between rounded-md border p-4">
                    <div className="space-y-0.5">
                      <label className="text-sm font-medium" htmlFor="smsNotifications">
                        SMS Notifications
                      </label>
                      <p className="text-xs text-muted-foreground">
                        Receive notifications via SMS
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      id="smsNotifications"
                      checked={notificationSettings.smsNotifications}
                      onChange={(e) => setNotificationSettings({
                        ...notificationSettings,
                        smsNotifications: e.target.checked
                      })}
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Notification Types</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between rounded-md border p-4">
                    <div className="space-y-0.5">
                      <label className="text-sm font-medium" htmlFor="attendanceAlerts">
                        Attendance Alerts
                      </label>
                      <p className="text-xs text-muted-foreground">
                        Notify when students are absent
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      id="attendanceAlerts"
                      checked={notificationSettings.attendanceAlerts}
                      onChange={(e) => setNotificationSettings({
                        ...notificationSettings,
                        attendanceAlerts: e.target.checked
                      })}
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between rounded-md border p-4">
                    <div className="space-y-0.5">
                      <label className="text-sm font-medium" htmlFor="gradeAlerts">
                        Grade Alerts
                      </label>
                      <p className="text-xs text-muted-foreground">
                        Notify when new grades are posted
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      id="gradeAlerts"
                      checked={notificationSettings.gradeAlerts}
                      onChange={(e) => setNotificationSettings({
                        ...notificationSettings,
                        gradeAlerts: e.target.checked
                      })}
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between rounded-md border p-4">
                    <div className="space-y-0.5">
                      <label className="text-sm font-medium" htmlFor="feeReminders">
                        Fee Reminders
                      </label>
                      <p className="text-xs text-muted-foreground">
                        Send reminders for fee payments
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      id="feeReminders"
                      checked={notificationSettings.feeReminders}
                      onChange={(e) => setNotificationSettings({
                        ...notificationSettings,
                        feeReminders: e.target.checked
                      })}
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between rounded-md border p-4">
                    <div className="space-y-0.5">
                      <label className="text-sm font-medium" htmlFor="systemUpdates">
                        System Updates
                      </label>
                      <p className="text-xs text-muted-foreground">
                        Notify about system updates and maintenance
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      id="systemUpdates"
                      checked={notificationSettings.systemUpdates}
                      onChange={(e) => setNotificationSettings({
                        ...notificationSettings,
                        systemUpdates: e.target.checked
                      })}
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Newsletter Frequency</h3>
                <div className="space-y-2">
                  <select
                    id="newsletterFrequency"
                    value={notificationSettings.newsletterFrequency}
                    onChange={(e) => setNotificationSettings({
                      ...notificationSettings,
                      newsletterFrequency: e.target.value
                    })}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="weekly">Weekly</option>
                    <option value="biweekly">Bi-weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="quarterly">Quarterly</option>
                    <option value="never">Never</option>
                  </select>
                  <p className="text-xs text-muted-foreground">
                    How often to send school newsletters to parents and staff
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        
        {activeTab === 'users' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>User Roles</CardTitle>
                <CardDescription>
                  Manage user roles and permissions
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="px-4 py-3 text-left font-medium">Role Name</th>
                        <th className="px-4 py-3 text-left font-medium">Description</th>
                        <th className="px-4 py-3 text-left font-medium">Permissions</th>
                        <th className="px-4 py-3 text-left font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userRoles.map((role) => (
                        <tr key={role.id} className="border-b hover:bg-muted/50">
                          <td className="px-4 py-3 font-medium">{role.name}</td>
                          <td className="px-4 py-3">{role.description}</td>
                          <td className="px-4 py-3">
                            <div className="flex flex-wrap gap-1">
                              {role.permissions.slice(0, 3).map((permission, index) => (
                                <span 
                                  key={index}
                                  className="inline-flex items-center rounded-full bg-secondary/10 px-2 py-0.5 text-xs font-medium text-secondary-foreground"
                                >
                                  {permission.replace('_', ' ')}
                                </span>
                              ))}
                              {role.permissions.length > 3 && (
                                <span className="inline-flex items-center rounded-full bg-muted px-2 py-0.5 text-xs font-medium">
                                  +{role.permissions.length - 3} more
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm">Edit</Button>
                              {role.id !== '1' && (
                                <Button variant="outline" size="sm" className="text-destructive">Delete</Button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
            
            <div className="flex justify-end">
              <Button>Add New Role</Button>
            </div>
          </div>
        )}
        
        {activeTab === 'modules' && (
          <Card>
            <CardHeader>
              <CardTitle>System Modules</CardTitle>
              <CardDescription>
                Enable or disable system modules
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {systemModules.map((module) => (
                  <div key={module.id} className="flex items-center justify-between rounded-md border p-4">
                    <div className="space-y-0.5">
                      <label className="text-sm font-medium" htmlFor={`module-${module.id}`}>
                        {module.name}
                      </label>
                    </div>
                    <input
                      type="checkbox"
                      id={`module-${module.id}`}
                      checked={module.enabled}
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
        
        {activeTab === 'backup' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Backup Settings</CardTitle>
                <CardDescription>
                  Configure automatic backup settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="backupFrequency">Backup Frequency</Label>
                  <select
                    id="backupFrequency"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="backupTime">Backup Time</Label>
                  <Input id="backupTime" type="time" value="08:00" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="retentionPeriod">Retention Period</Label>
                  <select
                    id="retentionPeriod"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="7">7 days</option>
                    <option value="14">14 days</option>
                    <option value="30">30 days</option>
                    <option value="90">90 days</option>
                  </select>
                </div>
                
                <div className="pt-4 flex space-x-2">
                  <Button>Save Settings</Button>
                  <Button variant="outline">Create Manual Backup</Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Backup History</CardTitle>
                <CardDescription>
                  View and restore previous backups
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="px-4 py-3 text-left font-medium">Date &amp; Time</th>
                        <th className="px-4 py-3 text-left font-medium">Size</th>
                        <th className="px-4 py-3 text-left font-medium">Type</th>
                        <th className="px-4 py-3 text-left font-medium">Status</th>
                        <th className="px-4 py-3 text-left font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {backupHistory.map((backup) => (
                        <tr key={backup.id} className="border-b hover:bg-muted/50">
                          <td className="px-4 py-3 font-medium">
                            {backup.date.toLocaleString()}
                          </td>
                          <td className="px-4 py-3">{backup.size}</td>
                          <td className="px-4 py-3">
                            <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                              backup.type === 'Automatic' 
                                ? 'bg-secondary/10 text-secondary-foreground' 
                                : 'bg-primary/10 text-primary'
                            }`}>
                              {backup.type}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <span className="inline-flex items-center rounded-full bg-success/10 px-2 py-0.5 text-xs font-medium text-success">
                              {backup.status}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm">Restore</Button>
                              <Button variant="outline" size="sm">Download</Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

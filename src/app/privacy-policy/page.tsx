'use client';

import React, { useState, useEffect } from 'react';
import { MainLayout } from '../../components/layout/MainLayout';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { useAuth } from '../../lib/context/AuthContext';
import { Skeleton } from '../../components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '../../components/ui/alert';
import { motion } from 'framer-motion';
import { MarkdownRenderer } from '../../components/ui/markdown-renderer';

export default function PrivacyPolicyPage() {
  const { user } = useAuth();
  const [policyContent, setPolicyContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editableContent, setEditableContent] = useState('');
  const [versions, setVersions] = useState([
    { id: 1, date: 'May 21, 2025', editor: 'Admin User' }
  ]);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [readingTime, setReadingTime] = useState('5 minutes');
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [showAccessibilityPanel, setShowAccessibilityPanel] = useState(false);
  const [fontSizeMultiplier, setFontSizeMultiplier] = useState(1);
  const [highContrast, setHighContrast] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== 'undefined') {
        const scrollTop = window.scrollY;
        const docHeight = document.body.offsetHeight - window.innerHeight;
        const scrollPercent = scrollTop / docHeight;
        setReadingProgress(scrollPercent * 100);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const fetchPrivacyPolicy = async () => {
      setLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const defaultContent = `
# Privacy Policy

## Introduction
Amarck Royal International School ("we", "our", or "us") is committed to protecting the privacy of our students, parents, teachers, and staff. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our school management system.

## Information We Collect
We collect information that you provide directly to us, including:
- Personal information (name, email address, phone number)
- Student academic records
- Attendance records
- Financial information for fee payments
- Health information where required for student welfare

## How We Use Your Information
We use the information we collect to:
- Provide, maintain, and improve our educational services
- Communicate with parents about student progress
- Process fee payments
- Comply with legal and regulatory requirements
- Enhance the security and safety of our school community

## Data Security
We implement appropriate technical and organizational measures to protect the security of your personal information. However, please be aware that no security measures are perfect or impenetrable.

## Your Rights
Depending on your location, you may have certain rights regarding your personal information, including:
- The right to access your personal information
- The right to correct inaccurate information
- The right to delete your information
- The right to restrict or object to processing

## Changes to This Policy
We may update this Privacy Policy from time to time. The updated version will be indicated by an updated "Revised" date and the updated version will be effective as soon as it is accessible.

## Contact Us
If you have questions or concerns about this Privacy Policy, please contact us at:
- Email: privacy@amarckroyal.edu
- Phone: +123-456-7890
- Address: 123 Education Lane, Knowledge City

Last Updated: May 21, 2025
        `;
        
        setPolicyContent(defaultContent);
        setEditableContent(defaultContent);
        
        const wordCount = defaultContent.split(/\s+/).length;
        const mins = Math.ceil(wordCount / 200);
        setReadingTime(`${mins} minute${mins !== 1 ? 's' : ''}`);
      } catch (error) {
        console.error('Error fetching privacy policy:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPrivacyPolicy();
  }, []);

  const handleSaveChanges = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setPolicyContent(editableContent);
      setIsEditing(false);
      
      const newVersion = {
        id: versions.length + 1,
        date: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }),
        editor: user?.firstName + ' ' + user?.lastName || 'Admin User'
      };
      
      setVersions([newVersion, ...versions]);
      setSaveSuccess(true);
      
      setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);
      
      const wordCount = editableContent.split(/\s+/).length;
      const mins = Math.ceil(wordCount / 200);
      setReadingTime(`${mins} minute${mins !== 1 ? 's' : ''}`);
    } catch (error) {
      console.error('Error saving privacy policy:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleExportPDF = () => {
    alert('PDF export functionality would be implemented here');
  };

  const toggleSection = (section: string) => {
    if (activeSection === section) {
      setActiveSection(null);
    } else {
      setActiveSection(section);
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const extractSections = (content: string) => {
    if (!content) return [];
    
    const lines = content.split('\n');
    const sections: Array<{ title: string; id: string }> = [];
    
    for (const line of lines) {
      if (line.startsWith('## ')) {
        const title = line.replace('## ', '');
        const id = title.toLowerCase().replace(/\s+/g, '-');
        sections.push({ title, id });
      }
    }
    
    return sections;
  };

  const sections = policyContent ? extractSections(policyContent) : [];

  return (
    <MainLayout>
      {/* Fixed reading progress bar */}
      <div 
        className="fixed top-0 left-0 h-1 bg-primary z-50" 
        style={{ width: `${readingProgress}%` }}
      />
      
      {/* Accessibility panel */}
      {showAccessibilityPanel && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-20 right-4 z-40 bg-white shadow-lg rounded-lg p-4 w-64"
        >
          <h3 className="text-lg font-semibold mb-3">Accessibility Options</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm mb-1">Text Size</label>
              <div className="flex items-center">
                <button 
                  onClick={() => setFontSizeMultiplier(Math.max(0.8, fontSizeMultiplier - 0.1))}
                  className="bg-gray-200 rounded-l px-2 py-1"
                >
                  A-
                </button>
                <div className="px-2 py-1 bg-gray-100">
                  {Math.round(fontSizeMultiplier * 100)}%
                </div>
                <button 
                  onClick={() => setFontSizeMultiplier(Math.min(1.5, fontSizeMultiplier + 0.1))}
                  className="bg-gray-200 rounded-r px-2 py-1"
                >
                  A+
                </button>
              </div>
            </div>
            
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="highContrast" 
                checked={highContrast}
                onChange={(e) => setHighContrast(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <label htmlFor="highContrast" className="ml-2 block text-sm text-gray-700">
                High Contrast Mode
              </label>
            </div>
            
            <button 
              onClick={() => window.print()}
              className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-1 px-2 rounded text-sm"
            >
              Print-Friendly Version
            </button>
          </div>
        </motion.div>
      )}
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`container mx-auto py-8 px-4 ${highContrast ? 'bg-black text-white' : ''}`}
        style={{ fontSize: `${fontSizeMultiplier}rem` }}
      >
        {/* Fixed header with document title and last updated */}
        <div className="sticky top-0 bg-white dark:bg-gray-900 py-4 border-b z-30 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Privacy Policy</h1>
            <p className="text-sm text-gray-500">Last Updated: {versions[0].date}</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
              Estimated reading time: {readingTime}
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowAccessibilityPanel(!showAccessibilityPanel)}
              aria-label="Accessibility options"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 8v8"></path>
                <path d="M8 12h8"></path>
              </svg>
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleExportPDF}
              aria-label="Export as PDF"
            >
              PDF
            </Button>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8 mt-6">
          {/* Table of contents sidebar */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="md:w-1/4 md:sticky md:top-24 md:self-start"
          >
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Table of Contents</CardTitle>
              </CardHeader>
              <CardContent>
                <nav aria-label="Table of contents">
                  <ul className="space-y-1">
                    {sections.map((section) => (
                      <li key={section.id}>
                        <button
                          onClick={() => toggleSection(section.id)}
                          className={`text-left w-full px-2 py-1 rounded-md text-sm hover:bg-gray-100 ${
                            activeSection === section.id ? 'bg-gray-100 font-medium' : ''
                          }`}
                        >
                          {section.title}
                        </button>
                      </li>
                    ))}
                  </ul>
                </nav>
              </CardContent>
            </Card>
            
            {user?.role === 'admin' && !isEditing && (
              <div className="mt-4">
                <Button 
                  onClick={() => setIsEditing(true)}
                  className="w-full bg-secondary text-white"
                >
                  Edit Policy
                </Button>
              </div>
            )}
          </motion.div>
          
          {/* Main content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="md:w-3/4"
          >
            {saveSuccess && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-4"
              >
                <Alert className="bg-green-50 border border-green-200">
                  <AlertTitle className="text-green-800">Changes Saved!</AlertTitle>
                  <AlertDescription className="text-green-700">
                    Your privacy policy changes have been saved successfully.
                  </AlertDescription>
                </Alert>
              </motion.div>
            )}
            
            {loading ? (
              <div className="space-y-4">
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-8 w-2/3 mt-8" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </div>
            ) : isEditing ? (
              <Card>
                <CardHeader>
                  <CardTitle>Edit Privacy Policy</CardTitle>
                  <CardDescription>
                    Make changes to the privacy policy. Markdown formatting is supported.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-end mb-2 gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        setEditableContent(editableContent + '\n\n## Data Retention\nWe retain your personal information for as long as necessary to fulfill the purposes for which we collected it, including for the purposes of satisfying any legal, accounting, or reporting requirements.');
                      }}
                    >
                      Add Template Clause
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        const missingClauses = [];
                        if (!editableContent.includes('## Introduction')) missingClauses.push('Introduction');
                        if (!editableContent.includes('## Information We Collect')) missingClauses.push('Information Collection');
                        if (!editableContent.includes('## How We Use Your Information')) missingClauses.push('Information Usage');
                        if (!editableContent.includes('## Data Security')) missingClauses.push('Data Security');
                        if (!editableContent.includes('## Your Rights')) missingClauses.push('User Rights');
                        if (!editableContent.includes('## Changes to This Policy')) missingClauses.push('Policy Changes');
                        if (!editableContent.includes('## Contact Us')) missingClauses.push('Contact Information');
                        
                        if (missingClauses.length > 0) {
                          alert(`Missing required sections: ${missingClauses.join(', ')}`);
                        } else {
                          alert('All required sections are present.');
                        }
                      }}
                    >
                      Verify Compliance
                    </Button>
                  </div>
                  <textarea
                    value={editableContent}
                    onChange={(e) => setEditableContent(e.target.value)}
                    className="w-full h-[600px] p-4 border border-gray-300 rounded-md font-mono text-sm"
                    aria-label="Privacy policy editor"
                  />
                  <div className="flex justify-between items-center mt-4">
                    <p className="text-sm text-gray-500">
                      Markdown formatting is supported. Changes will be versioned and tracked.
                    </p>
                    <div className="space-x-2">
                      <Button 
                        onClick={() => {
                          setIsEditing(false);
                          setEditableContent(policyContent || '');
                        }}
                        variant="outline"
                      >
                        Cancel
                      </Button>
                      <Button 
                        onClick={handleSaveChanges} 
                        disabled={loading}
                        className="bg-primary text-white"
                      >
                        Save Changes
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className={highContrast ? 'bg-black border-white' : ''}>
                <CardContent className="p-6">
                  <article className="prose prose-lg max-w-none" style={{ fontSize: `${fontSizeMultiplier}em` }}>
                    {policyContent && <MarkdownRenderer content={policyContent} />}
                  </article>
                </CardContent>
              </Card>
            )}
            
            {user?.role === 'admin' && !isEditing && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="mt-8"
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Admin Controls</CardTitle>
                    <CardDescription>
                      Manage and track changes to the privacy policy
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="md:col-span-2">
                        <h3 className="text-lg font-semibold mb-2">Version History</h3>
                        <div className="border rounded-md overflow-hidden">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="bg-muted">
                                <th className="px-4 py-2 text-left">Version</th>
                                <th className="px-4 py-2 text-left">Date</th>
                                <th className="px-4 py-2 text-left">Editor</th>
                                <th className="px-4 py-2 text-left">Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {versions.map((version) => (
                                <tr key={version.id} className="border-t">
                                  <td className="px-4 py-2">v{version.id}</td>
                                  <td className="px-4 py-2">{version.date}</td>
                                  <td className="px-4 py-2">{version.editor}</td>
                                  <td className="px-4 py-2">
                                    <div className="flex gap-2">
                                      <Button variant="ghost" size="sm">View</Button>
                                      <Button variant="ghost" size="sm">Compare</Button>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Publication Status</h3>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between p-4 border rounded-md">
                            <div>
                              <p className="font-medium">Current Status:</p>
                              <p className="text-sm text-green-600">Published</p>
                            </div>
                            <Button variant="outline" size="sm">
                              Change Status
                            </Button>
                          </div>
                          <div className="p-4 border rounded-md">
                            <p className="font-medium mb-2">Notification Settings:</p>
                            <div className="space-y-2">
                              <div className="flex items-center">
                                <input 
                                  type="checkbox" 
                                  id="notifyUsers" 
                                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                                  defaultChecked
                                />
                                <label htmlFor="notifyUsers" className="ml-2 block text-sm text-gray-700">
                                  Notify users about updates
                                </label>
                              </div>
                              <div className="flex items-center">
                                <input 
                                  type="checkbox" 
                                  id="requireAcceptance" 
                                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                                  defaultChecked
                                />
                                <label htmlFor="requireAcceptance" className="ml-2 block text-sm text-gray-700">
                                  Require users to accept new policy
                                </label>
                              </div>
                            </div>
                          </div>
                          <div className="p-4 border rounded-md">
                            <p className="font-medium mb-2">Security:</p>
                            <div className="text-sm text-gray-600">
                              <p>Last edited from: 192.168.1.1</p>
                              <p>Two-factor verification: Enabled</p>
                              <p>Document checksum: 8a7b9c...</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </motion.div>
        </div>
      </motion.div>
    </MainLayout>
  );
}

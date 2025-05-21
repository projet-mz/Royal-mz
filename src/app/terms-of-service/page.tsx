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

export default function TermsOfServicePage() {
  const { user } = useAuth();
  const [termsContent, setTermsContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editableContent, setEditableContent] = useState('');
  const [versions, setVersions] = useState([
    { id: 1, date: 'May 21, 2025', editor: 'Admin User' },
    { id: 2, date: 'April 15, 2025', editor: 'System Administrator' }
  ]);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [acceptanceStats, setAcceptanceStats] = useState({
    total: 120,
    accepted: 104,
    percentAccepted: 87
  });
  const [readingTime, setReadingTime] = useState('7 minutes');
  const [readingProgress, setReadingProgress] = useState(0);
  const [showAccessibilityPanel, setShowAccessibilityPanel] = useState(false);
  const [fontSizeMultiplier, setFontSizeMultiplier] = useState(1);
  const [highContrast, setHighContrast] = useState(false);

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
    const fetchTermsOfService = async () => {
      setLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const defaultContent = `
# Terms of Service

## Acceptance of Terms
By accessing and using the Amarck Royal International School Management System, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.

## Description of Service
The Amarck Royal International School Management System provides digital tools for educational administration, communication, and learning management for students, parents, teachers, and administrators.

## User Accounts
- You are responsible for maintaining the confidentiality of your account credentials
- You are responsible for all activities that occur under your account
- You must immediately notify us of any unauthorized use of your account

## Acceptable Use
You agree not to:
- Use the service for any illegal purpose
- Interfere with the proper functioning of the service
- Attempt to gain unauthorized access to any part of the service
- Share your account credentials with others
- Upload or transmit any harmful code or material

## Intellectual Property
All content, features, and functionality of the service are owned by Amarck Royal International School and are protected by international copyright, trademark, and other intellectual property laws.

## Privacy
Your use of the service is also governed by our Privacy Policy, which is incorporated into these Terms by reference.

## Termination
We reserve the right to terminate or suspend your account and access to the service at our sole discretion, without notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties.

## Disclaimer of Warranties
The service is provided "as is" and "as available" without warranties of any kind, either express or implied.

## Limitation of Liability
In no event shall Amarck Royal International School be liable for any indirect, incidental, special, consequential, or punitive damages.

## Changes to Terms
We reserve the right to modify these Terms at any time. We will provide notice of significant changes by posting the new Terms on the service and updating the "Last Updated" date.

## Governing Law
These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which Amarck Royal International School is established.

## Contact Information
If you have any questions about these Terms, please contact us at:
- Email: legal@amarckroyal.edu
- Phone: +123-456-7890
- Address: 123 Education Lane, Knowledge City

Last Updated: May 21, 2025
        `;
        
        setTermsContent(defaultContent);
        setEditableContent(defaultContent);
        
        const wordCount = defaultContent.split(/\s+/).length;
        const mins = Math.ceil(wordCount / 200);
        setReadingTime(`${mins} minute${mins !== 1 ? 's' : ''}`);
      } catch (error) {
        console.error('Error fetching terms of service:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchTermsOfService();
  }, []);

  const handleSaveChanges = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setTermsContent(editableContent);
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
      console.error('Error saving terms of service:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleExportPDF = () => {
    alert('PDF export functionality would be implemented here');
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

  const sections = termsContent ? extractSections(termsContent) : [];

  const toggleSection = (section: string) => {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <MainLayout>
      {/* Fixed reading progress bar */}
      <div 
        className="fixed top-0 left-0 h-1 bg-primary z-50" 
        style={{ width: `${readingProgress}%` }}
        aria-hidden="true"
      />
      
      {/* Accessibility panel */}
      {showAccessibilityPanel && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-20 right-4 z-40 bg-white shadow-lg rounded-lg p-4 w-64"
          role="dialog"
          aria-labelledby="accessibility-title"
        >
          <h3 id="accessibility-title" className="text-lg font-semibold mb-3">Accessibility Options</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm mb-1">Text Size</label>
              <div className="flex items-center">
                <button 
                  onClick={() => setFontSizeMultiplier(Math.max(0.8, fontSizeMultiplier - 0.1))}
                  className="bg-gray-200 rounded-l px-2 py-1"
                  aria-label="Decrease text size"
                >
                  A-
                </button>
                <div className="px-2 py-1 bg-gray-100" aria-live="polite">
                  {Math.round(fontSizeMultiplier * 100)}%
                </div>
                <button 
                  onClick={() => setFontSizeMultiplier(Math.min(1.5, fontSizeMultiplier + 0.1))}
                  className="bg-gray-200 rounded-r px-2 py-1"
                  aria-label="Increase text size"
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
            <h1 className="text-3xl font-bold">Terms of Service</h1>
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
                          className="text-left w-full px-2 py-1 rounded-md text-sm hover:bg-gray-100"
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
                  Edit Terms
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
                    Your terms of service changes have been saved successfully.
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
                  <CardTitle>Edit Terms of Service</CardTitle>
                  <CardDescription>
                    Make changes to the terms of service. Markdown formatting is supported.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-end mb-2 gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        setEditableContent(editableContent + '\n\n## User Responsibilities\nUsers are responsible for ensuring that their use of the service complies with all applicable laws and regulations.');
                      }}
                    >
                      Add Template Clause
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        const missingClauses: string[] = [];
                        if (!editableContent.includes('## Acceptance of Terms')) missingClauses.push('Acceptance of Terms');
                        if (!editableContent.includes('## Description of Service')) missingClauses.push('Description of Service');
                        if (!editableContent.includes('## User Accounts')) missingClauses.push('User Accounts');
                        if (!editableContent.includes('## Acceptable Use')) missingClauses.push('Acceptable Use');
                        if (!editableContent.includes('## Intellectual Property')) missingClauses.push('Intellectual Property');
                        if (!editableContent.includes('## Privacy')) missingClauses.push('Privacy');
                        if (!editableContent.includes('## Termination')) missingClauses.push('Termination');
                        
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
                    aria-label="Terms of service editor"
                  />
                  <div className="flex justify-between items-center mt-4">
                    <p className="text-sm text-gray-500">
                      Markdown formatting is supported. Changes will be versioned and tracked.
                    </p>
                    <div className="space-x-2">
                      <Button 
                        onClick={() => {
                          setIsEditing(false);
                          setEditableContent(termsContent || '');
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
                    {termsContent && <MarkdownRenderer content={termsContent} />}
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
                      Manage and track changes to the terms of service
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
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
                        <h3 className="text-lg font-semibold mb-2">User Acceptance</h3>
                        <div className="p-4 border rounded-md space-y-4">
                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <p className="text-sm">Users who accepted:</p>
                              <p className="text-sm font-medium">{acceptanceStats.percentAccepted}%</p>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                              <div 
                                className="bg-green-600 h-2.5 rounded-full" 
                                style={{ width: `${acceptanceStats.percentAccepted}%` }}
                                role="progressbar"
                                aria-valuenow={acceptanceStats.percentAccepted}
                                aria-valuemin={0}
                                aria-valuemax={100}
                              ></div>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">
                              {acceptanceStats.accepted} out of {acceptanceStats.total} users
                            </p>
                          </div>
                          <div className="pt-2 border-t">
                            <h4 className="text-sm font-medium mb-1">Two-Person Approval Workflow</h4>
                            <div className="space-y-2">
                              <div className="flex items-center text-sm text-gray-600">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span>Initial approval: Admin User (May 21, 2025)</span>
                              </div>
                              <div className="flex items-center text-sm text-gray-600">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span>Final approval: Legal Dept. (May 21, 2025)</span>
                              </div>
                              <div className="flex items-center text-sm text-gray-600">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span>Published: May 21, 2025</span>
                              </div>
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

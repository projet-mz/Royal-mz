'use client';

import React, { useState, useEffect } from 'react';
import { MainLayout } from '../../components/layout/MainLayout';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { useAuth } from '../../lib/context/AuthContext';
import { Skeleton } from '../../components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '../../components/ui/alert';
import { motion } from 'framer-motion';

interface ContactInfo {
  schoolName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
  email: string;
  website: string;
  socialMedia: {
    facebook: string;
    twitter: string;
    instagram: string;
    linkedin: string;
  };
  officeHours: string;
  emergencyContact: string;
}

export default function ContactUsPage() {
  const { user } = useAuth();
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editableInfo, setEditableInfo] = useState<ContactInfo | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    const fetchContactInfo = async () => {
      setLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const defaultInfo: ContactInfo = {
          schoolName: 'Amarck Royal International School',
          address: '123 Education Lane',
          city: 'Knowledge City',
          state: 'Learning State',
          zipCode: '12345',
          country: 'United States',
          phone: '+1 (123) 456-7890',
          email: 'info@amarckroyal.edu',
          website: 'www.amarckroyal.edu',
          socialMedia: {
            facebook: 'https://facebook.com/amarckroyal',
            twitter: 'https://twitter.com/amarckroyal',
            instagram: 'https://instagram.com/amarckroyal',
            linkedin: 'https://linkedin.com/company/amarckroyal',
          },
          officeHours: 'Monday - Friday: 8:00 AM - 4:30 PM',
          emergencyContact: '+1 (123) 456-7899',
        };
        
        setContactInfo(defaultInfo);
        setEditableInfo(defaultInfo);
      } catch (error) {
        console.error('Error fetching contact info:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchContactInfo();
  }, []);

  const handleSaveChanges = async () => {
    if (!editableInfo) return;
    
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setContactInfo(editableInfo);
      setIsEditing(false);
      setSaveSuccess(true);
      
      setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Error saving contact info:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    if (!editableInfo) return;
    
    setEditableInfo({
      ...editableInfo,
      [field]: value,
    });
  };

  const handleSocialMediaChange = (platform: string, value: string) => {
    if (!editableInfo) return;
    
    setEditableInfo({
      ...editableInfo,
      socialMedia: {
        ...editableInfo.socialMedia,
        [platform]: value,
      },
    });
  };

  const handleContactFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setFormSubmitted(true);
    } catch (error) {
      setFormError('There was an error submitting your message. Please try again.');
    }
  };

  return (
    <MainLayout>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto py-8 px-4"
      >
        <div className="flex justify-between items-center mb-6">
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-3xl font-bold"
          >
            Contact Us
          </motion.h1>
          {user?.role === 'admin' && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {isEditing ? (
                <div className="space-x-2">
                  <Button 
                    onClick={handleSaveChanges} 
                    disabled={loading}
                    className="bg-primary text-white"
                  >
                    Save Changes
                  </Button>
                  <Button 
                    onClick={() => {
                      setIsEditing(false);
                      setEditableInfo(contactInfo);
                    }}
                    variant="outline"
                  >
                    Cancel
                  </Button>
                </div>
              ) : (
                <Button 
                  onClick={() => setIsEditing(true)}
                  className="bg-secondary text-white"
                >
                  Edit Contact Info
                </Button>
              )}
            </motion.div>
          )}
        </div>
        
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
                Your contact information changes have been saved successfully.
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
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>School Information</CardTitle>
                  <CardDescription>
                    Contact details for Amarck Royal International School
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isEditing ? (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          School Name
                        </label>
                        <Input
                          value={editableInfo?.schoolName || ''}
                          onChange={(e) => handleInputChange('schoolName', e.target.value)}
                          className="w-full"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Address
                        </label>
                        <Input
                          value={editableInfo?.address || ''}
                          onChange={(e) => handleInputChange('address', e.target.value)}
                          className="w-full mb-2"
                        />
                        <div className="grid grid-cols-2 gap-2 mb-2">
                          <Input
                            value={editableInfo?.city || ''}
                            onChange={(e) => handleInputChange('city', e.target.value)}
                            placeholder="City"
                          />
                          <Input
                            value={editableInfo?.state || ''}
                            onChange={(e) => handleInputChange('state', e.target.value)}
                            placeholder="State/Province"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <Input
                            value={editableInfo?.zipCode || ''}
                            onChange={(e) => handleInputChange('zipCode', e.target.value)}
                            placeholder="Zip/Postal Code"
                          />
                          <Input
                            value={editableInfo?.country || ''}
                            onChange={(e) => handleInputChange('country', e.target.value)}
                            placeholder="Country"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Phone
                        </label>
                        <Input
                          value={editableInfo?.phone || ''}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className="w-full"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email
                        </label>
                        <Input
                          value={editableInfo?.email || ''}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="w-full"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Website
                        </label>
                        <Input
                          value={editableInfo?.website || ''}
                          onChange={(e) => handleInputChange('website', e.target.value)}
                          className="w-full"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Office Hours
                        </label>
                        <Input
                          value={editableInfo?.officeHours || ''}
                          onChange={(e) => handleInputChange('officeHours', e.target.value)}
                          className="w-full"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Emergency Contact
                        </label>
                        <Input
                          value={editableInfo?.emergencyContact || ''}
                          onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                          className="w-full"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Social Media
                        </label>
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <span className="w-24 text-sm">Facebook:</span>
                            <Input
                              value={editableInfo?.socialMedia.facebook || ''}
                              onChange={(e) => handleSocialMediaChange('facebook', e.target.value)}
                              className="flex-1"
                            />
                          </div>
                          <div className="flex items-center">
                            <span className="w-24 text-sm">Twitter:</span>
                            <Input
                              value={editableInfo?.socialMedia.twitter || ''}
                              onChange={(e) => handleSocialMediaChange('twitter', e.target.value)}
                              className="flex-1"
                            />
                          </div>
                          <div className="flex items-center">
                            <span className="w-24 text-sm">Instagram:</span>
                            <Input
                              value={editableInfo?.socialMedia.instagram || ''}
                              onChange={(e) => handleSocialMediaChange('instagram', e.target.value)}
                              className="flex-1"
                            />
                          </div>
                          <div className="flex items-center">
                            <span className="w-24 text-sm">LinkedIn:</span>
                            <Input
                              value={editableInfo?.socialMedia.linkedin || ''}
                              onChange={(e) => handleSocialMediaChange('linkedin', e.target.value)}
                              className="flex-1"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-semibold">{contactInfo?.schoolName}</h3>
                        <p className="text-gray-600">
                          {contactInfo?.address}<br />
                          {contactInfo?.city}, {contactInfo?.state} {contactInfo?.zipCode}<br />
                          {contactInfo?.country}
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium text-gray-700">Contact</h4>
                          <p className="text-gray-600">
                            Phone: <a href={`tel:${contactInfo?.phone}`} className="hover:underline">{contactInfo?.phone}</a><br />
                            Email: <a href={`mailto:${contactInfo?.email}`} className="hover:underline">{contactInfo?.email}</a><br />
                            Website: <a href={`https://${contactInfo?.website}`} target="_blank" rel="noopener noreferrer" className="hover:underline">{contactInfo?.website}</a>
                          </p>
                        </div>
                        
                        <div>
                          <h4 className="font-medium text-gray-700">Hours</h4>
                          <p className="text-gray-600">
                            {contactInfo?.officeHours}<br />
                            Emergency: <a href={`tel:${contactInfo?.emergencyContact}`} className="hover:underline">{contactInfo?.emergencyContact}</a>
                          </p>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-gray-700 mb-2">Connect With Us</h4>
                        <div className="flex space-x-4">
                          <a href={contactInfo?.socialMedia.facebook} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800" aria-label="Facebook">
                            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                            </svg>
                          </a>
                          <a href={contactInfo?.socialMedia.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-600" aria-label="Twitter">
                            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                            </svg>
                          </a>
                          <a href={contactInfo?.socialMedia.instagram} target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:text-pink-800" aria-label="Instagram">
                            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                            </svg>
                          </a>
                          <a href={contactInfo?.socialMedia.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-800 hover:text-blue-900" aria-label="LinkedIn">
                            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                            </svg>
                          </a>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Send Us a Message</CardTitle>
                  <CardDescription>
                    Have a question or feedback? We'd love to hear from you.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {formSubmitted ? (
                    <Alert className="bg-green-50 border-green-200">
                      <AlertTitle className="text-green-800">Message Sent!</AlertTitle>
                      <AlertDescription className="text-green-700">
                        Thank you for contacting us. We will get back to you as soon as possible.
                      </AlertDescription>
                    </Alert>
                  ) : (
                    <form onSubmit={handleContactFormSubmit} className="space-y-4">
                      {formError && (
                        <Alert variant="destructive">
                          <AlertTitle>Error</AlertTitle>
                          <AlertDescription>{formError}</AlertDescription>
                        </Alert>
                      )}
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="name">
                          Your Name
                        </label>
                        <Input
                          id="name"
                          required
                          placeholder="Enter your name"
                          className="w-full"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
                          Email Address
                        </label>
                        <Input
                          id="email"
                          required
                          type="email"
                          placeholder="Enter your email"
                          className="w-full"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="subject">
                          Subject
                        </label>
                        <Input
                          id="subject"
                          required
                          placeholder="Enter message subject"
                          className="w-full"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="message">
                          Message
                        </label>
                        <textarea
                          id="message"
                          required
                          placeholder="Enter your message"
                          rows={5}
                          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                      </div>
                      
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button type="submit" className="w-full bg-primary text-white">
                          Send Message
                        </Button>
                      </motion.div>
                    </form>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        )}
        
        {!isEditing && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-8"
          >
            <Card>
              <CardHeader>
                <CardTitle>Find Us</CardTitle>
                <CardDescription>
                  Visit our campus or reach out to us online
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-gray-200 rounded-md flex items-center justify-center" role="img" aria-label="Map showing school location">
                  <div className="text-center p-4">
                    <p className="text-gray-500 mb-2">Interactive map would be displayed here</p>
                    <p className="text-sm text-gray-400">
                      Showing location of {contactInfo?.schoolName} at {contactInfo?.address}, {contactInfo?.city}, {contactInfo?.state}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </motion.div>
    </MainLayout>
  );
}

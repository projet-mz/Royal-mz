'use client';

import React from 'react';
import { PublicWebsiteLayout } from '../../components/layout/PublicWebsiteLayout';
import { motion } from 'framer-motion';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import Image from 'next/image';
import Link from 'next/link';

export default function NewsEventsPage() {
  const newsItems = [
    {
      id: 1,
      title: 'Amarck Royal Students Excel in National Science Competition',
      date: 'May 15, 2025',
      excerpt: 'Our students brought home three gold medals and two silver medals from the National Science and Mathematics Olympiad.',
      category: 'Academic Achievement',
      image: '/images/ACTIVITY.jpg'
    },
    {
      id: 2,
      title: 'New STEM Lab Inaugurated',
      date: 'April 28, 2025',
      excerpt: 'State-of-the-art STEM laboratory opened to enhance hands-on learning experiences in science, technology, engineering, and mathematics.',
      category: 'Facilities',
      image: '/images/lab activity.jpg'
    },
    {
      id: 3,
      title: 'Annual Cultural Festival Celebrates Diversity',
      date: 'March 12, 2025',
      excerpt: 'Students showcased traditional dances, music, and cuisine from various cultures during our vibrant annual cultural festival.',
      category: 'Cultural',
      image: '/images/traditional .jpg'
    },
    {
      id: 4,
      title: 'Sports Teams Triumph in Regional Championships',
      date: 'February 20, 2025',
      excerpt: 'Our football and basketball teams secured championship titles at the regional interschool sports competition.',
      category: 'Sports',
      image: '/images/friday sports.jpg'
    },
    {
      id: 5,
      title: 'Community Service Initiative Impacts Local Orphanage',
      date: 'January 30, 2025',
      excerpt: 'Students organized a successful fundraiser and donation drive to support children at a local orphanage.',
      category: 'Community Service',
      image: '/images/ELLA MAIN.jpg'
    },
    {
      id: 6,
      title: 'Teachers Complete Advanced Professional Development',
      date: 'January 15, 2025',
      excerpt: 'Our teaching staff participated in an intensive professional development program focused on innovative teaching methodologies.',
      category: 'Staff Development',
      image: '/images/school activity.jpg'
    }
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: 'Parent-Teacher Conference',
      date: 'June 5-6, 2025',
      time: '9:00 AM - 4:00 PM',
      location: 'School Auditorium',
      description: 'Discuss your child\'s academic progress and development with their teachers.'
    },
    {
      id: 2,
      title: 'Annual Sports Day',
      date: 'June 15, 2025',
      time: '8:00 AM - 3:00 PM',
      location: 'School Sports Complex',
      description: 'A day of athletic competitions, team events, and celebration of physical fitness.'
    },
    {
      id: 3,
      title: 'Science Fair',
      date: 'June 25, 2025',
      time: '10:00 AM - 2:00 PM',
      location: 'School Hall',
      description: 'Students showcase their innovative science projects and research.'
    },
    {
      id: 4,
      title: 'End of Term Ceremony',
      date: 'July 10, 2025',
      time: '10:00 AM - 12:00 PM',
      location: 'School Auditorium',
      description: 'Celebration of student achievements and end of the academic term.'
    }
  ];

  return (
    <PublicWebsiteLayout>
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-primary to-secondary">
        <div className="container mx-auto px-4 text-center text-white">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            News & Events
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl max-w-2xl mx-auto"
          >
            Stay updated with the latest happenings and upcoming events at Amarck Royal International School.
          </motion.p>
        </div>
      </section>

      {/* News & Events Tabs */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="news" className="max-w-5xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="news">Latest News</TabsTrigger>
              <TabsTrigger value="events">Upcoming Events</TabsTrigger>
            </TabsList>
            
            <TabsContent value="news">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {newsItems.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: item.id * 0.1 }}
                  >
                    <Card className="h-full flex flex-col overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="relative h-48">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          style={{ objectFit: 'cover' }}
                        />
                        <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-3 py-1">
                          {item.category}
                        </div>
                      </div>
                      <CardContent className="p-6 flex-grow flex flex-col">
                        <div className="text-sm text-gray-500 mb-2">{item.date}</div>
                        <h3 className="text-xl font-semibold mb-3 text-gray-800">{item.title}</h3>
                        <p className="text-gray-600 mb-4 flex-grow">{item.excerpt}</p>
                        <Button variant="outline" className="mt-auto">
                          Read More
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-12 text-center">
                <Button>
                  View All News
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="events">
              <div className="space-y-6">
                {upcomingEvents.map((event) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: event.id * 0.1 }}
                  >
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center">
                          <div className="md:w-1/4 mb-4 md:mb-0">
                            <div className="bg-primary/10 text-primary rounded-lg p-4 text-center">
                              <div className="text-sm font-medium">{event.date.split(',')[0]}</div>
                              <div className="text-lg font-bold">{event.time}</div>
                            </div>
                          </div>
                          <div className="md:w-3/4 md:pl-6">
                            <h3 className="text-xl font-semibold mb-2 text-gray-800">{event.title}</h3>
                            <div className="flex items-center text-gray-500 mb-2">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              <span>{event.location}</span>
                            </div>
                            <p className="text-gray-600 mb-4">{event.description}</p>
                            <div className="flex space-x-3">
                              <Button variant="outline" size="sm">
                                Add to Calendar
                              </Button>
                              <Button size="sm">
                                Learn More
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-12 text-center">
                <Button>
                  View Full Calendar
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">Stay Updated</h2>
            <p className="text-gray-600 mb-8">
              Subscribe to our newsletter to receive the latest news, events, and announcements from Amarck Royal International School.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
              <Button>
                Subscribe
              </Button>
            </div>
            
            <p className="text-xs text-gray-500 mt-4">
              By subscribing, you agree to receive emails from Amarck Royal International School. You can unsubscribe at any time.
            </p>
          </div>
        </div>
      </section>

      {/* School Calendar */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">Academic Calendar</h2>
            <p className="text-gray-600">
              View important dates for the current academic year, including term dates, holidays, and special events.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-primary">First Term</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                        <span className="font-medium">Term Begins</span>
                        <span>September 5, 2025</span>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                        <span className="font-medium">Mid-Term Break</span>
                        <span>October 21-25, 2025</span>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                        <span className="font-medium">Term Ends</span>
                        <span>December 15, 2025</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-primary">Second Term</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                        <span className="font-medium">Term Begins</span>
                        <span>January 10, 2026</span>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                        <span className="font-medium">Mid-Term Break</span>
                        <span>February 24-28, 2026</span>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                        <span className="font-medium">Term Ends</span>
                        <span>April 9, 2026</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-primary">Third Term</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                        <span className="font-medium">Term Begins</span>
                        <span>April 27, 2026</span>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                        <span className="font-medium">Mid-Term Break</span>
                        <span>June 8-12, 2026</span>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                        <span className="font-medium">Term Ends</span>
                        <span>July 23, 2026</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 text-center">
                  <Button>
                    Download Full Calendar
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </PublicWebsiteLayout>
  );
}

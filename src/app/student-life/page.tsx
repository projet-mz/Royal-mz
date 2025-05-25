'use client';

import React from 'react';
import { PublicWebsiteLayout } from '../../components/layout/PublicWebsiteLayout';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function StudentLifePage() {
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
            Student Life
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl max-w-2xl mx-auto"
          >
            Discover the vibrant, enriching experiences that make student life at Amarck Royal International School special.
          </motion.p>
        </div>
      </section>

      {/* Daily Schedule */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">A Day in the Life</h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute left-5 top-0 h-full w-0.5 bg-primary"></div>
              
              <div className="relative mb-8">
                <div className="flex items-center mb-2">
                  <div className="bg-primary text-white rounded-full w-10 h-10 flex items-center justify-center font-bold z-10">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold ml-4 text-gray-800">7:30 AM - Arrival</h3>
                </div>
                <div className="ml-14">
                  <p className="text-gray-600">
                    Students arrive at school, greeted by teachers and staff. Morning assembly begins with announcements, the national anthem, and a brief inspirational message.
                  </p>
                </div>
              </div>
              
              <div className="relative mb-8">
                <div className="flex items-center mb-2">
                  <div className="bg-primary text-white rounded-full w-10 h-10 flex items-center justify-center font-bold z-10">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold ml-4 text-gray-800">8:00 AM - 10:00 AM - Morning Classes</h3>
                </div>
                <div className="ml-14">
                  <p className="text-gray-600">
                    Core academic subjects are taught in the morning when students are most alert. Classes are interactive and engaging, with a mix of teacher instruction and student participation.
                  </p>
                </div>
              </div>
              
              <div className="relative mb-8">
                <div className="flex items-center mb-2">
                  <div className="bg-primary text-white rounded-full w-10 h-10 flex items-center justify-center font-bold z-10">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold ml-4 text-gray-800">10:00 AM - 10:30 AM - Break</h3>
                </div>
                <div className="ml-14">
                  <p className="text-gray-600">
                    Students enjoy a nutritious snack and have time for physical activity and socializing in designated play areas.
                  </p>
                </div>
              </div>
              
              <div className="relative mb-8">
                <div className="flex items-center mb-2">
                  <div className="bg-primary text-white rounded-full w-10 h-10 flex items-center justify-center font-bold z-10">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold ml-4 text-gray-800">10:30 AM - 12:30 PM - Mid-day Classes</h3>
                </div>
                <div className="ml-14">
                  <p className="text-gray-600">
                    Specialized subjects such as science, computer studies, and languages are taught, often incorporating hands-on activities and project-based learning.
                  </p>
                </div>
              </div>
              
              <div className="relative mb-8">
                <div className="flex items-center mb-2">
                  <div className="bg-primary text-white rounded-full w-10 h-10 flex items-center justify-center font-bold z-10">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold ml-4 text-gray-800">12:30 PM - 1:30 PM - Lunch</h3>
                </div>
                <div className="ml-14">
                  <p className="text-gray-600">
                    Students enjoy a balanced, nutritious meal in our cafeteria. This is also a time for socializing and building friendships across grade levels.
                  </p>
                </div>
              </div>
              
              <div className="relative mb-8">
                <div className="flex items-center mb-2">
                  <div className="bg-primary text-white rounded-full w-10 h-10 flex items-center justify-center font-bold z-10">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold ml-4 text-gray-800">1:30 PM - 3:00 PM - Afternoon Classes</h3>
                </div>
                <div className="ml-14">
                  <p className="text-gray-600">
                    Creative subjects like art, music, and physical education are scheduled in the afternoon, providing a balanced approach to learning that engages different parts of the brain.
                  </p>
                </div>
              </div>
              
              <div className="relative">
                <div className="flex items-center mb-2">
                  <div className="bg-primary text-white rounded-full w-10 h-10 flex items-center justify-center font-bold z-10">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold ml-4 text-gray-800">3:00 PM - 4:30 PM - After-School Activities</h3>
                </div>
                <div className="ml-14">
                  <p className="text-gray-600">
                    Students participate in various clubs, sports, and enrichment programs based on their interests and talents. These activities foster teamwork, leadership, and specialized skills.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Extracurricular Activities */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Extracurricular Activities</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 relative">
                <Image
                  src="/images/friday sports.jpg"
                  alt="Sports activities"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-primary">Sports</h3>
                <p className="text-gray-600 mb-4">
                  Our comprehensive sports program includes football, basketball, volleyball, athletics, swimming, and more. Students develop physical fitness, teamwork, and sportsmanship through regular practice and competitions.
                </p>
                <ul className="list-disc list-inside text-gray-600">
                  <li>Inter-house sports competitions</li>
                  <li>Regional and national tournaments</li>
                  <li>Professional coaching</li>
                  <li>Sports day celebrations</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 relative">
                <Image
                  src="/images/traditional .jpg"
                  alt="Arts and culture"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-primary">Arts &amp; Culture</h3>
                <p className="text-gray-600 mb-4">
                  Students explore their creative talents through various artistic and cultural activities. Our programs nurture self-expression, cultural appreciation, and performance skills.
                </p>
                <ul className="list-disc list-inside text-gray-600">
                  <li>School choir and band</li>
                  <li>Drama and theater productions</li>
                  <li>Visual arts exhibitions</li>
                  <li>Cultural dance and music</li>
                  <li>Annual arts festival</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 relative">
                <Image
                  src="/images/ACTIVITY.jpg"
                  alt="Academic clubs"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-primary">Academic Clubs</h3>
                <p className="text-gray-600 mb-4">
                  Our academic clubs extend learning beyond the classroom, allowing students to delve deeper into subjects they&apos;re passionate about and develop specialized skills.
                </p>
                <ul className="list-disc list-inside text-gray-600">
                  <li>Science and robotics club</li>
                  <li>Mathematics olympiad team</li>
                  <li>Debate and public speaking</li>
                  <li>Creative writing and journalism</li>
                  <li>Coding and technology club</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Student Support */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Student Support &amp; Wellbeing</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-primary">Academic Support</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="text-primary mr-2">✓</div>
                  <div>
                    <strong className="text-gray-800">Personalized Learning Plans</strong>
                    <p className="text-gray-600">Tailored support for students with different learning needs and abilities</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="text-primary mr-2">✓</div>
                  <div>
                    <strong className="text-gray-800">After-School Tutoring</strong>
                    <p className="text-gray-600">Additional help in challenging subjects</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="text-primary mr-2">✓</div>
                  <div>
                    <strong className="text-gray-800">Study Skills Workshops</strong>
                    <p className="text-gray-600">Training in effective learning strategies</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="text-primary mr-2">✓</div>
                  <div>
                    <strong className="text-gray-800">Resource Center</strong>
                    <p className="text-gray-600">Access to learning materials and technology</p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-primary">Wellbeing Services</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="text-primary mr-2">✓</div>
                  <div>
                    <strong className="text-gray-800">School Counselor</strong>
                    <p className="text-gray-600">Professional support for emotional and social development</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="text-primary mr-2">✓</div>
                  <div>
                    <strong className="text-gray-800">Health Services</strong>
                    <p className="text-gray-600">On-campus medical care and health education</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="text-primary mr-2">✓</div>
                  <div>
                    <strong className="text-gray-800">Mentorship Program</strong>
                    <p className="text-gray-600">Guidance from teachers and older students</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="text-primary mr-2">✓</div>
                  <div>
                    <strong className="text-gray-800">Life Skills Training</strong>
                    <p className="text-gray-600">Development of essential personal and social skills</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Student Testimonials */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Student Voices</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
              <p className="italic mb-4">
                &quot;The teachers at Amarck Royal don&apos;t just teach subjects; they inspire us to be curious and think critically. I&apos;ve discovered my passion for science through the amazing lab activities and science club.&quot;
              </p>
              <div className="font-semibold">Kofi A. - Grade 8</div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
              <p className="italic mb-4">
                &quot;I love our sports program! Through football, I&apos;ve learned about teamwork, discipline, and perseverance. The coaches push us to be our best while making sure we have fun.&quot;
              </p>
              <div className="font-semibold">Ama B. - Grade 6</div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
              <p className="italic mb-4">
                &quot;Being part of the school choir has helped me build confidence and make friends across different grades. Our annual performances are something I always look forward to.&quot;
              </p>
              <div className="font-semibold">David K. - Grade 9</div>
            </div>
          </div>
        </div>
      </section>
    </PublicWebsiteLayout>
  );
}

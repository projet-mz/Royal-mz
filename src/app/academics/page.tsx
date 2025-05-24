'use client';

import React from 'react';
import { PublicWebsiteLayout } from '../../components/layout/PublicWebsiteLayout';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function AcademicsPage() {
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
            Academic Excellence
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl max-w-2xl mx-auto"
          >
            Our comprehensive curriculum is designed to nurture intellectual curiosity, critical thinking, and a lifelong love of learning.
          </motion.p>
        </div>
      </section>

      {/* Curriculum Overview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Our Curriculum</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-4 text-primary">Early Childhood (K1-K2)</h3>
              <p className="text-gray-600 mb-4">Our early childhood program focuses on developing foundational skills through play-based learning, fostering creativity, and building social skills.</p>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>Phonics and early literacy</li>
                <li>Number recognition and counting</li>
                <li>Creative arts and expression</li>
                <li>Physical development</li>
                <li>Social and emotional learning</li>
              </ul>
            </div>
            
            <div className="bg-gray-50 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-4 text-primary">Primary School (Grades 1-6)</h3>
              <p className="text-gray-600 mb-4">Our primary curriculum builds strong academic foundations while encouraging curiosity and independent thinking.</p>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>Language Arts and Literature</li>
                <li>Mathematics</li>
                <li>Science and Technology</li>
                <li>Social Studies</li>
                <li>Physical Education</li>
                <li>Creative Arts</li>
                <li>Character Education</li>
              </ul>
            </div>
            
            <div className="bg-gray-50 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-4 text-primary">Junior High School (Grades 7-9)</h3>
              <p className="text-gray-600 mb-4">Our junior high program prepares students for higher education with rigorous academics and opportunities for specialization.</p>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>Advanced Mathematics</li>
                <li>Language and Literature</li>
                <li>Integrated Science</li>
                <li>Social Studies and Citizenship</li>
                <li>Information Technology</li>
                <li>Foreign Language (French)</li>
                <li>Pre-vocational Skills</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Special Programs */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Special Programs</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-4 text-primary">STEM Education</h3>
              <p className="text-gray-600">
                Our STEM program integrates Science, Technology, Engineering, and Mathematics through hands-on projects and real-world problem solving. Students develop critical thinking, collaboration, and innovation skills essential for future success.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-4 text-primary">Language Enrichment</h3>
              <p className="text-gray-600">
                Beyond English language instruction, we offer French language education starting from primary grades. Our language programs focus on communication skills, cultural awareness, and practical language use.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-4 text-primary">Arts and Music</h3>
              <p className="text-gray-600">
                Our comprehensive arts program includes visual arts, music, dance, and drama. Students explore various artistic techniques, develop their talents, and participate in school productions and exhibitions throughout the year.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-4 text-primary">Character Development</h3>
              <p className="text-gray-600">
                We integrate character education throughout our curriculum, focusing on values such as integrity, responsibility, respect, and perseverance. Through community service projects and leadership opportunities, students develop into well-rounded individuals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Faculty */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Our Faculty</h2>
          
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-gray-600 mb-8">
              Our dedicated teachers are experts in their fields with advanced degrees and years of experience in education. They are committed to creating engaging learning environments and providing individualized attention to help each student reach their full potential.
            </p>
            
            <div className="flex justify-center">
              <Link 
                href="/contact-us" 
                className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-base font-medium text-white shadow hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                Meet Our Teachers
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PublicWebsiteLayout>
  );
}

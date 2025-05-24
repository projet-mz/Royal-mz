'use client';

import React from 'react';
import { PublicWebsiteLayout } from '../../components/layout/PublicWebsiteLayout';
import Image from 'next/image';

export default function AboutUsPage() {
  return (
    <PublicWebsiteLayout>
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-primary to-secondary">
        <div className="container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Amarck Royal</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Nurturing Excellence, Building Character, Shaping the Future
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-primary">Our Mission</h2>
              <p className="text-gray-600 mb-8">
                At Amarck Royal International School, our mission is to provide a holistic education that nurtures academic excellence, character development, and global citizenship. We are committed to creating a supportive learning environment where students can discover their unique talents, develop critical thinking skills, and become compassionate leaders ready to make a positive impact in the world.
              </p>
              
              <h2 className="text-3xl font-bold mb-6 text-primary">Our Vision</h2>
              <p className="text-gray-600">
                Our vision is to be a leading educational institution that inspires a lifelong love of learning, fosters innovation, and cultivates ethical leadership. We aspire to produce well-rounded graduates who are intellectually curious, culturally aware, and equipped with the knowledge, skills, and values needed to thrive in an ever-changing global society.
              </p>
            </div>
            
            <div className="relative h-[500px] rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/images/ELLA MAIN.jpg"
                alt="Amarck Royal International School"
                fill
                style={{ objectFit: 'cover' }}
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">Our Core Values</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              These fundamental principles guide our approach to education and shape our school culture.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-center text-gray-800">Excellence</h3>
              <p className="text-gray-600 text-center">
                We strive for excellence in all aspects of education, encouraging students to reach their highest potential academically, socially, and personally.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-center text-gray-800">Integrity</h3>
              <p className="text-gray-600 text-center">
                We uphold the highest standards of honesty, ethics, and responsibility, teaching students to act with integrity in all situations.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-center text-gray-800">Global Citizenship</h3>
              <p className="text-gray-600 text-center">
                We foster an understanding and appreciation of diverse cultures, preparing students to be responsible global citizens.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our History */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl order-2 md:order-1">
              <Image
                src="/images/school activity.jpg"
                alt="Amarck Royal International School History"
                fill
                style={{ objectFit: 'cover' }}
                className="rounded-lg"
              />
            </div>
            
            <div className="order-1 md:order-2">
              <h2 className="text-3xl font-bold mb-6 text-primary">Our History</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Amarck Royal International School was founded in 2005 with a vision to provide quality education that combines academic excellence with character development. Starting with just 50 students and 5 teachers in a small building, our school has grown significantly over the years.
                </p>
                <p>
                  In 2010, we expanded our campus to accommodate our growing student population and introduced additional programs in science, technology, arts, and sports. Our commitment to holistic education has remained unwavering throughout our journey.
                </p>
                <p>
                  By 2015, Amarck Royal had established itself as one of the leading educational institutions in the region, known for its academic rigor, innovative teaching methods, and strong community values. We introduced international exchange programs and partnerships with schools around the world.
                </p>
                <p>
                  Today, we continue to build on our rich heritage while embracing modern educational approaches and technologies. Our state-of-the-art facilities, dedicated faculty, and diverse student body create a dynamic learning environment where every student can thrive.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">Contact Us</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              We welcome your inquiries and look forward to hearing from you. Feel free to reach out to us using the contact information below.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2 text-center">Address</h3>
              <p className="text-gray-600 text-center">
                Lashibi, Sakumono Estate<br />
                Tema Metropolitan<br />
                Greater Accra Region, Ghana
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2 text-center">Phone</h3>
              <p className="text-gray-600 text-center">
                <a href="tel:+233302969082" className="hover:text-primary transition-colors">+233 302 96 90 82</a><br />
                <span className="text-sm">Monday - Friday: 8:00 AM - 4:30 PM</span>
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2 text-center">Email</h3>
              <p className="text-gray-600 text-center">
                <a href="mailto:info@amarckroyal.edu.gh" className="hover:text-primary transition-colors">info@amarckroyal.edu.gh</a><br />
                <a href="https://www.amarckroyal.edu.gh" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">www.amarckroyal.edu.gh</a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </PublicWebsiteLayout>
  );
}

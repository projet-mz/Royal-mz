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
            
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-center text-gray-800">Respect</h3>
              <p className="text-gray-600 text-center">
                We cultivate a culture of respect for self, others, and the environment, valuing the dignity and worth of every individual.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-center text-gray-800">Innovation</h3>
              <p className="text-gray-600 text-center">
                We embrace creativity and innovation, encouraging students to think critically, solve problems, and adapt to a rapidly changing world.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-center text-gray-800">Compassion</h3>
              <p className="text-gray-600 text-center">
                We nurture empathy and compassion, encouraging students to understand others' perspectives and contribute positively to their communities.
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

      {/* Leadership Team */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">Our Leadership</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Meet the dedicated professionals who guide our school's vision and operations.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <div className="p-6 text-center">
                <div className="w-24 h-24 rounded-full bg-gray-200 mx-auto mb-4"></div>
                <h3 className="text-xl font-semibold mb-1 text-gray-800">Dr. Emmanuel Osei</h3>
                <p className="text-primary font-medium mb-3">School Director</p>
                <p className="text-gray-600 text-sm">
                  With over 25 years of experience in education, Dr. Osei leads our school with vision and dedication to academic excellence.
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <div className="p-6 text-center">
                <div className="w-24 h-24 rounded-full bg-gray-200 mx-auto mb-4"></div>
                <h3 className="text-xl font-semibold mb-1 text-gray-800">Mrs. Abena Mensah</h3>
                <p className="text-primary font-medium mb-3">Academic Director</p>
                <p className="text-gray-600 text-sm">
                  Mrs. Mensah oversees our curriculum development and ensures high standards of teaching and learning across all grade levels.
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <div className="p-6 text-center">
                <div className="w-24 h-24 rounded-full bg-gray-200 mx-auto mb-4"></div>
                <h3 className="text-xl font-semibold mb-1 text-gray-800">Mr. Kofi Adu</h3>
                <p className="text-primary font-medium mb-3">Administrative Director</p>
                <p className="text-gray-600 text-sm">
                  Mr. Adu manages the school's operations, facilities, and administrative functions to support our educational mission.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Accreditation & Affiliations */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">Accreditation & Affiliations</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Amarck Royal International School maintains high standards through accreditation and partnerships with respected educational organizations.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="bg-gray-50 p-4 rounded-lg flex items-center justify-center h-24">
              <div className="text-center">
                <div className="font-semibold text-gray-800">Ghana Education Service</div>
                <div className="text-xs text-gray-500">Fully Accredited</div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg flex items-center justify-center h-24">
              <div className="text-center">
                <div className="font-semibold text-gray-800">Cambridge Assessment</div>
                <div className="text-xs text-gray-500">International Partner</div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg flex items-center justify-center h-24">
              <div className="text-center">
                <div className="font-semibold text-gray-800">Association of International Schools in Africa</div>
                <div className="text-xs text-gray-500">Member</div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg flex items-center justify-center h-24">
              <div className="text-center">
                <div className="font-semibold text-gray-800">STEM Education Coalition</div>
                <div className="text-xs text-gray-500">Partner School</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PublicWebsiteLayout>
  );
}

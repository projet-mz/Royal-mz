'use client';

import React from 'react';
import { PublicWebsiteLayout } from '../../components/layout/PublicWebsiteLayout';
import Image from 'next/image';

export default function FacilitiesPage() {
  const facilities = [
    {
      title: "Modern Classrooms",
      description: "Our spacious, air-conditioned classrooms are equipped with interactive whiteboards and comfortable furniture designed for optimal learning experiences.",
      imageSrc: "/images/lab activity.jpg",
    },
    {
      title: "Science Laboratories",
      description: "State-of-the-art science labs for physics, chemistry, and biology provide hands-on learning opportunities with modern equipment and safety features.",
      imageSrc: "/images/lab activity.jpg",
    },
    {
      title: "Computer Labs",
      description: "Our computer labs feature the latest hardware and software, providing students with access to technology for research, programming, and digital literacy.",
      imageSrc: "/images/ACTIVITY.jpg",
    },
    {
      title: "Library & Media Center",
      description: "Our comprehensive library houses thousands of books, digital resources, and quiet study spaces to foster a love of reading and independent research.",
      imageSrc: "/images/school activity.jpg",
    }
  ];

  return (
    <PublicWebsiteLayout>
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-primary to-secondary">
        <div className="container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Facilities</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Explore the modern facilities and resources that enhance the educational experience at Amarck Royal International School.
          </p>
        </div>
      </section>

      {/* Facilities Overview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">World-Class Learning Environment</h2>
            <p className="text-gray-600">
              At Amarck Royal International School, we provide state-of-the-art facilities designed to support academic excellence, creative expression, physical development, and overall student well-being.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {facilities.map((facility, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="relative h-64">
                  <Image
                    src={facility.imageSrc}
                    alt={facility.title}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-primary">{facility.title}</h3>
                  <p className="text-gray-600">{facility.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Campus Map */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Campus Map</h2>
            <p className="text-gray-600">
              Our thoughtfully designed campus provides a safe, inspiring environment for learning and growth.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="mb-6">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.587906824373!2d-0.05488742501430401!3d5.6276874943533945!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf874037588795%3A0xc2efc85e93269293!2sArmack%20Royal%20international%20school!5e0!3m2!1sen!2sgh!4v1748052920362!5m2!1sen!2sgh" 
                width="100%" 
                height="450" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-md"
              ></iframe>
            </div>
            
            <div className="text-center">
              <a 
                href="https://maps.app.goo.gl/xEy7apABksjdnha3A" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-base font-medium text-white shadow hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                Get Directions
              </a>
            </div>
          </div>
        </div>
      </section>
    </PublicWebsiteLayout>
  );
}

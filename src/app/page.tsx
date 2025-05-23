import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { PublicWebsiteLayout } from '@/components/layout/PublicWebsiteLayout';

export default function Home() {
  return (
    <PublicWebsiteLayout>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url("/images/ELLA MAIN.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.7)'
          }}
        />
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 z-1 bg-gradient-to-r from-primary/30 to-secondary/30"
        />
        <div className="container relative z-10 text-center text-white px-4">
          <motion.h1 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-7xl font-bold mb-4"
          >
            Amarck Royal International School
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto"
          >
            Nurturing Excellence, Building Character, Shaping the Future
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/admissions"
              className="inline-flex h-12 items-center justify-center rounded-md bg-gradient-to-r from-primary to-secondary px-8 text-base font-medium text-white shadow-xl transition-all hover:scale-105 hover:shadow-lg focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            >
              Apply Now
            </Link>
            <Link
              href="/login"
              className="inline-flex h-12 items-center justify-center rounded-md border border-white/80 bg-white/20 backdrop-blur-sm px-8 text-base font-medium text-white shadow-sm transition-colors hover:bg-white/30 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            >
              School Portal
            </Link>
          </motion.div>
        </div>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="absolute bottom-8 left-0 right-0 flex justify-center"
        >
          <a 
            href="#about" 
            className="text-white animate-bounce hover:text-primary transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 13l5 5 5-5M7 6l5 5 5-5"/></svg>
          </a>
        </motion.div>
      </section>
      
      {/* About Section */}
      <section id="about" className="py-20 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="md:w-1/2"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">About Amarck Royal</h2>
              <p className="text-gray-700 mb-4">
                Established in 2005, Amarck Royal International School has been a beacon of academic excellence and holistic education in Ghana. We are committed to nurturing young minds into responsible global citizens equipped with the knowledge, skills, and values to excel in an ever-changing world.
              </p>
              <p className="text-gray-700 mb-4">
                Our comprehensive curriculum spans from Creche (Ages 1-3) to Junior High School (JHS3), providing a seamless educational journey that adapts to the developmental needs of each child.
              </p>
              <p className="text-gray-700 mb-6">
                At Amarck Royal, we combine academic rigor with creative exploration, character development, and cultural awareness to ensure our students reach their full potential.
              </p>
              <motion.div
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Link
                  href="/about"
                  className="inline-flex items-center text-primary hover:text-primary-700 font-medium"
                >
                  Learn more about our school
                  <svg className="ml-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </Link>
              </motion.div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="md:w-1/2 relative"
            >
              <motion.div 
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="rounded-lg overflow-hidden shadow-xl relative z-10"
              >
                <Image
                  src="/images/ELLA MAIN.jpg"
                  alt="Students at Amarck Royal"
                  width={600}
                  height={400}
                  className="w-full h-auto"
                />
              </motion.div>
              <motion.div 
                animate={{ 
                  scale: [1, 1.05, 1],
                  rotate: [0, 5, 0]
                }}
                transition={{ 
                  duration: 5,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
                className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/20 rounded-full -z-0"
              ></motion.div>
              <motion.div 
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, -5, 0]
                }}
                transition={{ 
                  duration: 6,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
                className="absolute -top-6 -left-6 w-24 h-24 bg-secondary/20 rounded-full -z-0"
              ></motion.div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Key Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-16"
          >
            Why Choose Amarck Royal?
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Academic Excellence",
                description: "Comprehensive curriculum aligned with international standards and enhanced with local relevance.",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
                ),
                image: "/images/lab activity.jpg"
              },
              {
                title: "State-of-the-Art Facilities",
                description: "Modern classrooms, laboratories, libraries, and recreational spaces that enhance the learning experience.",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
                ),
                image: "/images/ACTIVITY.jpg"
              },
              {
                title: "Qualified Faculty",
                description: "Experienced, qualified, and passionate teachers dedicated to bringing out the best in every student.",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                ),
                image: "/images/friday sports.jpg"
              },
              {
                title: "Holistic Development",
                description: "Focus on academic, social, emotional, physical, and ethical development of every child.",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0"/><path d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8"/></svg>
                ),
                image: "/images/traditional .jpg"
              }
            ].map((feature, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                }}
                className="bg-white rounded-lg overflow-hidden shadow-lg"
              >
                <div className="h-48 overflow-hidden">
                  <Image
                    src={feature.image || "/images/school-hero.jpg"}
                    alt={feature.title}
                    width={400}
                    height={300}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="p-6 text-center">
                  <motion.div 
                    className="text-primary mb-4 flex justify-center"
                    animate={{ 
                      scale: [1, 1.1, 1],
                    }}
                    transition={{ 
                      duration: 2,
                      ease: "easeInOut",
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  >
                    {feature.icon}
                  </motion.div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-primary to-secondary text-white relative overflow-hidden">
        <motion.div 
          className="absolute inset-0 bg-white/5"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        />
        
        {/* Animated background elements */}
        <motion.div 
          className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 10, 0],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ 
            duration: 8,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        
        <motion.div 
          className="absolute -bottom-32 -left-32 w-96 h-96 bg-white/10 rounded-full"
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, -5, 0],
            opacity: [0.1, 0.15, 0.1]
          }}
          transition={{ 
            duration: 10,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-6"
          >
            Join the Amarck Royal Family
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl mb-8 max-w-2xl mx-auto"
          >
            Begin your child's journey to academic excellence and holistic development today.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/admissions"
                className="inline-flex h-12 items-center justify-center rounded-md bg-white px-8 text-base font-medium text-primary shadow-xl transition-all hover:shadow-lg focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              >
                Apply for Admission
              </Link>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/login"
                className="inline-flex h-12 items-center justify-center rounded-md border border-white/80 bg-transparent px-8 text-base font-medium text-white shadow-sm transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              >
                School Portal
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </PublicWebsiteLayout>
  );
}                                      
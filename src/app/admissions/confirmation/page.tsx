'use client';

import React from 'react';
import { PublicWebsiteLayout } from '../../../components/layout/PublicWebsiteLayout';
import { motion } from 'framer-motion';
import { Button } from '../../../components/ui/button';
import { Card, CardContent } from '../../../components/ui/card';
import Link from 'next/link';

export default function ApplicationConfirmationPage() {
  return (
    <PublicWebsiteLayout>
      {/* Hero Section */}
      <section className="relative py-16 bg-gradient-to-r from-primary to-secondary">
        <div className="container mx-auto px-4 text-center text-white">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Application Submitted
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg max-w-2xl mx-auto"
          >
            Thank you for applying to Amarck Royal International School.
          </motion.p>
        </div>
      </section>

      {/* Confirmation Content */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Card className="shadow-lg">
              <CardContent className="p-8">
                <div className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Application Successfully Submitted!</h2>
                  
                  <p className="text-gray-600 mb-6">
                    Your application to Amarck Royal International School has been received. Our admissions team will review your application and contact you within 5-7 business days regarding the next steps in the admissions process.
                  </p>
                  
                  <div className="bg-gray-100 rounded-lg p-6 w-full mb-8">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">What Happens Next?</h3>
                    <ol className="text-left space-y-3 text-gray-600">
                      <li className="flex items-start">
                        <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">1</span>
                        <span>Our admissions team will review your application.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">2</span>
                        <span>You will receive an email confirmation with your application reference number.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">3</span>
                        <span>If your application meets our initial requirements, we will contact you to schedule an assessment and interview.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">4</span>
                        <span>Final admission decisions will be communicated within 2 weeks after the assessment.</span>
                      </li>
                    </ol>
                  </div>
                  
                  <p className="text-gray-600 mb-8">
                    If you have any questions about your application or the admissions process, please contact our admissions office at <a href="tel:+233302969082" className="text-primary hover:underline">+233 302 96 90 82</a> or <a href="mailto:admissions@amarckroyal.edu.gh" className="text-primary hover:underline">admissions@amarckroyal.edu.gh</a>.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link href="/">
                      <Button variant="outline" className="min-w-[150px]">
                        Return to Home
                      </Button>
                    </Link>
                    <Link href="/admissions">
                      <Button className="min-w-[150px]">
                        Back to Admissions
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </PublicWebsiteLayout>
  );
}

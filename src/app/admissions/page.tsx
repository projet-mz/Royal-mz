'use client';

import React from 'react';
import { PublicWebsiteLayout } from '@/components/layout/PublicWebsiteLayout';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function AdmissionsPage() {
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
            Join Our School Community
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl max-w-2xl mx-auto mb-8"
          >
            Begin your journey to academic excellence and character development at Amarck Royal International School.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Button 
              size="lg"
              className="bg-white text-primary hover:bg-gray-100"
            >
              Apply Now
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Admissions Process */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Admissions Process</h2>
          
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <div className="absolute left-5 top-0 h-full w-0.5 bg-primary"></div>
              
              <div className="relative mb-12">
                <div className="flex items-center mb-4">
                  <div className="bg-primary text-white rounded-full w-10 h-10 flex items-center justify-center font-bold z-10">1</div>
                  <h3 className="text-xl font-bold ml-4 text-gray-800">Inquiry and School Visit</h3>
                </div>
                <div className="ml-14">
                  <p className="text-gray-600">
                    Contact our admissions office to schedule a campus tour. Experience our facilities, meet our teachers, and learn about our educational programs firsthand.
                  </p>
                </div>
              </div>
              
              <div className="relative mb-12">
                <div className="flex items-center mb-4">
                  <div className="bg-primary text-white rounded-full w-10 h-10 flex items-center justify-center font-bold z-10">2</div>
                  <h3 className="text-xl font-bold ml-4 text-gray-800">Application Submission</h3>
                </div>
                <div className="ml-14">
                  <p className="text-gray-600">
                    Complete and submit the application form along with all required documents, including previous academic records, birth certificate, passport photos, and any applicable fee.
                  </p>
                </div>
              </div>
              
              <div className="relative mb-12">
                <div className="flex items-center mb-4">
                  <div className="bg-primary text-white rounded-full w-10 h-10 flex items-center justify-center font-bold z-10">3</div>
                  <h3 className="text-xl font-bold ml-4 text-gray-800">Assessment</h3>
                </div>
                <div className="ml-14">
                  <p className="text-gray-600">
                    Students applying for admission will take an age-appropriate assessment to determine their academic readiness and proper grade placement.
                  </p>
                </div>
              </div>
              
              <div className="relative mb-12">
                <div className="flex items-center mb-4">
                  <div className="bg-primary text-white rounded-full w-10 h-10 flex items-center justify-center font-bold z-10">4</div>
                  <h3 className="text-xl font-bold ml-4 text-gray-800">Interview</h3>
                </div>
                <div className="ml-14">
                  <p className="text-gray-600">
                    Selected applicants and their parents will be invited for an interview with school administrators to discuss educational goals and expectations.
                  </p>
                </div>
              </div>
              
              <div className="relative">
                <div className="flex items-center mb-4">
                  <div className="bg-primary text-white rounded-full w-10 h-10 flex items-center justify-center font-bold z-10">5</div>
                  <h3 className="text-xl font-bold ml-4 text-gray-800">Acceptance and Enrollment</h3>
                </div>
                <div className="ml-14">
                  <p className="text-gray-600">
                    Successful applicants will receive an acceptance letter. Complete the enrollment process by paying the required fees and submitting any additional documentation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Required Documents</h2>
          
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="mr-3 text-primary">✓</div>
                <div>
                  <strong className="text-gray-800">Completed Application Form</strong>
                  <p className="text-gray-600">Available online or at our admissions office</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="mr-3 text-primary">✓</div>
                <div>
                  <strong className="text-gray-800">Birth Certificate</strong>
                  <p className="text-gray-600">Original and photocopy</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="mr-3 text-primary">✓</div>
                <div>
                  <strong className="text-gray-800">Passport Photos</strong>
                  <p className="text-gray-600">Four recent passport-sized photographs</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="mr-3 text-primary">✓</div>
                <div>
                  <strong className="text-gray-800">Previous School Records</strong>
                  <p className="text-gray-600">Report cards and transcripts from the last two years</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="mr-3 text-primary">✓</div>
                <div>
                  <strong className="text-gray-800">Recommendation Letter</strong>
                  <p className="text-gray-600">From previous school (for students entering grades 4 and above)</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="mr-3 text-primary">✓</div>
                <div>
                  <strong className="text-gray-800">Medical Records</strong>
                  <p className="text-gray-600">Immunization records and health assessment form</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Fees Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Tuition & Fees</h2>
          
          <div className="max-w-3xl mx-auto bg-gray-50 rounded-lg shadow-md p-6">
            <p className="text-gray-600 mb-6">
              Our fee structure includes a one-time registration fee, annual tuition fees (which can be paid per term), and additional fees for specific activities and services.
            </p>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold mb-2 text-gray-800">Registration Fee (One-time)</h4>
                <p className="text-gray-600">GHC 1,500</p>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-2 text-gray-800">Annual Tuition Fees</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Kindergarten:</span>
                    <span className="font-medium text-gray-800">GHC 9,000 per annum</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Primary School (Grades 1-6):</span>
                    <span className="font-medium text-gray-800">GHC 12,000 per annum</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Junior High (Grades 7-9):</span>
                    <span className="font-medium text-gray-800">GHC 15,000 per annum</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-2 text-gray-800">Additional Fees</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Books and Materials:</span>
                    <span className="font-medium text-gray-800">GHC 1,200 per annum</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Technology Fee:</span>
                    <span className="font-medium text-gray-800">GHC 800 per annum</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">School Uniform:</span>
                    <span className="font-medium text-gray-800">GHC 600</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Transportation (Optional):</span>
                    <span className="font-medium text-gray-800">Varies by distance</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-primary/10 rounded-md">
              <p className="text-sm text-primary">
                Note: Fees are subject to change. Siblings receive a 10% discount on tuition fees. Please contact the admissions office for the most current fee structure.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Apply?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Start your application process today and take the first step toward a quality education for your child.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-white text-primary hover:bg-gray-100"
            >
              Apply Online
            </Button>
            <Link href="/contact-us">
              <Button 
                variant="outline" 
                size="lg"
                className="border-white text-white hover:bg-white/10"
              >
                Contact Admissions
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </PublicWebsiteLayout>
  );
}

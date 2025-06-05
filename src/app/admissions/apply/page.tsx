'use client';

import React, { useState } from 'react';
import { PublicWebsiteLayout } from '../../../components/layout/PublicWebsiteLayout';
import { motion } from 'framer-motion';
import { Button } from '../../../components/ui/button';
import { Card, CardContent, CardHeader } from '../../../components/ui/card';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Textarea } from '../../../components/ui/textarea';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ApplicationFormPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    studentFirstName: "",
    studentLastName: "",
    dateOfBirth: "",
    gender: "",
    gradeApplying: "",
    previousSchool: "",
    parentFirstName: "",
    parentLastName: "",
    relationship: "",
    email: "",
    phone: "",
    address: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
    emergencyContactRelationship: "",
    medicalConditions: "",
    allergies: "",
    medications: "",
    agreeTerms: false,
  });
  
  const [errors, setErrors] = useState({
    studentFirstName: "",
    studentLastName: "",
    dateOfBirth: "",
    gender: "",
    gradeApplying: "",
    parentFirstName: "",
    parentLastName: "",
    relationship: "",
    email: "",
    phone: "",
    address: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
    emergencyContactRelationship: "",
    agreeTerms: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };
  
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }));
    
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validateStep1 = () => {
    const newErrors = { ...errors };
    let isValid = true;
    
    if (!formData.studentFirstName) {
      newErrors.studentFirstName = "First name is required";
      isValid = false;
    }
    
    if (!formData.studentLastName) {
      newErrors.studentLastName = "Last name is required";
      isValid = false;
    }
    
    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = "Date of birth is required";
      isValid = false;
    }
    
    if (!formData.gender) {
      newErrors.gender = "Gender is required";
      isValid = false;
    }
    
    if (!formData.gradeApplying) {
      newErrors.gradeApplying = "Grade is required";
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };
  
  const validateStep2 = () => {
    const newErrors = { ...errors };
    let isValid = true;
    
    if (!formData.parentFirstName) {
      newErrors.parentFirstName = "First name is required";
      isValid = false;
    }
    
    if (!formData.parentLastName) {
      newErrors.parentLastName = "Last name is required";
      isValid = false;
    }
    
    if (!formData.relationship) {
      newErrors.relationship = "Relationship is required";
      isValid = false;
    }
    
    if (!formData.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
      isValid = false;
    }
    
    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
      isValid = false;
    }
    
    if (!formData.address) {
      newErrors.address = "Address is required";
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };
  
  const validateStep3 = () => {
    const newErrors = { ...errors };
    let isValid = true;
    
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = "You must agree to the terms and conditions";
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step === 3 && validateStep3()) {
      setIsSubmitting(true);
      
      try {
        console.log(formData);
        
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        router.push('/admissions/confirmation');
      } catch (error) {
        alert("There was an error submitting your application. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const nextStep = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    } else if (step === 2 && validateStep2()) {
      setStep(3);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

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
            Application Form
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg max-w-2xl mx-auto"
          >
            Please complete all sections of this application form. Fields marked with an asterisk (*) are required.
          </motion.p>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="shadow-lg">
              <CardHeader className="pb-4">
                <h2 className="text-2xl text-center font-bold">Student Application</h2>
                <p className="text-center text-gray-500">
                  Application for Admission to Amarck Royal International School
                </p>
                
                <div className="flex justify-center mt-6">
                  <div className="flex items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}`}>1</div>
                    <div className={`w-16 h-1 ${step >= 2 ? 'bg-primary' : 'bg-gray-200'}`}></div>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}`}>2</div>
                    <div className={`w-16 h-1 ${step >= 3 ? 'bg-primary' : 'bg-gray-200'}`}></div>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}`}>3</div>
                  </div>
                </div>
                
                <div className="flex justify-center mt-2">
                  <div className="flex text-sm">
                    <div className="w-10 text-center">Student</div>
                    <div className="w-16"></div>
                    <div className="w-10 text-center">Parent</div>
                    <div className="w-16"></div>
                    <div className="w-10 text-center">Medical</div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {step === 1 && (
                    <div className="space-y-6">
                      <div className="text-xl font-semibold text-gray-800 mb-4">Student Information</div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="studentFirstName">First Name *</Label>
                          <Input 
                            id="studentFirstName"
                            name="studentFirstName"
                            placeholder="Enter first name"
                            value={formData.studentFirstName}
                            onChange={handleChange}
                          />
                          {errors.studentFirstName && (
                            <p className="text-red-500 text-sm">{errors.studentFirstName}</p>
                          )}
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="studentLastName">Last Name *</Label>
                          <Input 
                            id="studentLastName"
                            name="studentLastName"
                            placeholder="Enter last name"
                            value={formData.studentLastName}
                            onChange={handleChange}
                          />
                          {errors.studentLastName && (
                            <p className="text-red-500 text-sm">{errors.studentLastName}</p>
                          )}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                          <Input 
                            id="dateOfBirth"
                            name="dateOfBirth"
                            type="date"
                            value={formData.dateOfBirth}
                            onChange={handleChange}
                          />
                          {errors.dateOfBirth && (
                            <p className="text-red-500 text-sm">{errors.dateOfBirth}</p>
                          )}
                        </div>
                        
                        <div className="space-y-2">
                          <Label>Gender *</Label>
                          <div className="flex space-x-4">
                            <div className="flex items-center">
                              <input
                                type="radio"
                                id="male"
                                name="gender"
                                value="male"
                                checked={formData.gender === "male"}
                                onChange={handleChange}
                                className="mr-2"
                              />
                              <Label htmlFor="male">Male</Label>
                            </div>
                            <div className="flex items-center">
                              <input
                                type="radio"
                                id="female"
                                name="gender"
                                value="female"
                                checked={formData.gender === "female"}
                                onChange={handleChange}
                                className="mr-2"
                              />
                              <Label htmlFor="female">Female</Label>
                            </div>
                          </div>
                          {errors.gender && (
                            <p className="text-red-500 text-sm">{errors.gender}</p>
                          )}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="gradeApplying">Grade Applying For *</Label>
                          <select
                            id="gradeApplying"
                            name="gradeApplying"
                            value={formData.gradeApplying}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          >
                            <option value="">Select a grade</option>
                            <option value="kindergarten1">Kindergarten 1</option>
                            <option value="kindergarten2">Kindergarten 2</option>
                            <option value="grade1">Grade 1</option>
                            <option value="grade2">Grade 2</option>
                            <option value="grade3">Grade 3</option>
                            <option value="grade4">Grade 4</option>
                            <option value="grade5">Grade 5</option>
                            <option value="grade6">Grade 6</option>
                            <option value="jhs1">JHS 1</option>
                            <option value="jhs2">JHS 2</option>
                            <option value="jhs3">JHS 3</option>
                          </select>
                          {errors.gradeApplying && (
                            <p className="text-red-500 text-sm">{errors.gradeApplying}</p>
                          )}
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="previousSchool">Previous School (if any)</Label>
                          <Input 
                            id="previousSchool"
                            name="previousSchool"
                            placeholder="Enter previous school"
                            value={formData.previousSchool}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {step === 2 && (
                    <div className="space-y-6">
                      <div className="text-xl font-semibold text-gray-800 mb-4">Parent/Guardian Information</div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="parentFirstName">First Name *</Label>
                          <Input 
                            id="parentFirstName"
                            name="parentFirstName"
                            placeholder="Enter first name"
                            value={formData.parentFirstName}
                            onChange={handleChange}
                          />
                          {errors.parentFirstName && (
                            <p className="text-red-500 text-sm">{errors.parentFirstName}</p>
                          )}
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="parentLastName">Last Name *</Label>
                          <Input 
                            id="parentLastName"
                            name="parentLastName"
                            placeholder="Enter last name"
                            value={formData.parentLastName}
                            onChange={handleChange}
                          />
                          {errors.parentLastName && (
                            <p className="text-red-500 text-sm">{errors.parentLastName}</p>
                          )}
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="relationship">Relationship to Student *</Label>
                        <select
                          id="relationship"
                          name="relationship"
                          value={formData.relationship}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        >
                          <option value="">Select relationship</option>
                          <option value="father">Father</option>
                          <option value="mother">Mother</option>
                          <option value="guardian">Guardian</option>
                        </select>
                        {errors.relationship && (
                          <p className="text-red-500 text-sm">{errors.relationship}</p>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address *</Label>
                          <Input 
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Enter email address"
                            value={formData.email}
                            onChange={handleChange}
                          />
                          {errors.email && (
                            <p className="text-red-500 text-sm">{errors.email}</p>
                          )}
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number *</Label>
                          <Input 
                            id="phone"
                            name="phone"
                            placeholder="Enter phone number"
                            value={formData.phone}
                            onChange={handleChange}
                          />
                          {errors.phone && (
                            <p className="text-red-500 text-sm">{errors.phone}</p>
                          )}
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="address">Home Address *</Label>
                        <Textarea 
                          id="address"
                          name="address"
                          placeholder="Enter home address"
                          value={formData.address}
                          onChange={handleChange}
                        />
                        {errors.address && (
                          <p className="text-red-500 text-sm">{errors.address}</p>
                        )}
                      </div>
                      
                      <div className="text-xl font-semibold text-gray-800 mb-4">Emergency Contact</div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="emergencyContactName">Emergency Contact Name *</Label>
                          <Input 
                            id="emergencyContactName"
                            name="emergencyContactName"
                            placeholder="Enter name"
                            value={formData.emergencyContactName}
                            onChange={handleChange}
                          />
                          {errors.emergencyContactName && (
                            <p className="text-red-500 text-sm">{errors.emergencyContactName}</p>
                          )}
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="emergencyContactPhone">Emergency Contact Phone *</Label>
                          <Input 
                            id="emergencyContactPhone"
                            name="emergencyContactPhone"
                            placeholder="Enter phone number"
                            value={formData.emergencyContactPhone}
                            onChange={handleChange}
                          />
                          {errors.emergencyContactPhone && (
                            <p className="text-red-500 text-sm">{errors.emergencyContactPhone}</p>
                          )}
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="emergencyContactRelationship">Relationship to Student *</Label>
                        <Input 
                          id="emergencyContactRelationship"
                          name="emergencyContactRelationship"
                          placeholder="Enter relationship"
                          value={formData.emergencyContactRelationship}
                          onChange={handleChange}
                        />
                        {errors.emergencyContactRelationship && (
                          <p className="text-red-500 text-sm">{errors.emergencyContactRelationship}</p>
                        )}
                      </div>
                    </div>
                  )}
                  
                  {step === 3 && (
                    <div className="space-y-6">
                      <div className="text-xl font-semibold text-gray-800 mb-4">Medical Information</div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="medicalConditions">Medical Conditions (if any)</Label>
                        <Textarea 
                          id="medicalConditions"
                          name="medicalConditions"
                          placeholder="Enter any medical conditions"
                          value={formData.medicalConditions}
                          onChange={handleChange}
                        />
                        <p className="text-sm text-gray-500">
                          Please list any medical conditions that the school should be aware of.
                        </p>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="allergies">Allergies (if any)</Label>
                        <Textarea 
                          id="allergies"
                          name="allergies"
                          placeholder="Enter any allergies"
                          value={formData.allergies}
                          onChange={handleChange}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="medications">Medications (if any)</Label>
                        <Textarea 
                          id="medications"
                          name="medications"
                          placeholder="Enter any medications"
                          value={formData.medications}
                          onChange={handleChange}
                        />
                      </div>
                      
                      <div className="border-t pt-6 mt-6">
                        <div className="flex items-start space-x-3">
                          <input
                            type="checkbox"
                            id="agreeTerms"
                            name="agreeTerms"
                            checked={formData.agreeTerms}
                            onChange={handleCheckboxChange}
                            className="mt-1"
                          />
                          <div>
                            <Label htmlFor="agreeTerms" className="font-medium">
                              I agree to the terms and conditions *
                            </Label>
                            <p className="text-sm text-gray-500">
                              By submitting this application, I certify that all information provided is accurate and complete. I understand that any false or misleading information may result in the rejection of this application or subsequent dismissal from the school.
                            </p>
                            {errors.agreeTerms && (
                              <p className="text-red-500 text-sm">{errors.agreeTerms}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex justify-between pt-4">
                    {step > 1 ? (
                      <Button type="button" variant="outline" onClick={prevStep}>
                        Previous
                      </Button>
                    ) : (
                      <div></div>
                    )}
                    
                    {step < 3 ? (
                      <Button type="button" onClick={nextStep}>
                        Next
                      </Button>
                    ) : (
                      <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Submitting..." : "Submit Application"}
                      </Button>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </PublicWebsiteLayout>
  );
}

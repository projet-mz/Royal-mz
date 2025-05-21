'use client';

import React, { useState, ReactNode } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';

export interface Step {
  id: string;
  title: string;
  description?: string;
  component: ReactNode;
  isOptional?: boolean;
}

export interface MultiStepWizardProps {
  steps: Step[];
  onComplete: (data: any) => void;
  onCancel?: () => void;
  initialData?: any;
  title?: string;
  description?: string;
}

export function MultiStepWizard({
  steps,
  onComplete,
  onCancel,
  initialData = {},
  title = 'Multi-Step Process',
  description,
}: MultiStepWizardProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [formData, setFormData] = useState(initialData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const currentStep = steps[currentStepIndex];
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === steps.length - 1;
  
  const handleNext = (stepData: any = {}) => {
    const updatedData = { ...formData, ...stepData };
    setFormData(updatedData);
    
    if (!isLastStep) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      handleComplete(updatedData);
    }
  };
  
  const handlePrevious = () => {
    if (!isFirstStep) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };
  
  const handleStepClick = (index: number) => {
    if (index <= currentStepIndex + 1) {
      setCurrentStepIndex(index);
    }
  };
  
  const handleComplete = async (finalData: any) => {
    setIsSubmitting(true);
    try {
      await onComplete(finalData);
    } catch (error) {
      console.error('Error completing wizard:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const renderStepIndicator = () => {
    return (
      <div className="flex items-center justify-center mb-6">
        {steps.map((step, index) => {
          const isActive = index === currentStepIndex;
          const isCompleted = index < currentStepIndex;
          const isPending = index > currentStepIndex;
          
          return (
            <React.Fragment key={step.id}>
              {/* Step circle */}
              <div
                className={`flex items-center justify-center h-10 w-10 rounded-full border-2 cursor-pointer transition-colors ${
                  isActive
                    ? 'bg-primary text-primary-foreground border-primary'
                    : isCompleted
                    ? 'bg-primary/20 text-primary border-primary'
                    : 'bg-background text-muted-foreground border-muted'
                }`}
                onClick={() => handleStepClick(index)}
              >
                {isCompleted ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>
              
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div
                  className={`h-1 w-10 mx-1 ${
                    isCompleted ? 'bg-primary' : 'bg-muted'
                  }`}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    );
  };
  
  const renderStepTitles = () => {
    return (
      <div className="flex items-center justify-center mb-8 text-sm">
        {steps.map((step, index) => {
          const isActive = index === currentStepIndex;
          const isCompleted = index < currentStepIndex;
          
          return (
            <div
              key={step.id}
              className={`text-center mx-2 ${
                isActive
                  ? 'text-primary font-medium'
                  : isCompleted
                  ? 'text-primary/80'
                  : 'text-muted-foreground'
              }`}
              style={{ width: `${100 / steps.length}%` }}
            >
              {step.title}
              {step.isOptional && (
                <span className="text-xs text-muted-foreground ml-1">(Optional)</span>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="space-y-6">
        {renderStepIndicator()}
        {renderStepTitles()}
        
        <div className="py-4">
          <h3 className="text-lg font-medium mb-2">{currentStep.title}</h3>
          {currentStep.description && (
            <p className="text-sm text-muted-foreground mb-4">{currentStep.description}</p>
          )}
          
          {/* Render the current step's component */}
          {React.isValidElement(currentStep.component) 
            ? React.cloneElement(currentStep.component as React.ReactElement, {
                data: formData,
                onNext: handleNext,
                isLastStep,
              })
            : currentStep.component}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div>
          {onCancel && (
            <Button 
              type="button" 
              variant="outline" 
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
          )}
        </div>
        
        <div className="flex space-x-2">
          {!isFirstStep && (
            <Button 
              type="button" 
              variant="outline" 
              onClick={handlePrevious}
              disabled={isSubmitting}
            >
              Previous
            </Button>
          )}
          
          {!React.isValidElement(currentStep.component) && (
            <Button 
              type="button" 
              onClick={() => handleNext()}
              disabled={isSubmitting}
            >
              {isLastStep ? 'Complete' : 'Next'}
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}

// 
// 

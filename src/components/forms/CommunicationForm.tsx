'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

const communicationSchema = z.object({
  recipientType: z.enum(['teacher', 'parent', 'admin', 'class']),
  recipients: z.array(z.string()).min(1, 'At least one recipient is required'),
  subject: z.string().min(3, 'Subject must be at least 3 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  priority: z.enum(['normal', 'high', 'urgent']).default('normal'),
  attachments: z.array(z.string()).optional(),
});

type CommunicationFormValues = z.infer<typeof communicationSchema>;

const mockRecipients = {
  teacher: [
    { id: '1', name: 'John Smith', subject: 'Mathematics' },
    { id: '2', name: 'Sarah Johnson', subject: 'English' },
    { id: '3', name: 'Michael Brown', subject: 'Science' },
    { id: '4', name: 'Emily Davis', subject: 'Social Studies' },
  ],
  parent: [
    { id: '1', name: 'Robert Wilson', children: 'Emma Wilson (P3)' },
    { id: '2', name: 'Jennifer Taylor', children: 'Daniel Taylor (P1), Sarah Taylor (KG2)' },
    { id: '3', name: 'David Anderson', children: 'James Anderson (JHS1)' },
    { id: '4', name: 'Patricia Martinez', children: 'Olivia Martinez (JHS2)' },
  ],
  admin: [
    { id: '1', name: 'Dr. Richard Thompson', role: 'Principal' },
    { id: '2', name: 'Mrs. Elizabeth Clark', role: 'Vice Principal' },
    { id: '3', name: 'Mr. Joseph Walker', role: 'Administrator' },
    { id: '4', name: 'Ms. Barbara Lewis', role: 'Accountant' },
  ],
  class: [
    { id: '1', name: 'Primary 1A', count: '25 students' },
    { id: '2', name: 'Primary 2B', count: '22 students' },
    { id: '3', name: 'JHS 1A', count: '30 students' },
    { id: '4', name: 'JHS 2B', count: '28 students' },
  ],
};

export interface CommunicationFormProps {
  initialData?: Partial<CommunicationFormValues>;
  onSubmit: (data: CommunicationFormValues) => void;
  onCancel?: () => void;
  isLoading?: boolean;
}

export function CommunicationForm({
  initialData,
  onSubmit,
  onCancel,
  isLoading = false,
}: CommunicationFormProps) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<CommunicationFormValues>({
    resolver: zodResolver(communicationSchema),
    defaultValues: {
      recipientType: initialData?.recipientType || 'teacher',
      recipients: initialData?.recipients || [],
      subject: initialData?.subject || '',
      message: initialData?.message || '',
      priority: initialData?.priority || 'normal',
      attachments: initialData?.attachments || [],
    },
  });
  
  const watchRecipientType = watch('recipientType');
  const watchRecipients = watch('recipients');
  
  const getRecipients = () => {
    return mockRecipients[watchRecipientType] || [];
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files);
      setSelectedFiles(prev => [...prev, ...fileArray]);
      
      const fileNames = fileArray.map(file => file.name);
      setValue('attachments', [...(watch('attachments') || []), ...fileNames]);
    }
  };
  
  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    setValue('attachments', (watch('attachments') || []).filter((_, i) => i !== index));
  };
  
  const handleFormSubmit = (data: CommunicationFormValues) => {
    onSubmit(data);
  };
  
  const getRecipientLabel = (recipient: any) => {
    switch (watchRecipientType) {
      case 'teacher':
        return `${recipient.name} (${recipient.subject})`;
      case 'parent':
        return `${recipient.name} - ${recipient.children}`;
      case 'admin':
        return `${recipient.name} - ${recipient.role}`;
      case 'class':
        return `${recipient.name} (${recipient.count})`;
      default:
        return recipient.name;
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Send Message</CardTitle>
        <CardDescription>
          Communicate with teachers, parents, or administrators.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="recipientType">Recipient Type <span className="text-destructive">*</span></Label>
            <div className="flex flex-wrap gap-2">
              {(['teacher', 'parent', 'admin', 'class'] as const).map((type) => (
                <label
                  key={type}
                  className={`flex items-center justify-center px-4 py-2 rounded-md border cursor-pointer transition-colors ${
                    watchRecipientType === type
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-background border-input hover:bg-muted/50'
                  }`}
                >
                  <input
                    type="radio"
                    value={type}
                    className="sr-only"
                    {...register('recipientType')}
                  />
                  <span className="capitalize">{type}s</span>
                </label>
              ))}
            </div>
            {errors.recipientType && (
              <p className="text-xs text-destructive">{errors.recipientType.message as string}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="recipients">Recipients <span className="text-destructive">*</span></Label>
            <div className="border rounded-md p-4 space-y-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {getRecipients().map((recipient) => (
                  <div key={recipient.id} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={`recipient-${recipient.id}`}
                      value={recipient.id}
                      {...register('recipients')}
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <Label htmlFor={`recipient-${recipient.id}`} className="text-sm font-normal">
                      {getRecipientLabel(recipient)}
                    </Label>
                  </div>
                ))}
              </div>
              
              {getRecipients().length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-2">
                  No recipients available for the selected type.
                </p>
              )}
              
              {watchRecipients && watchRecipients.length > 0 && (
                <div className="mt-4 pt-4 border-t">
                  <div className="text-sm font-medium">Selected Recipients:</div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {watchRecipients.map((id) => {
                      const recipient = getRecipients().find(r => r.id === id);
                      return recipient ? (
                        <div key={id} className="inline-flex items-center bg-muted px-2 py-1 rounded-md text-xs">
                          {recipient.name}
                        </div>
                      ) : null;
                    })}
                  </div>
                </div>
              )}
            </div>
            {errors.recipients && (
              <p className="text-xs text-destructive">{errors.recipients.message as string}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="subject">Subject <span className="text-destructive">*</span></Label>
            <Input
              id="subject"
              placeholder="Enter message subject"
              {...register('subject')}
            />
            {errors.subject && (
              <p className="text-xs text-destructive">{errors.subject.message as string}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="message">Message <span className="text-destructive">*</span></Label>
            <textarea
              id="message"
              className="flex min-h-[150px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Enter your message here"
              {...register('message')}
            />
            {errors.message && (
              <p className="text-xs text-destructive">{errors.message.message as string}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="priority">Priority</Label>
            <select
              id="priority"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              {...register('priority')}
            >
              <option value="normal">Normal</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
            {errors.priority && (
              <p className="text-xs text-destructive">{errors.priority.message as string}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="attachments">Attachments</Label>
            <div className="border border-dashed rounded-md p-6 text-center">
              <input
                type="file"
                id="attachments"
                multiple
                className="hidden"
                onChange={handleFileChange}
              />
              <label
                htmlFor="attachments"
                className="flex flex-col items-center justify-center cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-muted-foreground mb-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                <span className="text-sm font-medium">Click to upload files</span>
                <span className="text-xs text-muted-foreground mt-1">
                  PDF, DOC, DOCX, JPG, PNG (Max 5MB)
                </span>
              </label>
            </div>
            
            {selectedFiles.length > 0 && (
              <div className="mt-4 space-y-2">
                {selectedFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-2 border rounded-md">
                    <div className="flex items-center space-x-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-muted-foreground"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      <span className="text-sm truncate max-w-xs">{file.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {(file.size / 1024).toFixed(1)} KB
                      </span>
                    </div>
                    <button
                      type="button"
                      className="text-destructive hover:text-destructive/80"
                      onClick={() => removeFile(index)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          {onCancel && (
            <Button 
              type="button" 
              variant="outline" 
              onClick={onCancel}
              disabled={isLoading}
            >
              Cancel
            </Button>
          )}
          <Button 
            type="submit" 
            disabled={isLoading || (watchRecipients?.length || 0) === 0}
            className="ml-auto"
          >
            {isLoading ? 'Sending...' : 'Send Message'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}

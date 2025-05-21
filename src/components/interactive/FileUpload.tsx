'use client';

import React, { useState, useRef } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';

export interface FileUploadProps {
  title?: string;
  description?: string;
  acceptedFileTypes?: string;
  maxFileSize?: number; // in MB
  maxFiles?: number;
  onFilesSelected?: (files: File[]) => void;
  onCancel?: () => void;
  isLoading?: boolean;
}

export function FileUpload({
  title = 'Upload Files',
  description = 'Drag and drop files here or click to browse',
  acceptedFileTypes = '.pdf,.doc,.docx,.jpg,.jpeg,.png',
  maxFileSize = 5, // 5MB
  maxFiles = 5,
  onFilesSelected,
  onCancel,
  isLoading = false,
}: FileUploadProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});
  const [errors, setErrors] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleFileSelection = (selectedFiles: FileList | null) => {
    if (!selectedFiles) return;
    
    const newErrors: string[] = [];
    const validFiles: File[] = [];
    const currentFiles = [...files];
    
    if (currentFiles.length + selectedFiles.length > maxFiles) {
      newErrors.push(`You can only upload a maximum of ${maxFiles} files.`);
      setErrors(newErrors);
      return;
    }
    
    Array.from(selectedFiles).forEach(file => {
      const fileExtension = `.${file.name.split('.').pop()?.toLowerCase()}`;
      const isValidType = acceptedFileTypes.includes('*') || 
                          acceptedFileTypes.split(',').includes(fileExtension);
      
      const isValidSize = file.size <= maxFileSize * 1024 * 1024;
      
      if (!isValidType) {
        newErrors.push(`"${file.name}" has an invalid file type. Accepted types: ${acceptedFileTypes}`);
      } else if (!isValidSize) {
        newErrors.push(`"${file.name}" exceeds the maximum file size of ${maxFileSize}MB.`);
      } else {
        validFiles.push(file);
        
        setUploadProgress(prev => ({
          ...prev,
          [file.name]: 0
        }));
        
        simulateFileUpload(file.name);
      }
    });
    
    if (validFiles.length > 0) {
      const updatedFiles = [...currentFiles, ...validFiles];
      setFiles(updatedFiles);
      
      if (onFilesSelected) {
        onFilesSelected(updatedFiles);
      }
    }
    
    setErrors(newErrors);
  };
  
  const simulateFileUpload = (fileName: string) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 10) + 5;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
      }
      
      setUploadProgress(prev => ({
        ...prev,
        [fileName]: progress
      }));
    }, 300);
  };
  
  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const droppedFiles = e.dataTransfer.files;
    handleFileSelection(droppedFiles);
  };
  
  const handleBrowseClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileSelection(e.target.files);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  const handleRemoveFile = (index: number) => {
    const updatedFiles = [...files];
    const removedFile = updatedFiles[index];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
    
    setUploadProgress(prev => {
      const updated = { ...prev };
      delete updated[removedFile.name];
      return updated;
    });
    
    if (onFilesSelected) {
      onFilesSelected(updatedFiles);
    }
  };
  
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };
  
  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    
    switch (extension) {
      case 'pdf':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        );
      case 'doc':
      case 'docx':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Drag and drop area */}
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center ${
            isDragging ? 'border-primary bg-primary/5' : 'border-muted-foreground/20'
          }`}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            multiple
            accept={acceptedFileTypes}
            onChange={handleFileInputChange}
            disabled={isLoading || files.length >= maxFiles}
          />
          
          <div className="flex flex-col items-center justify-center space-y-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-muted-foreground"
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
            
            <div className="space-y-1">
              <p className="text-sm font-medium">
                {isDragging ? 'Drop files here' : 'Drag and drop files here'}
              </p>
              <p className="text-xs text-muted-foreground">
                or
              </p>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleBrowseClick}
                disabled={isLoading || files.length >= maxFiles}
              >
                Browse Files
              </Button>
            </div>
            
            <div className="text-xs text-muted-foreground">
              <p>Accepted file types: {acceptedFileTypes}</p>
              <p>Maximum file size: {maxFileSize}MB</p>
              <p>Maximum files: {maxFiles}</p>
            </div>
          </div>
        </div>
        
        {/* Error messages */}
        {errors.length > 0 && (
          <div className="bg-destructive/10 text-destructive rounded-md p-4">
            <h4 className="font-medium mb-2">The following errors occurred:</h4>
            <ul className="list-disc list-inside text-sm space-y-1">
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}
        
        {/* File list */}
        {files.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Selected Files ({files.length}/{maxFiles})</h3>
            <div className="space-y-2">
              {files.map((file, index) => (
                <div key={index} className="flex items-center p-3 border rounded-md">
                  <div className="mr-3">
                    {getFileIcon(file.name)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <div className="truncate pr-4">
                        <p className="font-medium truncate">{file.name}</p>
                        <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
                      </div>
                      
                      <button
                        type="button"
                        className="text-destructive hover:text-destructive/80 ml-2"
                        onClick={() => handleRemoveFile(index)}
                        disabled={isLoading}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    
                    <div className="mt-2">
                      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full transition-all duration-300"
                          style={{ width: `${uploadProgress[file.name] || 0}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-xs mt-1">
                        <span>{uploadProgress[file.name] || 0}%</span>
                        <span>{uploadProgress[file.name] === 100 ? 'Completed' : 'Uploading...'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
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
          type="button" 
          disabled={isLoading || files.length === 0}
          className="ml-auto"
        >
          {isLoading ? 'Uploading...' : 'Upload Files'}
        </Button>
      </CardFooter>
    </Card>
  );
}

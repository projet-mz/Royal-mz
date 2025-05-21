export type UserRole = 'admin' | 'teacher' | 'student' | 'parent' | 'security';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Student {
  id: string;
  user: User;
  grade: string;
  class: string;
  dateOfBirth: Date;
  gender: 'male' | 'female';
  parentId?: string;
  admissionNumber: string;
}

export interface Teacher {
  id: string;
  user: User;
  yearsOfExperience: number;
  specialization: string;
  subjects: string[];
  qualifications: string[];
}

export interface Parent {
  id: string;
  user: User;
  phoneNumber: string;
  address: string;
  children?: Student[];
}

export interface Admin {
  id: string;
  user: User;
  department: string;
  permissions: string[];
}

export * from './sync';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  avatar?: string;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export type UserRole = 'admin' | 'teacher' | 'student' | 'parent' | 'security';

export interface Student extends User {
  grade: string;
  class: string;
  dateOfBirth: string | Date;
  gender: 'male' | 'female';
  parentId?: string;
  admissionNumber: string;
}

export interface Teacher extends User {
  yearsOfExperience: number;
  specialization: string;
  subjects?: string[];
  qualifications?: string[];
}

export interface Parent extends User {
  phoneNumber: string;
  address: string;
  children?: Student[];
}

export interface Admin extends User {
  department: string;
  permissions: string[];
}

export interface Class {
  id: string;
  name: string;
  grade: string;
  teacherId?: string;
  students?: Student[];
  subjects?: string[];
}

export interface Schedule {
  id: string;
  classId: string;
  weekDay: number;
  startTime: string;
  endTime: string;
  subject: string;
  teacherId?: string;
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  description: string;
  grade: string;
}

export interface Attendance {
  id: string;
  studentId: string;
  classId: string;
  date: string | Date;
  status: 'present' | 'absent' | 'late';
  remarks?: string;
}

export interface Grade {
  id: string;
  studentId: string;
  subjectId: string;
  term: number;
  score: number;
  maxScore: number;
  remarks?: string;
  date: string | Date;
}

export interface Fee {
  id: string;
  studentId: string;
  amount: number;
  dueDate: string | Date;
  status: 'paid' | 'pending' | 'overdue';
  paymentDate?: string | Date;
  paymentMethod?: string;
  receiptNumber?: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  authorId?: string;
  targetAudience: string[];
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface Message {
  id: string;
  senderId?: string;
  receiverId?: string;
  content: string;
  read: boolean;
  createdAt: string | Date;
  updatedAt: string | Date;
}

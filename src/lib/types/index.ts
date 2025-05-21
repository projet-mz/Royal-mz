export type UserRole = 'admin' | 'teacher' | 'student' | 'parent';

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

export interface Student extends User {
  role: 'student';
  grade: string;
  class: string;
  dateOfBirth: Date;
  gender: 'male' | 'female';
  parentId: string;
  admissionNumber: string;
}

export interface Teacher extends User {
  role: 'teacher';
  subjects: string[];
  qualifications: string[];
  yearsOfExperience: number;
  specialization: string;
}

export interface Parent extends User {
  role: 'parent';
  children: string[]; // Array of student IDs
  phoneNumber: string;
  address: string;
}

export interface Admin extends User {
  role: 'admin';
  department: string;
  permissions: string[];
}

export interface Class {
  id: string;
  name: string;
  grade: string;
  teacherId: string;
  students: string[];
  subjects: string[];
  schedule: Schedule;
}

export interface Schedule {
  id: string;
  classId: string;
  weekDay: number;
  startTime: string;
  endTime: string;
  subject: string;
  teacherId: string;
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
  date: Date;
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
  date: Date;
  subject?: {
    id: string;
    name: string;
    code: string;
    description: string;
    grade: string;
  };
  student?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: 'student';
    grade: string;
    class: string;
  };
}

export interface Fee {
  id: string;
  studentId: string;
  amount: number;
  dueDate: Date;
  status: 'paid' | 'pending' | 'overdue';
  paymentDate?: Date;
  paymentMethod?: string;
  receiptNumber?: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  authorId: string;
  targetAudience: UserRole[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  read: boolean;
  createdAt: Date;
  updatedAt: Date;
}  
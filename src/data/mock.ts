import { type User, type Student, type Teacher, type Parent, type Admin, type Class, type Subject, type Grade, type Attendance, type Fee, type Announcement } from '../lib/types';

export const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@amarckroyal.edu.gh',
    firstName: 'John',
    lastName: 'Doe',
    role: 'admin',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: '2',
    email: 'teacher@amarckroyal.edu.gh',
    firstName: 'Jane',
    lastName: 'Smith',
    role: 'teacher',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: '3',
    email: 'student@amarckroyal.edu.gh',
    firstName: 'Michael',
    lastName: 'Johnson',
    role: 'student',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: '4',
    email: 'parent@amarckroyal.edu.gh',
    firstName: 'Sarah',
    lastName: 'Williams',
    role: 'parent',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
];

export const mockStudents: Student[] = [
  {
    id: '3',
    email: 'student@amarckroyal.edu.gh',
    firstName: 'Michael',
    lastName: 'Johnson',
    role: 'student',
    grade: 'JHS 1',
    class: 'JHS 1A',
    dateOfBirth: new Date('2010-05-15'),
    gender: 'male',
    parentId: '4',
    admissionNumber: 'ARIS2024001',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
];

export const mockTeachers: Teacher[] = [
  {
    id: '2',
    email: 'teacher@amarckroyal.edu.gh',
    firstName: 'Jane',
    lastName: 'Smith',
    role: 'teacher',
    subjects: ['Mathematics', 'Science'],
    qualifications: ['BSc Education', 'MSc Mathematics'],
    yearsOfExperience: 5,
    specialization: 'Mathematics',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
];

export const mockParents: Parent[] = [
  {
    id: '4',
    email: 'parent@amarckroyal.edu.gh',
    firstName: 'Sarah',
    lastName: 'Williams',
    role: 'parent',
    children: ['3'],
    phoneNumber: '+233 20 123 4567',
    address: '123 Accra Street, Accra',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
];

export const mockAdmins: Admin[] = [
  {
    id: '1',
    email: 'admin@amarckroyal.edu.gh',
    firstName: 'John',
    lastName: 'Doe',
    role: 'admin',
    department: 'Administration',
    permissions: ['manage_users', 'manage_classes', 'manage_fees'],
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
];

export const mockClasses: Class[] = [
  {
    id: '1',
    name: 'JHS 1A',
    grade: 'JHS 1',
    teacherId: '2',
    students: ['3'],
    subjects: ['Mathematics', 'Science', 'English', 'Social Studies'],
    schedule: {
      id: '1',
      classId: '1',
      weekDay: 1,
      startTime: '08:00',
      endTime: '09:00',
      subject: 'Mathematics',
      teacherId: '2',
    },
  },
];

export const mockSubjects: Subject[] = [
  {
    id: '1',
    name: 'Mathematics',
    code: 'MATH101',
    description: 'Basic Mathematics for JHS 1',
    grade: 'JHS 1',
  },
  {
    id: '2',
    name: 'Science',
    code: 'SCI101',
    description: 'Basic Science for JHS 1',
    grade: 'JHS 1',
  },
];

export const mockGrades: Grade[] = [
  {
    id: '1',
    studentId: '3',
    subjectId: '1',
    term: 1,
    score: 85,
    maxScore: 100,
    remarks: 'Excellent performance',
    date: new Date('2024-03-15'),
  },
];

export const mockAttendance: Attendance[] = [
  {
    id: '1',
    studentId: '3',
    classId: '1',
    date: new Date('2024-03-20'),
    status: 'present',
  },
];

export const mockFees: Fee[] = [
  {
    id: '1',
    studentId: '3',
    amount: 5000,
    dueDate: new Date('2024-04-01'),
    status: 'pending',
  },
];

export const mockAnnouncements: Announcement[] = [
  {
    id: '1',
    title: 'School Reopening',
    content: 'School will reopen on April 15th, 2024',
    authorId: '1',
    targetAudience: ['admin', 'teacher', 'student', 'parent'],
    createdAt: new Date('2024-03-20'),
    updatedAt: new Date('2024-03-20'),
  },
]; 
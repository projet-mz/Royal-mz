import { supabase } from '../lib/supabase/client';
import { getGradesByStudent } from './grades';
import { getAttendanceByStudent } from './attendance';
import { getStudentById } from './students';
import { getSubjectById } from './subjects';
import { getClassById } from './classes';
import { getUserById } from './users';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

export interface ReportCard {
  id: string;
  studentId: string;
  term: number;
  academicYear: string;
  generatedDate: Date;
  grades: any[];
  attendance: any;
  teacherComments: string;
  principalComments: string;
  overallGrade: string;
  overallPercentage: number;
}

export async function generateReportCard(studentId: string, term: number) {
  try {
    const { data: student } = await getStudentById(studentId);
    if (!student) throw new Error('Student not found');
    
    const { data: classData } = await getClassById(student.classId);
    if (!classData) throw new Error('Class not found');
    
    const { data: teacher } = await getUserById(classData.teacherId);
    
    const { data: grades } = await getGradesByStudent(studentId);
    const termGrades = grades ? grades.filter((g: any) => g.term === term) : [];
    
    const { data: attendance } = await getAttendanceByStudent(studentId);
    
    const overallPercentage = termGrades.length > 0
      ? Math.round(termGrades.reduce((acc: number, grade: any) => acc + (grade.score / grade.maxScore), 0) / termGrades.length * 100)
      : 0;
    
    let overallGrade = '';
    if (overallPercentage >= 90) overallGrade = 'A+';
    else if (overallPercentage >= 80) overallGrade = 'A';
    else if (overallPercentage >= 75) overallGrade = 'B+';
    else if (overallPercentage >= 70) overallGrade = 'B';
    else if (overallPercentage >= 65) overallGrade = 'C+';
    else if (overallPercentage >= 60) overallGrade = 'C';
    else if (overallPercentage >= 55) overallGrade = 'D+';
    else if (overallPercentage >= 50) overallGrade = 'D';
    else overallGrade = 'F';
    
    const reportCard: ReportCard = {
      id: crypto.randomUUID(),
      studentId,
      term,
      academicYear: `${new Date().getFullYear() - 1}/${new Date().getFullYear()}`,
      generatedDate: new Date(),
      grades: termGrades,
      attendance: {
        present: attendance ? attendance.filter((a: any) => a.status === 'present').length : 0,
        absent: attendance ? attendance.filter((a: any) => a.status === 'absent').length : 0,
        late: attendance ? attendance.filter((a: any) => a.status === 'late').length : 0,
        total: attendance ? attendance.length : 0
      },
      teacherComments: 'Student has shown good progress this term.',
      principalComments: 'Keep up the good work!',
      overallGrade,
      overallPercentage
    };
    
    const { data, error } = await supabase
      .from('report_cards')
      .insert([reportCard])
      .select();
      
    if (error) throw error;
    
    return { data, error: null };
  } catch (error) {
    console.error('Error generating report card:', error);
    return { data: null, error };
  }
}

export async function getReportCardsByStudent(studentId: string) {
  try {
    const { data, error } = await supabase
      .from('report_cards')
      .select('*')
      .eq('studentId', studentId)
      .order('generatedDate', { ascending: false });
      
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error getting report cards:', error);
    return { data: null, error };
  }
}

export async function getReportCardById(reportCardId: string) {
  try {
    const { data, error } = await supabase
      .from('report_cards')
      .select('*')
      .eq('id', reportCardId)
      .single();
      
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error getting report card:', error);
    return { data: null, error };
  }
}

export async function downloadReportCardPDF(reportCardId: string) {
  try {
    const { data: reportCard } = await getReportCardById(reportCardId);
    if (!reportCard) throw new Error('Report card not found');
    
    const { data: student } = await getStudentById(reportCard.studentId);
    if (!student) throw new Error('Student not found');
    
    const doc = new jsPDF();
    
    doc.setFontSize(20);
    doc.text('Amarck Royal International School', 105, 20, { align: 'center' });
    doc.setFontSize(14);
    doc.text('Student Report Card', 105, 30, { align: 'center' });
    
    doc.setFontSize(12);
    doc.text(`Name: ${student.firstName} ${student.lastName}`, 20, 50);
    doc.text(`Grade: ${student.grade}`, 20, 60);
    doc.text(`Class: ${student.class}`, 20, 70);
    doc.text(`Admission Number: ${student.admissionNumber}`, 20, 80);
    doc.text(`Term: ${reportCard.term}`, 150, 50);
    doc.text(`Academic Year: ${reportCard.academicYear}`, 150, 60);
    doc.text(`Date: ${new Date(reportCard.generatedDate).toLocaleDateString()}`, 150, 70);
    
    const tableColumn = ["Subject", "Score", "Max Score", "Percentage", "Grade", "Remarks"];
    const tableRows: any[] = [];
    
    for (const grade of reportCard.grades) {
      const subject = await getSubjectById(grade.subjectId);
      const percentage = Math.round((grade.score / grade.maxScore) * 100);
      let gradeValue = '';
      
      if (percentage >= 90) gradeValue = 'A+';
      else if (percentage >= 80) gradeValue = 'A';
      else if (percentage >= 75) gradeValue = 'B+';
      else if (percentage >= 70) gradeValue = 'B';
      else if (percentage >= 65) gradeValue = 'C+';
      else if (percentage >= 60) gradeValue = 'C';
      else if (percentage >= 55) gradeValue = 'D+';
      else if (percentage >= 50) gradeValue = 'D';
      else gradeValue = 'F';
      
      tableRows.push([
        subject?.data?.name || 'Unknown Subject',
        grade.score,
        grade.maxScore,
        `${percentage}%`,
        gradeValue,
        grade.remarks || ''
      ]);
    }
    
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 90,
      theme: 'grid',
      styles: { fontSize: 10, cellPadding: 3 },
      headStyles: { fillColor: [15, 52, 96], textColor: [255, 255, 255] }
    });
    
    const attendanceY = (doc as any).lastAutoTable.finalY + 20;
    doc.text('Attendance Summary', 20, attendanceY);
    doc.text(`Present: ${reportCard.attendance.present} days`, 20, attendanceY + 10);
    doc.text(`Absent: ${reportCard.attendance.absent} days`, 80, attendanceY + 10);
    doc.text(`Late: ${reportCard.attendance.late} days`, 140, attendanceY + 10);
    doc.text(`Attendance Rate: ${Math.round((reportCard.attendance.present / reportCard.attendance.total) * 100)}%`, 20, attendanceY + 20);
    
    doc.text('Overall Performance', 20, attendanceY + 40);
    doc.text(`Overall Grade: ${reportCard.overallGrade}`, 20, attendanceY + 50);
    doc.text(`Overall Percentage: ${reportCard.overallPercentage}%`, 80, attendanceY + 50);
    
    doc.text('Teacher Comments:', 20, attendanceY + 70);
    doc.text(reportCard.teacherComments, 20, attendanceY + 80);
    
    doc.text('Principal Comments:', 20, attendanceY + 100);
    doc.text(reportCard.principalComments, 20, attendanceY + 110);
    
    doc.text('Class Teacher: ____________________', 20, attendanceY + 130);
    doc.text('Principal: ____________________', 120, attendanceY + 130);
    
    doc.text('This is an official document of Amarck Royal International School', 105, 280, { align: 'center' });
    
    return doc.save(`report_card_${student.firstName}_${student.lastName}_term${reportCard.term}.pdf`);
  } catch (error) {
    console.error('Error downloading report card:', error);
    throw error;
  }
}

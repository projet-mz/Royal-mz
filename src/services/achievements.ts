import { supabase } from '../lib/supabase/client';

export interface Achievement {
  id: string;
  name: string;
  description: string;
  iconName: string;
  category: 'academic' | 'attendance' | 'behavior' | 'extracurricular';
  points: number;
  criteria: {
    type: 'grade' | 'attendance' | 'behavior' | 'activity';
    threshold: number;
    comparison: 'greater' | 'equal' | 'less';
  };
}

export interface StudentAchievement {
  id: string;
  studentId: string;
  achievementId: string;
  dateEarned: Date;
  pointsEarned: number;
}

export async function getAchievements() {
  try {
    const { data, error } = await supabase
      .from('achievements')
      .select('*')
      .order('category', { ascending: true });
      
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error getting achievements:', error);
    return { data: null, error };
  }
}

export async function getStudentAchievements(studentId: string) {
  try {
    const { data, error } = await supabase
      .from('student_achievements')
      .select(`
        *,
        achievement:achievementId (*)
      `)
      .eq('studentId', studentId)
      .order('dateEarned', { ascending: false });
      
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error getting student achievements:', error);
    return { data: null, error };
  }
}

export async function awardAchievement(studentId: string, achievementId: string) {
  try {
    const { data: achievement, error: achievementError } = await supabase
      .from('achievements')
      .select('*')
      .eq('id', achievementId)
      .single();
      
    if (achievementError) throw achievementError;
    
    const { data: existingAchievement, error: existingError } = await supabase
      .from('student_achievements')
      .select('*')
      .eq('studentId', studentId)
      .eq('achievementId', achievementId)
      .single();
      
    if (existingAchievement) {
      return { data: existingAchievement, error: null };
    }
    
    const { data, error } = await supabase
      .from('student_achievements')
      .insert([{
        studentId,
        achievementId,
        dateEarned: new Date(),
        pointsEarned: achievement.points
      }])
      .select();
      
    if (error) throw error;
    
    const { error: updateError } = await supabase
      .from('students')
      .update({ 
        achievementPoints: supabase.rpc('increment', { x: achievement.points }) 
      })
      .eq('id', studentId);
      
    if (updateError) throw updateError;
    
    return { data, error: null };
  } catch (error) {
    console.error('Error awarding achievement:', error);
    return { data: null, error };
  }
}

export async function getStudentLeaderboard(limit = 10) {
  try {
    const { data, error } = await supabase
      .from('students')
      .select(`
        id,
        firstName,
        lastName,
        grade,
        class,
        achievementPoints
      `)
      .order('achievementPoints', { ascending: false })
      .limit(limit);
      
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error getting student leaderboard:', error);
    return { data: null, error };
  }
}

export async function checkAndAwardAchievements(studentId: string) {
  try {
    const { data: student, error: studentError } = await supabase
      .from('students')
      .select('*')
      .eq('id', studentId)
      .single();
      
    if (studentError) throw studentError;
    
    const { data: achievements, error: achievementsError } = await supabase
      .from('achievements')
      .select('*');
      
    if (achievementsError) throw achievementsError;
    
    const { data: grades, error: gradesError } = await supabase
      .from('grades')
      .select('*')
      .eq('studentId', studentId);
      
    if (gradesError) throw gradesError;
    
    const { data: attendance, error: attendanceError } = await supabase
      .from('attendance')
      .select('*')
      .eq('studentId', studentId);
      
    if (attendanceError) throw attendanceError;
    
    const awardedAchievements: any[] = [];
    
    for (const achievement of achievements) {
      const { criteria } = achievement;
      
      let meetsRequirement = false;
      
      switch (criteria.type) {
        case 'grade':
          const averageGrade = grades.length > 0
            ? grades.reduce((acc, grade) => acc + (grade.score / grade.maxScore), 0) / grades.length * 100
            : 0;
          
          if (criteria.comparison === 'greater' && averageGrade > criteria.threshold) {
            meetsRequirement = true;
          } else if (criteria.comparison === 'equal' && averageGrade === criteria.threshold) {
            meetsRequirement = true;
          } else if (criteria.comparison === 'less' && averageGrade < criteria.threshold) {
            meetsRequirement = true;
          }
          break;
          
        case 'attendance':
          const attendanceRate = attendance.length > 0
            ? attendance.filter(a => a.status === 'present').length / attendance.length * 100
            : 0;
          
          if (criteria.comparison === 'greater' && attendanceRate > criteria.threshold) {
            meetsRequirement = true;
          } else if (criteria.comparison === 'equal' && attendanceRate === criteria.threshold) {
            meetsRequirement = true;
          } else if (criteria.comparison === 'less' && attendanceRate < criteria.threshold) {
            meetsRequirement = true;
          }
          break;
          
      }
      
      if (meetsRequirement) {
        const { data } = await awardAchievement(studentId, achievement.id);
        if (data) awardedAchievements.push(data);
      }
    }
    
    return { data: awardedAchievements, error: null };
  } catch (error) {
    console.error('Error checking and awarding achievements:', error);
    return { data: null, error };
  }
}

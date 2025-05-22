'use client';

import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '../../../components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs';
import { useAuth } from '../../../lib/context/AuthContext';
import { getStudentAchievements, getStudentLeaderboard } from '../../../services/achievements';
import { getStudentById } from '../../../services/students';
import { Award, Trophy, Star, TrendingUp, Clock } from 'lucide-react';
import { StudentInterface } from '../../../components/age-calibrated/StudentInterface';

export default function StudentAchievementsPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('achievements');
  const [achievements, setAchievements] = useState<any[]>([]);
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [student, setStudent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      
      setLoading(true);
      try {
        const { data: studentData } = await getStudentById(user.id);
        if (studentData) setStudent(studentData);
        
        const { data: achievementsData } = await getStudentAchievements(user.id);
        if (achievementsData) setAchievements(achievementsData);
        
        const { data: leaderboardData } = await getStudentLeaderboard(10);
        if (leaderboardData) setLeaderboard(leaderboardData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [user]);
  
  const getAchievementsByCategory = (category: string) => {
    return achievements.filter((a: any) => a.achievement.category === category);
  };
  
  const getStudentRank = () => {
    const index = leaderboard.findIndex((s: any) => s.id === user?.id);
    return index !== -1 ? index + 1 : 'N/A';
  };
  
  const getTotalPoints = () => {
    return achievements.reduce((total: number, a: any) => total + a.pointsEarned, 0);
  };
  
  return (
    <DashboardLayout role="student">
      {student && (
        <StudentInterface student={student}>
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">Achievements</h1>
              <p className="text-muted-foreground">
                Track your progress and compete with classmates.
              </p>
            </div>
            
            <div className="grid gap-4 md:grid-cols-4">
              <Card className="bg-gradient-to-br from-primary/5 to-primary/10">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center">
                    <Award className="mr-2 h-4 w-4" />
                    Total Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{achievements.length}</div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-success/5 to-success/10">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center">
                    <Star className="mr-2 h-4 w-4" />
                    Total Points
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{getTotalPoints()}</div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-warning/5 to-warning/10">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center">
                    <Trophy className="mr-2 h-4 w-4" />
                    Your Rank
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{getStudentRank()}</div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-secondary/5 to-secondary/10">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center">
                    <Clock className="mr-2 h-4 w-4" />
                    Recent Achievement
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {achievements.length > 0 ? (
                    <div className="text-sm font-medium truncate">
                      {achievements[0].achievement.name}
                    </div>
                  ) : (
                    <div className="text-sm text-muted-foreground">None yet</div>
                  )}
                </CardContent>
              </Card>
            </div>
            
            <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="achievements">Achievements</TabsTrigger>
                <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
              </TabsList>
              
              <TabsContent value="achievements" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Award className="mr-2 h-5 w-5 text-blue-500" />
                      Academic Achievements
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {getAchievementsByCategory('academic').length === 0 ? (
                      <div className="text-center py-4">
                        <p className="text-muted-foreground">No academic achievements yet.</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {getAchievementsByCategory('academic').map((achievement: any) => (
                          <div key={achievement.id} className="flex flex-col items-center p-4 border rounded-lg bg-muted/20">
                            <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center mb-3">
                              <Star className="h-8 w-8 text-blue-500" />
                            </div>
                            <p className="text-sm font-medium text-center">{achievement.achievement.name}</p>
                            <p className="text-xs text-muted-foreground text-center mt-1">{achievement.achievement.description}</p>
                            <p className="text-xs text-primary mt-2">+{achievement.pointsEarned} points</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {new Date(achievement.dateEarned).toLocaleDateString()}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Award className="mr-2 h-5 w-5 text-green-500" />
                      Attendance Achievements
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {getAchievementsByCategory('attendance').length === 0 ? (
                      <div className="text-center py-4">
                        <p className="text-muted-foreground">No attendance achievements yet.</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {getAchievementsByCategory('attendance').map((achievement: any) => (
                          <div key={achievement.id} className="flex flex-col items-center p-4 border rounded-lg bg-muted/20">
                            <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mb-3">
                              <Star className="h-8 w-8 text-green-500" />
                            </div>
                            <p className="text-sm font-medium text-center">{achievement.achievement.name}</p>
                            <p className="text-xs text-muted-foreground text-center mt-1">{achievement.achievement.description}</p>
                            <p className="text-xs text-primary mt-2">+{achievement.pointsEarned} points</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {new Date(achievement.dateEarned).toLocaleDateString()}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Award className="mr-2 h-5 w-5 text-purple-500" />
                      Behavior Achievements
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {getAchievementsByCategory('behavior').length === 0 ? (
                      <div className="text-center py-4">
                        <p className="text-muted-foreground">No behavior achievements yet.</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {getAchievementsByCategory('behavior').map((achievement: any) => (
                          <div key={achievement.id} className="flex flex-col items-center p-4 border rounded-lg bg-muted/20">
                            <div className="h-16 w-16 rounded-full bg-purple-100 flex items-center justify-center mb-3">
                              <Star className="h-8 w-8 text-purple-500" />
                            </div>
                            <p className="text-sm font-medium text-center">{achievement.achievement.name}</p>
                            <p className="text-xs text-muted-foreground text-center mt-1">{achievement.achievement.description}</p>
                            <p className="text-xs text-primary mt-2">+{achievement.pointsEarned} points</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {new Date(achievement.dateEarned).toLocaleDateString()}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Award className="mr-2 h-5 w-5 text-orange-500" />
                      Extracurricular Achievements
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {getAchievementsByCategory('extracurricular').length === 0 ? (
                      <div className="text-center py-4">
                        <p className="text-muted-foreground">No extracurricular achievements yet.</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {getAchievementsByCategory('extracurricular').map((achievement: any) => (
                          <div key={achievement.id} className="flex flex-col items-center p-4 border rounded-lg bg-muted/20">
                            <div className="h-16 w-16 rounded-full bg-orange-100 flex items-center justify-center mb-3">
                              <Star className="h-8 w-8 text-orange-500" />
                            </div>
                            <p className="text-sm font-medium text-center">{achievement.achievement.name}</p>
                            <p className="text-xs text-muted-foreground text-center mt-1">{achievement.achievement.description}</p>
                            <p className="text-xs text-primary mt-2">+{achievement.pointsEarned} points</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {new Date(achievement.dateEarned).toLocaleDateString()}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="leaderboard">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Trophy className="mr-2 h-5 w-5 text-primary" />
                      School Leaderboard
                    </CardTitle>
                    <CardDescription>
                      Top students by achievement points
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {leaderboard.length === 0 ? (
                      <div className="text-center py-4">
                        <p className="text-muted-foreground">Leaderboard data not available.</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {leaderboard.map((student: any, index: number) => (
                          <div 
                            key={student.id} 
                            className={`flex items-center justify-between p-3 rounded-lg ${
                              student.id === user?.id ? 'bg-primary/10' : ''
                            }`}
                          >
                            <div className="flex items-center">
                              <div className={`h-10 w-10 rounded-full flex items-center justify-center mr-4 ${
                                index === 0 ? 'bg-yellow-100 text-yellow-600' :
                                index === 1 ? 'bg-gray-100 text-gray-600' :
                                index === 2 ? 'bg-amber-100 text-amber-600' :
                                'bg-muted text-muted-foreground'
                              }`}>
                                {index + 1}
                              </div>
                              <div>
                                <p className="font-medium">
                                  {student.firstName} {student.lastName}
                                  {student.id === user?.id && (
                                    <span className="ml-2 text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">
                                      You
                                    </span>
                                  )}
                                </p>
                                <p className="text-sm text-muted-foreground">{student.grade} • {student.class}</p>
                              </div>
                            </div>
                            <div className="flex items-center">
                              <TrendingUp className="h-5 w-5 text-primary mr-2" />
                              <span className="font-bold text-lg">{student.achievementPoints}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </StudentInterface>
      )}
    </DashboardLayout>
  );
}

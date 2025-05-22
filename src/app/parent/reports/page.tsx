'use client';

import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '../../../components/layout/DashboardLayout';
import { Button } from '../../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { useAuth } from '../../../lib/context/AuthContext';
import { getReportCardsByStudent, downloadReportCardPDF } from '../../../services/reports';
import { getChildrenOfParent } from '../../../services/parents';
import { FileDown, FileText } from 'lucide-react';

export default function ParentReportsPage() {
  const { user } = useAuth();
  const [children, setChildren] = useState<any[]>([]);
  const [selectedChild, setSelectedChild] = useState('');
  const [reportCards, setReportCards] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      
      setLoading(true);
      try {
        const { data: childrenData } = await getChildrenOfParent(user.id);
        if (childrenData && childrenData.length > 0) {
          setChildren(childrenData);
          setSelectedChild(childrenData[0].id);
          
          const { data: reportCardsData } = await getReportCardsByStudent(childrenData[0].id);
          if (reportCardsData) setReportCards(reportCardsData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [user]);
  
  const handleChildChange = async (childId: string) => {
    setSelectedChild(childId);
    setLoading(true);
    
    try {
      const { data } = await getReportCardsByStudent(childId);
      if (data) setReportCards(data);
    } catch (error) {
      console.error('Error fetching report cards:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleDownloadPDF = async (reportCardId: string) => {
    try {
      await downloadReportCardPDF(reportCardId);
    } catch (error) {
      console.error('Error downloading report card:', error);
    }
  };
  
  return (
    <DashboardLayout role="parent">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-heading font-bold">Report Cards</h1>
            <p className="text-muted-foreground">
              View and download your children's academic report cards.
            </p>
          </div>
          {children.length > 0 && (
            <select
              value={selectedChild}
              onChange={(e) => handleChildChange(e.target.value)}
              className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {children.map((child: any) => (
                <option key={child.id} value={child.id}>
                  {child.firstName} {child.lastName}
                </option>
              ))}
            </select>
          )}
        </div>
        
        {loading ? (
          <div className="text-center py-8">Loading report cards...</div>
        ) : reportCards.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No report cards available.</p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {reportCards.map((reportCard: any) => {
              const child = children.find((c: any) => c.id === reportCard.studentId);
              
              return (
                <Card key={reportCard.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle>Term {reportCard.term} Report Card</CardTitle>
                        <CardDescription>
                          {child ? `${child.firstName} ${child.lastName}` : 'Unknown Student'} • {reportCard.academicYear}
                        </CardDescription>
                      </div>
                      <FileText className="h-6 w-6 text-primary" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Overall Grade</p>
                          <p className="text-lg font-semibold">{reportCard.overallGrade}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Overall Percentage</p>
                          <p className="text-lg font-semibold">{reportCard.overallPercentage}%</p>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-sm text-muted-foreground">Generated Date</p>
                        <p className="text-sm">{new Date(reportCard.generatedDate).toLocaleDateString()}</p>
                      </div>
                      
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full"
                        onClick={() => handleDownloadPDF(reportCard.id)}
                      >
                        <FileDown className="mr-2 h-4 w-4" />
                        Download PDF
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

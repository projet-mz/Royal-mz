'use client';

import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/lib/supabase/client';
import { useRealtimeSubscription as useRealtime } from '@/hooks/useRealtime';
import { Loader2, Mail, Phone, Clock, CheckCircle, Archive, AlertCircle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface Consultation {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: 'new' | 'read' | 'responded' | 'archived';
  created_at: string;
  updated_at: string;
}

export default function ConsultationsPage() {
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('new');
  const [updating, setUpdating] = useState<string | null>(null);
  
  const { data: realtimeConsultations, error: realtimeError } = useRealtime<Consultation>('consultations');
  
  useEffect(() => {
    if (realtimeConsultations) {
      setConsultations(realtimeConsultations);
      setLoading(false);
    }
  }, [realtimeConsultations]);
  
  useEffect(() => {
    const fetchConsultations = async () => {
      try {
        const { data, error } = await supabase
          .from('consultations')
          .select('*')
          .order('created_at', { ascending: false });
          
        if (error) throw error;
        
        if (data) {
          setConsultations(data as Consultation[]);
        }
      } catch (error) {
        console.error('Error fetching consultations:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchConsultations();
  }, []);
  
  const updateConsultationStatus = async (id: string, status: 'new' | 'read' | 'responded' | 'archived') => {
    setUpdating(id);
    
    try {
      const { error } = await supabase
        .from('consultations')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', id);
        
      if (error) throw error;
      
      setConsultations(prev => 
        prev.map(consultation => 
          consultation.id === id ? { ...consultation, status } : consultation
        )
      );
    } catch (error) {
      console.error('Error updating consultation status:', error);
    } finally {
      setUpdating(null);
    }
  };
  
  const filteredConsultations = consultations.filter(
    consultation => consultation.status === activeTab
  );
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new':
        return <Badge className="bg-blue-500">New</Badge>;
      case 'read':
        return <Badge className="bg-yellow-500">Read</Badge>;
      case 'responded':
        return <Badge className="bg-green-500">Responded</Badge>;
      case 'archived':
        return <Badge className="bg-gray-500">Archived</Badge>;
      default:
        return null;
    }
  };
  
  const getActionButtons = (consultation: Consultation) => {
    switch (consultation.status) {
      case 'new':
        return (
          <>
            <Button
              size="sm"
              variant="outline"
              className="flex items-center"
              onClick={() => updateConsultationStatus(consultation.id, 'read')}
              disabled={updating === consultation.id}
            >
              {updating === consultation.id ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <CheckCircle className="mr-2 h-4 w-4" />
              )}
              Mark as Read
            </Button>
          </>
        );
      case 'read':
        return (
          <>
            <Button
              size="sm"
              variant="outline"
              className="flex items-center"
              onClick={() => updateConsultationStatus(consultation.id, 'responded')}
              disabled={updating === consultation.id}
            >
              {updating === consultation.id ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <CheckCircle className="mr-2 h-4 w-4" />
              )}
              Mark as Responded
            </Button>
          </>
        );
      case 'responded':
        return (
          <Button
            size="sm"
            variant="outline"
            className="flex items-center"
            onClick={() => updateConsultationStatus(consultation.id, 'archived')}
            disabled={updating === consultation.id}
          >
            {updating === consultation.id ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Archive className="mr-2 h-4 w-4" />
            )}
            Archive
          </Button>
        );
      default:
        return null;
    }
  };
  
  return (
    <DashboardLayout role="admin">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Consultations</h2>
            <p className="text-muted-foreground">
              Manage inquiries and messages from the website contact form.
            </p>
          </div>
        </div>
        
        <Tabs defaultValue="new" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="new" className="relative">
              New
              {consultations.filter(c => c.status === 'new').length > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-white">
                  {consultations.filter(c => c.status === 'new').length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="read">Read</TabsTrigger>
            <TabsTrigger value="responded">Responded</TabsTrigger>
            <TabsTrigger value="archived">Archived</TabsTrigger>
          </TabsList>
          
          <TabsContent value={activeTab} className="mt-6">
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : filteredConsultations.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No {activeTab} consultations</h3>
                <p className="text-muted-foreground mt-2">
                  {activeTab === 'new' 
                    ? "You don't have any new inquiries at the moment." 
                    : `There are no ${activeTab} consultations to display.`}
                </p>
              </div>
            ) : (
              <div className="grid gap-6">
                {filteredConsultations.map((consultation) => (
                  <Card key={consultation.id} className="overflow-hidden">
                    <CardHeader className="bg-muted/50 pb-4">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                        <div>
                          <CardTitle className="text-xl">{consultation.subject}</CardTitle>
                          <CardDescription className="flex items-center mt-1">
                            From: {consultation.name} {getStatusBadge(consultation.status)}
                          </CardDescription>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="mr-1 h-4 w-4" />
                          {formatDistanceToNow(new Date(consultation.created_at), { addSuffix: true })}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="mb-6">
                        <p className="whitespace-pre-wrap">{consultation.message}</p>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t">
                        <div className="flex flex-col gap-2">
                          <div className="flex items-center">
                            <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                            <a 
                              href={`mailto:${consultation.email}`} 
                              className="text-sm text-primary hover:underline"
                            >
                              {consultation.email}
                            </a>
                          </div>
                          <div className="flex items-center">
                            <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                            <a 
                              href={`tel:${consultation.phone}`} 
                              className="text-sm text-primary hover:underline"
                            >
                              {consultation.phone}
                            </a>
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          {getActionButtons(consultation)}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}

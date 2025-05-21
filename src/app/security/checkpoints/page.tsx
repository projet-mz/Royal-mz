'use client';

import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '../../../components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Badge } from '../../../components/ui/badge';
import { Skeleton } from '../../../components/ui/skeleton';
import { useAuth } from '../../../lib/context/AuthContext';
import { 
  getSecurityCheckpoints, 
  createSecurityCheckpoint, 
  updateSecurityCheckpoint, 
  deleteSecurityCheckpoint 
} from '../../../services/security-portal';
import { SecurityCheckpoint } from '../../../lib/types/security';
import { 
  Shield, 
  Plus, 
  Edit, 
  Trash2, 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  MapPin 
} from 'lucide-react';

export default function CheckpointsPage() {
  const { user } = useAuth();
  const [checkpoints, setCheckpoints] = useState<SecurityCheckpoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    fetchCheckpoints();
  }, []);

  const fetchCheckpoints = async () => {
    setLoading(true);
    try {
      const { data, error } = await getSecurityCheckpoints();
      
      if (error) throw error;
      
      if (data) {
        setCheckpoints(data as SecurityCheckpoint[]);
      }
    } catch (error) {
      console.error('Error fetching checkpoints:', error);
      setError('Failed to load security checkpoints');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCheckpoint = async () => {
    if (!name || !location) {
      setError('Name and location are required');
      return;
    }
    
    try {
      const { data, error } = await createSecurityCheckpoint(name, location);
      
      if (error) throw error;
      
      if (data) {
        setCheckpoints([...checkpoints, data as SecurityCheckpoint]);
        setSuccess('Checkpoint created successfully');
        resetForm();
      }
    } catch (error) {
      console.error('Error creating checkpoint:', error);
      setError('Failed to create checkpoint');
    }
  };

  const handleUpdateCheckpoint = async (id: string) => {
    if (!name || !location) {
      setError('Name and location are required');
      return;
    }
    
    try {
      const { data, error } = await updateSecurityCheckpoint(id, name, location, isActive);
      
      if (error) throw error;
      
      if (data) {
        setCheckpoints(checkpoints.map(cp => cp.id === id ? data as SecurityCheckpoint : cp));
        setSuccess('Checkpoint updated successfully');
        resetForm();
      }
    } catch (error) {
      console.error('Error updating checkpoint:', error);
      setError('Failed to update checkpoint');
    }
  };

  const handleDeleteCheckpoint = async (id: string) => {
    if (!confirm('Are you sure you want to delete this checkpoint?')) {
      return;
    }
    
    try {
      const { error } = await deleteSecurityCheckpoint(id);
      
      if (error) throw error;
      
      setCheckpoints(checkpoints.filter(cp => cp.id !== id));
      setSuccess('Checkpoint deleted successfully');
    } catch (error) {
      console.error('Error deleting checkpoint:', error);
      setError('Failed to delete checkpoint');
    }
  };

  const startEditing = (checkpoint: SecurityCheckpoint) => {
    setIsEditing(checkpoint.id);
    setName(checkpoint.name);
    setLocation(checkpoint.location);
    setIsActive(checkpoint.isActive);
    setIsCreating(false);
  };

  const resetForm = () => {
    setName('');
    setLocation('');
    setIsActive(true);
    setIsCreating(false);
    setIsEditing(null);
  };

  const clearMessages = () => {
    setError(null);
    setSuccess(null);
  };

  return (
    <DashboardLayout role="security">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Security Checkpoints</h2>
            <p className="text-muted-foreground">
              Manage security checkpoints for student check-in/out
            </p>
          </div>
          <Button 
            onClick={() => {
              resetForm();
              setIsCreating(true);
              clearMessages();
            }}
            className="mt-4 md:mt-0"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Checkpoint
          </Button>
        </div>
        
        {error && (
          <div className="bg-destructive/10 text-destructive p-3 rounded-md flex items-start">
            <AlertTriangle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
            <div>
              <p>{error}</p>
              <Button 
                variant="link" 
                className="p-0 h-auto text-destructive" 
                onClick={() => setError(null)}
              >
                Dismiss
              </Button>
            </div>
          </div>
        )}
        
        {success && (
          <div className="bg-success/10 text-success p-3 rounded-md flex items-start">
            <CheckCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
            <div>
              <p>{success}</p>
              <Button 
                variant="link" 
                className="p-0 h-auto text-success" 
                onClick={() => setSuccess(null)}
              >
                Dismiss
              </Button>
            </div>
          </div>
        )}
        
        {(isCreating || isEditing) && (
          <Card>
            <CardHeader>
              <CardTitle>{isEditing ? 'Edit Checkpoint' : 'Create New Checkpoint'}</CardTitle>
              <CardDescription>
                {isEditing ? 'Update the checkpoint details' : 'Add a new security checkpoint'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Checkpoint Name</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter checkpoint name"
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Enter checkpoint location"
                    className="mt-1"
                  />
                </div>
                
                {isEditing && (
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="isActive"
                      checked={isActive}
                      onChange={(e) => setIsActive(e.target.checked)}
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <Label htmlFor="isActive" className="text-sm font-medium">
                      Active
                    </Label>
                  </div>
                )}
                
                <div className="flex space-x-2 pt-2">
                  <Button
                    onClick={() => isEditing ? handleUpdateCheckpoint(isEditing) : handleCreateCheckpoint()}
                    className="flex-1"
                  >
                    {isEditing ? 'Update Checkpoint' : 'Create Checkpoint'}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={resetForm}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        
        <div className="space-y-4">
          {loading ? (
            <div className="space-y-3">
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
            </div>
          ) : checkpoints.length === 0 ? (
            <div className="text-center py-12 border rounded-md">
              <Shield className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No Checkpoints Found</h3>
              <p className="text-muted-foreground mt-2">
                Create your first security checkpoint to get started
              </p>
            </div>
          ) : (
            checkpoints.map((checkpoint) => (
              <Card key={checkpoint.id} className={!checkpoint.isActive ? 'opacity-70' : ''}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex items-start space-x-4">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <Shield className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium">{checkpoint.name}</h3>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4 mr-1" />
                          {checkpoint.location}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Badge className={checkpoint.isActive ? 'bg-success' : 'bg-secondary'}>
                        {checkpoint.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => startEditing(checkpoint)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteCheckpoint(checkpoint.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

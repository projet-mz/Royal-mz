import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { SecurityPortalService, SecurityDashboardStats } from '@royal-mz/shared';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

export const SecurityDashboardScreen: React.FC = () => {
  const [stats, setStats] = useState<SecurityDashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const securityService = new SecurityPortalService(supabase);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const { data, error } = await securityService.getSecurityDashboardStats();
      if (error) throw error;
      
      if (data) {
        setStats(data);
      }
    } catch (error) {
      console.error('Error fetching security dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Security Dashboard</Text>
        <Text style={styles.subtitle}>
          Monitor student check-in/out status and security alerts in real-time
        </Text>
      </View>
      
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statTitle}>Students Checked In</Text>
          <Text style={styles.statValue}>{stats?.studentsCheckedIn || 0}</Text>
          <Text style={styles.statSubtitle}>Currently on campus</Text>
        </View>
        
        <View style={styles.statCard}>
          <Text style={styles.statTitle}>Students Checked Out</Text>
          <Text style={styles.statValue}>{stats?.studentsCheckedOut || 0}</Text>
          <Text style={styles.statSubtitle}>Left campus today</Text>
        </View>
        
        <View style={styles.statCard}>
          <Text style={styles.statTitle}>Active Incidents</Text>
          <Text style={[styles.statValue, stats?.activeIncidents ? styles.alertValue : {}]}>
            {stats?.activeIncidents || 0}
          </Text>
          <Text style={styles.statSubtitle}>Requiring attention</Text>
        </View>
        
        <View style={styles.statCard}>
          <Text style={styles.statTitle}>Active Alerts</Text>
          <Text style={[styles.statValue, stats?.activeAlerts ? styles.alertValue : {}]}>
            {stats?.activeAlerts || 0}
          </Text>
          <Text style={styles.statSubtitle}>Security notifications</Text>
        </View>
      </View>
      
      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>Student Check-in/out</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>Security Checkpoints</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>Guardian Verification</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>Incidents & Alerts</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    padding: 20,
    backgroundColor: '#3b82f6',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 5,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
  },
  statCard: {
    width: '50%',
    padding: 10,
  },
  statTitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  alertValue: {
    color: '#ef4444',
  },
  statSubtitle: {
    fontSize: 12,
    color: '#999',
  },
  actionsContainer: {
    padding: 20,
  },
  actionButton: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  actionButtonText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
});

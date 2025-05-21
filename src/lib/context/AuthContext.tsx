import React, { createContext, useContext, useState, ReactNode } from 'react';
import { UserRole } from '../types';

interface AuthContextType {
  user: {
    id: string;
    name: string;
    role: UserRole;
  } | null;
  login: (email: string, password: string, role: UserRole) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthContextType['user']>(null);

  const login = (email: string, password: string, role: UserRole) => {
    let name = '';
    let id = '';
    
    switch (role) {
      case 'admin':
        name = 'John Doe';
        id = '1';
        break;
      case 'teacher':
        name = 'Jane Smith';
        id = '2';
        break;
      case 'student':
        name = 'Michael Johnson';
        id = '3';
        break;
      case 'parent':
        name = 'Sarah Williams';
        id = '4';
        break;
    }
    
    setUser({ id, name, role });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

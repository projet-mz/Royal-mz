import React, { createContext, useState, useEffect, useContext } from 'react';
import { AuthService, User } from '@royal-mz/shared';
import { supabase } from '../lib/supabase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<{ error: any }>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signIn: async () => ({ error: new Error('Not implemented') }),
  signOut: async () => ({ error: new Error('Not implemented') }),
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const authService = new AuthService(supabase);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session) {
          const { data } = await authService.getUser();
          setUser(data);
        } else {
          setUser(null);
        }
        setLoading(false);
      }
    );

    checkUser();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  async function checkUser() {
    const { data } = await authService.getUser();
    setUser(data);
    setLoading(false);
  }

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    const { error } = await authService.signIn(email, password);
    setLoading(false);
    return { error };
  };

  const signOut = async () => {
    setLoading(true);
    const { error } = await authService.signOut();
    setLoading(false);
    return { error };
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

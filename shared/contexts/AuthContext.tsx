import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  businessName?: string;
}

interface AuthContextType {
  isLoggedIn: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (userData: Partial<User>, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const restoreSession = () => {
      try {
        if (typeof window !== 'undefined' && window.localStorage) {
          const savedUser = localStorage.getItem('leeta_user');
          const savedIsLoggedIn = localStorage.getItem('leeta_isLoggedIn');
          
          if (savedUser && savedIsLoggedIn === 'true') {
            setUser(JSON.parse(savedUser));
            setIsLoggedIn(true);
          }
        }
      } catch (e) {
        console.error('Failed to restore session', e);
      } finally {
        setTimeout(() => setIsLoading(false), 500);
      }
    };

    restoreSession();
  }, []);

  const login = async (email: string, password: string) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockUser: User = {
      id: '1',
      email,
      name: 'Agent John',
      businessName: 'GasHub Enterprise',
    };

    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('leeta_user', JSON.stringify(mockUser));
      localStorage.setItem('leeta_isLoggedIn', 'true');
    }

    setUser(mockUser);
    setIsLoggedIn(true);
  };

  const signup = async (userData: Partial<User>, password: string) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockUser: User = {
      id: '2',
      email: userData.email || '',
      name: userData.name || '',
      businessName: userData.businessName || '',
    };

    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('leeta_user', JSON.stringify(mockUser));
      localStorage.setItem('leeta_isLoggedIn', 'true');
    }

    setUser(mockUser);
    setIsLoggedIn(true);
  };

  const logout = () => {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem('leeta_user');
      localStorage.removeItem('leeta_isLoggedIn');
    }
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

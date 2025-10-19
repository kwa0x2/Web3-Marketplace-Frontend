'use client';

import React, { createContext, useState, useEffect, useRef, ReactNode } from 'react';
import { useAccount, useSignMessage } from 'wagmi';
import { authService } from '@/api/services/auth.service';
import type { User } from '@/types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  address: string | undefined;
  isConnected: boolean;

  authenticate: () => Promise<boolean>;
  logout: () => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const { address, isConnected, chain } = useAccount();
  const { signMessageAsync } = useSignMessage();

  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const prevConnected = useRef<boolean | undefined>(undefined);

  useEffect(() => {
    checkSession();
  }, []);

  useEffect(() => {
    const wasConnected = prevConnected.current;
    prevConnected.current = isConnected;

    if (wasConnected === true && !isConnected && isAuthenticated) {
      logout();
    }
  }, [isConnected, isAuthenticated]);

  const checkSession = async () => {
    try {
      const response = await authService.getCurrentUser();
      if (response.success && response.data?.user) {
        setUser(response.data.user);
        setIsAuthenticated(true);
      }
    } catch (err) {
      setIsAuthenticated(false);
      setUser(null);
    }
  };

  const authenticate = async (): Promise<boolean> => {
    if (!address || !isConnected) {
      setError('Wallet not connected');
      return false;
    }

    setIsLoading(true);
    setError(null);

    try {
      const nonceResponse = await authService.getNonce(address);
      if (!nonceResponse.success || !nonceResponse.data?.message) {
        throw new Error('Failed to get nonce');
      }

      const signature = await signMessageAsync({
        message: nonceResponse.data.message,
      });

      const verifyResponse = await authService.verifySignature(
        signature,
        address,
        chain?.id
      );

      if (!verifyResponse.success || !verifyResponse.data?.user) {
        throw new Error('Signature verification failed');
      }

      const { user: newUser } = verifyResponse.data;

      setUser(newUser);
      setIsAuthenticated(true);

      return true;
    } catch (err: any) {
      const errorMessage = err?.message || 'Authentication failed';
      setError(errorMessage);
      console.error('Authentication error:', err);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setUser(null);
      setIsAuthenticated(false);
      setError(null);
    }
  };

  const clearError = () => {
    setError(null);
  };

  const value: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    error,
    address,
    isConnected,
    authenticate,
    logout,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export { AuthContext };

'use client';

import { useState, useEffect } from 'react';
import { useAccount, useSignMessage } from 'wagmi';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
const API_BASE = `${API_URL}/api/v1`;

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
}

export function useAuth() {
  const { address, isConnected, chain } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [authState, setAuthState] = useState<AuthState>({
    token: null,
    isAuthenticated: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load token from localStorage on mount
  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      setAuthState({ token, isAuthenticated: true });
    }
  }, []);

  // Clear auth when wallet disconnects
  useEffect(() => {
    if (!isConnected) {
      logout();
    }
  }, [isConnected]);

  const authenticate = async () => {
    if (!address || !isConnected) {
      setError('Wallet not connected');
      return null;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Step 1: Get nonce message from backend
      const nonceResponse = await fetch(`${API_BASE}/auth/nonce`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ address }),
      });

      if (!nonceResponse.ok) {
        throw new Error('Failed to get nonce');
      }

      const { message } = await nonceResponse.json();

      // Step 2: Sign the message with wallet
      const signature = await signMessageAsync({ message });

      // Step 3: Verify signature and get JWT token
      const verifyResponse = await fetch(`${API_BASE}/auth/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          signature,
          address,
          chainId: chain?.id,
        }),
      });

      if (!verifyResponse.ok) {
        throw new Error('Signature verification failed');
      }

      const { token } = await verifyResponse.json();

      // Store token
      localStorage.setItem('auth_token', token);
      setAuthState({ token, isAuthenticated: true });

      return token;
    } catch (err: any) {
      const errorMessage = err?.message || 'Authentication failed';
      setError(errorMessage);
      console.error('Authentication error:', err);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    setAuthState({ token: null, isAuthenticated: false });
  };

  const getAuthHeader = () => {
    if (!authState.token) return {};
    return {
      Authorization: `Bearer ${authState.token}`,
    };
  };

  return {
    ...authState,
    address,
    isConnected,
    isLoading,
    error,
    authenticate,
    logout,
    getAuthHeader,
  };
}

'use client';

import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { useAuth } from '@/hooks/useAuth';

interface SignaturePromptProps {
  onComplete: () => void;
  onBack: () => void;
  chainId: string;
}

export function SignaturePrompt({ onComplete, onBack, chainId }: SignaturePromptProps) {
  const { address } = useAccount();
  const { authenticate, isLoading, error: authError, isAuthenticated } = useAuth();
  const [localError, setLocalError] = useState<string>('');

  useEffect(() => {
    if (isAuthenticated) {
      onComplete();
    }
  }, [isAuthenticated, onComplete]);

  const handleSign = async () => {
    if (!address) {
      setLocalError('Wallet not connected');
      return;
    }

    setLocalError('');

    try {
      const success = await authenticate();

      if (success) {
        setTimeout(() => {
          onComplete();
        }, 500);
      } else {
        setLocalError(authError || 'Authentication failed. Please try again.');
      }
    } catch (err: any) {
      console.error('Authentication error:', err);
      setLocalError(err.message || 'Failed to authenticate. Please try again.');
    }
  };

  const displayError = localError || authError;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="mb-6">
          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">
          Sign Message to Continue
        </h2>
        <p className="text-gray-300">
          Verify your wallet ownership by signing a message
        </p>
      </div>

      <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="flex-1">
            <h4 className="text-white font-semibold mb-2">Why do I need to sign?</h4>
            <ul className="text-sm text-gray-300 space-y-2">
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">•</span>
                <span>Verify you own this wallet address</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">•</span>
                <span>This is completely free and safe</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">•</span>
                <span>No blockchain transactions</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">•</span>
                <span>Creates a secure session for NFT creation</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-400 mb-1">Connected Wallet</p>
            <p className="text-white font-mono text-sm">
              {address?.slice(0, 6)}...{address?.slice(-4)}
            </p>
          </div>
          <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
        </div>
      </div>

      {displayError && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
          <div className="flex items-center space-x-3">
            <svg className="w-5 h-5 text-red-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-red-400 text-sm">{displayError}</p>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between pt-4">
        <button
          onClick={onBack}
          disabled={isLoading}
          className="px-6 py-3 rounded-lg font-semibold text-gray-300 hover:text-white hover:bg-gray-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ← Back
        </button>

        <button
          onClick={handleSign}
          disabled={isLoading}
          className="px-8 py-3 rounded-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center space-x-2"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Signing...</span>
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
              <span>Sign Message</span>
            </>
          )}
        </button>
      </div>

      <div className="text-center pt-4">
        <p className="text-xs text-gray-500">
          🔒 Your signature is used only for verification and cannot move funds
        </p>
      </div>
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { useAuth } from '@/hooks/useAuth';
import { SignaturePromptProps } from './types';
import { InfoBox } from './info-box';
import { WalletInfo } from './wallet-info';
import { SignButton } from './sign-button';

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

      <InfoBox />
      <WalletInfo address={address} />

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

      <SignButton isLoading={isLoading} onSign={handleSign} onBack={onBack} />

      <div className="text-center pt-4">
        <p className="text-xs text-gray-500">
          🔒 Your signature is used only for verification and cannot move funds
        </p>
      </div>
    </div>
  );
}

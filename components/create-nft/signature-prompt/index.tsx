'use client';

import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { useAuth } from '@/hooks/useAuth';
import { SignaturePromptProps } from './types';
import { ShieldCheck, Loader2, AlertCircle, Wallet, CheckCircle2 } from 'lucide-react';

export function SignaturePrompt({ onComplete }: SignaturePromptProps) {
  const { address } = useAccount();
  const { authenticate, isLoading, error: authError, isAuthenticated } = useAuth();
  const [localError, setLocalError] = useState('');

  useEffect(() => {
    if (isAuthenticated) onComplete();
  }, [isAuthenticated, onComplete]);

  const handleSign = async () => {
    if (!address) { setLocalError('Wallet not connected'); return; }
    setLocalError('');
    try {
      const success = await authenticate();
      if (!success) setLocalError(authError || 'Authentication failed. Please try again.');
    } catch (err: any) {
      setLocalError(err.message || 'Failed to authenticate.');
    }
  };

  const displayError = localError || authError;
  const shortAddress = address ? `${address.slice(0, 6)}...${address.slice(-4)}` : '';

  return (
    <div className="max-w-lg mx-auto">
      {/* Icon */}
      <div className="flex justify-center mb-8">
        <div className="relative">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center shadow-2xl shadow-purple-500/30">
            <ShieldCheck className="w-10 h-10 text-white" />
          </div>
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-[#0f0f0f] flex items-center justify-center">
            <CheckCircle2 className="w-3.5 h-3.5 text-white" />
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-white text-center mb-2">Verify Your Wallet</h2>
      <p className="text-gray-500 text-center text-sm mb-8">
        Sign a message to confirm wallet ownership. This is free and doesn't create a transaction.
      </p>

      {/* Wallet card */}
      <div className="bg-white/[0.03] ring-1 ring-white/[0.08] rounded-2xl p-4 mb-4 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center flex-shrink-0">
          <Wallet className="w-5 h-5 text-purple-400" />
        </div>
        <div>
          <p className="text-xs text-gray-500">Connected Wallet</p>
          <p className="text-white font-mono font-medium text-sm">{shortAddress}</p>
        </div>
        <div className="ml-auto flex items-center gap-1.5 px-2.5 py-1 bg-green-500/10 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
          <span className="text-green-400 text-[11px] font-medium">Connected</span>
        </div>
      </div>

      {/* Info points */}
      <div className="bg-white/[0.02] ring-1 ring-white/[0.06] rounded-2xl p-4 mb-6 space-y-2.5">
        {[
          'Verifies you own this wallet address',
          'Completely free — no gas fees',
          'Creates a secure session for NFT creation',
        ].map((point) => (
          <div key={point} className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-purple-400 flex-shrink-0" />
            <span className="text-gray-400 text-sm">{point}</span>
          </div>
        ))}
      </div>

      {/* Error */}
      {displayError && (
        <div className="flex items-center gap-2.5 bg-red-500/10 ring-1 ring-red-500/20 rounded-xl p-3.5 mb-4">
          <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
          <p className="text-red-400 text-sm">{displayError}</p>
        </div>
      )}

      {/* Sign button */}
      <button
        onClick={handleSign}
        disabled={isLoading}
        className="w-full py-3.5 rounded-2xl font-bold text-sm bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all active:scale-[0.99]"
      >
        {isLoading ? (
          <><Loader2 className="w-4 h-4 animate-spin" /> Signing...</>
        ) : (
          <><ShieldCheck className="w-4 h-4" /> Sign & Continue</>
        )}
      </button>
    </div>
  );
}

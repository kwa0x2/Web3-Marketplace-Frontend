'use client';

import { useState, useMemo, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Navigation } from '@/components/home';
import { Button } from '@/components/ui/button';
import { SignaturePrompt } from '@/components/create-nft/signature-prompt';
import { CreateNFTForm } from '@/components/create-nft/create-nft-form';
import { StepIndicator } from '@/components/create-nft/step-indicator';
import { Wallet, Plus } from 'lucide-react';
import Link from 'next/link';

type CreateStep = 'signature' | 'create';

export default function CreatePage() {
  const { isConnected, isAuthenticated } = useAuth();
  const [currentStep, setCurrentStep] = useState<CreateStep>('signature');

  useEffect(() => {
    if (isAuthenticated) setCurrentStep('create');
  }, [isAuthenticated]);

  const steps = useMemo(() => [
    {
      number: 1,
      label: 'Verify Wallet',
      status: (currentStep === 'signature' ? 'current' : 'completed') as 'current' | 'completed' | 'upcoming',
    },
    {
      number: 2,
      label: 'Create NFT',
      status: (currentStep === 'create' ? 'current' : 'upcoming') as 'current' | 'completed' | 'upcoming',
    },
  ], [currentStep]);

  return (
    <div className="min-h-screen bg-black">
      <Navigation />

      {/* Hero */}
      <div className="relative overflow-hidden border-b border-white/[0.06]">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-blue-900/20 to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(139,92,246,0.2),transparent_60%)]" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />
        <div className="relative max-w-[1800px] mx-auto px-6 md:px-8 py-10">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 h-7 rounded-lg bg-purple-500/20 flex items-center justify-center">
              <Plus className="w-3.5 h-3.5 text-purple-400" />
            </div>
            <span className="text-purple-400 text-sm font-medium">Create</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-1">Create NFT</h1>
          <p className="text-gray-500 text-sm">Mint your digital asset on the blockchain.</p>
        </div>
      </div>

      <div className="max-w-[1800px] mx-auto px-6 md:px-8 py-10">
        {/* Not connected */}
        {!isConnected ? (
          <div className="max-w-md mx-auto text-center py-20">
            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
              <Wallet className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Connect Your Wallet</h2>
            <p className="text-gray-500 mb-8 text-sm">
              Connect your wallet to start creating NFTs.
            </p>
            <Link href="/">
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 px-8">
                Go to Home
              </Button>
            </Link>
          </div>
        ) : currentStep === 'signature' ? (
          <div className="max-w-xl mx-auto">
            <StepIndicator steps={steps} />
            <div className="bg-[#0f0f0f] ring-1 ring-white/[0.08] rounded-2xl p-8">
              <SignaturePrompt onComplete={() => setCurrentStep('create')} />
            </div>
          </div>
        ) : (
          <>
            <StepIndicator steps={steps} />
            <CreateNFTForm />
          </>
        )}
      </div>
    </div>
  );
}

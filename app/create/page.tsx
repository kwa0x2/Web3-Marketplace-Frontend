'use client';

import { useState, useMemo } from 'react';
import { useAccount } from 'wagmi';
import { Navigation } from '@/components/home';
import {
  BlockchainSelector,
  SignaturePrompt,
  CreateNFTForm,
  StepIndicator
} from '@/components/create-nft';

type CreateStep = 'blockchain' | 'signature' | 'upload';

export default function CreatePage() {
  const { isConnected } = useAccount();
  const [currentStep, setCurrentStep] = useState<CreateStep>('blockchain');
  const [selectedChain, setSelectedChain] = useState<string>('');
  const [isSigned, setIsSigned] = useState(false);

  const steps = useMemo(() => {
    return [
      {
        number: 1,
        label: 'Blockchain',
        status: (currentStep === 'blockchain'
          ? 'current'
          : selectedChain
          ? 'completed'
          : 'upcoming') as 'current' | 'completed' | 'upcoming'
      },
      {
        number: 2,
        label: 'Sign Message',
        status: (currentStep === 'signature'
          ? 'current'
          : isSigned
          ? 'completed'
          : 'upcoming') as 'current' | 'completed' | 'upcoming'
      },
      {
        number: 3,
        label: 'Create NFT',
        status: (currentStep === 'upload' ? 'current' : 'upcoming') as 'current' | 'completed' | 'upcoming'
      }
    ];
  }, [currentStep, selectedChain, isSigned]);

  const handleChainSelect = (chainId: string) => {
    setSelectedChain(chainId);
    setCurrentStep('signature');
  };

  const handleSignComplete = () => {
    setIsSigned(true);
    setCurrentStep('upload');
  };

  const handleBack = () => {
    if (currentStep === 'signature') {
      setCurrentStep('blockchain');
      setSelectedChain('');
    } else if (currentStep === 'upload') {
      setCurrentStep('signature');
      setIsSigned(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-violet-900">
      <Navigation />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          {isConnected && <StepIndicator steps={steps} />}

          {!isConnected ? (
            <div className="max-w-2xl mx-auto">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-12 border border-purple-500/20 text-center">
                <div className="mb-6">
                  <svg className="w-20 h-20 mx-auto text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Connect Your Wallet
                </h3>
                <p className="text-gray-300 mb-6">
                  Please connect your wallet to create an NFT
                </p>
                <appkit-button />
              </div>
            </div>
          ) : currentStep === 'blockchain' ? (
            <div className="max-w-4xl mx-auto bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20">
              <BlockchainSelector onSelect={handleChainSelect} />
            </div>
          ) : currentStep === 'signature' ? (
            <div className="max-w-4xl mx-auto bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20">
              <SignaturePrompt
                onComplete={handleSignComplete}
                onBack={handleBack}
                chainId={selectedChain}
              />
            </div>
          ) : (
            <CreateNFTForm />
          )}
        </div>
      </div>
    </div>
  );
}

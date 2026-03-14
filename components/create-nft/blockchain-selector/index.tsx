'use client';

import { useState } from 'react';
import { supportedChains } from './constants'
interface BlockchainSelectorProps {
  onSelect: (chainId: string) => void;
}

export function BlockchainSelector({ onSelect }: BlockchainSelectorProps) {
  const [selectedChain, setSelectedChain] = useState<string>('');

  const handleSelect = (chainId: string) => {
    setSelectedChain(chainId);
  };

  const handleContinue = () => {
    if (selectedChain) {
      onSelect(selectedChain);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">
          Select Blockchain Network
        </h2>
        <p className="text-gray-300">
          Choose the blockchain where you want to mint your NFT
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {supportedChains.map((chain) => (
          <button
            key={chain.id}
            onClick={() => handleSelect(chain.id)}
            className={`relative p-6 rounded-xl border-2 transition-all duration-300 text-left ${
              selectedChain === chain.id
                ? 'border-purple-500 bg-purple-500/10 scale-105'
                : 'border-gray-700 bg-gray-800/30 hover:border-purple-400/50 hover:bg-gray-800/50'
            }`}
          >
            {selectedChain === chain.id && (
              <div className="absolute top-4 right-4">
                <div className="w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
            )}

            <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${chain.color} flex items-center justify-center text-2xl mb-4`}>
              {chain.icon}
            </div>

            <h3 className="text-xl font-bold text-white mb-2">
              {chain.name}
            </h3>
            <p className="text-gray-400 text-sm">
              {chain.description}
            </p>
          </button>
        ))}
      </div>

      <div className="flex justify-end pt-4">
        <button
          onClick={handleContinue}
          disabled={!selectedChain}
          className={`px-8 py-3 rounded-lg font-semibold transition-all duration-300 ${
            selectedChain
              ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50'
              : 'bg-gray-700 text-gray-500 cursor-not-allowed'
          }`}
        >
          Continue to Sign Message
        </button>
      </div>
    </div>
  );
}

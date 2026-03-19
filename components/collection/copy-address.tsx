'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

export function CopyAddress({ address }: { address: string }) {
  const [copied, setCopied] = useState(false);
  const short = `${address.slice(0, 6)}...${address.slice(-4)}`;

  const copy = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button
      onClick={copy}
      className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group"
    >
      <div className="w-4 h-4 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex-shrink-0" />
      <span className="text-gray-300 text-sm font-mono">{short}</span>
      {copied ? (
        <Check className="w-3 h-3 text-green-400" />
      ) : (
        <Copy className="w-3 h-3 text-gray-600 group-hover:text-gray-400 transition-colors" />
      )}
    </button>
  );
}

'use client';

import Link from 'next/link';
import { Check, Copy, ExternalLink, Loader2, Plus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface ProfileHeaderProps {
  address: string;
  shortAddress: string;
  isAuthenticated: boolean;
  isAuthLoading: boolean;
  authError: string | null;
  copied: boolean;
  chainName?: string;
  explorerBase: string;
  onCopy: () => void;
  onAuthenticate: () => void;
}

export function ProfileHeader({
  address,
  shortAddress,
  isAuthenticated,
  isAuthLoading,
  authError,
  copied,
  chainName,
  explorerBase,
  onCopy,
  onAuthenticate,
}: ProfileHeaderProps) {
  return (
    <>
      <div className="flex flex-col md:flex-row items-start md:items-end gap-5">
        {/* Avatar */}
        <div className="relative">
          <div className="w-28 h-28 rounded-2xl bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 p-[3px] shadow-xl shadow-purple-500/20">
            <div className="w-full h-full rounded-[13px] bg-[#0a0a0a] flex items-center justify-center overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center">
                <span className="text-3xl font-bold text-white/80">
                  {address?.slice(2, 4).toUpperCase()}
                </span>
              </div>
            </div>
          </div>
          {isAuthenticated && (
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-[3px] border-[#0a0a0a] flex items-center justify-center">
              <Check className="w-3 h-3 text-white" />
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0 pb-1">
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-2xl font-bold text-white">{shortAddress}</h1>
            <button
              onClick={onCopy}
              className="flex items-center gap-1.5 px-2.5 py-1 bg-white/[0.05] hover:bg-white/[0.1] rounded-lg transition-colors text-xs"
            >
              {copied ? (
                <>
                  <Check className="w-3 h-3 text-green-400" />
                  <span className="text-green-400">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3 text-gray-500" />
                  <span className="text-gray-500">Copy</span>
                </>
              )}
            </button>
            <a
              href={`${explorerBase}/address/${address}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 px-2.5 py-1 bg-white/[0.05] hover:bg-white/[0.1] rounded-lg transition-colors text-xs text-gray-500 hover:text-gray-300"
            >
              <ExternalLink className="w-3 h-3" />
              Explorer
            </a>
            {isAuthenticated ? (
              <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/30 text-[11px]">
                Verified
              </Badge>
            ) : (
              <Badge variant="outline" className="bg-yellow-500/10 text-yellow-400 border-yellow-500/30 text-[11px]">
                Not Verified
              </Badge>
            )}
          </div>
          {chainName && (
            <p className="text-gray-600 text-sm mt-1.5">{chainName} Network</p>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 pb-1">
          {!isAuthenticated ? (
            <Button
              onClick={onAuthenticate}
              disabled={isAuthLoading}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500"
            >
              {isAuthLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Verifying...
                </>
              ) : (
                'Verify Wallet'
              )}
            </Button>
          ) : (
            <Link href="/create">
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 gap-2">
                <Plus className="w-4 h-4" />
                Create NFT
              </Button>
            </Link>
          )}
        </div>
      </div>

      {authError && (
        <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-sm text-red-400">
          {authError}
        </div>
      )}
    </>
  );
}

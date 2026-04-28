import { Loader2, CheckCircle, ExternalLink } from 'lucide-react';
import { type MintStep } from '@/hooks/useNFTMint';

const stepLabels: Record<MintStep, string> = {
  idle: 'Create Item',
  uploading: 'Uploading to IPFS...',
  minting: 'Confirm mint in wallet...',
  confirming: 'Waiting for confirmation...',
  approving: 'Approve marketplace in wallet...',
  listing: 'Confirm listing in wallet...',
  saving: 'Saving to database...',
  done: 'NFT Created!',
  error: 'Try Again',
};

interface MintStatusProps {
  mintStep: MintStep;
  mintError: string | null;
  txHash?: string;
  isUploading: boolean;
  hasFile: boolean;
}

export function MintStatus({ mintStep, mintError, txHash, isUploading, hasFile }: MintStatusProps) {
  return (
    <>
      {mintError && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
          <p className="text-red-400 text-sm">{mintError}</p>
        </div>
      )}

      {txHash && mintStep === 'done' && (
        <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 space-y-2">
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <p className="text-green-400 font-semibold">NFT Created Successfully!</p>
          </div>
          <a
            href={`https://sepolia.etherscan.io/tx/${txHash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1 text-purple-400 hover:text-purple-300 text-sm"
          >
            <span>View on Etherscan</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      )}

      <button
        type="submit"
        disabled={isUploading || !hasFile}
        className="w-full py-4 rounded-xl font-bold text-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center space-x-2"
      >
        {isUploading ? (
          <>
            <Loader2 className="w-6 h-6 animate-spin" />
            <span>{stepLabels[mintStep]}</span>
          </>
        ) : mintStep === 'done' ? (
          <>
            <CheckCircle className="w-6 h-6" />
            <span>NFT Created!</span>
          </>
        ) : mintStep === 'error' ? (
          <span>Try Again</span>
        ) : (
          <span>Create Item</span>
        )}
      </button>
    </>
  );
}

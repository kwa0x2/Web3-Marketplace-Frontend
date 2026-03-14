import { UseFormRegister } from 'react-hook-form';
import { NFTFormInput } from '@/lib/validations/nft-form';

interface UnlockableContentProps {
  register: UseFormRegister<NFTFormInput>;
  unlockOnce: boolean;
}

export function UnlockableContent({ register, unlockOnce }: UnlockableContentProps) {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-5 border border-gray-700">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h3 className="text-white font-semibold flex items-center">
            <span className="text-purple-400 mr-2">🔐</span>
            Unlock once purchased
          </h3>
          <p className="text-gray-400 text-sm">Content will be unlocked after successful transaction</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            {...register('unlockOnce')}
            type="checkbox"
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
        </label>
      </div>

      {unlockOnce && (
        <textarea
          {...register('unlockableContent')}
          placeholder="e.g. 'After purchasing you'll be able to get the real T-Shirt'"
          rows={3}
          className="w-full mt-3 px-4 py-3 rounded-xl bg-gray-900/60 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:bg-gray-900/80 transition-all resize-none text-sm"
        />
      )}
    </div>
  );
}

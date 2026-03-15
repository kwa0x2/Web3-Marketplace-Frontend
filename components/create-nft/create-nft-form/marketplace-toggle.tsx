import { UseFormRegister } from 'react-hook-form';
import { NFTFormInput } from '@/lib/validations/nft-form';
import { currencies } from './constants';

interface MarketplaceToggleProps {
  register: UseFormRegister<NFTFormInput>;
  putOnMarketplace: boolean;
  price: string;
  currency: string;
  priceError?: string;
}

export function MarketplaceToggle({ register, putOnMarketplace, price, currency, priceError }: MarketplaceToggleProps) {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-5 border border-gray-700">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h3 className="text-white font-semibold">Put on marketplace</h3>
          <p className="text-gray-400 text-sm">Enter price to allow users instantly purchase your NFT</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            {...register('putOnMarketplace')}
            type="checkbox"
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
        </label>
      </div>

      {putOnMarketplace && (
        <div className="mt-4 space-y-3">
          <div>
            <label className="block text-gray-400 text-sm mb-2">Price *</label>
            <div className="flex items-center space-x-2">
              <input
                {...register('price')}
                type="number"
                placeholder="Enter price"
                step="0.001"
                className="flex-1 px-4 py-3 rounded-xl bg-gray-900/60 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:bg-gray-900/80 transition-all"
              />
              <select
                {...register('currency')}
                className="px-4 py-3 rounded-xl bg-gray-900/60 border border-gray-600 text-white focus:outline-none focus:border-purple-500 focus:bg-gray-900/80 transition-all"
              >
                {currencies.map(cur => (
                  <option key={cur} value={cur}>{cur}</option>
                ))}
              </select>
            </div>
            {priceError && (
              <p className="mt-2 text-sm text-red-400">{priceError}</p>
            )}
          </div>

          {price && (
            <div className="bg-gray-900/50 rounded-lg p-3 space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Price</span>
                <span className="text-white">~ {price} {currency}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Service Fee</span>
                <span className="text-white">2.5%</span>
              </div>
              <div className="flex justify-between font-semibold pt-2 border-t border-gray-700">
                <span className="text-gray-300">You will receive</span>
                <span className="text-purple-400">{(parseFloat(price) * 0.975).toFixed(4)} {currency}</span>
              </div>
            </div>
          )}

          <div>
            <label className="block text-gray-400 text-sm mb-2">Listing duration</label>
            <select
              {...register('expirationDays')}
              className="w-full px-4 py-3 rounded-xl bg-gray-900/60 border border-gray-600 text-white focus:outline-none focus:border-purple-500 focus:bg-gray-900/80 transition-all"
            >
              <option value="7">7 days</option>
              <option value="14">14 days</option>
              <option value="30">30 days</option>
              <option value="60">60 days</option>
              <option value="90">90 days</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
}

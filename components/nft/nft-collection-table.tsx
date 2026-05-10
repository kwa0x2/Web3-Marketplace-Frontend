'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { NFTCollection } from '@/hooks/useCollections';

const CURRENCY_TYPES = ['ETH', '$'] as const;
const ETH_USD = 3850;

interface NFTCollectionTableProps {
  collections: NFTCollection[];
  defaultCurrency?: 'ETH' | '$';
  theme?: 'light' | 'dark';
  showCurrencyToggle?: boolean;
}

export default function NFTCollectionTable({
  collections,
  defaultCurrency = 'ETH',
  theme = 'dark',
  showCurrencyToggle = false,
}: NFTCollectionTableProps) {
  const isDark = theme === 'dark';
  const router = useRouter();
  const [selectedCurrency, setSelectedCurrency] = useState<'ETH' | '$'>(defaultCurrency);

  const isUsd = selectedCurrency === '$';
  const rate = isUsd ? ETH_USD : 1;

  const adjusted = useMemo(() =>
    collections.map((c) => ({
      ...c,
      floorPrice: parseFloat((c.floorPrice * rate).toFixed(isUsd ? 0 : 4)),
    })),
    [collections, rate, isUsd]
  );

  const formatPrice = (v: number) =>
    isUsd ? `$${v.toLocaleString()}` : `${v} ETH`;

  return (
    <>
      {showCurrencyToggle && (
        <div className="flex items-center justify-end gap-2 mb-6">
          {CURRENCY_TYPES.map((currency) => (
            <button
              key={currency}
              onClick={() => setSelectedCurrency(currency)}
              className={`px-3 py-1 text-sm font-medium transition-colors ${
                selectedCurrency === currency
                  ? 'text-white'
                  : isDark
                    ? 'text-gray-500 hover:text-gray-300'
                    : 'text-gray-400 hover:text-white'
              }`}
            >
              {currency}
            </button>
          ))}
        </div>
      )}

      <div className={`${isDark ? 'bg-[#0a0a0a]' : 'bg-black/40'} rounded-lg overflow-hidden ${isDark ? '' : 'border border-white/10'}`}>
        <table className="w-full">
          <thead>
            <tr className={`border-b ${isDark ? 'border-[#2a2a2a]' : 'border-white/10'}`}>
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-4">
                Collection
              </th>
              <th className="text-right text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-4">
                Floor
              </th>
              <th className="text-right text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-4">
                Sales
              </th>
              <th className="text-right text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-4">
                Owners
              </th>
              <th className="text-right text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-4">
                Listed
              </th>
            </tr>
          </thead>
          <tbody>
            {adjusted.map((collection) => (
              <tr
                key={collection.id}
                onClick={() => collection.dbId && router.push(`/collections/${collection.dbId}`)}
                className={`border-b ${isDark ? 'border-[#1a1a1a] hover:bg-[#1a1a1a]' : 'border-white/10 hover:bg-white/5'} transition-colors ${collection.dbId ? 'cursor-pointer' : 'cursor-default'}`}
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={collection.image}
                      alt={collection.name}
                      className="w-10 h-10 rounded-lg"
                    />
                    <div className="flex items-center gap-2">
                      <span className="text-white font-medium">{collection.name}</span>
                      {collection.verified && (
                        <span className="text-yellow-500 text-xs">✓</span>
                      )}
                      {collection.isMock && (
                        <span className="px-1.5 py-0.5 text-[10px] font-medium bg-gray-700 text-gray-400 rounded">DEMO</span>
                      )}
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4 text-right">
                  <span className="text-white font-medium">
                    {formatPrice(collection.floorPrice)}
                  </span>
                </td>

                <td className="px-6 py-4 text-right">
                  <span className="text-white">{collection.sales24h.toLocaleString()}</span>
                </td>

                <td className="px-6 py-4 text-right">
                  <span className="text-white">{collection.owners.toLocaleString()}</span>
                </td>

                <td className="px-6 py-4 text-right">
                  <span className="text-white">{collection.listed}%</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

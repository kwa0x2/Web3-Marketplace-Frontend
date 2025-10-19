'use client';

import { useState } from 'react';
import { TrendingUp, TrendingDown, ArrowDown } from 'lucide-react';
import { NFTCollection } from '@/lib/mock_data';

const TIME_FILTERS = ['1h', '6h', '24h', '7d', '30d'];
const CURRENCY_TYPES = ['ETH', '$'] as const;

interface NFTCollectionTableProps {
  collections: NFTCollection[];
  defaultCurrency?: 'ETH' | '$';
  theme?: 'light' | 'dark';
  showTimeFilters?: boolean;
  showCurrencyToggle?: boolean;
  defaultTimeFilter?: string;
}

export default function NFTCollectionTable({
  collections,
  defaultCurrency = 'ETH',
  theme = 'dark',
  showTimeFilters = false,
  showCurrencyToggle = false,
  defaultTimeFilter = '24h'
}: NFTCollectionTableProps) {
  const isDark = theme === 'dark';
  const [selectedTimeFilter, setSelectedTimeFilter] = useState(defaultTimeFilter);
  const [selectedCurrency, setSelectedCurrency] = useState<'ETH' | '$'>(defaultCurrency);

  return (
    <>
      {(showCurrencyToggle || showTimeFilters) && (
        <div className="flex items-center justify-end gap-6 mb-6">
          {showCurrencyToggle && (
            <div className="flex items-center gap-2">
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

          {showTimeFilters && (
            <div className="flex items-center gap-2">
              {TIME_FILTERS.map((time) => (
                <button
                  key={time}
                  onClick={() => setSelectedTimeFilter(time)}
                  className={`px-3 py-1 text-sm font-medium rounded transition-colors ${
                    selectedTimeFilter === time
                      ? isDark
                        ? 'bg-[#2a2a2a] text-white'
                        : 'bg-purple-600 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          )}
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
              FL. CH
            </th>
            <th className="text-right text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-4">
              Top Offer
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
            <th className="text-right text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-4">
              <div className="flex items-center justify-end gap-1">
                <ArrowDown className="w-3 h-3" />
                Volume
              </div>
            </th>
            <th className="text-right text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-4">
              Floor
            </th>
          </tr>
        </thead>
        <tbody>
          {collections.map((collection) => (
            <tr
              key={collection.id}
              className={`border-b ${isDark ? 'border-[#1a1a1a] hover:bg-[#1a1a1a]' : 'border-white/10 hover:bg-white/5'} transition-colors cursor-pointer`}
            >
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <img
                    src={collection.image}
                    alt={collection.name}
                    className="w-10 h-10 rounded-lg"
                  />
                  <div className="flex items-center gap-2">
                    <span className="text-white font-medium">
                      {collection.name}
                    </span>
                    {collection.verified && (
                      <span className="text-yellow-500 text-xs">✓</span>
                    )}
                  </div>
                </div>
              </td>

              <td className="px-6 py-4 text-right">
                <span className="text-white font-medium">
                  {collection.floorPrice} {selectedCurrency}
                </span>
              </td>

              <td className="px-6 py-4 text-right">
                {collection.floorChange24h !== null ? (
                  <span
                    className={`flex items-center justify-end gap-1 ${
                      collection.floorChange24h > 0
                        ? 'text-green-500'
                        : 'text-red-500'
                    }`}
                  >
                    {collection.floorChange24h > 0 ? (
                      <TrendingUp className="w-3 h-3" />
                    ) : (
                      <TrendingDown className="w-3 h-3" />
                    )}
                    {Math.abs(collection.floorChange24h)}%
                  </span>
                ) : (
                  <span className="text-gray-600">-</span>
                )}
              </td>

              <td className="px-6 py-4 text-right">
                {collection.topOffer ? (
                  <span className="text-white">
                    {collection.topOffer} {selectedCurrency}
                  </span>
                ) : (
                  <span className="text-gray-600">-</span>
                )}
              </td>

              <td className="px-6 py-4 text-right">
                <span className="text-white">{collection.sales24h}</span>
              </td>

              <td className="px-6 py-4 text-right">
                <span className="text-white">
                  {collection.owners.toLocaleString()}
                </span>
              </td>

              <td className="px-6 py-4 text-right">
                <span className="text-white">{collection.listed}%</span>
              </td>

              <td className="px-6 py-4 text-right">
                <span className="text-white font-medium">
                  {collection.volume24h.toLocaleString()} {selectedCurrency}
                </span>
              </td>

              <td className="px-6 py-4 text-right">
                <div className="flex justify-end">
                  {collection.volumeChange24h > 0 ? (
                    <div className="w-20 h-8 text-green-500">
                      <svg viewBox="0 0 40 20" className="w-full h-full">
                        <polyline
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          points="0,15 10,12 20,8 30,5 40,2"
                        />
                      </svg>
                    </div>
                  ) : collection.volumeChange24h < 0 ? (
                    <div className="w-20 h-8 text-red-500">
                      <svg viewBox="0 0 40 20" className="w-full h-full">
                        <polyline
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          points="0,5 10,8 20,12 30,15 40,18"
                        />
                      </svg>
                    </div>
                  ) : (
                    <span className="text-gray-600">-</span>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </>
  );
}

'use client';
import { categories } from './constants'
interface CategorySelectorProps {
  value: string;
  onChange: (category: string) => void;
}

export function CategorySelector({ value, onChange }: CategorySelectorProps) {
  return (
    <div className="space-y-3">
      <label className="block text-white font-semibold">
        Category
      </label>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {categories.map((category) => {
          const Icon = category.icon;
          const isSelected = value === category.id;

          return (
            <button
              key={category.id}
              type="button"
              onClick={() => onChange(category.id)}
              className={`relative p-4 rounded-xl border-2 transition-all duration-300 group ${
                isSelected
                  ? 'border-purple-500 bg-purple-500/10 scale-105 shadow-lg shadow-purple-500/20'
                  : 'border-gray-700 bg-gray-800/30 hover:border-purple-400/50 hover:bg-gray-800/50 hover:scale-102'
              }`}
            >
              {isSelected && (
                <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-purple-600 flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}

              <div className={`w-12 h-12 mx-auto mb-2 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center transition-transform ${
                isSelected ? 'scale-110' : 'group-hover:scale-105'
              }`}>
                <Icon className="w-6 h-6 text-white" />
              </div>

              <p className={`text-center text-sm font-medium transition-colors ${
                isSelected ? 'text-white' : 'text-gray-400 group-hover:text-gray-300'
              }`}>
                {category.name}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}

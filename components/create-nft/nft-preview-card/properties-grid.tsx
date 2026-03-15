interface PropertiesGridProps {
  properties: { trait_type: string; value: string }[];
}

export function PropertiesGrid({ properties }: PropertiesGridProps) {
  if (properties.length === 0) return null;

  return (
    <div className="pt-3 border-t border-gray-700/50">
      <p className="text-xs text-gray-400 mb-2 font-semibold">Properties</p>
      <div className="grid grid-cols-2 gap-2">
        {properties.slice(0, 4).map((prop, index) => (
          <div
            key={index}
            className="bg-gray-800/50 rounded-lg p-2 border border-gray-700/30"
          >
            <p className="text-xs text-purple-400 font-medium">{prop.trait_type}</p>
            <p className="text-sm text-white truncate">{prop.value}</p>
          </div>
        ))}
      </div>
      {properties.length > 4 && (
        <p className="text-xs text-gray-500 mt-2 text-center">
          +{properties.length - 4} more
        </p>
      )}
    </div>
  );
}

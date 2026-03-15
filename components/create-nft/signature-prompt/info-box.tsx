export function InfoBox() {
  return (
    <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6">
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div className="flex-1">
          <h4 className="text-white font-semibold mb-2">Why do I need to sign?</h4>
          <ul className="text-sm text-gray-300 space-y-2">
            <li className="flex items-start">
              <span className="text-blue-400 mr-2">•</span>
              <span>Verify you own this wallet address</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-400 mr-2">•</span>
              <span>This is completely free and safe</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-400 mr-2">•</span>
              <span>No blockchain transactions</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-400 mr-2">•</span>
              <span>Creates a secure session for NFT creation</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

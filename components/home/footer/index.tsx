import Link from 'next/link';
import { marketplaceLinks, accountLinks } from './consts';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 mt-20 bg-black/20">
      <div className="max-w-[1800px] mx-auto px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg" />
              <span className="text-white font-bold text-xl">Web3 Market</span>
            </div>
            <p className="text-gray-500 text-sm max-w-xs">
              Discover, collect and trade unique digital assets on the blockchain.
            </p>
          </div>

          {/* Marketplace */}
          <div>
            <h4 className="text-white font-semibold mb-4">Marketplace</h4>
            <ul className="space-y-2.5">
              {marketplaceLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-gray-500 hover:text-purple-400 transition text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account */}
          <div>
            <h4 className="text-white font-semibold mb-4">My Account</h4>
            <ul className="space-y-2.5">
              {accountLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-gray-500 hover:text-purple-400 transition text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-gray-600 text-sm">
            © {new Date().getFullYear()} Web3 Market. All rights reserved.
          </p>
          <a
            href="mailto:alperenibo12@gmail.com"
            className="text-gray-500 hover:text-purple-400 transition text-sm"
          >
            Contact Us
          </a>
        </div>
      </div>
    </footer>
  );
}

import { marketplaceLinks, myAccountLinks, resourcesLinks, socialLinks, footerBottomLinks } from "./consts";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 mt-20 bg-black/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Top Footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg"></div>
              <span className="text-white font-bold text-2xl">Web3 Market</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-sm">
              The leading marketplace for NFTs, digital products, and API access. Built on blockchain technology for secure transactions.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 bg-white/10 hover:bg-purple-600 rounded-lg flex items-center justify-center transition text-xl"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Marketplace */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-lg">Marketplace</h4>
            <ul className="space-y-3">
              {marketplaceLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-gray-400 hover:text-purple-400 transition flex items-center gap-2">
                    <span className="text-sm">→</span> {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* My Account */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-lg">My Account</h4>
            <ul className="space-y-3">
              {myAccountLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-gray-400 hover:text-purple-400 transition flex items-center gap-2">
                    <span className="text-sm">→</span> {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-lg">Resources</h4>
            <ul className="space-y-3">
              {resourcesLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-gray-400 hover:text-purple-400 transition flex items-center gap-2">
                    <span className="text-sm">→</span> {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-gray-400 text-sm">
            © 2024 Web3 Market. All rights reserved. Built with ❤️ on Blockchain.
          </div>
          <div className="flex flex-wrap gap-6 text-sm">
            {footerBottomLinks.map((link, index) => (
              <a key={index} href={link.href} className="text-gray-400 hover:text-purple-400 transition">
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import { brandName, navigationLinks } from "./consts";
import { Link } from "react-scroll";

export default function Navigation() {
  return (
    <nav className="border-b border-white/10 backdrop-blur-sm bg-black/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg"></div>
            <span className="text-white font-bold text-xl">{brandName}</span>
          </div>
          <div className="hidden md:flex space-x-8">
            {navigationLinks.map((link, index) => (
              <Link
                key={index}
                to={link.href}
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                className="text-gray-300 hover:text-white transition cursor-pointer"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <Button size="lg">
            Connect Wallet
          </Button>
        </div>
      </div>
    </nav>
  );
}

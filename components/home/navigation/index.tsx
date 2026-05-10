"use client";

import { useState } from "react";
import { brandName, navigationLinks } from "./consts";
import { Link as ScrollLink } from "react-scroll";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { WalletButton } from "@/components/wallet/wallet_button";
import { UserMenu } from "@/components/wallet/user-menu";
import { useAuth } from "@/hooks/useAuth";

export default function Navigation() {
  const { isConnected } = useAuth();
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="border-b border-white/10 backdrop-blur-sm bg-black/20 sticky top-0 z-50">
      <div className="max-w-[1800px] mx-auto px-4 md:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <NextLink href="/">
            <div className="flex items-center space-x-2 cursor-pointer">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex-shrink-0" />
              <span className="text-white font-bold text-xl">{brandName}</span>
            </div>
          </NextLink>

          {/* Desktop links */}
          <div className="hidden md:flex space-x-8">
            {navigationLinks.map((link, index) =>
              link.isRoute ? (
                <NextLink
                  key={index}
                  href={link.href}
                  className="text-gray-300 hover:text-white transition cursor-pointer"
                >
                  {link.label}
                </NextLink>
              ) : isHome ? (
                <ScrollLink
                  key={index}
                  to={link.href}
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={500}
                  className="text-gray-300 hover:text-white transition cursor-pointer"
                >
                  {link.label}
                </ScrollLink>
              ) : (
                <NextLink
                  key={index}
                  href={`/#${link.href}`}
                  className="text-gray-300 hover:text-white transition cursor-pointer"
                >
                  {link.label}
                </NextLink>
              )
            )}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {isConnected ? <UserMenu /> : <WalletButton />}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X className="w-5 h-5 text-white" />
              ) : (
                <Menu className="w-5 h-5 text-white" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-white/10 bg-black/90 backdrop-blur-md">
          <div className="px-4 py-3 flex flex-col gap-1">
            {navigationLinks.map((link, index) =>
              link.isRoute ? (
                <NextLink
                  key={index}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-3 py-2.5 rounded-lg text-gray-300 hover:text-white hover:bg-white/[0.06] transition-colors text-sm font-medium"
                >
                  {link.label}
                </NextLink>
              ) : isHome ? (
                <ScrollLink
                  key={index}
                  to={link.href}
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={500}
                  onClick={() => setMobileOpen(false)}
                  className="px-3 py-2.5 rounded-lg text-gray-300 hover:text-white hover:bg-white/[0.06] transition-colors text-sm font-medium cursor-pointer"
                >
                  {link.label}
                </ScrollLink>
              ) : (
                <NextLink
                  key={index}
                  href={`/#${link.href}`}
                  onClick={() => setMobileOpen(false)}
                  className="px-3 py-2.5 rounded-lg text-gray-300 hover:text-white hover:bg-white/[0.06] transition-colors text-sm font-medium"
                >
                  {link.label}
                </NextLink>
              )
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

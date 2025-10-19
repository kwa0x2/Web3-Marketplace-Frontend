'use client';

import { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useAppKit } from '@reown/appkit/react';
import Link from 'next/link';
import { ChevronDown, User, LayoutDashboard, LogOut, Wallet } from 'lucide-react';
import { useDisconnect } from 'wagmi';
import { Button } from '@/components/ui/button';

export function UserMenu() {
  const { address, isAuthenticated } = useAuth();
  const { disconnect } = useDisconnect();
  const { open } = useAppKit();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!address) {
    return null;
  }

  const handleDisconnect = () => {
    disconnect();
    setIsOpen(false);
  };

  const handleOpenWallet = () => {
    open();
    setIsOpen(false);
  };

  const handleToggleMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative" ref={menuRef}>
      <Button
        variant="outline"
        onClick={handleToggleMenu}
        className="flex items-center gap-2"
      >
        <User className="h-4 w-4" />
        <span>{address.slice(0, 6)}...{address.slice(-4)}</span>
        <ChevronDown
          className={`h-4 w-4 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-gray-900 border border-white/10 rounded-lg shadow-xl overflow-hidden z-[100]">
          <div className="px-4 py-3 border-b border-white/10">
            <p className="text-xs text-gray-400">Connected Wallet</p>
            <p className="text-sm text-white font-mono mt-1">
              {address.slice(0, 10)}...{address.slice(-8)}
            </p>
          </div>

          <div className="py-2">
            {isAuthenticated && (
              <Link
                href="/dashboard"
                onClick={() => setIsOpen(false)}
                className="flex items-center space-x-3 px-4 py-2.5 hover:bg-white/5 transition-colors"
              >
                <LayoutDashboard className="w-4 h-4 text-purple-400" />
                <span className="text-white">Dashboard</span>
              </Link>
            )}

            <Link
              href="/profile"
              onClick={() => setIsOpen(false)}
              className="flex items-center space-x-3 px-4 py-2.5 hover:bg-white/5 transition-colors"
            >
              <User className="w-4 h-4 text-blue-400" />
              <span className="text-white">Profile</span>
            </Link>

            <button
              onClick={handleOpenWallet}
              className="flex items-center space-x-3 px-4 py-2.5 hover:bg-white/5 transition-colors w-full"
            >
              <Wallet className="w-4 h-4 text-green-400" />
              <span className="text-white">My Wallet</span>
            </button>
          </div>

          <div className="border-t border-white/10 py-2">
            <button
              onClick={handleDisconnect}
              className="flex items-center space-x-3 px-4 py-2.5 hover:bg-red-500/10 transition-colors w-full"
            >
              <LogOut className="w-4 h-4 text-red-400" />
              <span className="text-red-400">Disconnect</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { WalletConnect } from './WalletConnect';
import { useWalletStore } from '@/store/wallet';
import { Layers, Shield } from 'lucide-react';

export function Navbar() {
  const pathname = usePathname();
  const { role, setRole, connected } = useWalletStore();

  const navItems = [
    { name: 'SME Dashboard', href: '/sme' },
    { name: 'LP Dashboard', href: '/lp' },
    { name: 'Marketplace', href: '/marketplace' },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-900 bg-slate-950/60 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-gradient-to-tr from-blue-600 to-indigo-600 p-2 rounded-xl">
                <Layers className="w-5 h-5 text-white" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-200 to-white">
                TrusTrove
              </span>
            </Link>

            <div className="hidden md:flex space-x-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-slate-900 text-white'
                        : 'text-slate-400 hover:text-white hover:bg-slate-900/40'
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-4">
            {connected && (
              <div className="flex items-center gap-2 bg-slate-900/50 border border-slate-800 rounded-xl px-3 py-1.5">
                <Shield className="w-4 h-4 text-blue-400" />
                <span className="text-xs text-slate-400 hidden sm:inline">Role:</span>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as any)}
                  className="bg-transparent text-xs text-white border-none focus:ring-0 focus:outline-none font-semibold cursor-pointer"
                >
                  <option value="issuer" className="bg-slate-950 text-white">SME (Issuer)</option>
                  <option value="buyer" className="bg-slate-950 text-white">Buyer</option>
                  <option value="lp" className="bg-slate-950 text-white">LP (Funder)</option>
                </select>
              </div>
            )}

            <WalletConnect />
          </div>
        </div>
      </div>
    </nav>
  );
}

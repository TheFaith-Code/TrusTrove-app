'use client';

import React from 'react';
import { useWallet } from '@/hooks/useWallet';
import { Button } from '@/components/ui/button';
import { Wallet, LogOut, AlertCircle, Loader2 } from 'lucide-react';

export function WalletConnect() {
  const {
    address,
    connected,
    connectWallet,
    disconnectWallet,
    loading,
    error,
  } = useWallet();

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        {connected && address ? (
          <div className="flex items-center gap-3 bg-neutral-900/5 dark:bg-neutral-100/5 border border-neutral-200 dark:border-neutral-800 rounded-lg px-3 py-1.5 backdrop-blur-sm transition-all duration-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300 font-mono">
              {formatAddress(address)}
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-neutral-500 hover:text-red-500 hover:bg-red-500/10 rounded-md transition-colors"
              onClick={disconnectWallet}
              title="Disconnect Wallet"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <Button
            onClick={connectWallet}
            disabled={loading}
            className="relative overflow-hidden bg-neutral-900 hover:bg-neutral-800 text-white dark:bg-neutral-50 dark:hover:bg-neutral-200 dark:text-neutral-900 shadow-md font-medium transition-all duration-200 flex items-center gap-2 rounded-lg px-4 py-2"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Wallet className="h-4 w-4" />
            )}
            <span>{loading ? 'Connecting...' : 'Connect Wallet'}</span>
          </Button>
        )}
      </div>
      {error && (
        <div className="flex items-center gap-1.5 text-xs text-red-500 bg-red-500/10 border border-red-500/20 rounded-md px-2.5 py-1 animate-in fade-in slide-in-from-top-1 duration-200 max-w-xs">
          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
          <span className="truncate">{error}</span>
        </div>
      )}
    </div>
  );
}

'use client';

import { Menu, X } from 'lucide-react';

interface HeaderProps {
  mobileMenuOpen: boolean;
  onToggleMobile: () => void;
  companyName?: string;
  clientName?: string;
}

export function Header({ 
  mobileMenuOpen, 
  onToggleMobile,
  companyName = 'Company',
  clientName = 'Client Portal'
}: HeaderProps) {
  return (
    <header className="bg-slate-900 border-b border-slate-800 px-4 py-3 flex items-center justify-between sticky top-0 z-20">
      <div className="flex items-center gap-3 lg:hidden">
        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-amber-500 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold">{companyName.charAt(0)}</span>
        </div>
        <div>
          <h1 className="text-lg font-bold text-white">{companyName}</h1>
          <p className="text-xs text-slate-400">{clientName}</p>
        </div>
      </div>
      
      <div className="hidden lg:block">
        <h1 className="text-lg font-bold text-white">{companyName}</h1>
      </div>

      <button 
        onClick={onToggleMobile}
        className="p-2 text-slate-400 hover:text-white lg:hidden"
      >
        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>
    </header>
  );
}

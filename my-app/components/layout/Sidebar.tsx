'use client';

import { Home, TrendingUp, FileText, BarChart3 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  activeTab: 'overview' | 'projects' | 'reports';
  onTabChange: (tab: 'overview' | 'projects' | 'reports') => void;
  mobileMenuOpen: boolean;
  onCloseMobile: () => void;
  clientName?: string;
  companyName?: string;
}

const navItems = [
  { id: 'overview' as const, label: 'Overview', icon: BarChart3 },
  { id: 'projects' as const, label: 'Projects', icon: TrendingUp },
  { id: 'reports' as const, label: 'Reports', icon: FileText },
];

export function Sidebar({ 
  activeTab, 
  onTabChange, 
  mobileMenuOpen, 
  onCloseMobile,
  clientName = 'Client Name',
  companyName = 'Company'
}: SidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed lg:static inset-y-0 left-0 z-40 w-64 bg-slate-900 border-r border-slate-800",
        "transform transition-transform duration-200 ease-in-out lg:transform-none",
        "flex flex-col",
        mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      )}>
        {/* Logo area */}
        <div className="p-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-amber-500 rounded-lg flex items-center justify-center">
              <Home className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">{companyName}</h1>
              <p className="text-xs text-slate-400">{clientName}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onTabChange(item.id);
                  onCloseMobile();
                }}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-left",
                  isActive
                    ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                    : 'text-slate-400 hover:bg-slate-800'
                )}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>
    </>
  );
}

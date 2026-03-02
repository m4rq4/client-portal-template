'use client';

import { BarChart3, TrendingUp, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MobileNavProps {
  activeTab: 'overview' | 'projects' | 'reports';
  onTabChange: (tab: 'overview' | 'projects' | 'reports') => void;
}

const navItems = [
  { id: 'overview' as const, label: 'Overview', icon: BarChart3 },
  { id: 'projects' as const, label: 'Projects', icon: TrendingUp },
  { id: 'reports' as const, label: 'Reports', icon: FileText },
];

export function MobileNav({ activeTab, onTabChange }: MobileNavProps) {
  return (
    <nav className="lg:hidden bg-slate-900 border-t border-slate-800 px-2 py-2 sticky bottom-0 z-20">
      <div className="flex justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={cn(
                "flex flex-col items-center gap-1 p-2 rounded-lg",
                isActive ? 'text-blue-400' : 'text-slate-400'
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

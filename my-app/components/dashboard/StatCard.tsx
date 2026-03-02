import { TrendingUp, LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon: LucideIcon;
  color: 'blue' | 'green' | 'amber' | 'purple';
}

const colorClasses: Record<string, string> = {
  blue: 'bg-blue-500/10 text-blue-400',
  green: 'bg-green-500/10 text-green-400',
  amber: 'bg-amber-500/10 text-amber-400',
  purple: 'bg-purple-500/10 text-purple-400',
};

export function StatCard({ title, value, subtitle, icon: Icon, color }: StatCardProps) {
  return (
    <div className="bg-slate-900 rounded-xl border border-slate-800 p-4">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-slate-400 text-xs uppercase tracking-wider">{title}</p>
          <p className="text-2xl font-bold text-white mt-1">{value}</p>
          {subtitle && <p className="text-xs text-slate-500 mt-1">{subtitle}</p>}
        </div>
        <div className={cn("p-2.5 rounded-lg ml-3", colorClasses[color])}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
}

import { ChevronRight, CheckCircle, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Project } from '@/lib/types';

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

const statusStyles = {
  active: 'bg-green-500/10 text-green-400 border-green-500/20',
  paused: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  error: 'bg-red-500/10 text-red-400 border-red-500/20',
  scheduled: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
};

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  const completedTasks = project.tasks.filter(t => t.status === 'completed').length;
  const currentTasks = project.tasks.filter(t => t.status === 'in-progress').length;

  return (
    <div
      onClick={onClick}
      className="bg-slate-900 rounded-xl border border-slate-800 p-4 cursor-pointer active:scale-95 transition-transform hover:border-slate-700"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 pr-2">
          <h3 className="font-semibold text-white">{project.name}</h3>
          <p className="text-sm text-slate-400 mt-1 line-clamp-2">{project.description}</p>
        </div>
        <span className={cn(
          "px-2 py-1 text-xs rounded-full border",
          statusStyles[project.status]
        )}>
          {project.status}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-3">
        <div className="text-center bg-slate-800/50 rounded-lg p-2">
          <p className="text-xs text-slate-500">Leads</p>
          <p className="text-lg font-bold text-white">{project.leads}</p>
        </div>
        <div className="text-center bg-slate-800/50 rounded-lg p-2">
          <p className="text-xs text-slate-500">Spend</p>
          <p className="text-lg font-bold text-white">${project.spend}</p>
        </div>
        <div className="text-center bg-slate-800/50 rounded-lg p-2">
          <p className="text-xs text-slate-500">CTR</p>
          <p className="text-lg font-bold text-white">{project.ctr}%</p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex gap-3 text-sm">
          <span className="text-slate-400">
            <span className="text-green-400">{completedTasks}</span> done
          </span>
          <span className="text-slate-400">
            <span className="text-blue-400">{currentTasks}</span> active
          </span>
        </div>
        <ChevronRight className="w-5 h-5 text-blue-400" />
      </div>
    </div>
  );
}

import { CheckCircle, Clock, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Task } from '@/lib/types';

interface TaskListProps {
  tasks: Task[];
  onSubmitTask: () => void;
}

export function TaskList({ tasks, onSubmitTask }: TaskListProps) {
  const completedTasks = tasks.filter(t => t.status === 'completed');
  const currentTasks = tasks.filter(t => t.status === 'in-progress');

  return (
    <div className="bg-slate-900 rounded-xl border border-slate-800 p-4">
      <h3 className="text-sm font-medium text-slate-300 mb-4 flex items-center gap-2">
        <Clock className="w-4 h-4" />
        Project Tasks
      </h3>

      {/* Completed Tasks */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-sm font-medium text-slate-300 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-400" />
            Completed ({completedTasks.length})
          </h4>
        </div>
        <div className="space-y-2">
          {completedTasks.length === 0 ? (
            <p className="text-xs text-slate-500 italic">No completed tasks yet</p>
          ) : (
            completedTasks.map((task) => (
              <div key={task.id} className="flex items-start gap-3 p-3 bg-green-500/5 rounded-lg border border-green-500/10">
                <CheckCircle className="w-4 h-4 text-green-400 mt-0.5" />
                <div className="flex-1">
                  <h4 className="text-sm text-slate-400 line-through">{task.title}</h4>
                  {task.completedDate && (
                    <p className="text-xs text-slate-600 mt-1">Done: {task.completedDate}</p>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Current Tasks */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-sm font-medium text-slate-300 flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-400" />
            Current ({currentTasks.length})
          </h4>
        </div>
        <div className="space-y-2">
          {currentTasks.length === 0 ? (
            <p className="text-xs text-slate-500 italic">No current tasks</p>
          ) : (
            currentTasks.map((task) => (
              <div key={task.id} className="flex items-start gap-3 p-3 bg-blue-500/5 rounded-lg border border-blue-500/10">
                <Clock className="w-4 h-4 text-blue-400 mt-0.5" />
                <div className="flex-1">
                  <h4 className="text-sm text-white">{task.title}</h4>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400">
                    In Progress
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Submit New Task */}
      <div className="pt-4 border-t border-slate-800">
        <Button
          onClick={onSubmitTask}
          className="w-full flex items-center justify-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Submit New Task
        </Button>
        <p className="text-xs text-slate-500 text-center mt-2">
          Need something done? Submit a task and we&apos;ll handle it.
        </p>
      </div>
    </div>
  );
}

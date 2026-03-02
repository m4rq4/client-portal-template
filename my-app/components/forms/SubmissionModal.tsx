import { Plus, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface SubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'project' | 'task' | 'system' | 'report';
  onSubmit: (data: { title: string; description: string }) => void;
}

export function SubmissionModal({ isOpen, onClose, type, onSubmit }: SubmissionModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    if (!title.trim()) return;
    onSubmit({ title, description });
    setTitle('');
    setDescription('');
    onClose();
  };

  const handleClose = () => {
    setTitle('');
    setDescription('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-slate-900 border-slate-700 text-white max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl">
            New {type.charAt(0).toUpperCase() + type.slice(1)}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 pt-4">
          <div>
            <Label htmlFor="title" className="text-slate-400">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What do you need?"
              className="bg-slate-800 border-slate-700 text-white mt-1"
            />
          </div>
          <div>
            <Label htmlFor="description" className="text-slate-400">Details</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe what you need..."
              className="bg-slate-800 border-slate-700 text-white mt-1 h-32"
            />
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <Button
            variant="outline"
            onClick={handleClose}
            className="flex-1 bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!title.trim()}
            className="flex-1"
          >
            Submit
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

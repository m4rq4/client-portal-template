export interface Task {
  id: string;
  title: string;
  status: 'pending' | 'in-progress' | 'completed' | 'scheduled';
  completedDate?: string;
}

export interface System {
  name: string;
  status: 'active' | 'pending';
  description: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'paused' | 'error' | 'scheduled';
  createdDate: string;
  lastUpdate: string;
  leads: number;
  spend: number;
  ctr: number;
  campaignName?: string;
  tasks: Task[];
  systems: System[];
}

export interface MetaAdsData {
  leads: number;
  spend: string;
  impressions: number;
  clicks: number;
  ctr: string;
  cpm: string;
  cpc?: string;
  campaignName: string;
  lastUpdated: string;
}

export interface Submission {
  id: string;
  type: 'project' | 'task' | 'system' | 'report';
  title: string;
  description?: string;
  clientName?: string;
  status: 'pending' | 'in-review' | 'approved' | 'rejected';
  timestamp?: string;
}

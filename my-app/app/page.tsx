'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, Plus, FileText, TrendingUp, Clock, BarChart3 } from 'lucide-react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { MobileNav } from '@/components/layout/MobileNav';
import { StatCard } from '@/components/dashboard/StatCard';
import { ProjectCard } from '@/components/dashboard/ProjectCard';
import { TaskList } from '@/components/dashboard/TaskList';
import { MetricAnalysis } from '@/components/dashboard/MetricAnalysis';
import { CampaignHealth } from '@/components/dashboard/CampaignHealth';
import { SubmissionModal } from '@/components/forms/SubmissionModal';
import { Button } from '@/components/ui/button';
import { Project, MetaAdsData } from '@/lib/types';

// Mock data - replace with Supabase fetch
const mockProjects: Project[] = [
  {
    id: '1',
    name: 'Meta Ads - Katy Leads',
    description: 'Lead generation campaign targeting Katy homeowners looking to sell for cash',
    status: 'active',
    createdDate: '2026-02-24',
    lastUpdate: '2 mins ago',
    leads: 0,
    spend: 5.13,
    ctr: 7.46,
    campaignName: 'Katy Leads',
    tasks: [
      { id: 't1', title: 'Install Meta Pixel on landing page', status: 'completed', completedDate: '2026-02-24' },
      { id: 't2', title: 'Configure ad targeting for Houston area', status: 'completed', completedDate: '2026-02-24' },
      { id: 't3', title: 'Optimize ad creative for cash buyer angle', status: 'in-progress' },
      { id: 't4', title: 'Set up automated lead notifications', status: 'scheduled' },
    ],
    systems: [
      { name: 'Meta Campaign Tracker', status: 'active', description: 'Automated daily reporting on ad performance' },
      { name: 'Lead Alert System', status: 'pending', description: 'Instant SMS/email when new leads come in' },
    ]
  }
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'reports'>('overview');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [submissionModal, setSubmissionModal] = useState<{ isOpen: boolean; type: 'project' | 'task' | 'system' | 'report' }>({ isOpen: false, type: 'project' });
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [metaData, setMetaData] = useState<MetaAdsData>({
    leads: 0,
    spend: '5.13',
    impressions: 67,
    clicks: 5,
    ctr: '7.46',
    cpm: '0',
    campaignName: 'Katy Leads',
    lastUpdated: new Date().toLocaleTimeString()
  });

  // Fetch Meta Ads data
  useEffect(() => {
    const fetchMetaData = async () => {
      try {
        const response = await fetch('/api/meta-ads');
        if (response.ok) {
          const data = await response.json();
          setMetaData({
            ...data,
            lastUpdated: new Date().toLocaleTimeString()
          });
        }
      } catch (error) {
        console.error('Failed to fetch Meta data:', error);
      }
    };

    fetchMetaData();
    const interval = setInterval(fetchMetaData, 30000); // Refresh every 30s
    return () => clearInterval(interval);
  }, []);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setMobileMenuOpen(false);
  };

  const handleBack = () => {
    setSelectedProject(null);
  };

  const handleSubmission = async (data: { title: string; description: string }) => {
    try {
      const response = await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: submissionModal.type,
          title: data.title,
          description: data.description,
          clientName: 'Joshua Guidry'
        })
      });

      if (response.ok) {
        // If it's a project, add to local state
        if (submissionModal.type === 'project') {
          const newProject: Project = {
            id: Date.now().toString(),
            name: data.title,
            description: data.description || 'New project submitted - awaiting setup',
            status: 'scheduled',
            createdDate: new Date().toISOString().split('T')[0],
            lastUpdate: 'Just now',
            leads: 0,
            spend: 0,
            ctr: 0,
            tasks: [],
            systems: []
          };
          setProjects(prev => [...prev, newProject]);
        }
        alert('Submitted successfully! You\'ll be notified when it\'s done.');
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('Submission saved. We\'ll process it shortly.');
    }
  };

  const openSubmission = (type: 'project' | 'task' | 'system' | 'report') => {
    setSubmissionModal({ isOpen: true, type });
  };

  const activeProject = projects[0];

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      <Header 
        mobileMenuOpen={mobileMenuOpen} 
        onToggleMobile={() => setMobileMenuOpen(!mobileMenuOpen)}
        companyName="Cash For Homes"
        clientName="Joshua Guidry - Client Portal"
      />

      <div className="flex flex-1 relative overflow-hidden">
        <Sidebar 
          activeTab={activeTab} 
          onTabChange={setActiveTab}
          mobileMenuOpen={mobileMenuOpen}
          onCloseMobile={() => setMobileMenuOpen(false)}
          companyName="Cash For Homes"
          clientName="Joshua Guidry"
        />

        <main className="flex-1 p-4 lg:p-6 overflow-auto w-full">
          {selectedProject ? (
            <ProjectDetail 
              project={selectedProject} 
              metaData={metaData}
              onBack={handleBack}
              onSubmitTask={() => openSubmission('task')}
              onMetricClick={setSelectedMetric}
            />
          ) : (
            <>
              {activeTab === 'overview' && (
                <OverviewTab 
                  projects={projects} 
                  metaData={metaData}
                  onSubmitProject={() => openSubmission('project')}
                />
              )}
              {activeTab === 'projects' && (
                <ProjectsTab 
                  projects={projects} 
                  onProjectClick={handleProjectClick}
                  onSubmitProject={() => openSubmission('project')}
                />
              )}
              {activeTab === 'reports' && (
                <ReportsTab onSubmitReport={() => openSubmission('report')} />
              )}
            </>
          )}
        </main>
      </div>

      <MobileNav activeTab={activeTab} onTabChange={setActiveTab} />

      <SubmissionModal
        isOpen={submissionModal.isOpen}
        onClose={() => setSubmissionModal({ ...submissionModal, isOpen: false })}
        type={submissionModal.type}
        onSubmit={handleSubmission}
      />

      {selectedMetric && (
        <MetricAnalysis
          metric={selectedMetric}
          data={metaData}
          onClose={() => setSelectedMetric(null)}
        />
      )}
    </div>
  );
}

// Tab Components
function OverviewTab({ 
  projects, 
  metaData,
  onSubmitProject 
}: { 
  projects: Project[]; 
  metaData: MetaAdsData;
  onSubmitProject: () => void;
}) {
  const activeProject = projects[0];

  return (
    <div className="space-y-4 pb-20 lg:pb-0">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-white">Overview</h1>
        <p className="text-sm text-slate-400">Quick summary of all activity</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <StatCard 
          title="Active Projects" 
          value={projects.filter(p => p.status === 'active').length.toString()} 
          subtitle="Currently running"
          icon={TrendingUp} 
          color="green" 
        />
        <StatCard 
          title="Pending Projects" 
          value={projects.filter(p => p.status === 'paused' || p.status === 'scheduled').length.toString()} 
          subtitle="On hold/scheduled"
          icon={Clock} 
          color="amber" 
        />
        <StatCard 
          title="Recent Activity" 
          value="2m" 
          subtitle="Last update"
          icon={BarChart3} 
          color="blue" 
        />
      </div>

      {activeProject && (
        <div className="bg-slate-900 rounded-xl border border-slate-800 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Current Project</h2>
            <span className="px-3 py-1 text-sm rounded-full bg-green-500/10 text-green-400 border border-green-500/20">
              {activeProject.status}
            </span>
          </div>
          <div className="bg-slate-800/50 rounded-xl p-5">
            <h3 className="font-semibold text-white text-lg mb-2">{activeProject.name}</h3>
            <p className="text-slate-400 mb-4">{activeProject.description}</p>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center bg-slate-900/70 rounded-lg p-4">
                <p className="text-sm text-slate-500 mb-1">Impressions</p>
                <p className="text-3xl font-bold text-white">{metaData.impressions.toLocaleString()}</p>
              </div>
              <div className="text-center bg-slate-900/70 rounded-lg p-4">
                <p className="text-sm text-slate-500 mb-1">Clicks</p>
                <p className="text-3xl font-bold text-white">{metaData.clicks}</p>
              </div>
              <div className="text-center bg-slate-900/70 rounded-lg p-4">
                <p className="text-sm text-slate-500 mb-1">Leads</p>
                <p className="text-3xl font-bold text-white">{metaData.leads}</p>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-700">
              <div className="flex items-center justify-between text-sm">
                <div className="flex gap-4">
                  <span className="text-slate-400">
                    <span className="text-green-400 font-semibold">
                      {activeProject.tasks.filter(t => t.status === 'completed').length}
                    </span> tasks completed
                  </span>
                  <span className="text-slate-400">
                    <span className="text-blue-400 font-semibold">
                      {activeProject.tasks.filter(t => t.status === 'in-progress').length}
                    </span> in progress
                  </span>
                </div>
                <span className="text-slate-500">Updated: {metaData.lastUpdated}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ProjectsTab({ 
  projects, 
  onProjectClick,
  onSubmitProject 
}: { 
  projects: Project[]; 
  onProjectClick: (p: Project) => void;
  onSubmitProject: () => void;
}) {
  return (
    <div className="space-y-4 pb-20 lg:pb-0">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-white">Projects</h1>
        <Button onClick={onSubmitProject} size="sm">
          <Plus className="w-4 h-4 mr-1" />
          New
        </Button>
      </div>

      <div className="space-y-3">
        {projects.map((project) => (
          <ProjectCard 
            key={project.id} 
            project={project} 
            onClick={() => onProjectClick(project)} 
          />
        ))}
      </div>
    </div>
  );
}

function ReportsTab({ onSubmitReport }: { onSubmitReport: () => void }) {
  return (
    <div className="space-y-4 pb-20 lg:pb-0">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-white">Reports</h1>
        <Button onClick={onSubmitReport} size="sm">
          <Plus className="w-4 h-4 mr-1" />
          Request
        </Button>
      </div>

      <div className="bg-slate-900 rounded-xl border border-slate-800 p-8 text-center">
        <FileText className="w-16 h-16 text-slate-600 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-white mb-2">No Reports Yet</h3>
        <p className="text-slate-400 mb-4">Reports will appear here once generated</p>
        <Button onClick={onSubmitReport}>
          Request Report
        </Button>
      </div>
    </div>
  );
}

// Project Detail Component
function ProjectDetail({ 
  project, 
  metaData,
  onBack, 
  onSubmitTask,
  onMetricClick 
}: { 
  project: Project; 
  metaData: MetaAdsData;
  onBack: () => void;
  onSubmitTask: () => void;
  onMetricClick: (metric: string) => void;
}) {
  const cpc = (parseFloat(metaData.spend) / (metaData.clicks || 1)).toFixed(2);

  return (
    <div className="space-y-4 pb-20 lg:pb-0">
      <div className="flex items-center gap-3">
        <Button variant="outline" size="icon" onClick={onBack}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex-1 min-w-0">
          <h1 className="text-lg font-bold text-white truncate">{project.name}</h1>
        </div>
      </div>

      {/* Campaign Stats */}
      <div className="bg-slate-900 rounded-xl border border-slate-800 p-4">
        <h3 className="text-sm font-medium text-slate-400 mb-3">Complete Campaign Data</h3>
        <p className="text-xs text-slate-500 mb-3">Click any metric for detailed analysis</p>
        
        <div className="grid grid-cols-3 gap-3 mb-4">
          <button onClick={() => onMetricClick('impressions')} className="text-center bg-slate-800/50 hover:bg-slate-700/50 rounded-lg p-3 transition-colors">
            <p className="text-xs text-slate-500">Impressions</p>
            <p className="text-2xl font-bold text-white">{metaData.impressions.toLocaleString()}</p>
          </button>
          <button onClick={() => onMetricClick('clicks')} className="text-center bg-slate-800/50 hover:bg-slate-700/50 rounded-lg p-3 transition-colors">
            <p className="text-xs text-slate-500">Clicks</p>
            <p className="text-2xl font-bold text-white">{metaData.clicks}</p>
          </button>
          <button onClick={() => onMetricClick('leads')} className="text-center bg-slate-800/50 hover:bg-slate-700/50 rounded-lg p-3 transition-colors">
            <p className="text-xs text-slate-500">Leads</p>
            <p className="text-2xl font-bold text-white">{metaData.leads}</p>
          </button>
        </div>
        
        <div className="grid grid-cols-4 gap-2 mb-4">
          <button onClick={() => onMetricClick('spend')} className="text-center bg-slate-800/30 hover:bg-slate-700/30 rounded-lg p-2 transition-colors">
            <p className="text-xs text-slate-500">Spend</p>
            <p className="text-lg font-semibold text-white">${metaData.spend}</p>
          </button>
          <button onClick={() => onMetricClick('ctr')} className="text-center bg-slate-800/30 hover:bg-slate-700/30 rounded-lg p-2 transition-colors">
            <p className="text-xs text-slate-500">CTR</p>
            <p className="text-lg font-semibold text-white">{metaData.ctr}%</p>
          </button>
          <button onClick={() => onMetricClick('cpm')} className="text-center bg-slate-800/30 hover:bg-slate-700/30 rounded-lg p-2 transition-colors">
            <p className="text-xs text-slate-500">CPM</p>
            <p className="text-lg font-semibold text-white">${metaData.cpm}</p>
          </button>
          <button onClick={() => onMetricClick('cpc')} className="text-center bg-slate-800/30 hover:bg-slate-700/30 rounded-lg p-2 transition-colors">
            <p className="text-xs text-slate-500">CPC</p>
            <p className="text-lg font-semibold text-white">${cpc}</p>
          </button>
        </div>
        
        <CampaignHealth data={metaData} />
      </div>

      <TaskList tasks={project.tasks} onSubmitTask={onSubmitTask} />
    </div>
  );
}

'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { createClient } from '@/lib/supabase/client';
import { Project, Task, Submission, MetaAdsData } from '@/lib/types';

const supabase = createClient();

// Get current user
export function useUser() {
  return useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      return user;
    },
  });
}

// Get client profile
export function useClientProfile() {
  return useQuery({
    queryKey: ['client-profile'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;
      
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .eq('id', user.id)
        .single();
      
      if (error) throw error;
      return data;
    },
  });
}

// Get projects
export function useProjects() {
  return useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Project[];
    },
  });
}

// Get single project with tasks
export function useProject(projectId: string) {
  return useQuery({
    queryKey: ['project', projectId],
    queryFn: async () => {
      const { data: project, error: projectError } = await supabase
        .from('projects')
        .select('*')
        .eq('id', projectId)
        .single();
      
      if (projectError) throw projectError;
      
      const { data: tasks, error: tasksError } = await supabase
        .from('tasks')
        .select('*')
        .eq('project_id', projectId)
        .order('created_at', { ascending: true });
      
      if (tasksError) throw tasksError;
      
      return { ...project, tasks } as Project;
    },
    enabled: !!projectId,
  });
}

// Get tasks for a project
export function useTasks(projectId: string) {
  return useQuery({
    queryKey: ['tasks', projectId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('project_id', projectId)
        .order('created_at', { ascending: true });
      
      if (error) throw error;
      return data as Task[];
    },
    enabled: !!projectId,
  });
}

// Create submission
export function useCreateSubmission() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (submission: Omit<Submission, 'id' | 'created_at' | 'status'>) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');
      
      const { data, error } = await supabase
        .from('submissions')
        .insert([{ ...submission, client_id: user.id }])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['submissions'] });
    },
  });
}

// Get submissions
export function useSubmissions() {
  return useQuery({
    queryKey: ['submissions'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('submissions')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Submission[];
    },
  });
}

// Get Meta Ads data
export function useMetaAdsData(projectId?: string) {
  return useQuery({
    queryKey: ['meta-ads', projectId],
    queryFn: async () => {
      // First try to get from API (which fetches from Meta)
      const response = await fetch('/api/meta-ads');
      if (!response.ok) throw new Error('Failed to fetch Meta data');
      const apiData = await response.json();
      
      // If we have a projectId, also get historical data from Supabase
      if (projectId) {
        const { data: historicalData, error } = await supabase
          .from('campaign_metrics')
          .select('*')
          .eq('project_id', projectId)
          .order('recorded_at', { ascending: false })
          .limit(1)
          .single();
        
        if (!error && historicalData) {
          return {
            ...apiData,
            historical: historicalData,
          } as MetaAdsData & { historical?: typeof historicalData };
        }
      }
      
      return apiData as MetaAdsData;
    },
    refetchInterval: 30000, // Refetch every 30 seconds
  });
}

// Subscribe to realtime updates
export function subscribeToProjects(callback: (payload: any) => void) {
  return supabase
    .channel('projects-channel')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'projects' }, callback)
    .subscribe();
}

export function subscribeToTasks(projectId: string, callback: (payload: any) => void) {
  return supabase
    .channel(`tasks-channel-${projectId}`)
    .on('postgres_changes', { event: '*', schema: 'public', table: 'tasks', filter: `project_id=eq.${projectId}` }, callback)
    .subscribe();
}

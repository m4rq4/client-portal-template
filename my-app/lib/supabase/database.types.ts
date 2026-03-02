export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      clients: {
        Row: {
          id: string;
          email: string;
          name: string;
          company_name: string | null;
          phone: string | null;
          branding_color: string;
          logo_url: string | null;
          meta_campaign_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          name: string;
          company_name?: string | null;
          phone?: string | null;
          branding_color?: string;
          logo_url?: string | null;
          meta_campaign_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string;
          company_name?: string | null;
          phone?: string | null;
          branding_color?: string;
          logo_url?: string | null;
          meta_campaign_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      projects: {
        Row: {
          id: string;
          client_id: string;
          name: string;
          description: string | null;
          status: 'active' | 'paused' | 'scheduled' | 'completed';
          campaign_name: string | null;
          meta_campaign_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          client_id: string;
          name: string;
          description?: string | null;
          status?: 'active' | 'paused' | 'scheduled' | 'completed';
          campaign_name?: string | null;
          meta_campaign_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          client_id?: string;
          name?: string;
          description?: string | null;
          status?: 'active' | 'paused' | 'scheduled' | 'completed';
          campaign_name?: string | null;
          meta_campaign_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      tasks: {
        Row: {
          id: string;
          project_id: string;
          title: string;
          description: string | null;
          status: 'pending' | 'in-progress' | 'completed' | 'scheduled';
          completed_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          project_id: string;
          title: string;
          description?: string | null;
          status?: 'pending' | 'in-progress' | 'completed' | 'scheduled';
          completed_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          project_id?: string;
          title?: string;
          description?: string | null;
          status?: 'pending' | 'in-progress' | 'completed' | 'scheduled';
          completed_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      submissions: {
        Row: {
          id: string;
          client_id: string;
          type: 'project' | 'task' | 'system' | 'report';
          title: string;
          description: string | null;
          status: 'pending' | 'in-review' | 'approved' | 'rejected';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          client_id: string;
          type: 'project' | 'task' | 'system' | 'report';
          title: string;
          description?: string | null;
          status?: 'pending' | 'in-review' | 'approved' | 'rejected';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          client_id?: string;
          type?: 'project' | 'task' | 'system' | 'report';
          title?: string;
          description?: string | null;
          status?: 'pending' | 'in-review' | 'approved' | 'rejected';
          created_at?: string;
          updated_at?: string;
        };
      };
      campaign_metrics: {
        Row: {
          id: string;
          project_id: string;
          leads: number;
          spend: number;
          impressions: number;
          clicks: number;
          ctr: number;
          cpm: number;
          cpc: number;
          recorded_at: string;
        };
        Insert: {
          id?: string;
          project_id: string;
          leads?: number;
          spend?: number;
          impressions?: number;
          clicks?: number;
          ctr?: number;
          cpm?: number;
          cpc?: number;
          recorded_at?: string;
        };
        Update: {
          id?: string;
          project_id?: string;
          leads?: number;
          spend?: number;
          impressions?: number;
          clicks?: number;
          ctr?: number;
          cpm?: number;
          cpc?: number;
          recorded_at?: string;
        };
      };
    };
  };
}

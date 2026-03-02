-- Supabase Database Schema for Client Portal
-- Run this in Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Clients table (stores client information)
CREATE TABLE clients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  company_name TEXT,
  phone TEXT,
  branding_color TEXT DEFAULT '#3b82f6',
  logo_url TEXT,
  meta_campaign_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Projects table
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  status TEXT CHECK (status IN ('active', 'paused', 'scheduled', 'completed')) DEFAULT 'scheduled',
  campaign_name TEXT,
  meta_campaign_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tasks table
CREATE TABLE tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT CHECK (status IN ('pending', 'in-progress', 'completed', 'scheduled')) DEFAULT 'pending',
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Submissions table (for client requests)
CREATE TABLE submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  type TEXT CHECK (type IN ('project', 'task', 'system', 'report')) NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT CHECK (status IN ('pending', 'in-review', 'approved', 'rejected')) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Campaign metrics table (stores Meta Ads data)
CREATE TABLE campaign_metrics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  leads INTEGER DEFAULT 0,
  spend DECIMAL(10,2) DEFAULT 0,
  impressions INTEGER DEFAULT 0,
  clicks INTEGER DEFAULT 0,
  ctr DECIMAL(5,2) DEFAULT 0,
  cpm DECIMAL(10,2) DEFAULT 0,
  cpc DECIMAL(10,2) DEFAULT 0,
  recorded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX idx_projects_client_id ON projects(client_id);
CREATE INDEX idx_tasks_project_id ON tasks(project_id);
CREATE INDEX idx_submissions_client_id ON submissions(client_id);
CREATE INDEX idx_campaign_metrics_project_id ON campaign_metrics(project_id);
CREATE INDEX idx_campaign_metrics_recorded_at ON campaign_metrics(recorded_at);

-- Enable Row Level Security
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaign_metrics ENABLE ROW LEVEL SECURITY;

-- RLS Policies for clients (users can only see their own data)
CREATE POLICY "Clients can view own data" ON clients
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Clients can update own data" ON clients
  FOR UPDATE USING (auth.uid() = id);

-- RLS Policies for projects
CREATE POLICY "Projects visible to client" ON projects
  FOR SELECT USING (client_id = auth.uid());

CREATE POLICY "Projects insertable by client" ON projects
  FOR INSERT WITH CHECK (client_id = auth.uid());

-- RLS Policies for tasks
CREATE POLICY "Tasks visible to client" ON tasks
  FOR SELECT USING (
    project_id IN (SELECT id FROM projects WHERE client_id = auth.uid())
  );

-- RLS Policies for submissions
CREATE POLICY "Submissions visible to client" ON submissions
  FOR SELECT USING (client_id = auth.uid());

CREATE POLICY "Submissions insertable by client" ON submissions
  FOR INSERT WITH CHECK (client_id = auth.uid());

-- RLS Policies for campaign metrics
CREATE POLICY "Metrics visible to client" ON campaign_metrics
  FOR SELECT USING (
    project_id IN (SELECT id FROM projects WHERE client_id = auth.uid())
  );

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_clients_updated_at BEFORE UPDATE ON clients
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tasks_updated_at BEFORE UPDATE ON tasks
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_submissions_updated_at BEFORE UPDATE ON submissions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Realtime subscriptions
ALTER TABLE projects REPLICA IDENTITY FULL;
ALTER TABLE tasks REPLICA IDENTITY FULL;
ALTER TABLE submissions REPLICA IDENTITY FULL;
ALTER TABLE campaign_metrics REPLICA IDENTITY FULL;

-- Enable realtime for all tables
BEGIN;
  -- Drop existing if any
  DROP PUBLICATION IF EXISTS supabase_realtime;
  -- Create new publication
  CREATE PUBLICATION supabase_realtime;
COMMIT;

-- Add tables to realtime
ALTER PUBLICATION supabase_realtime ADD TABLE projects;
ALTER PUBLICATION supabase_realtime ADD TABLE tasks;
ALTER PUBLICATION supabase_realtime ADD TABLE submissions;
ALTER PUBLICATION supabase_realtime ADD TABLE campaign_metrics;

-- Seed data for testing
INSERT INTO clients (id, email, name, company_name, phone, branding_color, meta_campaign_id)
VALUES (
  '00000000-0000-0000-0000-000000000001',
  'joshua@example.com',
  'Joshua Guidry',
  'Cash For Homes',
  '713-555-0100',
  '#3b82f6',
  'your-meta-campaign-id'
);

INSERT INTO projects (client_id, name, description, status, campaign_name, meta_campaign_id)
VALUES (
  '00000000-0000-0000-0000-000000000001',
  'Meta Ads - Katy Leads',
  'Lead generation campaign targeting Katy homeowners looking to sell for cash',
  'active',
  'Katy Leads',
  'your-meta-campaign-id'
);

-- Insert sample tasks
INSERT INTO tasks (project_id, title, status, completed_at)
SELECT 
  id,
  'Install Meta Pixel on landing page',
  'completed',
  NOW() - INTERVAL '5 days'
FROM projects WHERE name = 'Meta Ads - Katy Leads';

INSERT INTO tasks (project_id, title, status)
SELECT 
  id,
  'Configure ad targeting for Houston area',
  'completed'
FROM projects WHERE name = 'Meta Ads - Katy Leads';

INSERT INTO tasks (project_id, title, status)
SELECT 
  id,
  'Optimize ad creative for cash buyer angle',
  'in-progress'
FROM projects WHERE name = 'Meta Ads - Katy Leads';

INSERT INTO tasks (project_id, title, status)
SELECT 
  id,
  'Set up automated lead notifications',
  'scheduled'
FROM projects WHERE name = 'Meta Ads - Katy Leads';

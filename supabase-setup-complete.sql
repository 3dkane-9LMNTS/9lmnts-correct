-- 9LMNTS Studio Supabase Database Setup
-- Run this in your Supabase SQL Editor

-- Create customers table
CREATE TABLE IF NOT EXISTS customers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    phone TEXT,
    company TEXT,
    service_type TEXT NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    deposit DECIMAL(10,2) NOT NULL,
    payment_status TEXT DEFAULT 'pending',
    paypal_payment_id TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
    project_type TEXT NOT NULL,
    description TEXT,
    timeline TEXT,
    budget DECIMAL(10,2),
    status TEXT DEFAULT 'pending',
    github_repo_url TEXT,
    netlify_site_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create tasks table
CREATE TABLE IF NOT EXISTS tasks (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    status TEXT DEFAULT 'todo',
    priority TEXT DEFAULT 'medium',
    due_date TIMESTAMP WITH TIME ZONE,
    completed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create service_templates table
CREATE TABLE IF NOT EXISTS service_templates (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    deposit_percentage DECIMAL(3,2) DEFAULT 0.50,
    features JSONB,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert AI service templates
INSERT INTO service_templates (name, description, price, deposit_percentage, features) VALUES
('AI Sales Machine', 'Complete AI-powered sales automation system', 2000.00, 0.50, '["Lead Generation", "Email Automation", "CRM Integration", "Analytics Dashboard"]'),
('Content Repurposing Engine', 'Automated content repurposing across all platforms', 1500.00, 0.50, '["Multi-platform Posting", "Content Calendar", "Analytics", "Brand Consistency"]'),
('Email Support Agent', 'AI-powered customer support automation', 1000.00, 0.50, '["24/7 Support", "Ticket Management", "Knowledge Base", "Performance Metrics"]')
ON CONFLICT (name) DO NOTHING;

-- Create email_templates table
CREATE TABLE IF NOT EXISTS email_templates (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    subject TEXT NOT NULL,
    content TEXT NOT NULL,
    template_type TEXT NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert welcome email template
INSERT INTO email_templates (name, subject, content, template_type) VALUES
('Welcome Email', 'Welcome to 9LMNTS Studio - Your AI Project Has Started!', 
'<h2>Hi {{customer_name}},</h2><p>Thank you for choosing 9LMNTS Studio for your {{service_type}} project!</p><p>Your project is now underway and here are the details:</p><ul><li><strong>Service:</strong> {{service_type}}</li><li><strong>Investment:</strong> ${{amount}}</li><li><strong>Project Repository:</strong> <a href="{{github_url}}">{{github_url}}</a></li><li><strong>Live Site:</strong> <a href="{{netlify_url}}">{{netlify_url}}</a></li></ul><p>We''ll keep you updated on the progress. Your project will be completed within the agreed timeline.</p><p>Best regards,<br/>The 9LMNTS Studio Team</p>', 
'welcome')
ON CONFLICT (name) DO NOTHING;

-- Create social_media_posts table
CREATE TABLE IF NOT EXISTS social_media_posts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
    platform TEXT NOT NULL,
    content TEXT NOT NULL,
    status TEXT DEFAULT 'pending',
    scheduled_at TIMESTAMP WITH TIME ZONE,
    posted_at TIMESTAMP WITH TIME ZONE,
    post_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create analytics table
CREATE TABLE IF NOT EXISTS analytics (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    metric_type TEXT NOT NULL,
    metric_value DECIMAL(10,2) NOT NULL,
    metadata JSONB,
    recorded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create api_keys table
CREATE TABLE IF NOT EXISTS api_keys (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    service TEXT NOT NULL,
    key_name TEXT NOT NULL,
    encrypted_key TEXT NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create webhook_logs table
CREATE TABLE IF NOT EXISTS webhook_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    source TEXT NOT NULL,
    payload JSONB,
    status TEXT NOT NULL,
    error_message TEXT,
    processed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_media_posts ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Public read access for customers" ON customers FOR SELECT USING (true);
CREATE POLICY "Service write access for customers" ON customers FOR INSERT WITH CHECK (true);
CREATE POLICY "Service update access for customers" ON customers FOR UPDATE USING (true);

CREATE POLICY "Public read access for projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Service write access for projects" ON projects FOR INSERT WITH CHECK (true);
CREATE POLICY "Service update access for projects" ON projects FOR UPDATE USING (true);

CREATE POLICY "Public read access for tasks" ON tasks FOR SELECT USING (true);
CREATE POLICY "Service write access for tasks" ON tasks FOR INSERT WITH CHECK (true);
CREATE POLICY "Service update access for tasks" ON tasks FOR UPDATE USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_customers_email ON customers(email);
CREATE INDEX IF NOT EXISTS idx_customers_service_type ON customers(service_type);
CREATE INDEX IF NOT EXISTS idx_customers_payment_status ON customers(payment_status);
CREATE INDEX IF NOT EXISTS idx_customers_created_at ON customers(created_at);
CREATE INDEX IF NOT EXISTS idx_projects_customer_id ON projects(customer_id);
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_tasks_project_id ON tasks(project_id);
CREATE INDEX IF NOT EXISTS idx_tasks_status ON tasks(status);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_customers_updated_at BEFORE UPDATE ON customers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create sample data for testing
INSERT INTO customers (name, email, service_type, amount, deposit, payment_status) VALUES
('Test Customer', 'test@9lmntsstudio.com', 'ai-sales-machine', 2000.00, 1000.00, 'completed')
ON CONFLICT (email) DO NOTHING;

-- Create view for dashboard analytics
CREATE OR REPLACE VIEW dashboard_stats AS
SELECT 
    (SELECT COUNT(*) FROM customers) as total_customers,
    (SELECT COUNT(*) FROM customers WHERE payment_status = 'completed') as paid_customers,
    (SELECT COALESCE(SUM(amount), 0) FROM customers WHERE payment_status = 'completed') as total_revenue,
    (SELECT COUNT(*) FROM projects WHERE status != 'completed') as active_projects,
    (SELECT COUNT(*) FROM projects WHERE status = 'completed') as completed_projects;

-- Grant necessary permissions
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO anon;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO authenticated;

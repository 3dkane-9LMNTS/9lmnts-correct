-- 9LMNTS Studio - Supabase Database Setup
-- Complete database schema for AI service automation

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Customers Table
CREATE TABLE customers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  company VARCHAR(255),
  website VARCHAR(255),
  service_type VARCHAR(100) NOT NULL,
  payment_status VARCHAR(50) DEFAULT 'pending',
  payment_id VARCHAR(255),
  amount DECIMAL(10,2),
  currency VARCHAR(10) DEFAULT 'USD',
  deposit_amount DECIMAL(10,2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Projects Table
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
  service_type VARCHAR(100) NOT NULL,
  github_repo VARCHAR(255),
  netlify_url VARCHAR(255),
  admin_url VARCHAR(255),
  status VARCHAR(50) DEFAULT 'pending',
  progress INTEGER DEFAULT 0,
  estimated_completion TIMESTAMP WITH TIME ZONE,
  actual_completion TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tasks Table
CREATE TABLE tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  status VARCHAR(50) DEFAULT 'pending',
  priority VARCHAR(20) DEFAULT 'medium',
  assigned_to VARCHAR(255),
  due_date TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Service Templates Table
CREATE TABLE service_templates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) UNIQUE NOT NULL,
  display_name VARCHAR(100) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  deposit_percentage INTEGER DEFAULT 50,
  github_template VARCHAR(255),
  features JSONB,
  setup_steps JSONB,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Email Templates Table
CREATE TABLE email_templates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) UNIQUE NOT NULL,
  subject VARCHAR(255) NOT NULL,
  html_content TEXT NOT NULL,
  text_content TEXT,
  template_type VARCHAR(50) NOT NULL, -- welcome, payment_confirmation, project_update, etc.
  variables JSONB, -- Available template variables
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Social Media Posts Table
CREATE TABLE social_media_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  platform VARCHAR(50) NOT NULL, -- linkedin, twitter, instagram, facebook
  post_type VARCHAR(50) NOT NULL, -- service_announcement, success_story, tip, etc.
  content TEXT NOT NULL,
  media_urls JSONB, -- Array of media URLs
  hashtags JSONB, -- Array of hashtags
  status VARCHAR(50) DEFAULT 'draft', -- draft, scheduled, posted, failed
  scheduled_at TIMESTAMP WITH TIME ZONE,
  posted_at TIMESTAMP WITH TIME ZONE,
  engagement_stats JSONB, -- likes, shares, comments, etc.
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Analytics Table
CREATE TABLE analytics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_type VARCHAR(100) NOT NULL, -- page_view, form_submit, payment_complete, etc.
  event_data JSONB,
  user_id VARCHAR(255), -- Anonymous user identifier
  session_id VARCHAR(255),
  ip_address INET,
  user_agent TEXT,
  referrer VARCHAR(500),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- API Keys Table (for external services)
CREATE TABLE api_keys (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  service_name VARCHAR(100) NOT NULL, -- github, netlify, zapier, etc.
  key_name VARCHAR(100) NOT NULL,
  encrypted_key TEXT NOT NULL,
  key_type VARCHAR(50) NOT NULL, -- api_key, webhook_url, access_token
  is_active BOOLEAN DEFAULT true,
  last_used TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Webhook Logs Table
CREATE TABLE webhook_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  source VARCHAR(100) NOT NULL, -- paypal, zapier, github, etc.
  event_type VARCHAR(100) NOT NULL,
  payload JSONB NOT NULL,
  response_status INTEGER,
  response_body TEXT,
  processed BOOLEAN DEFAULT false,
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert Service Templates
INSERT INTO service_templates (name, display_name, description, price, deposit_percentage, github_template, features, setup_steps) VALUES
(
  'ai-sales-machine',
  'AI Sales Machine',
  'Complete AI-powered sales automation system with lead generation, qualification, and conversion optimization.',
  2000.00,
  50,
  'https://github.com/9lmnts/ai-sales-machine-template',
  '{"lead_generation": true, "email_automation": true, "crm_integration": true, "analytics_dashboard": true, "ai_chatbot": true}',
  '["Setup GitHub repository", "Configure AI models", "Integrate CRM system", "Set up email automation", "Deploy analytics dashboard", "Create admin panel", "Test automation flows"]'
),
(
  'content-repurposing-engine',
  'Content Repurposing Engine',
  'Transform your content across multiple platforms automatically with AI-powered repurposing and scheduling.',
  1500.00,
  50,
  'https://github.com/9lmnts/content-repurposing-template',
  '{"multi_platform": true, "ai_repurposing": true, "scheduling": true, "analytics": true, "content_library": true}',
  '["Setup content repository", "Configure AI repurposing", "Connect social media accounts", "Set up scheduling system", "Create content library", "Deploy analytics", "Test automation"]'
),
(
  'email-support-agent',
  'Email Support Agent',
  'AI-powered customer support system with intelligent ticket routing, automated responses, and knowledge base integration.',
  1000.00,
  50,
  'https://github.com/9lmnts/email-support-agent-template',
  '{"ai_responses": true, "ticket_management": true, "knowledge_base": true, "escalation_rules": true, "performance_analytics": true}',
  '["Setup ticket system", "Configure AI responses", "Create knowledge base", "Set up escalation rules", "Deploy analytics dashboard", "Test support flows", "Train AI model"]'
);

-- Insert Email Templates
INSERT INTO email_templates (name, subject, html_content, text_content, template_type, variables) VALUES
(
  'welcome_email',
  'Welcome to 9LMNTS Studio - Your {{service_type}} is Ready!',
  '<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
    <div style="background: #1A1A1A; color: white; padding: 20px; text-align: center;">
      <h1 style="color: #FF7A00; margin: 0;">9LMNTS Studio</h1>
      <p style="margin: 10px 0;">Your AI Service is Live!</p>
    </div>
    <div style="padding: 20px; background: #f9f9f9;">
      <h2>Hello {{customer_name}},</h2>
      <p>Thank you for choosing 9LMNTS Studio! Your {{service_type}} service has been successfully set up and deployed.</p>
      <div style="background: white; padding: 15px; border-radius: 5px; margin: 20px 0;">
        <h3 style="color: #FF7A00;">Your Service Details:</h3>
        <ul>
          <li><strong>Service:</strong> {{service_type}}</li>
          <li><strong>Amount Paid:</strong> ${{amount}} {{currency}}</li>
          <li><strong>GitHub Repository:</strong> <a href="{{github_url}}">{{repo_name}}</a></li>
          <li><strong>Live Site:</strong> <a href="{{netlify_url}}">{{netlify_url}}</a></li>
        </ul>
      </div>
    </div>
  </div>',
  'Hello {{customer_name}},\n\nThank you for choosing 9LMNTS Studio! Your {{service_type}} service has been successfully set up and deployed.\n\nService Details:\n- Service: {{service_type}}\n- Amount Paid: ${{amount}} {{currency}}\n- GitHub Repository: {{github_url}}\n- Live Site: {{netlify_url}}\n\nBest regards,\n9LMNTS Studio Team',
  'welcome',
  '{"customer_name": "string", "service_type": "string", "amount": "number", "currency": "string", "github_url": "string", "repo_name": "string", "netlify_url": "string"}'
),
(
  'payment_confirmation',
  'Payment Confirmed - {{service_type}} Order',
  '<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
    <div style="background: #1A1A1A; color: white; padding: 20px; text-align: center;">
      <h1 style="color: #FF7A00; margin: 0;">Payment Confirmed</h1>
      <p style="margin: 10px 0;">Thank you for your order!</p>
    </div>
    <div style="padding: 20px; background: #f9f9f9;">
      <h2>Payment Details:</h2>
      <ul>
        <li><strong>Service:</strong> {{service_type}}</li>
        <li><strong>Amount:</strong> ${{amount}} {{currency}}</li>
        <li><strong>Payment ID:</strong> {{payment_id}}</li>
        <li><strong>Date:</strong> {{payment_date}}</li>
      </ul>
    </div>
  </div>',
  'Payment Details:\n- Service: {{service_type}}\n- Amount: ${{amount}} {{currency}}\n- Payment ID: {{payment_id}}\n- Date: {{payment_date}}\n\nYour service will be deployed shortly.',
  'payment',
  '{"service_type": "string", "amount": "number", "currency": "string", "payment_id": "string", "payment_date": "string"}'
);

-- Create Indexes for Performance
CREATE INDEX idx_customers_email ON customers(email);
CREATE INDEX idx_customers_created_at ON customers(created_at);
CREATE INDEX idx_projects_customer_id ON projects(customer_id);
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_tasks_project_id ON tasks(project_id);
CREATE INDEX idx_tasks_status ON tasks(status);
CREATE INDEX idx_social_media_posts_platform ON social_media_posts(platform);
CREATE INDEX idx_social_media_posts_status ON social_media_posts(status);
CREATE INDEX idx_analytics_event_type ON analytics(event_type);
CREATE INDEX idx_analytics_created_at ON analytics(created_at);
CREATE INDEX idx_webhook_logs_source ON webhook_logs(source);
CREATE INDEX idx_webhook_logs_created_at ON webhook_logs(created_at);

-- Create Row Level Security (RLS) Policies
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

-- Policy for customers (only accessible by authenticated users)
CREATE POLICY "Customers are viewable by authenticated users" ON customers
  FOR SELECT USING (auth.role() = 'authenticated');

-- Policy for projects (only accessible by authenticated users)
CREATE POLICY "Projects are viewable by authenticated users" ON projects
  FOR SELECT USING (auth.role() = 'authenticated');

-- Policy for tasks (only accessible by authenticated users)
CREATE POLICY "Tasks are viewable by authenticated users" ON tasks
  FOR SELECT USING (auth.role() = 'authenticated');

-- Create Functions for Automatic Timestamp Updates
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create Triggers for Updated At
CREATE TRIGGER update_customers_updated_at BEFORE UPDATE ON customers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tasks_updated_at BEFORE UPDATE ON tasks
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_service_templates_updated_at BEFORE UPDATE ON service_templates
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_email_templates_updated_at BEFORE UPDATE ON email_templates
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_social_media_posts_updated_at BEFORE UPDATE ON social_media_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_api_keys_updated_at BEFORE UPDATE ON api_keys
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create View for Customer Projects Summary
CREATE VIEW customer_projects_summary AS
SELECT 
  c.id as customer_id,
  c.name as customer_name,
  c.email as customer_email,
  c.company,
  COUNT(p.id) as total_projects,
  COUNT(CASE WHEN p.status = 'completed' THEN 1 END) as completed_projects,
  SUM(p.amount) as total_spent,
  MAX(p.created_at) as last_project_date
FROM customers c
LEFT JOIN projects p ON c.id = p.customer_id
GROUP BY c.id, c.name, c.email, c.company;

-- Create View for Dashboard Analytics
CREATE VIEW dashboard_analytics AS
SELECT 
  DATE_TRUNC('month', created_at) as month,
  COUNT(*) as new_customers,
  SUM(amount) as total_revenue,
  AVG(amount) as average_order_value
FROM customers
WHERE created_at >= NOW() - INTERVAL '12 months'
GROUP BY DATE_TRUNC('month', created_at)
ORDER BY month DESC;

-- Grant Permissions
GRANT ALL ON ALL TABLES IN SCHEMA public TO postgres;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO postgres;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO postgres;

-- Create API Key for Application Use
INSERT INTO api_keys (service_name, key_name, encrypted_key, key_type) VALUES
('supabase', 'application_key', crypt('your-secure-api-key-here', gen_salt('bf')), 'api_key');

-- Sample Data for Testing
INSERT INTO customers (email, name, company, service_type, payment_status, amount, currency) VALUES
('john@example.com', 'John Doe', 'Doe Industries', 'ai-sales-machine', 'completed', 2000.00, 'USD'),
('jane@example.com', 'Jane Smith', 'Smith Consulting', 'content-repurposing-engine', 'completed', 1500.00, 'USD'),
('mike@example.com', 'Mike Johnson', 'Johnson Tech', 'email-support-agent', 'pending', 1000.00, 'USD');

INSERT INTO projects (customer_id, service_type, status, progress) VALUES
((SELECT id FROM customers WHERE email = 'john@example.com'), 'ai-sales-machine', 'completed', 100),
((SELECT id FROM customers WHERE email = 'jane@example.com'), 'content-repurposing-engine', 'in_progress', 75),
((SELECT id FROM customers WHERE email = 'mike@example.com'), 'email-support-agent', 'pending', 0);

-- Create Stored Procedure for Customer Onboarding
CREATE OR REPLACE FUNCTION onboard_customer(
  p_email VARCHAR(255),
  p_name VARCHAR(255),
  p_company VARCHAR(255),
  p_service_type VARCHAR(100),
  p_amount DECIMAL(10,2),
  p_payment_id VARCHAR(255)
)
RETURNS UUID AS $$
DECLARE
  customer_id UUID;
  project_id UUID;
BEGIN
  -- Create customer record
  INSERT INTO customers (email, name, company, service_type, payment_status, amount, payment_id)
  VALUES (p_email, p_name, p_company, p_service_type, 'completed', p_amount, p_payment_id)
  RETURNING id INTO customer_id;
  
  -- Create project record
  INSERT INTO projects (customer_id, service_type, status)
  VALUES (customer_id, p_service_type, 'pending')
  RETURNING id INTO project_id;
  
  -- Create initial tasks
  INSERT INTO tasks (project_id, title, description, priority)
  VALUES 
    (project_id, 'Setup GitHub Repository', 'Create and configure GitHub repository with service template', 'high'),
    (project_id, 'Deploy to Netlify', 'Deploy service to Netlify hosting platform', 'high'),
    (project_id, 'Configure Admin Panel', 'Set up customer admin dashboard', 'medium'),
    (project_id, 'Test Automation Flows', 'Verify all automation is working correctly', 'medium');
  
  RETURN customer_id;
END;
$$ LANGUAGE plpgsql;

-- Create Function for Social Media Post Scheduling
CREATE OR REPLACE FUNCTION schedule_social_post(
  p_platform VARCHAR(50),
  p_post_type VARCHAR(50),
  p_content TEXT,
  p_media_urls JSONB DEFAULT '[]'::jsonb,
  p_hashtags JSONB DEFAULT '[]'::jsonb,
  p_scheduled_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
)
RETURNS UUID AS $$
DECLARE
  post_id UUID;
BEGIN
  INSERT INTO social_media_posts (platform, post_type, content, media_urls, hashtags, scheduled_at, status)
  VALUES (p_platform, p_post_type, p_content, p_media_urls, p_hashtags, p_scheduled_at, 'scheduled')
  RETURNING id INTO post_id;
  
  RETURN post_id;
END;
$$ LANGUAGE plpgsql;

-- Create Trigger for Social Media Automation
CREATE OR REPLACE FUNCTION trigger_social_media_post()
RETURNS TRIGGER AS $$
BEGIN
  -- When a project is completed, automatically create social media posts
  IF NEW.status = 'completed' AND OLD.status != 'completed' THEN
    -- Create LinkedIn post
    INSERT INTO social_media_posts (platform, post_type, content, status, scheduled_at)
    VALUES (
      'linkedin',
      'success_story',
      format('🎉 Another Success Story! We''re thrilled to announce that %s is now live with their %s! ✅ Automated workflow deployed 🚀 Ready for scale #CustomerSuccess #AI #Automation', 
        (SELECT name FROM customers WHERE id = NEW.customer_id),
        NEW.service_type
      ),
      'scheduled',
      NOW() + INTERVAL '1 hour'
    );
    
    -- Create Twitter post
    INSERT INTO social_media_posts (platform, post_type, content, status, scheduled_at)
    VALUES (
      'twitter',
      'service_announcement',
      format('🤖 Welcome aboard %s! Your %s is now live and ready to transform your business! 🚀 #AI #Automation #BusinessTech #9LMNTS', 
        (SELECT name FROM customers WHERE id = NEW.customer_id),
        NEW.service_type
      ),
      'scheduled',
      NOW() + INTERVAL '2 hours'
    );
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER social_media_automation
  AFTER UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION trigger_social_media_post();

COMMIT;

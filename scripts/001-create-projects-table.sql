-- Create projects table for portfolio
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  long_description TEXT,
  technologies TEXT[] NOT NULL DEFAULT '{}',
  image_url TEXT,
  demo_url TEXT,
  github_url TEXT,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert sample projects
INSERT INTO projects (title, description, long_description, technologies, image_url, demo_url, github_url, featured) VALUES
('E-Commerce Platform', 'Full-stack e-commerce solution with modern UI/UX', 'A comprehensive e-commerce platform built with Next.js and Supabase, featuring user authentication, product management, shopping cart, and payment integration. The platform includes an admin dashboard for inventory management and order tracking.', ARRAY['Next.js', 'TypeScript', 'Supabase', 'Stripe', 'Tailwind CSS'], '/placeholder.svg?height=400&width=600', 'https://demo.example.com', 'https://github.com/jibreel/ecommerce', true),
('AI-Powered Analytics Dashboard', 'Real-time analytics with machine learning insights', 'An intelligent analytics dashboard that processes large datasets and provides AI-driven insights. Built with React and Python backend, featuring real-time data visualization, predictive analytics, and automated reporting capabilities.', ARRAY['React', 'Python', 'TensorFlow', 'PostgreSQL', 'D3.js'], '/placeholder.svg?height=400&width=600', 'https://analytics.example.com', 'https://github.com/jibreel/ai-analytics', true),
('Mobile Banking App', 'Secure mobile banking solution', 'A secure mobile banking application with biometric authentication, real-time transactions, and comprehensive financial management tools. Features include account management, fund transfers, bill payments, and investment tracking.', ARRAY['React Native', 'Node.js', 'MongoDB', 'JWT', 'Plaid API'], '/placeholder.svg?height=400&width=600', 'https://banking.example.com', 'https://github.com/jibreel/mobile-banking', true),
('Smart Home IoT Platform', 'IoT device management system', 'A comprehensive IoT platform for smart home automation, enabling users to control and monitor various smart devices. Includes real-time device status, automation rules, energy monitoring, and mobile app integration.', ARRAY['Vue.js', 'Node.js', 'MQTT', 'InfluxDB', 'Docker'], '/placeholder.svg?height=400&width=600', 'https://smarthome.example.com', 'https://github.com/jibreel/iot-platform', false);

-- Create an index for better query performance
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(featured);
CREATE INDEX IF NOT EXISTS idx_projects_created_at ON projects(created_at DESC);

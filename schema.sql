-- ============================================================
-- APEX AI / CLOUD WORKERS D1 DATABASE SCHEMA
-- ============================================================

CREATE TABLE IF NOT EXISTS leads (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  company TEXT NOT NULL,
  team_size TEXT DEFAULT '1-10',
  use_case TEXT,
  project_tier TEXT DEFAULT 'pro',
  monthly_budget TEXT DEFAULT '$500-$2k',
  stage TEXT DEFAULT 'waitlist', -- 'waitlist', 'trial', 'demo', 'closed'
  source TEXT DEFAULT 'organic',
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS api_keys (
  id TEXT PRIMARY KEY,
  key_prefix TEXT NOT NULL,
  key_label TEXT NOT NULL,
  tier TEXT DEFAULT 'developer', -- 'developer', 'startup', 'enterprise'
  rate_limit_rps INTEGER DEFAULT 60,
  monthly_quota INTEGER DEFAULT 1000000,
  usage_count INTEGER DEFAULT 0,
  status TEXT DEFAULT 'active', -- 'active', 'suspended', 'revoked'
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS telemetry_logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  endpoint TEXT NOT NULL,
  model TEXT NOT NULL,
  latency_ms INTEGER NOT NULL,
  status_code INTEGER DEFAULT 200,
  tokens_input INTEGER DEFAULT 0,
  tokens_output INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS platform_settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_leads_stage ON leads(stage);
CREATE INDEX IF NOT EXISTS idx_leads_created ON leads(created_at);
CREATE INDEX IF NOT EXISTS idx_keys_status ON api_keys(status);

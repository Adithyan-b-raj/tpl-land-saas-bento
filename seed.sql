-- ============================================================
-- APEX AI / CLOUD WORKERS SEED DATA
-- ============================================================

INSERT OR IGNORE INTO platform_settings (key, value) VALUES
  ('announcement_text', '🚀 Apex Engine v3.2 released: 35% lower p99 latency & speculative decoding support'),
  ('announcement_active', 'true'),
  ('waitlist_mode', 'open'),
  ('default_rate_limit', '120'),
  ('support_email', 'founder@apexcloud.dev');

INSERT OR IGNORE INTO api_keys (id, key_prefix, key_label, tier, rate_limit_rps, monthly_quota, usage_count, status) VALUES
  ('key_prod_01', 'apex_live_8f3a...', 'Acme Production Worker', 'enterprise', 500, 25000000, 18420090, 'active'),
  ('key_prod_02', 'apex_live_21bc...', 'FinFlow Fraud Classifier', 'startup', 120, 5000000, 3194000, 'active'),
  ('key_stg_03',  'apex_test_99e4...', 'Hyperlink Staging Bot', 'developer', 60, 1000000, 241050, 'active'),
  ('key_dev_04',  'apex_test_10fa...', 'Local Dev Sandbox', 'developer', 60, 1000000, 89400, 'active');

INSERT OR IGNORE INTO leads (id, name, email, company, team_size, use_case, project_tier, monthly_budget, stage, notes) VALUES
  ('lead_001', 'Sarah Jenkins', 'sjenkins@finflow.io', 'FinFlow Payments', '50-200', 'Real-time transaction fraud scoring with sub-20ms edge inference', 'enterprise', '$5k-$10k', 'demo', 'Scheduled architectural review for next Tuesday 2 PM EST.'),
  ('lead_002', 'Marcus Vance', 'marcus@hyperlink.dev', 'Hyperlink Inc', '11-50', 'Multi-tenant agentic search and context embedding cache', 'pro', '$1k-$3k', 'trial', 'Invited to Slack shared channel. Testing Python SDK.'),
  ('lead_003', 'Elena Rostova', 'elena@novasurge.tech', 'NovaSurge Robotics', '200+', 'Autonomous telemetry perception processing at global edge nodes', 'enterprise', '$10k+', 'closed', 'Annual master contract signed. 100M tokens/month committed.'),
  ('lead_004', 'David Kim', 'dkim@promptcraft.ai', 'PromptCraft Studio', '1-10', 'High-throughput LLM prompt chaining and speculative cache', 'starter', '$200-$500', 'waitlist', 'Requested early developer token access for hackathon.'),
  ('lead_005', 'Arun Patel', 'arun@cloudscale.in', 'CloudScale Data', '50-200', 'PostgreSQL pgvector edge acceleration with D1 cache layer', 'pro', '$2k-$5k', 'demo', 'Evaluating against AWS Bedrock and Pinecone.'),
  ('lead_006', 'Chloe Dupont', 'cdupont@lexicongraph.eu', 'Lexicon Graph', '11-50', 'Knowledge graph extraction and real-time citation synthesizer', 'pro', '$1k-$3k', 'trial', 'Active trial with 4 team members.');

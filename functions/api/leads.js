// Cloudflare Pages Functions - Leads API
export async function onRequestGet({ request, env }) {
  const url = new URL(request.url);
  const stage = url.searchParams.get('stage');
  const search = url.searchParams.get('search');
  
  try {
    if (env && env.DB) {
      let query = "SELECT * FROM leads";
      const params = [];
      const conditions = [];

      if (stage && stage !== 'all') {
        conditions.push("stage = ?");
        params.push(stage);
      }
      if (search) {
        conditions.push("(company LIKE ? OR name LIKE ? OR email LIKE ?)");
        params.push(`%${search}%`, `%${search}%`, `%${search}%`);
      }

      if (conditions.length > 0) {
        query += " WHERE " + conditions.join(" AND ");
      }
      query += " ORDER BY created_at DESC LIMIT 50";

      const stmt = env.DB.prepare(query);
      const res = await (params.length > 0 ? stmt.bind(...params).all() : stmt.all());
      return new Response(JSON.stringify({ ok: true, data: res.results || [] }), {
        headers: { "Content-Type": "application/json", "Cache-Control": "no-store" }
      });
    }

    // In-memory fallback
    return new Response(JSON.stringify({
      ok: true,
      data: [
        { id: 'lead_001', name: 'Sarah Jenkins', email: 'sjenkins@finflow.io', company: 'FinFlow Payments', team_size: '50-200', use_case: 'Real-time transaction fraud scoring with sub-20ms edge inference', project_tier: 'enterprise', monthly_budget: '$5k-$10k', stage: 'demo', created_at: '2026-10-31 14:22:00' },
        { id: 'lead_002', name: 'Marcus Vance', email: 'marcus@hyperlink.dev', company: 'Hyperlink Inc', team_size: '11-50', use_case: 'Multi-tenant agentic search and context embedding cache', project_tier: 'pro', monthly_budget: '$1k-$3k', stage: 'trial', created_at: '2026-10-31 16:45:00' },
        { id: 'lead_003', name: 'Elena Rostova', email: 'elena@novasurge.tech', company: 'NovaSurge Robotics', team_size: '200+', use_case: 'Autonomous telemetry perception processing at global edge nodes', project_tier: 'enterprise', monthly_budget: '$10k+', stage: 'closed', created_at: '2026-10-30 09:12:00' },
        { id: 'lead_004', name: 'David Kim', email: 'dkim@promptcraft.ai', company: 'PromptCraft Studio', team_size: '1-10', use_case: 'High-throughput LLM prompt chaining and speculative cache', project_tier: 'starter', monthly_budget: '$200-$500', stage: 'waitlist', created_at: '2026-11-01 11:05:00' }
      ]
    }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    return new Response(JSON.stringify({ ok: false, error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}

export async function onRequestPost({ request, env }) {
  try {
    const body = await request.json();
    const { name, email, company, team_size, use_case, project_tier, monthly_budget } = body;

    if (!email || !name) {
      return new Response(JSON.stringify({ ok: false, error: "Name and email are required." }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    const id = "lead_" + Date.now().toString(36) + Math.random().toString(36).substring(2, 6);

    if (env && env.DB) {
      await env.DB.prepare(
        "INSERT INTO leads (id, name, email, company, team_size, use_case, project_tier, monthly_budget, stage) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'waitlist')"
      ).bind(id, name, email, company || 'Not Specified', team_size || '1-10', use_case || '', project_tier || 'pro', monthly_budget || '$500-$2k').run();
    }

    return new Response(JSON.stringify({
      ok: true,
      message: "Priority waitlist spot reserved! Check your email for API access tokens.",
      lead_id: id
    }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    return new Response(JSON.stringify({ ok: false, error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}

export async function onRequestPatch({ request, env }) {
  try {
    const body = await request.json();
    const { id, stage, notes } = body;

    if (!id || !stage) {
      return new Response(JSON.stringify({ ok: false, error: "ID and new stage required." }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    if (env && env.DB) {
      await env.DB.prepare(
        "UPDATE leads SET stage = ?, notes = COALESCE(?, notes) WHERE id = ?"
      ).bind(stage, notes || null, id).run();
    }

    return new Response(JSON.stringify({ ok: true, updated: id, stage }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    return new Response(JSON.stringify({ ok: false, error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}

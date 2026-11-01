export async function onRequest(context) {
  const url = new URL(context.request.url);
  if (url.pathname === '/api/leads' && context.request.method === 'GET') {
    return new Response(JSON.stringify([{"id":"LD-901","name":"Rahul Menon (CTO, FinStack Kochi)","phone":"919847011223","detail":"Team: 28 • Est. ROI: ₹1.17Cr/yr • Enterprise Plan","status":"DEMO SCHEDULED","amount":"₹49,000/mo"},{"id":"LD-902","name":"Ananya Sharma (VP Ops, CloudCart)","phone":"919895044556","detail":"Team: 14 • Est. ROI: ₹58.9L/yr • Growth Plan","status":"TRIAL ACTIVE","amount":"₹14,900/mo"},{"id":"LD-903","name":"Vikram Nair (Founder, ShipFast India)","phone":"919447088990","detail":"Team: 8 • Est. ROI: ₹33.6L/yr • Growth Plan","status":"NEW WAITLIST","amount":"₹14,900/mo"}]), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=30, s-maxage=60, stale-while-revalidate=120'
      }
    });
  }
  if (url.pathname === '/api/leads' && context.request.method === 'POST') {
    const body = await context.request.json().catch(() => ({}));
    return new Response(JSON.stringify({ ok: true, id: body.id || 'REQ-LIVE' }), {
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' }
    });
  }
  return new Response(JSON.stringify({ service: 'tpl-land-saas-bento', status: 'ok' }), {
    headers: { 'Content-Type': 'application/json' }
  });
}

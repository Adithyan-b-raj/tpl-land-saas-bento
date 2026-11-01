// Cloudflare Pages Functions - Telemetry & Edge Health API
export async function onRequestGet() {
  const telemetry = {
    uptime: "99.998%",
    p50_latency_ms: 8,
    p99_latency_ms: 18,
    active_edge_nodes: 314,
    global_cache_hit_rate: "94.2%",
    daily_requests: "48,219,400",
    regions: [
      { name: "North America (IAD, SFO)", status: "healthy", latency: "11ms" },
      { name: "Europe (LHR, FRA)", status: "healthy", latency: "14ms" },
      { name: "Asia-Pacific (SIN, TYO, BOM)", status: "healthy", latency: "17ms" },
      { name: "South America (GRU)", status: "healthy", latency: "22ms" }
    ]
  };

  return new Response(JSON.stringify({ ok: true, telemetry }), {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120"
    }
  });
}

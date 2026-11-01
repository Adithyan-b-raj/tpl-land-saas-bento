// Cloudflare Pages Functions - Live AI Playground Simulator
export async function onRequestPost({ request }) {
  try {
    const body = await request.json();
    const { model = "apex-flash-v3", prompt = "Analyze telemetry vectors", temperature = 0.7 } = body;

    const startTime = Date.now();
    
    // Simulate high-speed edge reasoning response
    const mockResponses = [
      `{\n  "status": "complete",\n  "model": "${model}",\n  "tokens_input": 24,\n  "tokens_output": 86,\n  "inference_latency_ms": 14,\n  "embeddings": [0.0821, -0.412, 0.9914, 0.1287],\n  "output": "Vector cluster localized. Edge cache hit on Cloudflare BOM node with 99.98% confidence score. Zero cold start detected."\n}`,
      `{\n  "status": "complete",\n  "model": "${model}",\n  "tokens_input": 32,\n  "tokens_output": 114,\n  "inference_latency_ms": 19,\n  "embeddings": [0.312, 0.884, -0.104, 0.551],\n  "output": "Telemetry anomaly cleared. Distributed KV lock acquired across 310+ edge locations in 18ms."\n}`
    ];

    const output = mockResponses[Math.floor(Math.random() * mockResponses.length)];
    const duration = Date.now() - startTime + Math.floor(Math.random() * 15 + 10);

    return new Response(output, {
      headers: {
        "Content-Type": "application/json",
        "X-Apex-Edge-Node": "cloudflare-bom-edge-01",
        "X-Apex-Latency-Ms": duration.toString()
      }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}

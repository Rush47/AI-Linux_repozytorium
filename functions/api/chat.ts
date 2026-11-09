interface Env { GEMINI_API_KEY?: string; GEMINI_MODEL?: string; }
export const onRequestPost = async ({ request, env }: { request: Request; env: Env }) => {
  const headers = { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' };
  if (!env.GEMINI_API_KEY) return new Response(JSON.stringify({ error: 'GEMINI_API_KEY is not configured' }), { status: 503, headers });
  let body: any;
  try { body = await request.json(); } catch { return new Response(JSON.stringify({error:'Invalid JSON'}),{status:400,headers}); }
  const messages = body?.messages;
  if (!Array.isArray(messages) || !messages.length || messages.length > 40 || messages.some((m:any)=>!['user','assistant','model'].includes(m?.role) || typeof m?.content !== 'string' || m.content.length > 12000)) return new Response(JSON.stringify({error:'Invalid messages'}),{status:400,headers});
  const personas: Record<string,string> = {
    aria: 'You are Aria, an AI assistant in AI Linux.',
    alex: 'You are Alex, a software development assistant in AI Linux.',
    astyria: 'You are Astyria, a diagnostic and security assistant in AI Linux.',
    aurelius: 'You are Aurelius, a planning and analysis assistant in AI Linux.'
  };
  const systemInstruction = personas[body.agentId] || 'You are an AI Linux assistant. Do not claim to execute commands or access the host.';
  const contents = messages.map((m:any)=>({role:m.role==='user'?'user':'model',parts:[{text:m.content}]}));
  const model = env.GEMINI_MODEL || 'gemini-2.5-flash';
  try {
    const upstream = await fetch('https://generativelanguage.googleapis.com/v1beta/models/'+encodeURIComponent(model)+':generateContent', {
      method:'POST', headers:{'Content-Type':'application/json','x-goog-api-key':env.GEMINI_API_KEY},
      body:JSON.stringify({systemInstruction:{parts:[{text:systemInstruction}]},contents,generationConfig:{maxOutputTokens:2048}})
    });
    if (!upstream.ok) return new Response(JSON.stringify({error:'AI provider unavailable',status:upstream.status}),{status:502,headers});
    const data:any = await upstream.json();
    const content = data?.candidates?.[0]?.content?.parts?.map((p:any)=>p.text||'').join('') || '';
    return new Response(JSON.stringify({content}),{headers});
  } catch { return new Response(JSON.stringify({error:'AI provider connection failed'}),{status:502,headers}); }
};

export const onRequestGet = async () => new Response(JSON.stringify({
  deployment: 'cloudflare-pages',
  real_os: 'Cloudflare Workers runtime (not a Linux host)',
  cpu: null,
  memory: {total:null,used:null},
  node_version: null,
  status: 'frontend-online',
  hostMetricsAvailable: false
}), {headers:{'Content-Type':'application/json','Cache-Control':'no-store'}});

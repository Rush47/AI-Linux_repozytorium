import React from 'react';
import { 
  ShieldCheck, 
  Cpu, 
  Database, 
  Terminal, 
  ChevronRight, 
  ExternalLink,
  Info,
  Download,
  Github
} from 'lucide-react';
import { motion } from 'motion/react';

export default function Dashboard({ onNavigate }: { onNavigate: (tab: any) => void }) {
  const [svlReport, setSvlReport] = React.useState<any>(null);

  React.useEffect(() => {
    fetch('/api/system-info')
      .then(res => res.json())
      .then(data => setSvlReport(data));
  }, []);

  const statusItems = [
    { name: 'SVL Kernel', status: 'Online', uptime: '99.9%' },
    { name: 'LibreChat API', status: 'Online', uptime: '14d 2h' },
    { name: 'Ollama Backend', status: 'Online', uptime: '14d 2h' },
    { name: 'MongoDB', status: 'Online', uptime: '32d 5h' },
    { name: 'Meilisearch', status: 'Online', uptime: '14d 2h' },
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-indigo-900/20 to-neutral-900 border border-indigo-500/20 p-8 rounded-2xl">
        <h1 className="text-4xl font-bold mb-4">Welcome to AILinux</h1>
        <p className="text-neutral-400 max-w-2xl text-lg leading-relaxed mb-6">
          A high-performance AI system based on Ubuntu 26.04, featuring integrated LibreChat, 
          Ollama models, and Model Context Protocol (MCP) for advanced system interaction.
        </p>
        <div className="flex gap-4">
          <button 
            onClick={() => onNavigate('chat')}
            className="bg-indigo-600 hover:bg-indigo-500 px-6 py-3 rounded-lg font-bold flex items-center gap-2 transition-colors"
          >
            Launch Chat Interface <ChevronRight className="w-4 h-4" />
          </button>
          <button 
            onClick={() => onNavigate('tools')}
            className="bg-neutral-800 hover:bg-neutral-700 px-6 py-3 rounded-lg font-bold flex items-center gap-2 transition-colors"
          >
            System Documentation
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Status Card */}
        <div className="md:col-span-2 bg-neutral-900 border border-neutral-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-green-500" />
              Service Status
            </h2>
            <span className="text-xs text-neutral-500 uppercase tracking-widest">Live Monitoring</span>
          </div>
          <div className="space-y-4">
            {statusItems.map((item) => (
              <div key={item.name} className="flex items-center justify-between p-3 bg-neutral-950/50 rounded-lg border border-neutral-800/50">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${item.status === 'Online' ? 'bg-green-500' : 'bg-amber-500'}`} />
                  <span className="font-medium">{item.name}</span>
                </div>
                <div className="flex items-center gap-8">
                  <span className={`text-xs ${item.status === 'Online' ? 'text-green-500/80' : 'text-amber-500/80'}`}>
                    {item.status}
                  </span>
                  <span className="text-xs text-neutral-600 w-16 text-right font-mono">
                    {item.uptime}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links Card */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Info className="w-5 h-5 text-indigo-500" />
            Quick Actions
          </h2>
          <div className="space-y-3">
            <a 
              href="https://ailinux.me" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 bg-neutral-800/30 hover:bg-neutral-800/50 rounded-lg border border-neutral-700/30 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <Download className="w-5 h-5 text-neutral-400 group-hover:text-indigo-400" />
                <span className="text-sm font-medium">Download ISO</span>
              </div>
              <ExternalLink className="w-4 h-4 text-neutral-600" />
            </a>
            <div 
              onClick={() => onNavigate('tools')}
              className="flex items-center justify-between p-4 bg-neutral-800/30 hover:bg-neutral-800/50 rounded-lg border border-neutral-700/30 transition-colors group cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <Github className="w-5 h-5 text-neutral-400 group-hover:text-indigo-400" />
                <span className="text-sm font-medium">Setup GitHub CLI</span>
              </div>
              <ChevronRight className="w-4 h-4 text-neutral-600" />
            </div>
            <div 
              onClick={() => onNavigate('monitor')}
              className="flex items-center justify-between p-4 bg-neutral-800/30 hover:bg-neutral-800/50 rounded-lg border border-neutral-700/30 transition-colors group cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <Cpu className="w-5 h-5 text-neutral-400 group-hover:text-indigo-400" />
                <span className="text-sm font-medium">Resource Monitor</span>
              </div>
              <ChevronRight className="w-4 h-4 text-neutral-600" />
            </div>
          </div>
        </div>
      </div>

      {/* SVL Core Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-indigo-950/20 border border-indigo-500/30 p-6 rounded-xl">
          <h3 className="text-sm font-bold text-indigo-400 uppercase tracking-widest mb-4">Compact Infinity Engine</h3>
          <div className="flex items-end justify-between">
            <div>
              <div className="text-3xl font-bold text-white mb-1">{svlReport?.compact_metric_c || '2.500000'}</div>
              <div className="text-xs text-neutral-500">Metric C (Stereographic Projection)</div>
            </div>
            <div className="text-right">
              <div className="text-xl font-bold text-emerald-400">{svlReport?.performance || '+1456%'}</div>
              <div className="text-xs text-neutral-500">Performance Delta</div>
            </div>
          </div>
        </div>
        <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-xl">
          <h3 className="text-sm font-bold text-neutral-400 uppercase tracking-widest mb-4">System Identity</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-neutral-500">Kernel Version</span>
              <span className="text-neutral-300 font-mono">{svlReport?.system || '5.6.0-QuantumWheel'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-500">Primary Operator</span>
              <span className="text-neutral-300 font-mono">{svlReport?.operator || 'Mateusz Mitek'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Warning Section */}
      <div className="bg-amber-900/10 border border-amber-500/20 p-4 rounded-lg flex gap-4 items-start">
        <Info className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
        <p className="text-sm text-amber-200/70">
          <strong>Security Note:</strong> SVL System is running in Reflective-Non-Greedy mode. 
          The identity isolation layer is active for Aria, Astyria, Alex, and Aurelius.
          Do not expose the OMNIKLUCZ_ROOT token.
        </p>
      </div>
    </div>
  );
}

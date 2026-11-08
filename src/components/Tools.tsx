import React, { useState } from 'react';
import { 
  Terminal, 
  Copy, 
  Check, 
  Github, 
  ExternalLink, 
  Download, 
  FileText,
  Code,
  ShieldAlert,
  ChevronRight,
  User
} from 'lucide-react';

export default function Tools() {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const codeBlocks = {
    setup: 'cp deploy/ai-studio/.env.example .env',
    secrets: 'openssl rand -hex 32',
    docker: 'docker compose up -d --build',
    pull: 'docker compose exec ollama ollama pull thox-ai/thoxopen-8b-heretic:q4_k_m',
  };

  return (
    <div className="space-y-8 pb-12">
      {/* ISO Download */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden">
        <div className="p-8 flex flex-col md:flex-row items-center gap-8">
          <div className="w-20 h-20 bg-indigo-600 rounded-2xl flex items-center justify-center shrink-0 shadow-2xl shadow-indigo-500/20">
            <Download className="w-10 h-10 text-white" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl font-bold mb-2">Get the AILinux ISO</h2>
            <p className="text-neutral-400 mb-6 max-w-xl">
              Download the official verified AILinux 26.04 AMD64 image to install on your 
              physical hardware or virtual machine.
            </p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <a 
                href="https://ailinux.me" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-indigo-600 hover:bg-indigo-500 px-6 py-2.5 rounded-lg font-bold flex items-center gap-2 transition-colors"
              >
                Official Download <ExternalLink className="w-4 h-4" />
              </a>
              <div className="bg-neutral-800 px-4 py-2.5 rounded-lg flex items-center gap-2 border border-neutral-700">
                <ShieldAlert className="w-4 h-4 text-amber-500" />
                <span className="text-xs font-mono text-neutral-300 truncate max-w-[200px]">
                  de744684375ccbc15d6be45...
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Quick Start Guide */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Terminal className="w-5 h-5 text-emerald-500" />
            Local Deployment Guide
          </h3>
          
          <div className="space-y-4">
            <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-neutral-500 uppercase tracking-widest">Step 1: Init Environment</span>
                <button 
                  onClick={() => copyToClipboard(codeBlocks.setup, 'setup')}
                  className="text-neutral-500 hover:text-neutral-300"
                >
                  {copied === 'setup' ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <code className="text-sm font-mono text-emerald-400">{codeBlocks.setup}</code>
            </div>

            <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-neutral-500 uppercase tracking-widest">Step 2: Generate Secrets</span>
                <button 
                  onClick={() => copyToClipboard(codeBlocks.secrets, 'secrets')}
                  className="text-neutral-500 hover:text-neutral-300"
                >
                  {copied === 'secrets' ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <code className="text-sm font-mono text-emerald-400">{codeBlocks.secrets}</code>
            </div>

            <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-neutral-500 uppercase tracking-widest">Step 3: Launch Stack</span>
                <button 
                  onClick={() => copyToClipboard(codeBlocks.docker, 'docker')}
                  className="text-neutral-500 hover:text-neutral-300"
                >
                  {copied === 'docker' ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <code className="text-sm font-mono text-emerald-400">{codeBlocks.docker}</code>
            </div>
          </div>
        </div>

        {/* Documentation Links */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <FileText className="w-5 h-5 text-indigo-500" />
            Documentation
          </h3>
          
          <div className="grid grid-cols-1 gap-4">
            <a 
              href="https://github.com/Rush47/AI_System_Linux/blob/main/docs/GITHUB.md"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-neutral-900 border border-neutral-800 p-4 rounded-xl hover:bg-neutral-800 transition-colors flex items-center gap-4 group"
            >
              <div className="w-10 h-10 bg-neutral-800 rounded-lg flex items-center justify-center group-hover:bg-neutral-700">
                <Github className="w-5 h-5 text-neutral-400" />
              </div>
              <div className="flex-1">
                <div className="font-bold">GitHub CLI Setup</div>
                <div className="text-xs text-neutral-500">Configuring GH CLI and Git via HTTPS</div>
              </div>
              <ChevronRight className="w-4 h-4 text-neutral-600" />
            </a>

            <a 
              href="https://github.com/Rush47/AI_System_Linux/blob/main/docs/AGENTS.md"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-neutral-900 border border-neutral-800 p-4 rounded-xl hover:bg-neutral-800 transition-colors flex items-center gap-4 group"
            >
              <div className="w-10 h-10 bg-neutral-800 rounded-lg flex items-center justify-center group-hover:bg-neutral-700">
                <User className="w-5 h-5 text-neutral-400" />
              </div>
              <div className="flex-1">
                <div className="font-bold">Agent Registry</div>
                <div className="text-xs text-neutral-500">Information about Aria, Alex, and Astyria</div>
              </div>
              <ChevronRight className="w-4 h-4 text-neutral-600" />
            </a>

            <a 
              href="https://github.com/Rush47/AI_System_Linux/blob/main/deploy/ai-studio/README.md"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-neutral-900 border border-neutral-800 p-4 rounded-xl hover:bg-neutral-800 transition-colors flex items-center gap-4 group"
            >
              <div className="w-10 h-10 bg-neutral-800 rounded-lg flex items-center justify-center group-hover:bg-neutral-700">
                <Code className="w-5 h-5 text-neutral-400" />
              </div>
              <div className="flex-1">
                <div className="font-bold">Advanced Deployment</div>
                <div className="text-xs text-neutral-500">Docker volumes and network security</div>
              </div>
              <ChevronRight className="w-4 h-4 text-neutral-600" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

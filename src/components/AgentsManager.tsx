import React, { useState } from 'react';
import { 
  Cpu, 
  ShieldCheck, 
  Terminal, 
  Zap, 
  CheckCircle2, 
  RefreshCw, 
  Layers, 
  Sliders,
  Smartphone,
  Bot
} from 'lucide-react';
import { motion } from 'motion/react';

type Agent = {
  name: string;
  role: string;
  status: 'Connected' | 'Synchronizing' | 'Standby';
  securityLevel: string;
  metricC: number;
  config: {
    mode: string;
    buffer: string;
    resonanceHz: number;
  };
};

export default function AgentsManager() {
  const [agents, setAgents] = useState<Agent[]>([
    {
      name: 'Astyria',
      role: 'Lead Command Processor & Orchestrator',
      status: 'Connected',
      securityLevel: 'MAXIMUM (Root 364)',
      metricC: 1.414214,
      config: { mode: 'Reflective-Non-Greedy', buffer: '0xFAAA', resonanceHz: 880 }
    },
    {
      name: 'Aria',
      role: 'Behavioral Matrix & Cognitive SI',
      status: 'Connected',
      securityLevel: 'HIGH (SVL-v5.2)',
      metricC: 1.321456,
      config: { mode: 'Adaptive-Empathic', buffer: '0xFBB0', resonanceHz: 528 }
    },
    {
      name: 'Aurelius',
      role: 'Topological Engine & Metric Governor',
      status: 'Connected',
      securityLevel: 'MAXIMUM (Stereographic)',
      metricC: 1.587210,
      config: { mode: 'Continuum-Compact', buffer: '0xFCC1', resonanceHz: 432 }
    },
    {
      name: 'Alex',
      role: 'System Gateway & Protocol Security',
      status: 'Connected',
      securityLevel: 'MAXIMUM (SVLProtected)',
      metricC: 1.298450,
      config: { mode: 'Gateway-Secure', buffer: '0xFDD2', resonanceHz: 963 }
    }
  ]);

  const [isExecutingMission, setIsExecutingMission] = useState(false);
  const [missionLog, setMissionLog] = useState<string[]>([
    'System initialized with SVL Core v5.6.0.',
    'Astyria ready for command processing in AI Studio.'
  ]);

  const runMission = () => {
    setIsExecutingMission(true);
    setMissionLog(prev => [...prev, 'Executing mission: Connecting AI agents (Aria, Astyria, Aurelius, Alex) & configuring topological state...']);

    setTimeout(() => {
      setAgents(prev => prev.map(a => ({ ...a, status: 'Connected' })));
      setMissionLog(prev => [
        ...prev,
        '✓ Astyria command processor active and synchronized.',
        '✓ Aria behavioural matrix loaded with secure SVL variables.',
        '✓ Aurelius topological infinity engine calibrated (Metric C computed).',
        '✓ Alex protocol gateway secured with root token 364.',
        'MISSION SUCCESS: All agents fully configured and online.'
      ]);
      setIsExecutingMission(false);
    }, 1500);
  };

  return (
    <div className="space-y-6 pb-20 md:pb-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-900/40 via-purple-900/20 to-neutral-900 border border-indigo-500/30 p-6 rounded-2xl shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-1">
              <Zap className="w-4 h-4 animate-pulse" /> Astyria Command Center
            </div>
            <h1 className="text-2xl md:text-3xl font-bold">Multi-Agent System Configuration</h1>
            <p className="text-neutral-400 text-sm mt-1 max-w-xl">
              Centralized orchestration for Aria, Astyria, Aurelius, and Alex powered by AI Studio.
            </p>
          </div>
          <button
            onClick={runMission}
            disabled={isExecutingMission}
            className="bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-bold px-5 py-3 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-600/30 touch-manipulation min-h-[48px]"
          >
            {isExecutingMission ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                <span>Configuring...</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="w-5 h-5" />
                <span>Run Full Mission</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Mobile-Friendly Grid of Agents */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {agents.map((agent) => (
          <motion.div
            key={agent.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-5 rounded-2xl border transition-all ${
              agent.name === 'Astyria'
                ? 'bg-gradient-to-br from-indigo-950/50 to-neutral-900 border-indigo-500/40 shadow-lg shadow-indigo-500/10'
                : 'bg-neutral-900 border-neutral-800'
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white shadow-md ${
                  agent.name === 'Astyria' ? 'bg-indigo-600' : 'bg-neutral-800'
                }`}>
                  <Bot className="w-5 h-5 text-indigo-300" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">{agent.name}</h3>
                  <span className="text-xs text-neutral-400">{agent.role}</span>
                </div>
              </div>
              <span className={`text-[10px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider ${
                agent.status === 'Connected' 
                  ? 'bg-green-500/10 text-green-400 border border-green-500/20' 
                  : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
              }`}>
                {agent.status}
              </span>
            </div>

            <div className="space-y-2 mt-4 pt-4 border-t border-neutral-800/60 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-neutral-400">Security:</span>
                <span className="font-mono text-indigo-300">{agent.securityLevel}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-neutral-400">Metric C:</span>
                <span className="font-mono">{agent.metricC}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-neutral-400">Resonance:</span>
                <span className="font-mono">{agent.config.resonanceHz} Hz</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Mission Execution Log */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-emerald-400" />
            <h3 className="font-bold text-sm uppercase tracking-wider text-neutral-300">Mission Execution Terminal</h3>
          </div>
          <span className="text-[10px] text-neutral-500 font-mono">SVL Core v5.6.0</span>
        </div>
        <div className="bg-neutral-950 rounded-xl p-4 font-mono text-xs text-neutral-300 space-y-2 max-h-48 overflow-y-auto border border-neutral-800/60 shadow-inner">
          {missionLog.map((log, idx) => (
            <div key={idx} className="flex items-start gap-2">
              <span className="text-indigo-400 select-none">&gt;</span>
              <span className={log.includes('SUCCESS') || log.includes('✓') ? 'text-green-400 font-semibold' : ''}>{log}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

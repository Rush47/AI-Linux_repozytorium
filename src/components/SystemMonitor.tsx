import React, { useState, useEffect } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { Cpu, Database, Activity, Clock, Server, Monitor } from 'lucide-react';

type Stats = {
  time: string;
  cpu: number;
  memory: number;
};

export default function SystemMonitor() {
  const [data, setData] = useState<Stats[]>([]);
  const [currentInfo, setCurrentInfo] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/system-info');
        const info = await response.json();
        setCurrentInfo(info);

        const now = new Date();
        const timeStr = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
        
        setData(prev => {
          const newData = [...prev, { 
            time: timeStr, 
            cpu: info.cpu, 
            memory: (info.memory.used / info.memory.total) * 100 
          }];
          if (newData.length > 20) return newData.slice(1);
          return newData;
        });
      } catch (error) {
        console.error('Error fetching system info:', error);
      }
    };

    const interval = setInterval(fetchData, 2000);
    fetchData();
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Info Cards */}
        <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-xl">
          <div className="flex items-center gap-3 text-neutral-400 mb-2">
            <Cpu className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-wider">CPU Usage</span>
          </div>
          <div className="text-3xl font-bold">{currentInfo?.cpu.toFixed(1)}%</div>
          <div className="w-full bg-neutral-800 h-1 mt-4 rounded-full overflow-hidden">
            <div 
              className="bg-indigo-500 h-full transition-all duration-500" 
              style={{ width: `${currentInfo?.cpu}%` }} 
            />
          </div>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-xl">
          <div className="flex items-center gap-3 text-neutral-400 mb-2">
            <Database className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-wider">RAM Used</span>
          </div>
          <div className="text-3xl font-bold">{currentInfo?.memory.used} MB</div>
          <div className="text-xs text-neutral-500 mt-1">Total: {currentInfo?.memory.total} MB</div>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-xl">
          <div className="flex items-center gap-3 text-neutral-400 mb-2">
            <Clock className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-wider">Uptime</span>
          </div>
          <div className="text-3xl font-bold">{Math.floor(currentInfo?.uptime / 60)}m {currentInfo?.uptime % 60}s</div>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-xl">
          <div className="flex items-center gap-3 text-neutral-400 mb-2">
            <Server className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-wider">OS Version</span>
          </div>
          <div className="text-sm font-bold text-neutral-200">{currentInfo?.os}</div>
          <div className="text-[10px] text-neutral-500 font-mono mt-1">{currentInfo?.kernel}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* CPU Chart */}
        <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-xl">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <Activity className="w-5 h-5 text-indigo-500" />
            CPU Load History
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorCpu" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#262626" vertical={false} />
                <XAxis dataKey="time" stroke="#525252" fontSize={10} hide />
                <YAxis stroke="#525252" fontSize={10} domain={[0, 100]} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#171717', border: '1px solid #262626', borderRadius: '8px' }}
                  itemStyle={{ color: '#6366f1' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="cpu" 
                  stroke="#6366f1" 
                  fillOpacity={1} 
                  fill="url(#colorCpu)" 
                  isAnimationActive={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Memory Chart */}
        <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-xl">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <Activity className="w-5 h-5 text-emerald-500" />
            Memory Usage History
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorMem" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#262626" vertical={false} />
                <XAxis dataKey="time" stroke="#525252" fontSize={10} hide />
                <YAxis stroke="#525252" fontSize={10} domain={[0, 100]} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#171717', border: '1px solid #262626', borderRadius: '8px' }}
                  itemStyle={{ color: '#10b981' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="memory" 
                  stroke="#10b981" 
                  fillOpacity={1} 
                  fill="url(#colorMem)" 
                  isAnimationActive={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Hardware Details (MCP Simulation) */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden">
        <div className="p-4 bg-neutral-800/50 border-b border-neutral-800 flex items-center gap-2">
          <Monitor className="w-4 h-4 text-neutral-400" />
          <span className="text-xs font-bold uppercase tracking-widest">MCP Read-Only Hardware View</span>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
              <span className="text-neutral-500 text-sm">Processor</span>
              <span className="text-sm">AMD EPYC™ 7B13 (Virtual)</span>
            </div>
            <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
              <span className="text-neutral-500 text-sm">Cores</span>
              <span className="text-sm">8 vCPUs</span>
            </div>
            <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
              <span className="text-neutral-500 text-sm">Architecture</span>
              <span className="text-sm">x86_64</span>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
              <span className="text-neutral-500 text-sm">Base Board</span>
              <span className="text-sm">Google Compute Engine</span>
            </div>
            <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
              <span className="text-neutral-500 text-sm">Storage Type</span>
              <span className="text-sm">NVMe SSD</span>
            </div>
            <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
              <span className="text-neutral-500 text-sm">Virtualization</span>
              <span className="text-sm">KVM / QEMU</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

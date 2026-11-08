import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  MessageSquare, 
  Activity, 
  Terminal, 
  Users, 
  ChevronRight, 
  Monitor,
  Menu,
  X,
  Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Dashboard from './components/Dashboard';
import Chat from './components/Chat';
import SystemMonitor from './components/SystemMonitor';
import Tools from './components/Tools';
import AgentsManager from './components/AgentsManager';

type Tab = 'dashboard' | 'agents' | 'chat' | 'monitor' | 'tools';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('agents');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const sidebarItems = [
    { id: 'agents', icon: Users, label: 'Astyria & Agents' },
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'chat', icon: MessageSquare, label: 'AI Chat' },
    { id: 'monitor', icon: Activity, label: 'System Monitor' },
    { id: 'tools', icon: Terminal, label: 'Development Tools' },
  ];

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-mono flex flex-col md:flex-row overflow-hidden">
      {/* Desktop Sidebar */}
      <aside 
        className={`hidden md:flex ${
          isSidebarOpen ? 'w-64' : 'w-20'
        } bg-neutral-900 border-r border-neutral-800 transition-all duration-300 flex-col z-20`}
      >
        <div className="p-6 flex items-center gap-3 border-b border-neutral-800">
          <div className="w-8 h-8 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-600/30">
            <Zap className="w-5 h-5 text-white" />
          </div>
          {isSidebarOpen && (
            <motion.span 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              className="font-bold text-lg tracking-tight"
            >
              AILinux
            </motion.span>
          )}
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as Tab)}
              className={`w-full flex items-center gap-3 p-3 rounded-xl transition-colors ${
                activeTab === item.id 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' 
                  : 'text-neutral-400 hover:bg-neutral-800 hover:text-neutral-100'
              }`}
            >
              <item.icon className="w-5 h-5 shrink-0" />
              {isSidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-neutral-800">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="w-full flex items-center gap-3 p-3 text-neutral-400 hover:text-neutral-100 rounded-xl"
          >
            {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            {isSidebarOpen && <span className="text-sm">Collapse</span>}
          </button>
        </div>
      </aside>

      {/* Mobile Top Header */}
      <header className="md:hidden h-16 border-b border-neutral-800 bg-neutral-900/90 backdrop-blur-md flex items-center justify-between px-4 z-30 shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-xl flex items-center justify-center">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-base">AILinux / Astyria</span>
        </div>
        <div className="flex items-center gap-2 bg-neutral-800 px-3 py-1 rounded-full border border-neutral-700">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-[10px] font-bold text-neutral-300 uppercase">Online</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden pb-16 md:pb-0">
        <div className="hidden md:flex h-16 border-b border-neutral-800 bg-neutral-900/50 backdrop-blur-md items-center justify-between px-8 shrink-0">
          <div className="flex items-center gap-2 text-neutral-400 text-sm">
            <span>Root</span>
            <ChevronRight className="w-4 h-4" />
            <span className="text-neutral-100 capitalize">{activeTab}</span>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-neutral-800 px-3 py-1 rounded-full border border-neutral-700">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-xs text-neutral-300">Astyria Command Processor Active</span>
            </div>
          </div>
        </div>

        <section className="flex-1 overflow-y-auto p-4 md:p-8 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.15 }}
              className="max-w-6xl mx-auto h-full"
            >
              {activeTab === 'agents' && <AgentsManager />}
              {activeTab === 'dashboard' && <Dashboard onNavigate={setActiveTab} />}
              {activeTab === 'chat' && <Chat />}
              {activeTab === 'monitor' && <SystemMonitor />}
              {activeTab === 'tools' && <Tools />}
            </motion.div>
          </AnimatePresence>
        </section>

        {/* Mobile Bottom Navigation Bar (Touch-Optimized) */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-neutral-900 border-t border-neutral-800 flex items-center justify-around px-2 z-40 backdrop-blur-lg">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as Tab)}
              className={`flex flex-col items-center justify-center flex-1 h-full py-1 transition-colors touch-manipulation ${
                activeTab === item.id 
                  ? 'text-indigo-400 font-bold' 
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <item.icon className="w-5 h-5 mb-1" />
              <span className="text-[10px] tracking-tight">{item.label.split(' ')[0]}</span>
            </button>
          ))}
        </nav>
      </main>
    </div>
  );
}

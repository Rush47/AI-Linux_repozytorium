import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, Brain, Settings, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  model?: string;
};

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'SVL System Initialized. I am Aria. How can I assist the system operator today?',
      model: 'Aria'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [agentId, setAgentId] = useState<'aria' | 'astyria' | 'alex' | 'aurelius'>('aria');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          agentId
        }),
      });

      const data = await response.json();
      if (data.error) throw new Error(data.error);

      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.content,
        model: agentId.charAt(0).toUpperCase() + agentId.slice(1)
      }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'System error: Identity isolation layer failure. Check SVL kernel logs.'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const agents = [
    { id: 'aria', name: 'Aria' },
    { id: 'astyria', name: 'Astyria' },
    { id: 'alex', name: 'Alex' },
    { id: 'aurelius', name: 'Aurelius' },
  ];

  return (
    <div className="h-full flex flex-col max-w-4xl mx-auto border border-neutral-800 rounded-xl bg-neutral-900/30 overflow-hidden">
      {/* Chat Header */}
      <div className="p-4 border-b border-neutral-800 bg-neutral-900 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="font-bold">AILinux Assistant</h2>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
              <span className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold">Heretic Runtime v2.0</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-neutral-800 p-1 rounded-lg">
          {agents.map(agent => (
            <button
              key={agent.id}
              onClick={() => setAgentId(agent.id as any)}
              className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                agentId === agent.id ? 'bg-indigo-600 text-white shadow-sm' : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              {agent.name}
            </button>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6" ref={scrollRef}>
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : ''}`}
            >
              {msg.role === 'assistant' && (
                <div className="w-8 h-8 rounded bg-neutral-800 flex items-center justify-center shrink-0 mt-1 border border-neutral-700">
                  <Bot className="w-5 h-5 text-indigo-400" />
                </div>
              )}
              
              <div className={`flex flex-col gap-1 max-w-[80%] ${msg.role === 'user' ? 'items-end' : ''}`}>
                <div 
                  className={`p-4 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-indigo-600 text-white rounded-tr-none' 
                      : 'bg-neutral-800/80 text-neutral-100 border border-neutral-700/50 rounded-tl-none'
                  }`}
                >
                  {msg.content}
                </div>
                {msg.model && (
                  <span className="text-[10px] text-neutral-600 font-mono italic">
                    via {msg.model}
                  </span>
                )}
              </div>

              {msg.role === 'user' && (
                <div className="w-8 h-8 rounded bg-neutral-700 flex items-center justify-center shrink-0 mt-1 border border-neutral-600">
                  <User className="w-5 h-5 text-neutral-300" />
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
        {isLoading && (
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded bg-neutral-800 flex items-center justify-center shrink-0 animate-pulse">
              <Bot className="w-5 h-5 text-indigo-400" />
            </div>
            <div className="flex items-center gap-1 mt-3">
              <div className="w-1.5 h-1.5 bg-neutral-600 rounded-full animate-bounce [animation-delay:-0.3s]" />
              <div className="w-1.5 h-1.5 bg-neutral-600 rounded-full animate-bounce [animation-delay:-0.15s]" />
              <div className="w-1.5 h-1.5 bg-neutral-600 rounded-full animate-bounce" />
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-neutral-800 bg-neutral-900/50">
        <div className="relative">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Type a message or command..."
            className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all resize-none min-h-[56px] max-h-32 text-sm"
            rows={1}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="absolute right-2 bottom-2 p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 disabled:opacity-50 disabled:hover:bg-indigo-600 transition-colors shadow-lg shadow-indigo-500/20"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        <div className="mt-2 flex items-center justify-between text-[10px] text-neutral-600">
          <div className="flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            <span>Ready for prompt</span>
          </div>
          <div>Shift + Enter for new line</div>
        </div>
      </div>
    </div>
  );
}

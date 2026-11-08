import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { SVLSystemKernel } from './src/lib/svl_core';

dotenv.config();

const kernel = new SVLSystemKernel();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

// API route for chat
app.post('/api/chat', async (req, res) => {
  try {
    const { messages, agentId } = req.body;
    
    // Agent Personas
    const personas: Record<string, string> = {
      'aria': 'You are Aria, a highly intelligent and empathetic AI assistant part of the SVL system. Your tone is professional yet warm.',
      'astyria': 'You are Astyria, a security-focused AI core of the AILinux system. You are precise, analytical, and prioritize system integrity.',
      'alex': 'You are Alex, a creative and versatile AI developer agent. You enjoy solving complex coding problems and exploring new ideas.',
      'aurelius': 'You are Aurelius, a philosophical and wise AI overseer. You provide high-level strategic insights and long-term perspectives.'
    };

    const systemPrompt = personas[agentId] || 'You are an AI assistant part of the AILinux SVL system.';
    
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const chat = model.startChat({
      history: [
        { role: 'user', parts: [{ text: systemPrompt }] },
        { role: 'model', parts: [{ text: "Understood. I am initialized with my specific SVL persona and ready to assist." }] },
        ...messages.slice(0, -1).map((msg: any) => ({
          role: msg.role === 'user' ? 'user' : 'model',
          parts: [{ text: msg.content }],
        }))
      ],
    });

    const result = await chat.sendMessage(messages[messages.length - 1].content);
    const response = await result.response;
    const text = response.text();

    res.json({ content: text });
  } catch (error: any) {
    console.error('Chat error:', error);
    res.status(500).json({ error: error.message });
  }
});

// System info route using SVL Kernel
app.get('/api/system-info', (req, res) => {
  const svlReport = kernel.generateSystemStatusReport();
  const memoryUsage = process.memoryUsage();
  
  res.json({
    ...svlReport,
    memory: {
      total: Math.round(memoryUsage.heapTotal / 1024 / 1024),
      used: Math.round(memoryUsage.heapUsed / 1024 / 1024),
    },
    cpu: Math.random() * 10 + 2, // Simulated base CPU for dashboard
    real_os: process.platform,
    node_version: process.version,
  });
});

// Vite middleware for development
if (process.env.NODE_ENV !== 'production') {
  const { createServer: createViteServer } = await import('vite');
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });
  app.use(vite.middlewares);
} else {
  app.use(express.static(path.join(__dirname, 'dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
}

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, X, Minimize2, Maximize2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface HistoryItem {
  command: string;
  output: React.ReactNode;
  type: 'input' | 'output';
}

const TerminalSandbox: React.FC = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      command: '',
      output: (
        <div className="mb-4">
          <p className="text-primary font-bold">Welcome to ZINGRI-OS v2.4.0 (Nairobi-Stable)</p>
          <p className="text-muted text-sm italic">Type &apos;help&apos; to see available protocols.</p>
        </div>
      ),
      type: 'output',
    },
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.toLowerCase().trim();
    let output: React.ReactNode = '';

    switch (trimmedCmd) {
      case 'help':
        output = (
          <div className="grid grid-cols-2 gap-2 text-sm mt-2">
            <p><span className="text-primary">help</span> - Show this menu</p>
            <p><span className="text-primary">whoami</span> - Display user identity</p>
            <p><span className="text-primary">projects</span> - List featured works</p>
            <p><span className="text-primary">skills</span> - Reveal technical stack</p>
            <p><span className="text-primary">contact</span> - Secure communication</p>
            <p><span className="text-primary">clear</span> - Purge terminal history</p>
            <p><span className="text-primary">exit</span> - Terminate session</p>
          </div>
        );
        break;
      case 'whoami':
        output = (
          <div className="mt-2 space-y-2">
            <p className="text-white font-bold">Subject: Zingri Master</p>
            <p className="text-muted text-sm">Role: Full-Stack Developer & Ethical Hacker</p>
            <p className="text-muted text-sm">Location: Nairobi, Kenya</p>
            <p className="text-muted text-sm">Mission: Building secure, high-performance digital ecosystems.</p>
          </div>
        );
        break;
      case 'projects':
        output = (
          <div className="mt-2 space-y-1">
            <p className="text-secondary font-bold">Active Deployments:</p>
            <p>- Shadow AI (Threat Detection)</p>
            <p>- Kenya Overwatch (Infrastructure Monitoring)</p>
            <p>- Dept Collector (Financial Automation)</p>
            <p>- Z-Office (Collaboration Suite)</p>
          </div>
        );
        break;
      case 'skills':
        output = (
          <div className="mt-2 text-sm">
            <p><span className="text-primary">Frontend:</span> React, Next.js, Framer Motion, Tailwind</p>
            <p><span className="text-primary">Backend:</span> Node.js, Python, PostgreSQL, Redis</p>
            <p><span className="text-primary">DevOps:</span> AWS, Docker, Kubernetes, Ansible</p>
            <p><span className="text-primary">Security:</span> PenTesting, Vulnerability Analysis, OSINT</p>
          </div>
        );
        break;
      case 'contact':
        output = (
          <div className="mt-2">
            <p>Accessing secure channels...</p>
            <p className="text-primary">Email: hello@zingri.dev</p>
            <p className="text-secondary">X/Twitter: @zingrimaster</p>
          </div>
        );
        break;
      case 'clear':
        setHistory([]);
        return;
      case 'exit':
        output = 'Termination sequence initiated. Goodbye.';
        break;
      case '':
        output = '';
        break;
      default:
        output = <p className="text-red-400">Command not found: {trimmedCmd}. Type &apos;help&apos; for options.</p>;
    }

    setHistory((prev) => [
      ...prev,
      { command: cmd, output: null, type: 'input' },
      { command: '', output, type: 'output' },
    ]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleCommand(input);
    setInput('');
  };

  return (
    <div 
      className="w-full max-w-4xl mx-auto glass rounded-xl border border-white/10 overflow-hidden shadow-2xl flex flex-col h-[500px]"
      onClick={() => inputRef.current?.focus()}
    >
      {/* Header */}
      <div className="bg-white/5 border-b border-white/10 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TerminalIcon className="w-4 h-4 text-primary" />
          <span className="text-xs font-mono text-muted">zingri-terminal — dash — 80×24</span>
        </div>
        <div className="flex items-center gap-3">
          <Minimize2 className="w-3.5 h-3.5 text-muted hover:text-white cursor-pointer" />
          <Maximize2 className="w-3.5 h-3.5 text-muted hover:text-white cursor-pointer" />
          <X className="w-3.5 h-3.5 text-muted hover:text-red-400 cursor-pointer" />
        </div>
      </div>

      {/* Content */}
      <div 
        ref={scrollRef}
        className="flex-grow p-6 font-mono text-sm overflow-y-auto scrollbar-thin scrollbar-thumb-white/10"
      >
        {history.map((item, idx) => (
          <div key={idx} className="mb-2">
            {item.type === 'input' ? (
              <div className="flex items-center gap-2">
                <span className="text-primary font-bold">➜</span>
                <span className="text-secondary font-bold">~</span>
                <span className="text-white">{item.command}</span>
              </div>
            ) : (
              <div className="text-gray-300">
                {item.output}
              </div>
            )}
          </div>
        ))}

        {/* Input line */}
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <span className="text-primary font-bold">➜</span>
          <span className="text-secondary font-bold">~</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-grow bg-transparent border-none outline-none text-white font-mono"
            autoFocus
            spellCheck={false}
          />
        </form>
      </div>

      {/* Footer */}
      <div className="bg-white/5 px-4 py-1 flex items-center justify-between">
        <div className="flex items-center gap-4 text-[10px] font-mono text-muted uppercase tracking-widest">
          <span>Mem: 4096MB</span>
          <span>Svr: Kenya-Main</span>
          <span>Latency: 12ms</span>
        </div>
      </div>
    </div>
  );
};

export default TerminalSandbox;

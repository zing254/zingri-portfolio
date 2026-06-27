'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  FileText, MessageSquare, Settings, LayoutDashboard,
  LogOut, Shield, Menu, X
} from 'lucide-react';

interface AdminLayoutProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  children: React.ReactNode;
  blogCount?: number;
  messageCount?: number;
}

export default function AdminLayout({
  activeTab, onTabChange, children, blogCount, messageCount
}: AdminLayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();

  const tabs = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'blog', label: 'Blog Posts', icon: FileText, count: blogCount },
    { id: 'messages', label: 'Messages', icon: MessageSquare, count: messageCount },
    { id: 'content', label: 'Content', icon: Settings },
  ];

  const handleLogout = () => {
    sessionStorage.removeItem('admin_token');
    router.push('/admin/login');
  };

  return (
    <div className="min-h-screen bg-[#030303] text-white flex">
      <aside className="hidden md:flex flex-col w-64 border-r border-white/10 p-4">
        <div className="flex items-center gap-3 mb-8 px-2">
          <Shield className="w-6 h-6 text-primary" />
          <span className="font-bold uppercase text-sm tracking-widest">Command_Center</span>
        </div>
        <nav className="flex-1 space-y-1">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-mono transition-all ${
                activeTab === tab.id
                  ? 'bg-primary/10 text-primary border border-primary/30'
                  : 'text-muted hover:text-white hover:bg-white/5'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className="ml-auto text-[10px] px-2 py-0.5 rounded-full bg-white/10">
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </nav>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-mono text-muted hover:text-red-400 hover:bg-red-500/5 transition-all"
        >
          <LogOut className="w-4 h-4" />
          <span>Disconnect</span>
        </button>
      </aside>

      <div className="flex-1 flex flex-col min-h-screen">
        <header className="flex items-center justify-between px-6 py-4 border-b border-white/10 md:hidden">
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-primary" />
            <span className="font-bold uppercase text-xs tracking-widest">Command_Center</span>
          </div>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2">
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </header>

        {mobileOpen && (
          <div className="md:hidden border-b border-white/10 p-4 space-y-1">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => { onTabChange(tab.id); setMobileOpen(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-mono transition-all ${
                  activeTab === tab.id
                    ? 'bg-primary/10 text-primary border border-primary/30'
                    : 'text-muted hover:text-white hover:bg-white/5'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
            <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-mono text-muted hover:text-red-400 transition-all">
              <LogOut className="w-4 h-4" />
              <span>Disconnect</span>
            </button>
          </div>
        )}

        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Terminal, Shield, Activity, Users, 
  MessageSquare, FileText, Settings, 
  Lock, AlertTriangle, Cpu, Globe, X, Plus, Send, Loader2
} from 'lucide-react';

export default function AdminDashboard() {
  const [mounted, setMounted] = useState(false);
  const [accessGranted, setAccessGranted] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Data states
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // New post state
  const [newPost, setNewPost] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    tags: [] as string[]
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (accessGranted) {
      fetchData();
    }
  }, [accessGranted]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [blogRes, msgRes] = await Promise.all([
        fetch('/api/blog'),
        fetch('/api/contact')
      ]);
      const blogData = await blogRes.json();
      const msgData = await msgRes.json();
      
      setBlogPosts(blogData.posts || []);
      setMessages(msgData.messages || []);
    } catch (error) {
      console.error('Error fetching admin data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPost)
      });
      if (res.ok) {
        setIsModalOpen(false);
        setNewPost({ title: '', slug: '', excerpt: '', content: '', tags: [] });
        fetchData();
      }
    } catch (error) {
      console.error('Error creating post:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeletePost = async (slug: string) => {
    if (!confirm('Are you sure you want to delete this protocol?')) return;
    try {
      const res = await fetch('/api/blog', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug })
      });
      if (res.ok) {
        fetchData();
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  if (!mounted) return null;

  if (!accessGranted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md glass p-8 rounded-2xl border border-primary/30 text-center"
        >
          <Lock className="w-12 h-12 text-primary mx-auto mb-6 animate-pulse" />
          <h1 className="text-2xl font-bold mb-2 glow-text-primary uppercase tracking-widest">Access Restricted</h1>
          <p className="text-muted text-sm mb-8 font-mono">[SYSTEM.AUTH_REQUIRED]</p>
          
          <div className="space-y-4">
            <input 
              type="password" 
              placeholder="ENTER_ENCRYPTION_KEY"
              className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-center text-primary font-mono outline-none focus:border-primary/50"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && setAccessGranted(true)}
            />
            <button 
              onClick={() => setAccessGranted(true)}
              className="w-full py-3 bg-primary/10 border border-primary/30 text-primary rounded-lg font-mono hover:bg-primary/20 transition-all uppercase text-sm tracking-widest"
            >
              Decrypt & Enter
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#030303] text-white p-6 font-mono">
      {/* HUD Header */}
      <header className="flex flex-wrap items-center justify-between gap-6 mb-8 border-b border-white/10 pb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center">
            <Shield className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold uppercase tracking-tighter">Command_Center <span className="text-primary text-xs ml-2">v4.2.0</span></h1>
            <p className="text-[10px] text-muted">ZINGRI_OS :: SESSION_ACTIVE :: {isLoading ? 'SYNCING...' : 'ONLINE'}</p>
          </div>
        </div>

        <div className="flex items-center gap-8 text-[10px] uppercase tracking-widest text-muted">
          <div className="flex flex-col items-end">
            <span className="text-primary font-bold">System Status</span>
            <span>All Protocols Nominal</span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-secondary font-bold">Network Load</span>
            <span>0.42% Capacity</span>
          </div>
          <button onClick={fetchData} className="p-2 hover:bg-white/5 rounded-lg transition-colors">
            <Activity className={`w-4 h-4 ${isLoading ? 'animate-spin text-primary' : 'text-accent'}`} />
          </button>
        </div>
      </header>

      {/* Grid HUD Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { label: "Active Connections", value: "1,204", icon: Users, color: "text-primary" },
          { label: "Encrypted Messages", value: messages.length.toString(), icon: MessageSquare, color: "text-secondary" },
          { label: "Blog Protocols", value: blogPosts.length.toString(), icon: FileText, color: "text-accent" },
          { label: "Data Throughput", value: "8.4 TB", icon: Activity, color: "text-warning" },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass p-6 rounded-xl border border-white/5 relative group hover:border-primary/20 transition-all"
          >
            <stat.icon className={`w-5 h-5 ${stat.color} mb-4`} />
            <p className="text-[10px] text-muted uppercase tracking-wider mb-1">{stat.label}</p>
            <p className="text-2xl font-bold glow-text-white">{stat.value}</p>
            <div className="absolute top-2 right-2 w-1 h-1 rounded-full bg-primary animate-pulse" />
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Control Panel */}
        <div className="lg:col-span-2 space-y-8">
          <div className="glass p-6 rounded-2xl border border-white/5 h-full min-h-[500px]">
            <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-secondary" />
                <h2 className="text-lg font-bold uppercase tracking-widest">Protocol_Logs [BLOG_CONTENT]</h2>
              </div>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="px-4 py-2 bg-secondary/10 border border-secondary/30 text-secondary rounded-lg text-xs uppercase hover:bg-secondary/20 transition-all flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>New Entry</span>
              </button>
            </div>

            {isLoading ? (
              <div className="flex items-center justify-center h-64">
                <Loader2 className="w-8 h-8 text-secondary animate-spin" />
              </div>
            ) : (
              <div className="space-y-4">
                {blogPosts.length > 0 ? blogPosts.map((post, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/5 hover:border-secondary/20 transition-all cursor-pointer group">
                    <div className="flex items-center gap-4">
                      <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e]" />
                      <div>
                        <h3 className="text-sm font-bold group-hover:text-secondary transition-colors uppercase tracking-tight">{post.slug}</h3>
                        <p className="text-[10px] text-muted">{post.fileName} :: PROTOCOL_ACTIVE</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <span className="text-[10px] uppercase tracking-tighter text-muted hover:text-white">Edit</span>
                      <button 
                        onClick={() => handleDeletePost(post.slug)}
                        className="text-[10px] uppercase tracking-tighter text-red-500/50 hover:text-red-500"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )) : (
                  <div className="text-center py-12 text-muted text-sm italic">
                    No active protocols detected.
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Diagnostics */}
        <div className="space-y-8">
          <div className="glass p-6 rounded-2xl border border-white/5">
            <div className="flex items-center gap-2 mb-6 text-accent">
              <MessageSquare className="w-5 h-5" />
              <h2 className="text-sm font-bold uppercase tracking-widest">Comm_Link [MESSAGES]</h2>
            </div>
            
            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              {messages.length > 0 ? messages.map((msg, i) => (
                <div key={i} className="text-[10px] border-l-2 border-accent/30 pl-4 py-2 space-y-1 bg-white/5 rounded-r-lg">
                  <div className="flex justify-between items-center">
                    <p className="font-bold text-accent">{msg.name}</p>
                    <span className="text-muted text-[8px]">{new Date(msg.date).toLocaleDateString()}</span>
                  </div>
                  <p className="text-white/80 font-bold truncate">{msg.subject}</p>
                  <p className="text-muted line-clamp-2 italic">&quot;{msg.message}&quot;</p>
                </div>
              )) : (
                <p className="text-xs text-muted italic">No incoming transmissions.</p>
              )}
            </div>
          </div>

          <div className="glass p-6 rounded-2xl border border-white/5">
            <div className="flex items-center gap-2 mb-6 text-warning">
              <Cpu className="w-5 h-5" />
              <h2 className="text-sm font-bold uppercase tracking-widest">Sys_Diagnostics</h2>
            </div>
            
            <div className="space-y-6">
              {[
                { label: "Core_Process", value: 42, color: "bg-primary" },
                { label: "Memory_Usage", value: 68, color: "bg-secondary" },
                { label: "Threat_Level", value: 4, color: "bg-accent" },
              ].map((res, i) => (
                <div key={i}>
                  <div className="flex justify-between text-[10px] uppercase mb-2">
                    <span>{res.label}</span>
                    <span>{res.value}%</span>
                  </div>
                  <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${res.value}%` }}
                      className={`h-full ${res.color}`} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal: New Blog Entry */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-full max-w-2xl glass p-8 rounded-2xl border border-secondary/30 relative"
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-muted hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>

              <h2 className="text-xl font-bold uppercase tracking-widest mb-6 flex items-center gap-2">
                <Plus className="text-secondary" />
                <span>Initialize_New_Protocol</span>
              </h2>

              <form onSubmit={handleCreatePost} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] text-muted uppercase">Protocol_Title</label>
                    <input 
                      required
                      type="text" 
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm outline-none focus:border-secondary/50"
                      value={newPost.title}
                      onChange={e => setNewPost({...newPost, title: e.target.value})}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-muted uppercase">Protocol_Slug</label>
                    <input 
                      required
                      type="text" 
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm outline-none focus:border-secondary/50"
                      value={newPost.slug}
                      onChange={e => setNewPost({...newPost, slug: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-muted uppercase">Brief_Excerpt</label>
                  <input 
                    type="text" 
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm outline-none focus:border-secondary/50"
                    value={newPost.excerpt}
                    onChange={e => setNewPost({...newPost, excerpt: e.target.value})}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-muted uppercase">Raw_Data [MARKDOWN]</label>
                  <textarea 
                    required
                    rows={8}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm outline-none focus:border-secondary/50 resize-none font-mono"
                    value={newPost.content}
                    onChange={e => setNewPost({...newPost, content: e.target.value})}
                  />
                </div>

                <button 
                  disabled={isSubmitting}
                  type="submit"
                  className="w-full py-3 bg-secondary/20 border border-secondary/40 text-secondary rounded-lg font-bold uppercase tracking-widest hover:bg-secondary/30 transition-all flex items-center justify-center gap-2 mt-4"
                >
                  {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-4 h-4" />}
                  <span>{isSubmitting ? 'Encrypting...' : 'Deploy Protocol'}</span>
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      
      {/* HUD Background Decorations */}
      <div className="fixed bottom-4 left-4 flex gap-4 text-[8px] text-muted font-mono uppercase tracking-[0.2em] pointer-events-none">
        <span className="flex items-center gap-1"><div className="w-1 h-1 rounded-full bg-primary" /> system_online</span>
        <span className="flex items-center gap-1"><div className="w-1 h-1 rounded-full bg-secondary" /> encrypted_session</span>
        <span className="flex items-center gap-1"><div className="w-1 h-1 rounded-full bg-accent" /> auth_level: superuser</span>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(168, 85, 247, 0.2);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(168, 85, 247, 0.4);
        }
      `}</style>
    </main>
  );
}

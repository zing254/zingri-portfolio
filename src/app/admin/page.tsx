"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Users, MessageSquare, FileText, Activity,
  Cpu, Loader2, Plus, Shield
} from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import ProtectedRoute from '@/components/admin/ProtectedRoute';
import MessageViewer from '@/components/admin/MessageViewer';
import BlogEditor from '@/components/admin/BlogEditor';
import ContentEditor from '@/components/admin/ContentEditor';

export default function AdminDashboard() {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showEditor, setShowEditor] = useState(false);
  const [editPost, setEditPost] = useState<any>(null);

  const token = typeof window !== 'undefined' ? sessionStorage.getItem('admin_token') : null;

  useEffect(() => {
    setMounted(true);
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const blogRes = await fetch('/api/blog', {
        headers: { 'x-admin-secret': token || '' },
      });

      const msgRes = await fetch('/api/messages', {
        headers: { 'x-admin-secret': token || '' },
      });

      const blogData = await blogRes.json();
      const msgData = await msgRes.json();

      const publishedPosts = blogData.posts?.filter((p: any) => p.published !== false) || [];
      setBlogPosts(publishedPosts);
      setMessages(msgData.messages || []);
    } catch (error) {
      console.error('Error fetching admin data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeletePost = async (slug: string) => {
    if (!confirm('Are you sure you want to delete this protocol?')) return;
    const res = await fetch('/api/blog', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', 'x-admin-secret': token || '' },
      body: JSON.stringify({ slug }),
    });
    if (res.ok) fetchData();
  };

  const handleEditPost = (post: any) => {
    setEditPost(post);
    setShowEditor(true);
  };

  const handleNewPost = () => {
    setEditPost(null);
    setShowEditor(true);
  };

  const handleEditorSaved = () => {
    fetchData();
  };

  if (!mounted) return null;

  const unreadCount = messages.filter((m: any) => !m.read).length;

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[
                { label: "Active Connections", value: "1,204", icon: Users, color: "text-primary" },
                { label: "Unread Messages", value: String(unreadCount), icon: MessageSquare, color: "text-secondary" },
                { label: "Blog Protocols", value: String(blogPosts.length), icon: FileText, color: "text-accent" },
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
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <div className="absolute top-2 right-2 w-1 h-1 rounded-full bg-primary animate-pulse" />
                </motion.div>
              ))}
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
                  { label: "Encryption_Load", value: 87, color: "bg-warning" },
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

            <div className="fixed bottom-4 left-4 flex gap-4 text-[8px] text-muted font-mono uppercase tracking-[0.2em] pointer-events-none">
              <span className="flex items-center gap-1"><div className="w-1 h-1 rounded-full bg-primary" /> system_online</span>
              <span className="flex items-center gap-1"><div className="w-1 h-1 rounded-full bg-secondary" /> encrypted_session</span>
              <span className="flex items-center gap-1"><div className="w-1 h-1 rounded-full bg-accent" /> auth_level: superuser</span>
            </div>
          </>
        );

      case 'blog':
        return (
          <div className="glass p-6 rounded-2xl border border-white/5">
            <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-secondary" />
                <h2 className="text-lg font-bold uppercase tracking-widest">Protocol_Logs [{blogPosts.length}]</h2>
              </div>
              <button
                onClick={handleNewPost}
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
              <div className="space-y-3">
                {blogPosts.length > 0 ? blogPosts.map((post: any) => (
                  <div key={post._id || post.slug} className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/5 hover:border-secondary/20 transition-all group">
                    <div className="flex items-center gap-4">
                      <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e]" />
                      <div>
                        <h3 className="text-sm font-bold group-hover:text-secondary transition-colors uppercase tracking-tight">{post.title || post.slug}</h3>
                        <p className="text-[10px] text-muted">{post.slug} :: {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : 'ACTIVE'}</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <button
                        onClick={() => handleEditPost(post)}
                        className="text-[10px] uppercase tracking-tighter text-muted hover:text-white"
                      >
                        Edit
                      </button>
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

            {showEditor && (
              <BlogEditor
                onClose={() => { setShowEditor(false); setEditPost(null); }}
                onSaved={handleEditorSaved}
                editPost={editPost || undefined}
              />
            )}
          </div>
        );

      case 'messages':
        return <MessageViewer />;

      case 'content':
        return <ContentEditor />;

      default:
        return null;
    }
  };

  return (
    <ProtectedRoute>
      <AdminLayout
        activeTab={activeTab}
        onTabChange={setActiveTab}
        blogCount={blogPosts.length}
        messageCount={unreadCount}
      >
        {renderTabContent()}
      </AdminLayout>
    </ProtectedRoute>
  );
}

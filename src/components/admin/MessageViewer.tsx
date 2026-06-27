'use client';

import { useState, useEffect } from 'react';
import { MessageSquare, Trash2, Loader2, Mail, MailOpen } from 'lucide-react';

interface Message {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export default function MessageViewer() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Message | null>(null);

  const token = typeof window !== 'undefined' ? sessionStorage.getItem('admin_token') : null;

  const fetchMessages = async () => {
    const res = await fetch('/api/messages', {
      headers: { 'x-admin-secret': token || '' },
    });
    if (res.ok) {
      const data = await res.json();
      setMessages(data.messages);
    }
    setLoading(false);
  };

  useEffect(() => { fetchMessages(); }, []);

  const markRead = async (id: string) => {
    await fetch(`/api/messages/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', 'x-admin-secret': token || '' },
      body: JSON.stringify({ read: true }),
    });
    fetchMessages();
  };

  const deleteMsg = async (id: string) => {
    if (!confirm('Delete this message?')) return;
    await fetch(`/api/messages/${id}`, {
      method: 'DELETE',
      headers: { 'x-admin-secret': token || '' },
    });
    if (selected?._id === id) setSelected(null);
    fetchMessages();
  };

  if (loading) return <div className="flex items-center justify-center h-64"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="glass rounded-2xl border border-white/5 p-4 space-y-2 max-h-[600px] overflow-y-auto">
        <h2 className="text-sm font-bold uppercase tracking-widest text-accent mb-4 flex items-center gap-2">
          <MessageSquare className="w-4 h-4" />
          Incoming Transmissions ({messages.length})
        </h2>
        {messages.length === 0 ? (
          <p className="text-muted text-sm italic text-center py-8">No incoming transmissions.</p>
        ) : (
          messages.map(msg => (
            <div
              key={msg._id}
              onClick={() => { setSelected(msg); if (!msg.read) markRead(msg._id); }}
              className={`p-3 rounded-xl border cursor-pointer transition-all ${
                selected?._id === msg._id
                  ? 'border-primary/40 bg-primary/5'
                  : msg.read ? 'border-white/5 bg-white/5' : 'border-accent/30 bg-accent/5'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-sm">{msg.name}</span>
                <div className="flex items-center gap-2">
                  {msg.read ? <MailOpen className="w-3 h-3 text-muted" /> : <Mail className="w-3 h-3 text-accent" />}
                  <span className="text-[10px] text-muted">{new Date(msg.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
              <p className="text-xs font-mono text-muted truncate">{msg.subject}</p>
            </div>
          ))
        )}
      </div>

      <div className="glass rounded-2xl border border-white/5 p-6">
        {selected ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-lg">{selected.subject}</h3>
              <button onClick={() => deleteMsg(selected._id)} className="p-2 hover:bg-red-500/10 rounded-lg text-red-400 transition-all">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <div className="flex items-center gap-4 text-xs text-muted font-mono">
              <span>From: <span className="text-white">{selected.name}</span></span>
              <span>&lt;{selected.email}&gt;</span>
            </div>
            <div className="text-xs text-muted font-mono">
              {new Date(selected.createdAt).toLocaleString()}
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-sm leading-relaxed whitespace-pre-wrap">
              {selected.message}
            </div>
            <div className="flex gap-2">
              <a
                href={`mailto:${selected.email}?subject=Re: ${selected.subject}`}
                className="px-4 py-2 bg-primary/10 border border-primary/30 text-primary rounded-lg text-xs font-mono hover:bg-primary/20 transition-all"
              >
                Reply via Email
              </a>
              <button
                onClick={() => { markRead(selected._id); setSelected(null); }}
                className="px-4 py-2 bg-white/5 border border-white/10 text-muted rounded-lg text-xs font-mono hover:text-white transition-all"
              >
                Mark Read & Close
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-64 text-muted text-sm italic">
            Select a message to view
          </div>
        )}
      </div>
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { Settings, Save, Loader2 } from 'lucide-react';

interface ContentSection {
  key: string;
  data: Record<string, unknown>;
}

export default function ContentEditor() {
  const [sections, setSections] = useState<ContentSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [editing, setEditing] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');

  const token = typeof window !== 'undefined' ? sessionStorage.getItem('admin_token') : null;

  const fetchContent = async () => {
    const res = await fetch('/api/content');
    if (res.ok) {
      const data = await res.json();
      setSections(data.sections || []);
    }
    setLoading(false);
  };

  useEffect(() => { fetchContent(); }, []);

  const handleSave = async (key: string) => {
    setSaving(key);
    let parsed: Record<string, unknown>;
    try {
      parsed = JSON.parse(editValue);
    } catch {
      alert('Invalid JSON');
      setSaving(null);
      return;
    }

    await fetch('/api/content', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'x-admin-secret': token || '' },
      body: JSON.stringify({ key, data: parsed }),
    });

    setSaving(null);
    setEditing(null);
    fetchContent();
  };

  if (loading) return <div className="flex items-center justify-center h-64"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;

  return (
    <div className="space-y-4">
      <h2 className="text-sm font-bold uppercase tracking-widest text-secondary mb-4 flex items-center gap-2">
        <Settings className="w-4 h-4" />
        Site Content
      </h2>
      {sections.map(section => (
        <div key={section.key} className="glass rounded-2xl border border-white/5 p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-mono text-sm font-bold text-primary">{section.key}</h3>
            {editing !== section.key && (
              <button
                onClick={() => { setEditing(section.key); setEditValue(JSON.stringify(section.data, null, 2)); }}
                className="text-xs text-muted hover:text-white transition-all font-mono"
              >
                Edit
              </button>
            )}
          </div>
          {editing === section.key ? (
            <div className="space-y-2">
              <textarea
                value={editValue}
                onChange={e => setEditValue(e.target.value)}
                rows={10}
                className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-xs font-mono outline-none focus:border-secondary/50"
              />
              <div className="flex gap-2">
                <button onClick={() => handleSave(section.key)} disabled={saving === section.key} className="px-4 py-2 bg-secondary/20 border border-secondary/40 text-secondary rounded-lg text-xs font-mono flex items-center gap-2">
                  {saving === section.key ? <Loader2 className="w-3 h-3 animate-spin" /> : <Save className="w-3 h-3" />}
                  Save
                </button>
                <button onClick={() => setEditing(null)} className="px-4 py-2 border border-white/10 text-muted rounded-lg text-xs font-mono">
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <pre className="text-xs text-muted font-mono overflow-x-auto max-h-32">
              {JSON.stringify(section.data, null, 2).slice(0, 500)}
              {JSON.stringify(section.data, null, 2).length > 500 ? '...' : ''}
            </pre>
          )}
        </div>
      ))}
    </div>
  );
}

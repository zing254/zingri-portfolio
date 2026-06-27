'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Shield, Lock, Loader2, AlertTriangle } from 'lucide-react';

export default function AdminLogin() {
  const [secret, setSecret] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ secret }),
      });

      if (res.ok) {
        sessionStorage.setItem('admin_token', secret);
        router.push('/admin');
      } else {
        const data = await res.json();
        setError(data.error || 'Authentication failed');
      }
    } catch {
      setError('Network error — check your connection');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md glass p-8 rounded-2xl border border-primary/30 text-center"
      >
        <Lock className="w-12 h-12 text-primary mx-auto mb-6 animate-pulse" />
        <h1 className="text-2xl font-bold mb-2 glow-text-primary uppercase tracking-widest">
          Access Restricted
        </h1>
        <p className="text-muted text-sm mb-8 font-mono">[SYSTEM.AUTH_REQUIRED]</p>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 flex items-center gap-2 text-red-400 text-sm font-mono">
            <AlertTriangle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <div className="space-y-4">
          <input
            type="password"
            placeholder="ENTER_ENCRYPTION_KEY"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-center text-primary font-mono outline-none focus:border-primary/50"
            autoFocus
          />
          <button
            type="submit"
            disabled={loading || !secret}
            className="w-full py-3 bg-primary/10 border border-primary/30 text-primary rounded-lg font-mono hover:bg-primary/20 transition-all uppercase text-sm tracking-widest disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Verifying...</span>
              </>
            ) : (
              <>
                <Shield className="w-4 h-4" />
                <span>Decrypt & Enter</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

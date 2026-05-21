"use client";

"use client";

import React, { useEffect, useState } from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';

export type Theme = 'light' | 'dark' | 'system';

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>('dark');
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('dark');
  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    // Load saved theme
    const savedTheme = (localStorage.getItem('theme') as Theme) || 'dark';
    setTheme(savedTheme);
    
    // Determine actual theme
    const getResolvedTheme = (t: Theme) => {
      if (t === 'system') {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      }
      return t;
    };
    
    setResolvedTheme(getResolvedTheme(savedTheme));

    // Listen for system changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (localStorage.getItem('theme') === 'system') {
        setResolvedTheme(mediaQuery.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    // Apply theme
    if (resolvedTheme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  }, [resolvedTheme]);

  const handleChangeTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    
    if (newTheme === 'system') {
      setResolvedTheme(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    } else {
      setResolvedTheme(newTheme);
    }
  };

  const IconMap = {
    dark: Moon,
    light: Sun,
    system: Monitor,
  };

  const CurrentIcon = IconMap[theme];

  return (
    <>
      <div className="fixed bottom-6 right-6 z-[9999]">
        <div className="relative">
          <button
            onClick={() => setShowOptions(!showOptions)}
            className="w-12 h-12 rounded-full glass border border-white/10 hover:border-primary/30 transition-all duration-300 flex items-center justify-center"
          >
            <CurrentIcon className="w-5 h-5 text-primary" />
          </button>
          
          {showOptions && (
            <div className="absolute bottom-14 right-0 bg-surface border border-white/10 rounded-xl p-2 w-48 glass">
              {(['dark', 'light', 'system'] as Theme[]).map((t) => {
                const Icon = IconMap[t];
                return (
                  <button
                    key={t}
                    onClick={() => {
                      handleChangeTheme(t);
                      setShowOptions(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-all duration-200 ${
                      theme === t ? 'bg-primary/20 text-primary' : 'text-white hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Icon className="w-4 h-4" />
                      <span className="capitalize font-mono text-sm">{t}</span>
                    </div>
                    {theme === t && (
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
      {children}
    </>
  );
};

export default ThemeProvider;
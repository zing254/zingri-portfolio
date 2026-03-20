'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onComplete?: () => void;
}

const LETTERS = 'BAZENGA'.split('');

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [showScreen, setShowScreen] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsComplete(true), 400);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 120);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isComplete) {
      const timeout = setTimeout(() => {
        setShowScreen(false);
        onComplete?.();
      }, 800);
      return () => clearTimeout(timeout);
    }
  }, [isComplete, onComplete]);

  return (
    <AnimatePresence>
      {showScreen && (
        <motion.div
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[var(--background)]"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          {/* Animated background orbs */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute w-[600px] h-[600px] rounded-full opacity-20 blur-[120px]"
              style={{ background: 'var(--primary)' }}
              animate={{
                x: ['-30%', '30%', '-30%'],
                y: ['-20%', '20%', '-20%'],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute w-[500px] h-[500px] rounded-full opacity-15 blur-[100px]"
              style={{ background: 'var(--secondary)' }}
              animate={{
                x: ['30%', '-20%', '30%'],
                y: ['20%', '-30%', '20%'],
              }}
              transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>

          {/* Logo text */}
          <div className="relative flex items-center gap-1 mb-16">
            {LETTERS.map((letter, i) => (
              <motion.span
                key={i}
                className="text-6xl md:text-8xl font-bold text-white"
                initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.08,
                  ease: [0.215, 0.61, 0.355, 1],
                }}
              >
                {letter}
              </motion.span>
            ))}
          </div>

          {/* Subtitle */}
          <motion.p
            className="text-[var(--muted)] text-sm tracking-[0.3em] uppercase mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            Creative Digital Experiences
          </motion.p>

          {/* Progress bar container */}
          <div className="w-64 md:w-80 h-[2px] bg-[var(--surface)] rounded-full overflow-hidden relative">
            {/* Glow effect behind bar */}
            <motion.div
              className="absolute inset-0 blur-sm"
              style={{
                background: 'linear-gradient(90deg, var(--primary), var(--secondary))',
                scaleX: progress / 100,
                transformOrigin: 'left',
              }}
              animate={{ scaleX: progress / 100 }}
            />
            {/* Progress bar */}
            <motion.div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(90deg, var(--primary), var(--secondary))',
                scaleX: progress / 100,
                transformOrigin: 'left',
              }}
              animate={{ scaleX: progress / 100 }}
              transition={{ ease: 'easeOut' }}
            />
            {/* Shimmer */}
            <motion.div
              className="absolute inset-0 w-full h-full"
              animate={{
                x: ['0%', '100%'],
              }}
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                width: '40%',
              }}
              transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 0.3 }}
            />
          </div>

          {/* Percentage */}
          <motion.div
            className="mt-6 font-mono text-[var(--primary)] text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {Math.round(progress)}%
          </motion.div>

          {/* Corner decorations */}
          <motion.svg
            className="absolute top-8 left-8 w-16 h-16 text-[var(--primary)] opacity-40"
            viewBox="0 0 100 100"
            initial={{ opacity: 0, pathLength: 0 }}
            animate={{ opacity: 0.4, pathLength: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
          >
            <path d="M0 30 L0 0 L30 0" stroke="currentColor" strokeWidth="1" fill="none" />
          </motion.svg>
          <motion.svg
            className="absolute top-8 right-8 w-16 h-16 text-[var(--secondary)] opacity-40"
            viewBox="0 0 100 100"
            initial={{ opacity: 0, pathLength: 0 }}
            animate={{ opacity: 0.4, pathLength: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
          >
            <path d="M70 0 L100 0 L100 30" stroke="currentColor" strokeWidth="1" fill="none" />
          </motion.svg>
          <motion.svg
            className="absolute bottom-8 left-8 w-16 h-16 text-[var(--secondary)] opacity-40"
            viewBox="0 0 100 100"
            initial={{ opacity: 0, pathLength: 0 }}
            animate={{ opacity: 0.4, pathLength: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <path d="M0 70 L0 100 L30 100" stroke="currentColor" strokeWidth="1" fill="none" />
          </motion.svg>
          <motion.svg
            className="absolute bottom-8 right-8 w-16 h-16 text-[var(--primary)] opacity-40"
            viewBox="0 0 100 100"
            initial={{ opacity: 0, pathLength: 0 }}
            animate={{ opacity: 0.4, pathLength: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
          >
            <path d="M70 100 L100 100 L100 70" stroke="currentColor" strokeWidth="1" fill="none" />
          </motion.svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

'use client';

import { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface BackgroundEffectsProps {
  showNoise?: boolean;
  showOrbs?: boolean;
  showLines?: boolean;
  orbColor?: 'primary' | 'secondary' | 'mixed';
}

const orbConfigs = {
  primary: { color: 'var(--primary)', size: 500 },
  secondary: { color: 'var(--secondary)', size: 450 },
  mixed: { color: 'var(--primary)', size: 400 },
};

export default function BackgroundEffects({
  showNoise = true,
  showOrbs = true,
  showLines = false,
  orbColor = 'mixed',
}: BackgroundEffectsProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springMouseX = useSpring(mouseX, { stiffness: 30, damping: 20 });
  const springMouseY = useSpring(mouseY, { stiffness: 30, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth - 0.5) * 2);
      mouseY.set((e.clientY / window.innerHeight - 0.5) * 2);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Animated gradient orbs */}
      {showOrbs && (
        <>
          {/* Primary orb - top left */}
          <motion.div
            className="absolute w-[600px] h-[600px] rounded-full blur-[120px] opacity-25"
            style={{ background: 'var(--primary)', left: '-10%', top: '-10%' }}
            animate={{
              x: [0, 100, 0],
              y: [0, 50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Secondary orb - bottom right */}
          <motion.div
            className="absolute w-[500px] h-[500px] rounded-full blur-[100px] opacity-20"
            style={{ background: 'var(--secondary)', right: '-5%', bottom: '-5%' }}
            animate={{
              x: [0, -80, 0],
              y: [0, -60, 0],
              scale: [1, 1.15, 1],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Accent orb - center */}
          <motion.div
            className="absolute w-[400px] h-[400px] rounded-full blur-[80px] opacity-10"
            style={{ background: 'var(--accent)', left: '40%', top: '30%' }}
            animate={{
              x: [0, 60, 0],
              y: [0, 80, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Mouse-reactive primary orb */}
          <motion.div
            className="absolute w-[300px] h-[300px] rounded-full blur-[80px] opacity-30"
            style={{
              background: orbConfigs[orbColor].color,
              left: '20%',
              top: '20%',
              x: springMouseX,
              y: springMouseY,
            }}
            animate={{
              x: springMouseX.get() * 50,
              y: springMouseY.get() * 50,
            }}
          />

          {/* Top right corner orb */}
          <motion.div
            className="absolute w-[350px] h-[350px] rounded-full blur-[90px] opacity-15"
            style={{ background: 'var(--primary)', right: '10%', top: '5%' }}
            animate={{
              x: [0, -50, 0],
              y: [0, 40, 0],
            }}
            transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
          />
        </>
      )}

      {/* Grid lines */}
      {showLines && (
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(0, 212, 255, 0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0, 212, 255, 0.3) 1px, transparent 1px)
              `,
              backgroundSize: '80px 80px',
            }}
          />
        </div>
      )}

      {/* Noise texture overlay */}
      {showNoise && (
        <div
          className="absolute inset-0 opacity-[0.025] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            backgroundSize: '200px 200px',
          }}
        />
      )}

      {/* Vignette overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, var(--background) 100%)',
          opacity: 0.4,
        }}
      />

      {/* Animated scan line */}
      <motion.div
        className="absolute left-0 right-0 h-[1px] opacity-[0.03]"
        style={{ background: 'var(--primary)' }}
        animate={{ top: ['0%', '100%'] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear', repeatDelay: 2 }}
      />
    </div>
  );
}

interface GlowingLineProps {
  className?: string;
  color?: 'primary' | 'secondary' | 'accent';
  direction?: 'horizontal' | 'vertical';
}

export function GlowingLine({
  className = '',
  color = 'primary',
  direction = 'horizontal',
}: GlowingLineProps) {
  const colorMap = {
    primary: 'var(--primary)',
    secondary: 'var(--secondary)',
    accent: 'var(--accent)',
  };

  return (
    <motion.div
      className={`${className}`}
      style={{
        background: `linear-gradient(${direction === 'horizontal' ? '90deg' : '180deg'}, transparent 0%, ${colorMap[color]} 50%, transparent 100%)`,
        boxShadow: `0 0 20px ${colorMap[color]}`,
        width: direction === 'horizontal' ? '100%' : '1px',
        height: direction === 'horizontal' ? '1px' : '100%',
      }}
      animate={{ opacity: [0.3, 0.7, 0.3] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
    />
  );
}

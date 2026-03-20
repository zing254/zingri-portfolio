'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: 'primary' | 'secondary' | 'accent';
  hoverGlow?: boolean;
  intensity?: 'low' | 'medium' | 'high';
}

const glowMap = {
  primary: {
    low: '0 0 20px rgba(0, 212, 255, 0.15)',
    medium: '0 0 30px rgba(0, 212, 255, 0.25)',
    high: '0 0 40px rgba(0, 212, 255, 0.4)',
  },
  secondary: {
    low: '0 0 20px rgba(168, 85, 247, 0.15)',
    medium: '0 0 30px rgba(168, 85, 247, 0.25)',
    high: '0 0 40px rgba(168, 85, 247, 0.4)',
  },
  accent: {
    low: '0 0 20px rgba(57, 255, 20, 0.15)',
    medium: '0 0 30px rgba(57, 255, 20, 0.25)',
    high: '0 0 40px rgba(57, 255, 20, 0.4)',
  },
};

export default function GlassCard({
  children,
  className = '',
  glowColor = 'primary',
  hoverGlow = true,
  intensity = 'medium',
}: GlassCardProps) {
  return (
    <motion.div
      className={`
        relative rounded-2xl overflow-hidden
        bg-[rgba(18,18,26,0.6)]
        backdrop-blur-xl
        border border-white/[0.08]
        ${className}
      `}
      whileHover={hoverGlow ? {
        scale: 1.02,
        transition: { duration: 0.3, ease: [0.215, 0.61, 0.355, 1] },
      } : undefined}
      style={{
        boxShadow: hoverGlow ? glowMap[glowColor][intensity] : undefined,
      }}
      animate={hoverGlow ? {
        boxShadow: glowMap[glowColor][intensity],
      } : undefined}
    >
      {/* Inner glow border on hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        initial={{ opacity: 0 }}
        whileHover={{
          opacity: 1,
          background: `radial-gradient(ellipse at center, ${glowMap[glowColor][intensity].match(/rgba?\([^)]+\)/)?.[0] || 'rgba(0,212,255,0.2)'} 0%, transparent 70%)`,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Top highlight line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}

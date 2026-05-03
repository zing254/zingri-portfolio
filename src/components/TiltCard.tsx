'use client';

import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ReactNode } from 'react';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
  perspective?: number;
  glowColor?: 'primary' | 'secondary' | 'accent';
  scaleOnHover?: boolean;
}

const glowMap = {
  primary: 'rgba(0, 212, 255, 0.4)',
  secondary: 'rgba(168, 85, 247, 0.4)',
  accent: 'rgba(57, 255, 20, 0.4)',
};

export default function TiltCard({
  children,
  className = '',
  maxTilt = 15,
  perspective = 1000,
  glowColor = 'primary',
  scaleOnHover = true,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const springX = useSpring(rawX, { stiffness: 200, damping: 25 });
  const springY = useSpring(rawY, { stiffness: 200, damping: 25 });

  const rotateX = useTransform(springY, [-0.5, 0.5], [`-${maxTilt}deg`, `${maxTilt}deg`]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [`${maxTilt}deg`, `-${maxTilt}deg`]);

  const glowX = useTransform(springX, [-0.5, 0.5], ['0%', '100%']);
  const glowY = useTransform(springY, [-0.5, 0.5], ['0%', '100%']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    rawX.set(x - 0.5);
    rawY.set(y - 0.5);
  };

  const handleMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      style={{ perspective }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      animate={{ scale: isHovered && scaleOnHover ? 1.03 : 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
    >
      {/* Glow overlay */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${glowX}% ${glowY}%, ${glowMap[glowColor]}, transparent 60%)`,
          opacity: isHovered ? 0.6 : 0,
          transition: 'opacity 0.3s ease',
        }}
      />

      {/* 3D transformed inner */}
      <motion.div
        className="relative"
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Content layer */}
        {children}

        {/* Reflection/shine */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(0,0,0,0.1) 100%)',
            opacity: isHovered ? 1 : 0,
            transform: 'translateZ(1px)',
            transition: 'opacity 0.3s ease',
          }}
        />
      </motion.div>

      {/* Shadow - simplified */}
      <motion.div
        className="absolute inset-0 -z-10 rounded-2xl"
        animate={{
          opacity: isHovered ? 0.3 : 0.1,
          x: isHovered ? 20 : 0,
          y: isHovered ? 20 : 0,
        }}
        style={{
          boxShadow: isHovered
            ? `0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 40px ${glowMap[glowColor]}`
            : '0 10px 30px rgba(0, 0, 0, 0.3)',
          transform: 'translateZ(-50px)',
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 25 }}
      />
    </motion.div>
  );
}

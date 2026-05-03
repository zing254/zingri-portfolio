'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { ReactNode, useRef, useState } from 'react';

interface NeonButtonProps {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: 'primary' | 'secondary' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  magnetic?: boolean;
  className?: string;
  disabled?: boolean;
}

const variantStyles = {
  primary: {
    background: 'linear-gradient(135deg, var(--primary) 0%, rgba(0,180,220,0.8) 100%)',
    glowColor: 'rgba(0, 212, 255, 0.6)',
    textColor: '#0a0a0f',
  },
  secondary: {
    background: 'linear-gradient(135deg, var(--secondary) 0%, rgba(140,60,220,0.8) 100%)',
    glowColor: 'rgba(168, 85, 247, 0.6)',
    textColor: '#ffffff',
  },
  accent: {
    background: 'linear-gradient(135deg, var(--accent) 0%, rgba(40,220,10,0.8) 100%)',
    glowColor: 'rgba(57, 255, 20, 0.6)',
    textColor: '#0a0a0f',
  },
};

const sizeStyles = {
  sm: { padding: '8px 20px', fontSize: '0.8rem' },
  md: { padding: '12px 32px', fontSize: '0.95rem' },
  lg: { padding: '16px 48px', fontSize: '1.1rem' },
};

export default function NeonButton({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  magnetic = true,
  className = '',
  disabled = false,
}: NeonButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 200, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 200, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!magnetic || disabled) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x * 0.3);
    mouseY.set(y * 0.3);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  const { background, glowColor, textColor } = variantStyles[variant];
  const { padding, fontSize } = sizeStyles[size];

  const buttonContent = (
    <motion.div
      ref={ref}
      className={`
        relative inline-flex items-center justify-center gap-2 font-semibold
        cursor-pointer select-none rounded-xl overflow-hidden
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
      style={{
        padding,
        fontSize,
        color: textColor,
        background,
        x: springX,
        y: springY,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => !disabled && setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onMouseDown={() => !disabled && setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onClick={disabled ? undefined : onClick}
      whileTap={disabled ? {} : { scale: 0.97 }}
      animate={{
        scale: isPressed ? 0.95 : isHovered ? 1.05 : 1,
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {/* Glow layer */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          opacity: isHovered ? 1 : 0,
          boxShadow: isHovered ? `0 0 30px ${glowColor}, 0 0 60px ${glowColor}` : 'none',
        }}
        transition={{ duration: 0.2 }}
      />

      {/* Shimmer effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ x: '-100%', skewX: '-20deg' }}
        whileHover={{ x: '100%' }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
        }}
      />

      {/* Content */}
      <span className="relative z-10">{children}</span>
    </motion.div>
  );

  return buttonContent;
}

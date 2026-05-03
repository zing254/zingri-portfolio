'use client';

import { useRef, useEffect, useState, ReactNode } from 'react';
import { motion, useInView } from 'framer-motion';

interface SectionWrapperProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
  once?: boolean;
}

export default function SectionWrapper({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  distance = 50,
  once = true,
}: SectionWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: '-50px' });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated]);

  const getInitial = () => {
    if (direction === 'none') return { opacity: 0 };
    const opacity = 0;
    let y = 0;
    let x = 0;
    switch (direction) {
      case 'up':
        y = -distance;
        break;
      case 'down':
        y = distance;
        break;
      case 'left':
        x = -distance;
        break;
      case 'right':
        x = distance;
        break;
    }
    return { opacity, x, y };
  };

  const getAnimate = () => {
    if (direction === 'none') return { opacity: 1 };
    return { opacity: 1, x: 0, y: 0 };
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={getInitial()}
      animate={hasAnimated ? getAnimate() : getInitial()}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.215, 0.61, 0.355, 1] as const,
      }}
    >
      {children}
    </motion.div>
  );
}

interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  delayChildren?: number;
}

export function StaggerContainer({
  children,
  className = '',
  staggerDelay = 0.1,
  delayChildren = 0,
}: StaggerContainerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        visible: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: [0.215, 0.61, 0.355, 1] as const },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

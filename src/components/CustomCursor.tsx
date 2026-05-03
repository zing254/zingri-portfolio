'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const DOT_SIZE = 8;
const RING_SIZE = 40;
const TRAIL_COUNT = 12;

interface TrailDot {
  x: number;
  y: number;
  opacity: number;
}

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const ringX = useMotionValue(-100);
  const ringY = useMotionValue(-100);
  const trailRef = useRef<TrailDot[]>([]);
  const trailPositionsRef = useRef<{ x: number; y: number }[]>([]);
  const rafRef = useRef<number>(0);

  const springX = useSpring(cursorX, { stiffness: 500, damping: 40 });
  const springY = useSpring(cursorY, { stiffness: 500, damping: 40 });
  const ringSpringX = useSpring(ringX, { stiffness: 120, damping: 20 });
  const ringSpringY = useSpring(ringY, { stiffness: 120, damping: 20 });

  useEffect(() => {
    const isDesktop = window.matchMedia('(min-width: 1024px)').matches;
    if (!isDesktop) return;

    const initTrail = () => {
      trailPositionsRef.current = Array.from({ length: TRAIL_COUNT }, () => ({ x: -100, y: -100 }));
      trailRef.current = Array.from({ length: TRAIL_COUNT }, () => ({ x: -100, y: -100, opacity: 0 }));
    };
    initTrail();

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      ringX.set(e.clientX);
      ringY.set(e.clientY);

      if (!isVisible) setIsVisible(true);

      trailPositionsRef.current.unshift({ x: e.clientX, y: e.clientY });
      if (trailPositionsRef.current.length > TRAIL_COUNT) {
        trailPositionsRef.current.pop();
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'BUTTON' || target.tagName === 'A' || target.closest('button') || target.closest('a')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const updateTrail = () => {
      trailRef.current = trailPositionsRef.current.map((pos, i) => ({
        x: pos.x,
        y: pos.y,
        opacity: Math.max(0, (TRAIL_COUNT - i) / TRAIL_COUNT - 0.3),
      }));
      rafRef.current = requestAnimationFrame(updateTrail);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseOver);
    rafRef.current = requestAnimationFrame(updateTrail);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(rafRef.current);
    };
  }, [cursorX, cursorY, ringX, ringY, isVisible]);

  if (typeof window !== 'undefined' && window.matchMedia('(min-width: 1024px)').matches === false) {
    return null;
  }

  return (
    <>
      {/* Trail */}
      {trailRef.current.map((dot, i) => (
        <motion.div
          key={i}
          className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full"
          style={{
            x: dot.x - (i + 1) * 1.5,
            y: dot.y - (i + 1) * 1.5,
            width: (TRAIL_COUNT - i) * 1.5,
            height: (TRAIL_COUNT - i) * 1.5,
            background: `rgba(0, 212, 255, ${dot.opacity * 0.5})`,
            opacity: dot.opacity,
          }}
        />
      ))}

      {/* Dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full bg-[var(--primary)]"
        style={{
          x: springX,
          y: springY,
          width: isClicking ? DOT_SIZE * 0.6 : DOT_SIZE,
          height: isClicking ? DOT_SIZE * 0.6 : DOT_SIZE,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isClicking ? 0.6 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.1 }}
      />

      {/* Ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full border-2 border-[var(--primary)]"
        style={{
          x: ringSpringX,
          y: ringSpringY,
          width: isHovering ? RING_SIZE * 1.5 : RING_SIZE,
          height: isHovering ? RING_SIZE * 1.5 : RING_SIZE,
          translateX: '-50%',
          translateY: '-50%',
          opacity: isVisible ? 0.6 : 0,
        }}
        animate={{
          width: isHovering ? RING_SIZE * 1.5 : RING_SIZE,
          height: isHovering ? RING_SIZE * 1.5 : RING_SIZE,
          opacity: isVisible ? 0.6 : 0,
        }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      />
    </>
  );
}

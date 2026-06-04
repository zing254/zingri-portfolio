'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useCycle } from 'framer-motion';

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isTriggered, setIsTriggered] = useState(false);
  
  // State cycle for cursor states: active -> loading -> triggered -> active
  const [state, setState] = useCycle('active', 'loading', 'triggered');

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const trailRef = useRef<{ x: number; y: number; opacity: number }[]>([]);
  const trailPositionsRef = useRef<{ x: number; y: number }[]>([]);
  const rafRef = useRef<number>(0);
  const TRAIL_COUNT = 12;

  // Motion values for different cursor elements
  const mainLineX = useMotionValue(0);
  const mainLineY = useMotionValue(0);
  const leftBarX = useMotionValue(-10);
  const rightBarX = useMotionValue(10);
  const pulseScale = useMotionValue(1);
  const pulseOpacity = useMotionValue(0);

  const springX = useSpring(cursorX, { stiffness: 500, damping: 40 });
  const springY = useSpring(cursorY, { stiffness: 500, damping: 40 });
  const mainLineSpringX = useSpring(mainLineX, { stiffness: 300, damping: 20 });
  const mainLineSpringY = useSpring(mainLineY, { stiffness: 300, damping: 20 });
  const leftBarSpringX = useSpring(leftBarX, { stiffness: 200, damping: 15 });
  const rightBarSpringX = useSpring(rightBarX, { stiffness: 200, damping: 15 });
  const pulseSpring = useSpring(pulseScale, { stiffness: 150, damping: 10 });

  // Cursor state effects
  useEffect(() => {
    switch (state) {
      case 'active':
        // Active state: steady vertical line with subtle pulse
        mainLineSpringX.set(0);
        mainLineSpringY.set(0);
        leftBarSpringX.set(-2);
        rightBarSpringX.set(2);
        pulseScale.set(1);
        pulseOpacity.set(0.2);
        break;
      case 'loading':
        // Loading state: horizontal bars expanding
        mainLineSpringX.set(0);
        mainLineSpringY.set(0);
        leftBarSpringX.set(-12);
        rightBarSpringX.set(12);
        pulseScale.set(0.8);
        pulseOpacity.set(0.4);
        break;
      case 'triggered':
        // Triggered state: radial pulse
        mainLineSpringX.set(0);
        mainLineSpringY.set(0);
        leftBarSpringX.set(0);
        rightBarSpringX.set(0);
        pulseScale.set(1.5);
        pulseOpacity.set(0.6);
        break;
    }
  }, [state, mainLineSpringX, mainLineSpringY, leftBarSpringX, rightBarSpringX, pulseScale, pulseOpacity]);

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

      if (!isVisible) setIsVisible(true);

      trailPositionsRef.current.unshift({ x: e.clientX, y: e.clientY });
      if (trailPositionsRef.current.length > TRAIL_COUNT) {
        trailPositionsRef.current.pop();
      }
    };

    const handleMouseDown = () => {
      setIsClicking(true);
      // Trigger state change on click
      setState((prev) => {
        const next = prev === 'triggered' ? 'active' : prev === 'loading' ? 'triggered' : 'loading';
        setIsTriggered(true);
        setTimeout(() => setIsTriggered(false), 300); // Reset triggered state after 300ms
        return next;
      });
    };

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
  }, [cursorX, cursorY, isVisible, state, setState]);

  // Auto-cycle states for demo purposes (can be removed in production)
  useEffect(() => {
    if (!isLoading) {
      const interval = setInterval(() => {
        setState((prev) => {
          const next = prev === 'triggered' ? 'active' : prev === 'loading' ? 'triggered' : 'loading';
          return next;
        });
      }, 4000); // Change state every 4 seconds
      return () => clearInterval(interval);
    }
  }, [isLoading, setState]);

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

      {/* Main cursor elements */}
      <div className="fixed top-0 left-0 pointer-events-none z-[9999]">
        {/* Main vertical line */}
        <motion.div
          className="absolute left-0 top-0 transform -translate-x-1/2 -translate-y-1/2"
          style={{
            x: mainLineSpringX,
            y: mainLineSpringY,
            width: 2,
            height: 20,
            backgroundColor: `hsl(var(--primary))`,
          }}
          animate={{
            height: [16, 20, 16, 20],
          }}
          transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
        />
        
        {/* Left bar (for loading state) */}
        <motion.div
          className="absolute left-0 top-0 transform -translate-x-1/2 -translate-y-1/2"
          style={{
            x: leftBarSpringX,
            y: mainLineSpringY,
            width: 2,
            height: 20,
            backgroundColor: `hsl(var(--primary))`,
            opacity: state === 'loading' ? 0.8 : 0.4,
          }}
        />
        
        {/* Right bar (for loading state) */}
        <motion.div
          className="absolute left-0 top-0 transform -translate-x-1/2 -translate-y-1/2"
          style={{
            x: rightBarSpringX,
            y: mainLineSpringY,
            width: 2,
            height: 20,
            backgroundColor: `hsl(var(--primary))`,
            opacity: state === 'loading' ? 0.8 : 0.4,
          }}
        />
        
        {/* Pulse circle (for triggered state) */}
        <motion.div
          className="absolute left-0 top-0 transform -translate-x-1/2 -translate-y-1/2"
          style={{
            x: mainLineSpringX,
            y: mainLineSpringY,
            width: 12,
            height: 12,
            borderRadius: '50%',
            backgroundColor: `hsl(var(--primary))`,
            opacity: pulseOpacity,
            transform: `scale(${pulseScale})`,
          }}
          animate={{
            scale: [0.8, 1.2, 0.8],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </>
  );
}

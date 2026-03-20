'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  className?: string;
  mode?: 'letter' | 'word';
  delay?: number;
  staggerDelay?: number;
  duration?: number;
  once?: boolean;
  splitBy?: string;
}

export default function AnimatedText({
  text,
  className = '',
  mode = 'letter',
  delay = 0,
  staggerDelay = 0.04,
  duration = 0.4,
  once = true,
  splitBy,
}: AnimatedTextProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [once]);

  const items = mode === 'word'
    ? text.split(' ')
    : splitBy
    ? text.split(splitBy)
    : text.split('');

  return (
    <span ref={ref} className={`inline-block ${className}`}>
      {items.map((item, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
          animate={isVisible ? { opacity: 1, y: 0, filter: 'blur(0px)' } : { opacity: 0, y: 20, filter: 'blur(4px)' }}
          transition={{
            duration,
            delay: delay + i * staggerDelay,
            ease: [0.215, 0.61, 0.355, 1],
          }}
        >
          {mode === 'word' && i !== items.length - 1 ? `${item} ` : item}
          {mode === 'word' && splitBy && item}
        </motion.span>
      ))}
    </span>
  );
}

interface TypewriterTextProps {
  text: string;
  className?: string;
  speed?: number;
  cursorColor?: string;
}

export function TypewriterText({
  text,
  className = '',
  speed = 50,
  cursorColor = 'var(--primary)',
}: TypewriterTextProps) {
  const [displayed, setDisplayed] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1));
        i++;
      } else {
        setIsComplete(true);
        clearInterval(interval);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <span className={`inline-block ${className}`}>
      {displayed}
      <motion.span
        className="inline-block w-[2px] ml-1 align-middle"
        style={{ backgroundColor: cursorColor }}
        animate={{ opacity: isComplete ? 0 : [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity }}
      />
    </span>
  );
}

interface HoverTextProps {
  text: string;
  className?: string;
}

export function HoverText({ text, className = '', ...props }: AnimatedTextProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 200, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 200, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLSpanElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.span
      className={`inline-block cursor-default ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <AnimatedText {...props} text={text} />
    </motion.span>
  );
}

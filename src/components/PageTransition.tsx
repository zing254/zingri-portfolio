'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

interface PageTransitionProps {
  children: ReactNode;
}

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
    filter: 'blur(4px)',
  },
  enter: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.5,
      ease: [0.215, 0.61, 0.355, 1],
      when: 'beforeChildren',
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    filter: 'blur(4px)',
    transition: {
      duration: 0.3,
      ease: [0.55, 0.055, 0.675, 0.19],
    },
  },
};

const overlayVariants = {
  initial: { opacity: 0 },
  enter: {
    opacity: 1,
    transition: { duration: 0.3 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.4, delay: 0.1 },
  },
};

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          variants={pageVariants}
          initial="initial"
          animate="enter"
          exit="exit"
          className="min-h-screen"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  );
}

interface TransitionOverlayProps {
  isTransitioning: boolean;
}

export function TransitionOverlay({ isTransitioning }: TransitionOverlayProps) {
  return (
    <AnimatePresence>
      {isTransitioning && (
        <motion.div
          variants={overlayVariants}
          initial="initial"
          animate="enter"
          exit="exit"
          className="fixed inset-0 z-[9999] bg-[var(--background)] pointer-events-none"
        />
      )}
    </AnimatePresence>
  );
}

export function SlideTransition({ children, direction = 1 }: { children: ReactNode; direction?: 1 | -1 }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, x: 100 * direction }}
        animate={{
          opacity: 1,
          x: 0,
          transition: { duration: 0.5, ease: [0.215, 0.61, 0.355, 1] },
        }}
        exit={{
          opacity: 0,
          x: -100 * direction,
          transition: { duration: 0.3, ease: [0.55, 0.055, 0.675, 0.19] },
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

export function FadeTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
        }}
        exit={{
          opacity: 0,
          transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

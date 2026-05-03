"use client";

import { motion } from 'framer-motion';
import TerminalSandbox from './TerminalSandbox';
import { Terminal as TerminalIcon } from 'lucide-react';

export default function TerminalSection() {
  return (
    <section className="relative py-32 px-4 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px]" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-secondary/30 mb-6">
            <TerminalIcon className="w-4 h-4 text-secondary" />
            <span className="text-xs font-mono text-secondary/80">system_access_v2.bin</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-heading">
            Interactive <span className="text-primary">Sandbox</span>
          </h2>
          <p className="text-muted max-w-2xl mx-auto">
            Direct interface to my digital nervous system. Type commands to explore my profile, 
            view projects, or initiate secure communication protocols.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <TerminalSandbox />
        </motion.div>

        {/* Floating code particles */}
        <div className="absolute -left-10 top-1/4 pointer-events-none opacity-20 hidden lg:block">
          <pre className="text-[10px] text-primary font-mono leading-tight">
            {`01001010 01100001 01101110
01100111 01101111 01101101
01100101 01110011 01101011
01101001 01101100 01101100`}
          </pre>
        </div>
        <div className="absolute -right-10 bottom-1/4 pointer-events-none opacity-20 hidden lg:block">
          <pre className="text-[10px] text-secondary font-mono leading-tight text-right">
            {`SELECT * FROM users
WHERE role = 'admin'
AND status = 'compromised'
-- root access granted`}
          </pre>
        </div>
      </div>
    </section>
  );
}

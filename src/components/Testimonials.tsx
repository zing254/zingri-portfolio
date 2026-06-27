"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Client A",
    role: "CTO, Tech Company",
    quote: "Zingri delivered a robust microservices architecture that scaled our platform to handle 10x traffic. Deep security expertise and clean code.",
    rating: 5,
  },
  {
    id: 2,
    name: "Client B",
    role: "Product Manager, FinTech",
    quote: "Outstanding full-stack work on our payment platform. The audit pipeline he implemented caught critical vulnerabilities immediately.",
    rating: 5,
  },
  {
    id: 3,
    name: "Client C",
    role: "Engineering Lead, Startup",
    quote: "One of the best security consultants I've worked with. His architecture reviews saved us from major compliance issues.",
    rating: 5,
  },
];

export default function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((c) => (c + 1) % testimonials.length);
  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);

  return (
    <section id="testimonials" ref={ref} className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 grid-bg" />
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] rounded-full blur-[180px] bg-accent/5" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-accent/30 mb-6">
            <span className="text-xs font-mono text-accent/80">cat testimonials.sh</span>
          </div>
          <h2 className="font-heading text-5xl md:text-6xl font-bold mb-4">
            <span className="text-white">What </span>
            <span className="glow-text-accent text-transparent bg-clip-text bg-gradient-to-r from-accent to-primary">
              People Say
            </span>
          </h2>
          <p className="text-muted max-w-2xl mx-auto">
            Feedback from clients and collaborators.
          </p>
          <div className="w-24 h-1 mx-auto mt-6 rounded-full bg-gradient-to-r from-accent via-primary to-secondary" />
        </motion.div>

        <div className="relative">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
            className="glass rounded-2xl border border-accent/20 p-8 md:p-12 text-center"
          >
            <Quote className="w-8 h-8 text-accent/40 mx-auto mb-6" />
            <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-8 italic">
              &ldquo;{testimonials[current].quote}&rdquo;
            </p>
            <div className="flex items-center justify-center gap-1 mb-3">
              {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-accent text-accent" />
              ))}
            </div>
            <p className="font-bold text-white">{testimonials[current].name}</p>
            <p className="text-xs text-muted font-mono">{testimonials[current].role}</p>
          </motion.div>

          <div className="flex items-center justify-center gap-4 mt-6">
            <button onClick={prev} className="p-2 rounded-lg glass border border-white/10 text-muted hover:text-white hover:border-accent/50 transition-all">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === current ? "bg-accent w-6" : "bg-white/20 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>
            <button onClick={next} className="p-2 rounded-lg glass border border-white/10 text-muted hover:text-white hover:border-accent/50 transition-all">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
    </section>
  );
}

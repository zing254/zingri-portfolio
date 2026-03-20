"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { 
  Send, Mail, MapPin, Github, Linkedin, Twitter,
  Terminal, ExternalLink, CheckCircle, Loader2,
  MessageSquare, User, AtSign, Phone
} from "lucide-react";

const socialLinks = [
  { name: "GitHub", icon: Github, url: "https://github.com", color: "primary" },
  { name: "LinkedIn", icon: Linkedin, url: "https://linkedin.com", color: "secondary" },
  { name: "Twitter", icon: Twitter, url: "https://twitter.com", color: "accent" },
];

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setSubmitted(true);
    setFormState({ name: "", email: "", subject: "", message: "" });
    
    // Reset success state after 5 seconds
    setTimeout(() => setSubmitted(false), 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const inputFields = [
    { name: "name", label: "Your Name", type: "text", icon: User, placeholder: "John Doe" },
    { name: "email", label: "Email Address", type: "email", icon: AtSign, placeholder: "john@example.com" },
    { name: "subject", label: "Subject", type: "text", icon: MessageSquare, placeholder: "Project Inquiry" },
  ];

  return (
    <section id="contact" ref={ref} className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-bg" />
      <div className="absolute top-1/4 left-0 w-[600px] h-[600px] rounded-full blur-[180px] bg-accent/5" />
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] rounded-full blur-[150px] bg-primary/5" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-accent/30 mb-6">
            <span className="text-xs font-mono text-accent/80">ping contact.sh</span>
          </div>
          <h2 className="font-heading text-5xl md:text-6xl font-bold mb-4">
            <span className="text-white">Get In </span>
            <span className="glow-text-accent text-transparent bg-clip-text bg-gradient-to-r from-accent to-primary">
              Touch
            </span>
          </h2>
          <p className="text-muted max-w-2xl mx-auto">
            Have a project in mind? Want to collaborate? Or just want to say hi? 
            My inbox is always open. Let&apos;s build something amazing together.
          </p>
          <div className="w-24 h-1 mx-auto mt-6 rounded-full bg-gradient-to-r from-accent via-primary to-secondary"
               style={{ boxShadow: "0 0 20px var(--accent)" }} />
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact info - Left column */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Direct contact */}
            <motion.div variants={itemVariants} className="relative">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 blur-xl" />
              <div className="relative p-6 rounded-2xl glass border border-primary/20">
                <div className="flex items-center gap-3 mb-4">
                  <Mail className="w-5 h-5 text-primary" />
                  <h3 className="font-heading text-lg font-bold text-white">Direct Email</h3>
                </div>
                <a 
                  href="mailto:zingri@example.com" 
                  className="block text-primary hover:text-primary/80 transition-colors font-mono text-sm break-all"
                >
                  zingri@fleektech.co.ke
                </a>
                <div className="mt-4 flex items-center gap-2 text-xs text-muted">
                  <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                  <span className="font-mono">Usually responds within 24h</span>
                </div>
              </div>
            </motion.div>

            {/* Location */}
            <motion.div variants={itemVariants} className="relative">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-secondary/10 to-accent/10 blur-xl" />
              <div className="relative p-6 rounded-2xl glass border border-secondary/20">
                <div className="flex items-center gap-3 mb-4">
                  <MapPin className="w-5 h-5 text-secondary" />
                  <h3 className="font-heading text-lg font-bold text-white">Location</h3>
                </div>
                <p className="text-white font-semibold">Nairobi, Kenya 🇰🇪</p>
                <p className="text-sm text-muted mt-1">Available for remote work worldwide</p>
                <div className="mt-4 p-3 rounded-lg bg-secondary/5 border border-secondary/20">
                  <p className="text-xs font-mono text-secondary">
                    Timezone: EAT (UTC+3)
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Social links */}
            <motion.div variants={itemVariants} className="relative">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/10 to-primary/10 blur-xl" />
              <div className="relative p-6 rounded-2xl glass border border-accent/20">
                <div className="flex items-center gap-3 mb-4">
                  <Terminal className="w-5 h-5 text-accent" />
                  <h3 className="font-heading text-lg font-bold text-white">Connect</h3>
                </div>
                <div className="space-y-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`
                        flex items-center gap-3 p-3 rounded-lg glass border border-white/5
                        hover:border-${social.color}/50 transition-all duration-300 group
                      `}
                    >
                      <social.icon className={`w-5 h-5 text-${social.color} group-hover:scale-110 transition-transform`} />
                      <span className="font-mono text-sm">{social.name}</span>
                      <ExternalLink className="w-3 h-3 text-muted ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact form - Right column */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <motion.div variants={itemVariants} className="relative">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 blur-xl" />
              
              <div className="relative p-8 rounded-2xl glass border border-white/10">
                {/* Form header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full glass border border-primary/30">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    <span className="text-xs font-mono text-primary/80">contact_form.sh</span>
                  </div>
                </div>

                {/* Success message */}
                {submitted && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 rounded-xl bg-accent/10 border border-accent/30 flex items-center gap-3"
                  >
                    <CheckCircle className="w-5 h-5 text-accent" />
                    <span className="text-accent font-mono text-sm">Message sent successfully!</span>
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Input fields */}
                  <div className="grid md:grid-cols-2 gap-5">
                    {inputFields.map((field) => (
                      <div key={field.name} className="relative">
                        <label className="block text-xs font-mono text-muted mb-2">
                          {field.label}
                        </label>
                        <div className="relative">
                          <field.icon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                          <input
                            type={field.type}
                            name={field.name}
                            value={formState[field.name as keyof typeof formState]}
                            onChange={handleChange}
                            placeholder={field.placeholder}
                            required
                            className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 
                                     focus:border-primary/50 focus:ring-1 focus:ring-primary/20
                                     transition-all duration-300 font-mono text-sm placeholder:text-muted/50
                                     hover:border-white/20"
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Message textarea */}
                  <div className="relative">
                    <label className="block text-xs font-mono text-muted mb-2">
                      Message
                    </label>
                    <div className="relative">
                      <MessageSquare className="absolute left-4 top-4 w-4 h-4 text-muted" />
                      <textarea
                        name="message"
                        value={formState.message}
                        onChange={handleChange}
                        placeholder="Tell me about your project, idea, or just say hi..."
                        rows={6}
                        required
                        className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 
                                 focus:border-primary/50 focus:ring-1 focus:ring-primary/20
                                 transition-all duration-300 font-mono text-sm placeholder:text-muted/50
                                 hover:border-white/20 resize-none"
                      />
                    </div>
                  </div>

                  {/* Submit button */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`
                      w-full py-4 rounded-xl font-mono text-sm font-semibold
                      flex items-center justify-center gap-3
                      transition-all duration-300
                      ${isSubmitting 
                        ? 'bg-primary/20 text-primary border border-primary/50 cursor-not-allowed'
                        : 'bg-gradient-to-r from-primary via-secondary to-accent text-black hover:shadow-lg hover:shadow-primary/30'
                      }
                    `}
                    style={!isSubmitting ? { boxShadow: "0 0 30px rgba(0, 212, 255, 0.3)" } : {}}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </motion.button>
                </form>

                {/* Fun footer */}
                <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-muted">
                    <span className="font-mono">status:</span>
                    <span className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                      <span className="font-mono text-accent">ready_to_connect</span>
                    </span>
                  </div>
                  <div className="text-xs font-mono text-muted">
                    Made with <span className="text-warning">♥</span> in Nairobi
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom tagline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20 text-center"
        >
          <div className="inline-block p-6 rounded-2xl glass border border-accent/20">
            <p className="font-heading text-xl md:text-2xl font-bold text-white mb-2">
              Let&apos;s Build <span className="text-accent glow-text-accent">Something Extraordinary</span>
            </p>
            <p className="text-sm text-muted font-mono">
              // because ordinary is boring
            </p>
          </div>
        </motion.div>
      </div>

      {/* Bottom separator */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
    </section>
  );
}

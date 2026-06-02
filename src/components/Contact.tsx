"use client";

import React from "react";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { 
  Send, Mail, MapPin, Github, Linkedin, Twitter,
  Terminal, ExternalLink, CheckCircle, Loader2,
  MessageSquare, User, AtSign, Phone
} from "lucide-react";
import { useToast } from "./Toaster";

const socialLinks = [
  { name: "GitHub", icon: Github, url: "https://github.com/zing254", color: "primary" },
  { name: "LinkedIn", icon: Linkedin, url: "https://linkedin.com/in/zingri", color: "secondary" },
  { name: "Twitter", icon: Twitter, url: "https://twitter.com/zingri", color: "accent" },
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
    const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submissionSuccess, setSubmissionSuccess] = useState(false);
   const { addToast } = useToast();

   const handleSubmit = async (e: React.FormEvent) => {
     e.preventDefault();
     setIsSubmitting(true);
     
     try {
       const response = await fetch('/api/contact', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(formState)
       });

       const result = await response.json();
       
        if (response.ok) {
          addToast({
            type: 'success',
            title: 'Message Sent!',
            message: "Thanks for reaching out. I'll respond within 24 hours!"
          });
          setFormState({ name: "", email: "", subject: "", message: "" });
          setValidationErrors({}); // Clear validation errors on success
          setSubmissionSuccess(true);
          // Reset success state after 5 seconds
          setTimeout(() => setSubmissionSuccess(false), 5000);
        } else {
          addToast({
            type: 'error',
            title: 'Failed to Send',
            message: result.error || 'Something went wrong. Try again.'
          });
        }
     } catch (error) {
       console.error('Contact error:', error);
       addToast({
         type: 'error',
         title: 'Network Error',
         message: 'Unable to connect. Check your connection.'
       });
     } finally {
       setIsSubmitting(false);
     }
   };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormState(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    // Validation functions
    const validateField = (name: string, value: string): string | null => {
      if (name === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value) return 'Email is required';
        if (!emailRegex.test(value)) return 'Please enter a valid email';
        return null;
      }
      
      if (name === 'name' || name === 'subject') {
        if (!value) return `${name.charAt(0).toUpperCase() + name.slice(1)} is required`;
        if (value.length < 2) return `${name.charAt(0).toUpperCase() + name.slice(1)} must be at least 2 characters`;
        return null;
      }
      
      if (name === 'message') {
        if (!value) return 'Message is required';
        if (value.length < 10) return 'Message must be at least 10 characters';
        return null;
      }
      
      return null;
    };

    const validateForm = () => {
      const errors: Record<string, string> = {};
      const fields = ['name', 'email', 'subject', 'message'];
      
      for (const field of fields) {
        const error = validateField(field, formState[field as keyof typeof formState]);
        if (error) {
          errors[field] = error;
        }
      }
      
      setValidationErrors(errors);
      return Object.keys(errors).length === 0;
    };

    // Validate form when formState changes
    useEffect(() => {
      validateForm();
    }, [formState]);

    const AnimatedInput = ({
      type,
      name,
      label,
      placeholder,
      value,
      onChange,
      Icon,
      error,
      ...props
    }) => {
      const [isFocused, setIsFocused] = useState(false);
      const [isFilled, setIsFilled] = useState(!!value);
      
      // Helper function to get color based on field name
      const getColorForField = (fieldName: string) => {
        switch (fieldName) {
          case 'name': return 'primary';
          case 'email': return 'secondary';
          case 'subject': return 'accent';
          case 'message': return 'primary';
          default: return 'muted';
        }
      };
      
      // Handle value changes for filled state detection
      useEffect(() => {
        setIsFilled(!!value);
      }, [value]);
      
       return (
         <div key={name} className="relative">
           <label className="block text-xs font-mono text-muted mb-2">
             {label}
           </label>
           <div className="relative">
             {Icon && (
               <Icon 
                 className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 
                   ${error ? 'text-error/80' : isFocused ? `text-${getColorForField(name)}` : 'text-muted/60'}
                   group-hover:scale-110 transition-all duration-300 
                   ${isFocused || isFilled ? 'scale-110' : ''}`}
               />
             )}
             <input
               type={type}
               name={name}
               value={value}
               onChange={onChange}
               placeholder={placeholder}
               required
               className={`w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 
                 focus:border-primary/50 focus:ring-1 focus:ring-primary/20
                 transition-all duration-300 font-mono text-sm placeholder:text-muted/50
                 hover:border-white/20
                 ${isFocused || isFilled ? '-translate-y-2 -scale-[0.9]' : ''}
                 ${error ? 'border-error/50' : ''}`}
               onFocus={() => setIsFocused(true)}
               onBlur={() => setIsFocused(false)}
             />
             {error && (
               <MessageSquare className="absolute right-4 top-4 w-4 h-4 text-error/50 animate-pulse" />
             )}
             {!error && isFilled && !isFocused && (
               <CheckCircle className="absolute right-4 top-4 w-4 h-4 text-success/50" />
             )}
           </div>
         </div>
       );
    };

    const AnimatedSubmitButton = ({ isSubmitting, submissionSuccess, onClick }: { isSubmitting: boolean; submissionSuccess: boolean; onClick: (e: React.FormEvent) => Promise<void> }) => {
       return (
         <button
           type="submit"
           disabled={isSubmitting || submissionSuccess}
           onClick={onClick}
           className={`
             w-full py-4 rounded-xl font-mono text-sm font-semibold
             flex items-center justify-center gap-3
             transition-all duration-300
             ${isSubmitting 
               ? 'bg-primary/20 text-primary border border-primary/50 cursor-not-allowed'
               : submissionSuccess
                 ? 'bg-gradient-to-r from-success via-success/50 to-success text-black hover:shadow-lg hover:shadow-success/30'
                 : 'bg-gradient-to-r from-primary via-secondary to-accent text-black hover:shadow-lg hover:shadow-primary/30'
             }
           `}
           style={!isSubmitting && !submissionSuccess ? { boxShadow: "0 0 30px rgba(0, 212, 255, 0.3)" } : {}}
         >
           {isSubmitting ? (
             <>
               <Loader2 className="w-4 h-4 animate-spin" />
               <span>Sending...</span>
             </>
           ) : submissionSuccess ? (
             <>
               <CheckCircle className="w-4 h-4" />
               <span>Sent!</span>
             </>
           ) : (
             <>
               <Send className="w-4 h-4" />
               <span>Send Message</span>
             </>
           )}
         </button>
       );
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
  href="mailto:zingri_master254@proton.me" 
  className="block text-primary hover:text-primary/80 transition-colors font-mono text-sm break-all"
>
  zingri_master254@proton.me
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
                       <social.icon 
                         className={`w-5 h-5 text-${social.color} 
                           group-hover:scale-110 
                           group-hover:text-${social.color}/80
                           transition-all duration-300`}
                       />
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

                 <form onSubmit={handleSubmit} className="space-y-5">
                   {/* Input fields */}
                    <div className="grid md:grid-cols-2 gap-5">
                      {inputFields.map((field) => (
                        <AnimatedInput
                          key={field.name}
                          type={field.type}
                          name={field.name}
                          label={field.label}
                          placeholder={field.placeholder}
                          value={formState[field.name as keyof typeof formState]}
                          onChange={handleChange}
                          Icon={field.icon}
                          error={validationErrors[field.name]} // Pass validation error
                        />
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
                         className={`w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 
                                focus:border-primary/50 focus:ring-1 focus:ring-primary/20
                                transition-all duration-300 font-mono text-sm placeholder:text-muted/50
                                hover:border-white/20 resize-none`}
                       />
                     </div>
                   </div>

                    {/* Submit button */}
                    <AnimatedSubmitButton
                      isSubmitting={isSubmitting}
                      submissionSuccess={submissionSuccess}
                      onClick={handleSubmit}
                    />
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
              {"// because ordinary is boring"}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Bottom separator */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
    </section>
  );
}

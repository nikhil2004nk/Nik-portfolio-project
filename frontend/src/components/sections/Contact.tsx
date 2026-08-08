'use client';
import * as React from 'react';
import { useState } from 'react';
import { api } from '../../lib/api';
import { Button } from '../ui/Button';
import { ScrollReveal } from '../ui/ScrollReveal';
import { Mail, Send } from 'lucide-react';

export function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    try {
      await api.submitContact(formData);
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error: any) {
      setStatus('error');
      setErrorMsg(error.message || 'Failed to send message.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section id="contact" className="py-12 md:py-24 lg:py-32 border-t border-hairline">
      <div className="container mx-auto px-5 md:px-8 lg:px-12 max-w-7xl">
        <ScrollReveal>
          <h2 className="text-sm font-mono text-muted mb-12">// 10 — Contact</h2>
        </ScrollReveal>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-24 items-start">
          <ScrollReveal>
            <form onSubmit={handleSubmit} className="space-y-6 bg-panel p-5 sm:p-8 rounded-lg border border-hairline">
              {status === 'success' ? (
                <div className="p-8 text-center animate-in fade-in duration-300">
                  <div className="w-16 h-16 bg-signal/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-signal text-2xl">✓</span>
                  </div>
                  <h3 className="text-2xl font-display font-bold text-primary mb-2">Message Sent</h3>
                  <p className="text-muted">I'll get back to you within 24-48 hours.</p>
                </div>
              ) : (
                <>
                  <div>
                    <label htmlFor="name" className="block text-xs font-mono text-muted mb-2 uppercase">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-ink border border-hairline rounded-md px-4 py-3 text-primary focus:outline-none focus:ring-2 focus:ring-signal focus:border-signal transition-all duration-150"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs font-mono text-muted mb-2 uppercase">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-ink border border-hairline rounded-md px-4 py-3 text-primary focus:outline-none focus:ring-2 focus:ring-signal focus:border-signal transition-all duration-150"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-xs font-mono text-muted mb-2 uppercase">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full bg-ink border border-hairline rounded-md px-4 py-3 text-primary focus:outline-none focus:ring-2 focus:ring-signal focus:border-signal transition-all duration-150 resize-y"
                    ></textarea>
                  </div>
                  {status === 'error' && (
                    <p className="text-alert text-sm font-mono animate-in fade-in slide-in-from-top-1">Failed to send message. Please try again.</p>
                  )}
                  <Button type="submit" variant="primary" className="w-full h-12 flex items-center justify-center gap-2" disabled={status === 'loading'}>
                    {status === 'loading' ? (
                      <span className="animate-spin w-5 h-5 border-2 border-ink border-t-transparent rounded-full" />
                    ) : (
                      <>Send Message <Send className="w-4 h-4" /></>
                    )}
                  </Button>
                </>
              )}
            </form>
          </ScrollReveal>

          <ScrollReveal className="space-y-12">
            <div>
              <h3 className="text-2xl md:text-3xl font-display font-bold text-primary mb-6">Let's build something.</h3>
              <p className="text-lg text-muted leading-relaxed mb-8">
                I am currently available for freelance opportunities. Whether you need a robust backend API, an AI integration, or a complete full-stack platform—reach out.
              </p>
              
              <div className="flex items-center gap-3 bg-panel p-4 rounded-md border border-hairline inline-flex">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-signal opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-signal"></span>
                </span>
                <span className="font-mono text-sm tracking-widest text-signal uppercase">Available for Freelance</span>
              </div>
            </div>

            <div className="space-y-4 font-mono text-sm">
              <a href="mailto:Nikdocuments12@gmail.com" className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-primary hover:text-signal transition-colors p-4 bg-panel border border-hairline rounded-md">
                <span className="text-muted w-28 uppercase flex items-center gap-2"><Mail className="w-4 h-4" /> Email</span> Nikdocuments12@gmail.com
              </a>
              <a href="https://github.com/nikhil2004nk" target="_blank" rel="noopener noreferrer" className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-primary hover:text-signal transition-colors p-4 bg-panel border border-hairline rounded-md">
                <span className="text-muted w-28 uppercase flex items-center gap-2">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.18-.35 6.5-1.5 6.5-7.a4.6 4.6 0 0 0-1.2-3.2 4.4 4.4 0 0 0-.1-3.2s-1.1-.35-3.5 1.25a12 12 0 0 0-6 0C7.25 1.25 6.15 1.6 6.15 1.6a4.4 4.4 0 0 0-.1 3.2 4.6 4.6 0 0 0-1.2 3.2c0 5.5 3.32 6.65 6.5 7.02a4.8 4.8 0 0 0-1 3.02V22" /><path d="M9 20c-4.5 1.5-5-2.5-7-3" /></svg> GitHub
                </span> nikhil2004nk
              </a>
              <a href="https://www.linkedin.com/in/nikhil-kushwaha12/" target="_blank" rel="noopener noreferrer" className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-primary hover:text-signal transition-colors p-4 bg-panel border border-hairline rounded-md">
                <span className="text-muted w-28 uppercase flex items-center gap-2">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg> LinkedIn
                </span> nikhil-kushwaha12
              </a>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
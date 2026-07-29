'use client';
import * as React from 'react';
import { useState } from 'react';
import { api } from '../../lib/api';
import { Button } from '../ui/Button';

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

  return (
    <section id="contact" className="py-20 relative">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-sm font-mono text-muted mb-8">// 11 — Contact</h2>
        
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-3xl font-display font-bold mb-4">Let's build something.</h3>
            <p className="text-muted mb-8">
              Available for freelance opportunities. If you're looking for a developer to build a robust backend or a dynamic frontend, I'm just an API call away.
            </p>
            
            <div className="space-y-4 font-mono text-sm">
              <div className="flex items-center gap-4">
                <span className="text-muted w-24">STATUS:</span>
                <span className="flex items-center gap-2 text-signal">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-signal opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-signal"></span>
                  </span>
                  Available
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-muted w-24">GITHUB:</span>
                <a href="https://github.com/nik" className="hover:text-signal transition-colors text-primary">github.com/nik</a>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-muted w-24">LINKEDIN:</span>
                <a href="https://linkedin.com/in/nik" className="hover:text-signal transition-colors text-primary">linkedin.com/in/nik</a>
              </div>
            </div>
          </div>
          
          <div className="bg-panel border border-hairline rounded-md p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-mono mb-2 text-muted">name</label>
                <input
                  type="text"
                  id="name"
                  required
                  className="w-full bg-ink border border-hairline rounded p-2 text-primary focus:outline-none focus:border-signal transition-colors"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-mono mb-2 text-muted">email</label>
                <input
                  type="email"
                  id="email"
                  required
                  className="w-full bg-ink border border-hairline rounded p-2 text-primary focus:outline-none focus:border-signal transition-colors"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-mono mb-2 text-muted">phone (optional)</label>
                <input
                  type="tel"
                  id="phone"
                  className="w-full bg-ink border border-hairline rounded p-2 text-primary focus:outline-none focus:border-signal transition-colors"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-mono mb-2 text-muted">message</label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  className="w-full bg-ink border border-hairline rounded p-2 text-primary focus:outline-none focus:border-signal transition-colors"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>
              
              <Button 
                type="submit" 
                variant="primary" 
                className="w-full"
                disabled={status === 'loading'}
              >
                {status === 'loading' ? 'Sending...' : 'Send Message'}
              </Button>
              
              {status === 'success' && (
                <div className="text-signal text-sm font-mono text-center mt-4">
                  Message sent successfully!
                </div>
              )}
              {status === 'error' && (
                <div className="text-alert text-sm font-mono text-center mt-4">
                  {errorMsg}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

import * as React from 'react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-panel border-t border-hairline py-12 md:py-16">
      <div className="container mx-auto px-5 md:px-8 lg:px-12 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="font-display font-bold text-2xl text-primary tracking-tight mb-4 inline-block">
              NIKHIL<span className="text-signal">.</span>
            </Link>
            <p className="text-muted leading-relaxed max-w-sm">
              Building scalable, high-performance platforms that process data, automate workflows, and drive business value.
            </p>
          </div>
          
          <div>
            <h4 className="font-mono text-sm text-primary mb-6 uppercase tracking-widest">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link href="#about" className="text-muted hover:text-signal transition-colors">About</Link></li>
              <li><Link href="#projects" className="text-muted hover:text-signal transition-colors">Projects</Link></li>
              <li><Link href="#experience" className="text-muted hover:text-signal transition-colors">Experience</Link></li>
              <li><Link href="#contact" className="text-muted hover:text-signal transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-mono text-sm text-primary mb-6 uppercase tracking-widest">Connect</h4>
            <ul className="space-y-3">
              <li><a href="https://github.com/nikhil2004nk" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-signal transition-colors">GitHub</a></li>
              <li><a href="https://www.linkedin.com/in/nikhil-kushwaha12/" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-signal transition-colors">LinkedIn</a></li>
              <li><a href="#" className="text-muted hover:text-signal transition-colors flex items-center gap-2">Download Resume <span className="text-signal text-xs">PDF</span></a></li>
            </ul>
          </div>
          
        </div>
        
        <div className="pt-8 border-t border-hairline flex flex-col md:flex-row justify-between items-center gap-4 text-muted text-sm font-mono">
          <p>© {new Date().getFullYear()} Nikhil. All rights reserved.</p>
          <p>Built with Next.js & Tailwind CSS.</p>
        </div>
      </div>
    </footer>
  );
}

'use client';
import * as React from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '../ui/Button';

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Experience', href: '#experience' },
  { name: 'FAQ', href: '#faq' }
];

import { usePathname } from 'next/navigation';

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState('');
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
      
      const sections = navLinks.map(link => link.href.replace('#', ''));
      for (const section of sections.reverse()) {
        const el = document.getElementById(section);
        if (el && window.scrollY >= (el.offsetTop - 150)) {
          setActiveSection(section);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out ${scrolled ? 'bg-ink/80 backdrop-blur-md border-b border-hairline h-[64px] md:h-[72px]' : 'bg-transparent border-transparent h-[64px] md:h-[72px]'}`}>
        <div className="container mx-auto px-5 md:px-8 lg:px-12 h-full flex items-center justify-between max-w-7xl">
          {/* Logo */}
          <Link href="/" className="font-display font-bold text-xl text-primary tracking-tight z-50">
            NIKHIL<span className="text-signal">.</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6 relative">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                className={`font-mono text-sm uppercase tracking-wide transition-colors hover:text-signal relative ${activeSection === link.href.replace('#', '') ? 'text-primary' : 'text-muted'}`}
              >
                {link.name}
                {activeSection === link.href.replace('#', '') && (
                  <motion.div 
                    layoutId="navbar-indicator"
                    className="absolute -bottom-2 left-0 right-0 h-[2px] bg-signal"
                    initial={false}
                    transition={{ type: 'tween', ease: 'easeInOut', duration: 0.2 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-signal opacity-75" style={{ animationDuration: '1.6s' }}></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-signal"></span>
              </span>
              <span className="font-mono text-xs text-signal">Available</span>
            </div>
            
            {mounted && (
              <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="p-2 rounded-md hover:bg-panel-raised transition-colors text-muted hover:text-primary">
                {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
            )}
            
            <Link href="#contact">
              <Button variant="primary" size="sm">Hire Me</Button>
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button 
            className="lg:hidden p-2 text-primary z-50 focus:outline-none focus:ring-2 focus:ring-signal rounded-md"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Overlay Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="fixed inset-0 z-40 bg-ink/95 backdrop-blur-xl flex flex-col justify-center px-5"
          >
            <nav className="flex flex-col gap-6">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 + 0.1, duration: 0.3 }}
                >
                  <Link 
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="font-display font-bold text-4xl text-primary hover:text-signal transition-colors block"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </nav>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-12 flex flex-col gap-6"
            >
              <div className="flex items-center gap-3">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-signal opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-signal"></span>
                </span>
                <span className="font-mono text-sm tracking-widest text-signal uppercase">Available for Freelance</span>
              </div>
              
              <Link href="#contact" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="primary" className="w-full">Hire Me</Button>
              </Link>
              
              {mounted && (
                <button 
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} 
                  className="flex items-center gap-2 p-3 rounded-md bg-panel border border-hairline text-primary justify-center"
                >
                  {theme === 'dark' ? <><Sun className="w-4 h-4" /> Light Mode</> : <><Moon className="w-4 h-4" /> Dark Mode</>}
                </button>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

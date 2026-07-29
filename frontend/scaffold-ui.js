const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src', 'components');

// Make directories
fs.mkdirSync(path.join(srcDir, 'layout'), { recursive: true });
fs.mkdirSync(path.join(srcDir, 'ui'), { recursive: true });

// ThemeToggle.tsx
fs.writeFileSync(path.join(srcDir, 'layout', 'ThemeToggle.tsx'), `'use client';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="w-9 h-9" />;

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="p-2 rounded-md hover:bg-hairline transition-colors flex items-center justify-center text-muted hover:text-primary"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}
`);

// Navbar.tsx
fs.writeFileSync(path.join(srcDir, 'layout', 'Navbar.tsx'), `import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-hairline bg-ink/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="font-display font-bold text-xl tracking-tight text-primary">
          Nik.
        </Link>
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-6 text-sm font-mono text-muted">
            <Link href="#services" className="hover:text-signal transition-colors">Services</Link>
            <Link href="#projects" className="hover:text-signal transition-colors">Work</Link>
            <Link href="#experience" className="hover:text-signal transition-colors">Experience</Link>
          </div>
          <div className="flex items-center gap-4 border-l border-hairline pl-4">
            <div className="flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-signal opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-signal"></span>
              </span>
              <span className="text-xs font-mono hidden sm:inline-block">Available</span>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
`);

// Footer.tsx
fs.writeFileSync(path.join(srcDir, 'layout', 'Footer.tsx'), `export function Footer() {
  return (
    <footer className="border-t border-hairline py-8 mt-auto bg-panel">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted">
        <div>
          <span className="font-mono">&copy; {new Date().getFullYear()} Nikhil. All rights reserved.</span>
        </div>
        <div className="flex gap-4 font-mono">
          <a href="https://github.com/nik" target="_blank" rel="noreferrer" className="hover:text-signal transition-colors">GitHub</a>
          <a href="https://linkedin.com/in/nik" target="_blank" rel="noreferrer" className="hover:text-signal transition-colors">LinkedIn</a>
          <a href="/resume.pdf" target="_blank" className="hover:text-signal transition-colors">Resume</a>
        </div>
      </div>
    </footer>
  );
}
`);

// Card.tsx
fs.writeFileSync(path.join(srcDir, 'ui', 'Card.tsx'), `import * as React from "react"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-md border border-hairline bg-panel text-primary shadow-sm hover:border-signal transition-colors duration-300 relative overflow-hidden",
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-signal/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      {props.children}
    </div>
  )
)
Card.displayName = "Card"

export { Card }
`);

// Button.tsx
fs.writeFileSync(path.join(srcDir, 'ui', 'Button.tsx'), `import * as React from "react"
import { cn } from "./Card"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    const variants = {
      primary: "bg-ledger text-ink hover:bg-ledger/90 font-medium",
      secondary: "bg-panel border border-hairline hover:border-signal text-primary",
      outline: "border border-hairline hover:bg-hairline text-primary",
      ghost: "hover:bg-hairline text-primary"
    };
    
    const sizes = {
      sm: "h-8 px-3 text-xs",
      md: "h-10 px-4 py-2 text-sm",
      lg: "h-12 px-8 text-base"
    };

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-md transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-signal disabled:pointer-events-none disabled:opacity-50 active:scale-95 duration-200",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
`);

// Badge.tsx
fs.writeFileSync(path.join(srcDir, 'ui', 'Badge.tsx'), `import * as React from "react"
import { cn } from "./Card"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'signal' | 'outline';
}

function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  const variants = {
    default: "bg-hairline text-primary",
    signal: "bg-signal/10 text-signal border border-signal/20",
    outline: "border border-hairline text-muted"
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-sm px-2.5 py-0.5 text-xs font-mono font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        variants[variant],
        className
      )}
      {...props}
    />
  )
}

export { Badge }
`);

console.log('UI and Layout components scaffolded.');

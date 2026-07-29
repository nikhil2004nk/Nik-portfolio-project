import Link from 'next/link';
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

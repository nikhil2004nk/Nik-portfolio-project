export function Footer() {
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

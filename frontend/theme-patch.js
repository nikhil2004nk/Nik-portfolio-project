const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

// 1. Create ThemeToggle Component
const togglePath = path.join(srcDir, 'components', 'ui', 'ThemeToggle.tsx');
fs.writeFileSync(togglePath, `'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-panel border border-hairline shadow-xl text-primary hover:text-signal hover:border-signal transition-colors focus:outline-none focus:ring-2 focus:ring-signal"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </motion.button>
  );
}
`);

// 2. Update layout.tsx
const layoutPath = path.join(srcDir, 'app', 'layout.tsx');
let layout = fs.readFileSync(layoutPath, 'utf8');

// Insert providers import
if (!layout.includes('ThemeProvider')) {
  layout = layout.replace(
    'import "./globals.css";',
    'import "./globals.css";\nimport { ThemeProvider } from "next-themes";\nimport { ThemeToggle } from "@/components/ui/ThemeToggle";'
  );
  
  // Wrap children
  layout = layout.replace(
    '<body className={`${spaceGrotesk.variable} ${ibmPlexMono.variable} ${inter.variable} antialiased`} suppressHydrationWarning>',
    '<body className={`${spaceGrotesk.variable} ${ibmPlexMono.variable} ${inter.variable} antialiased`} suppressHydrationWarning>\n        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>'
  );
  layout = layout.replace(
    '{children}\n      </body>',
    '{children}\n          <ThemeToggle />\n        </ThemeProvider>\n      </body>'
  );
  fs.writeFileSync(layoutPath, layout);
}

console.log('Theme toggle and providers added successfully!');

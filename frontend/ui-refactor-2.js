const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

// 1. Update About.tsx
const aboutPath = path.join(srcDir, 'components', 'sections', 'About.tsx');
let about = fs.readFileSync(aboutPath, 'utf8');
about = about.replace("import * as React from 'react';", "import * as React from 'react';\nimport { ScrollReveal } from '../ui/ScrollReveal';");
about = about.replace('<h2', '<ScrollReveal>\n          <h2');
about = about.replace('</h2>', '</h2>\n        </ScrollReveal>');
about = about.replace('<div className="text-lg', '<ScrollReveal className="text-lg');
about = about.replace('</div>\n      </div>', '</ScrollReveal>\n      </div>');
fs.writeFileSync(aboutPath, about);

// 2. Update Services.tsx
const servicesPath = path.join(srcDir, 'components', 'sections', 'Services.tsx');
let services = fs.readFileSync(servicesPath, 'utf8');
services = services.replace("import { Bot } from 'lucide-react';", "import { Bot } from 'lucide-react';\nimport { ScrollReveal } from '../ui/ScrollReveal';");
services = services.replace('<h2', '<ScrollReveal>\n          <h2');
services = services.replace('</h2>', '</h2>\n        </ScrollReveal>');
services = services.replace(/<Card key=\{index\}/g, '<ScrollReveal key={index}>\n              <Card');
services = services.replace(/<\/Card>/g, '</Card>\n            </ScrollReveal>');
fs.writeFileSync(servicesPath, services);

// 3. Update Skills.tsx
const skillsPath = path.join(srcDir, 'components', 'sections', 'Skills.tsx');
let skills = fs.readFileSync(skillsPath, 'utf8');
skills = skills.replace("import { Badge } from '../ui/Badge';", "import { Badge } from '../ui/Badge';\nimport { ScrollReveal } from '../ui/ScrollReveal';");
skills = skills.replace('<h2', '<ScrollReveal>\n          <h2');
skills = skills.replace('</h2>', '</h2>\n        </ScrollReveal>');
skills = skills.replace(/<div key=\{category\}>/g, '<ScrollReveal key={category}>\n              <div key={category}>');
skills = skills.replace(/<\/div>\n          \}\)\}/g, '</div>\n            </ScrollReveal>\n          ))}');
fs.writeFileSync(skillsPath, skills);

// 4. Update Hero.tsx Stagger
const heroPath = path.join(srcDir, 'components', 'sections', 'Hero.tsx');
let hero = fs.readFileSync(heroPath, 'utf8');
if (!hero.includes('motion.div')) {
  // Replace the left column with a motion stagger
  // But wait, the hero already uses Framer motion in the previous rewrite? No, it only used useEffect for typing.
  hero = hero.replace('import { motion } from \'framer-motion\';', "import { motion } from 'framer-motion';");
  hero = hero.replace('<div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">', '<div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">\n          {/* Ambient Blob */}\n          <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-signal/10 rounded-full blur-[100px] pointer-events-none" />\n');
  
  // To avoid complex regex for Hero, let's just rewrite the return entirely.
  const startIdx = hero.indexOf('return (');
  const newReturn = `return (
    <section className="min-h-[80vh] flex items-center relative overflow-hidden bg-ink pt-20 border-b border-hairline">
      <div className="container mx-auto px-4 max-w-6xl relative">
        <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-signal/10 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: typedText.length >= terminalText.length ? 1 : 0, y: typedText.length >= terminalText.length ? 0 : 20 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="order-2 md:order-1"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-signal opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-signal"></span>
              </span>
              <span className="font-mono text-sm tracking-widest text-signal uppercase">Available for Freelance Projects</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-display font-bold text-primary mb-4 tracking-tight">Nikhil</h1>
            <h2 className="text-xl md:text-2xl font-mono text-muted mb-6">Full Stack Developer (Next.js, NestJS, AI, FinTech)</h2>
            <p className="text-lg text-muted max-w-lg mb-10 leading-relaxed">
              Building scalable, high-performance platforms that process data, automate workflows, and drive business value.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button size="lg" variant="primary">Hire Me</Button>
              <Button size="lg" variant="secondary">View Projects</Button>
              <Button size="lg" variant="secondary">Download Resume</Button>
            </div>
          </motion.div>

          <div className="order-1 md:order-2 bg-panel border border-hairline rounded-lg p-6 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-signal/50 to-transparent opacity-50" />
            <pre className="font-mono text-sm text-muted whitespace-pre-wrap leading-relaxed">
              {typedText}
              <span className="animate-pulse bg-signal w-2 h-4 inline-block ml-1 align-middle"></span>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}`;
  hero = hero.substring(0, startIdx) + newReturn;
  fs.writeFileSync(heroPath, hero);
}

console.log('UI Overhaul Part 2 completed.');

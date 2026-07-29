const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

// 1. Services.tsx (Grid: 3-col on desktop)
const servicesPath = path.join(srcDir, 'components', 'sections', 'Services.tsx');
let services = fs.readFileSync(servicesPath, 'utf8');
services = services.replace('md:grid-cols-2 gap-8', 'md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8');
fs.writeFileSync(servicesPath, services);

// 2. Skills.tsx (Grid: 3-col on desktop instead of 4)
const skillsPath = path.join(srcDir, 'components', 'sections', 'Skills.tsx');
let skills = fs.readFileSync(skillsPath, 'utf8');
skills = skills.replace('lg:grid-cols-4 gap-8', 'lg:grid-cols-3 gap-6 md:gap-8');
fs.writeFileSync(skillsPath, skills);

// 3. Education.tsx (Certs grid: 3-col on desktop)
const eduPath = path.join(srcDir, 'components', 'sections', 'Education.tsx');
let edu = fs.readFileSync(eduPath, 'utf8');
edu = edu.replace('md:grid-cols-2 gap-8', 'md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8');
fs.writeFileSync(eduPath, edu);

// 4. Button.tsx (Hover and active states from spec)
const btnPath = path.join(srcDir, 'components', 'ui', 'Button.tsx');
let btn = fs.readFileSync(btnPath, 'utf8');
// Replace basic active/hover with the precise spec: active:scale-[0.98]
btn = btn.replace('active:scale-95 transition-all', 'active:scale-[0.98] transition-all duration-150');
if (btn.includes('bg-transparent border border-hairline text-primary hover:border-signal hover:bg-signal/5')) {
  btn = btn.replace('hover:bg-signal/5', 'hover:bg-signal/10');
}
fs.writeFileSync(btnPath, btn);

console.log('Cross-check layout fixes applied successfully.');

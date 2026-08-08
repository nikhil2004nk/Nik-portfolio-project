import * as React from 'react';
import { ScrollReveal } from '../ui/ScrollReveal';

import { Skill } from '../../types/skill';

interface SkillsSectionProps {
  skills: Skill[];
}

const CATEGORY_LABELS: Record<string, string> = {
  FRONTEND: 'Frontend',
  BACKEND: 'Backend',
  DATABASE: 'Database',
  DEVOPS: 'DevOps',
  CLOUD: 'Cloud',
  TOOL: 'Tools',
  AI: 'AI / ML',
  OTHER: 'Other',
};

const CATEGORY_ICONS: Record<string, string> = {
  FRONTEND: '🎨',
  BACKEND: '⚙️',
  DATABASE: '🗄️',
  DEVOPS: '🚀',
  CLOUD: '☁️',
  TOOL: '🛠️',
  AI: '🤖',
  OTHER: '📦',
};

const LEVEL_CONFIG: Record<string, { label: string; width: string; color: string }> = {
  BEGINNER:     { label: 'Beginner',     width: 'w-1/4',   color: 'bg-muted' },
  INTERMEDIATE: { label: 'Intermediate', width: 'w-1/2',   color: 'bg-ledger' },
  ADVANCED:     { label: 'Advanced',     width: 'w-3/4',   color: 'bg-signal' },
  EXPERT:       { label: 'Expert',       width: 'w-full',  color: 'bg-gradient-to-r from-signal to-ledger' },
};

export function SkillsSection({ skills = [] }: SkillsSectionProps) {
  // Group skills by category, preserving full skill objects
  const groupedSkills = skills.reduce((acc: Record<string, Skill[]>, skill: Skill) => {
    const catKey = skill.category || 'OTHER';
    acc[catKey] = acc[catKey] || [];
    acc[catKey].push(skill);
    return acc;
  }, {});

  // Sort categories in a logical order
  const categoryOrder = ['FRONTEND', 'BACKEND', 'DATABASE', 'DEVOPS', 'CLOUD', 'AI', 'TOOL', 'OTHER'];
  const sortedCategories = Object.entries(groupedSkills).sort(
    ([a], [b]) => (categoryOrder.indexOf(a) === -1 ? 99 : categoryOrder.indexOf(a)) - (categoryOrder.indexOf(b) === -1 ? 99 : categoryOrder.indexOf(b))
  );

  return (
    <section id="skills" className="py-12 md:py-24 lg:py-32 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-1/4 left-0 w-1/2 h-1/2 bg-signal/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-ledger/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-5 md:px-8 lg:px-12 max-w-7xl relative z-10">
        <ScrollReveal>
          <div className="flex flex-col gap-2 mb-12 md:mb-16">
            <div className="flex items-center gap-3">
              <div className="h-[2px] w-8 bg-signal"></div>
              <span className="text-sm font-mono text-signal uppercase tracking-widest">// 04</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-gradient">Core Competencies</h2>
            <p className="text-muted text-lg mt-2 max-w-2xl">Technologies and tools I work with to build modern, scalable applications.</p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {sortedCategories.map(([category, categorySkills]) => (
            <ScrollReveal key={category}>
              <div className="glass-card border border-hairline rounded-xl p-6 h-full hover:border-signal/40 transition-all duration-500 group">
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-hairline group-hover:border-signal/20 transition-colors">
                  <span className="text-2xl">{CATEGORY_ICONS[category] || '📦'}</span>
                  <div>
                    <h3 className="text-lg font-display font-semibold text-primary">
                      {CATEGORY_LABELS[category] || category}
                    </h3>
                    <span className="text-[10px] font-mono text-muted uppercase tracking-wider">
                      {categorySkills.length} {categorySkills.length === 1 ? 'skill' : 'skills'}
                    </span>
                  </div>
                </div>

                {/* Skills List */}
                <div className="space-y-4">
                  {categorySkills.map((skill: Skill) => {
                    const levelConfig = LEVEL_CONFIG[skill.level] || LEVEL_CONFIG.INTERMEDIATE;
                    return (
                      <div key={skill.id} className="group/skill">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-sm font-medium text-primary">{skill.name}</span>
                          <div className="flex items-center gap-2">
                            {skill.yearsOfExperience != null && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-signal/10 border border-signal/20 text-signal text-[10px] font-mono font-medium">
                                {skill.yearsOfExperience} {skill.yearsOfExperience === 1 ? 'yr' : 'yrs'}
                              </span>
                            )}
                            <span className="text-[10px] font-mono text-signal/70 uppercase">
                              {levelConfig.label}
                            </span>
                          </div>
                        </div>
                        {/* Proficiency bar */}
                        <div className="h-1 bg-hairline rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${levelConfig.color} ${levelConfig.width} transition-all duration-700 ease-out`}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </ScrollReveal>
          ))}
          {skills.length === 0 && <p className="text-muted">No skills found.</p>}
        </div>
      </div>
    </section>
  );
}

import * as React from 'react';
import { Badge } from '../ui/Badge';
import { ScrollReveal } from '../ui/ScrollReveal';

import { Skill } from '../../types/skill';

interface SkillsSectionProps {
  skills: Skill[];
}

export function SkillsSection({ skills = [] }: SkillsSectionProps) {
  const groupedSkills = skills.reduce((acc: any, skill: Skill) => {
    const catName = skill.category?.name || 'Other';
    acc[catName] = acc[catName] || [];
    acc[catName].push(skill.name);
    return acc;
  }, {});

  return (
    <section id="skills" className="py-20">
      <div className="container mx-auto px-4 max-w-5xl">
        <ScrollReveal>
          <h2 className="text-sm font-mono text-muted mb-12">// 04 — Core Competencies</h2>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {Object.entries(groupedSkills).map(([category, items]: [string, any]) => (
            <ScrollReveal key={category}>
              <div key={category}>
                <h3 className="text-lg font-mono text-primary mb-4 border-b border-hairline pb-2">{category.replace(/_/g, ' ')}</h3>
                <div className="flex flex-wrap gap-2">
                  {items.map((item: string) => (
                    <Badge key={item} variant="outline">{item}</Badge>
                  ))}
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

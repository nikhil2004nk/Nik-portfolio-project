import * as React from 'react';
import { ScrollReveal } from '../ui/ScrollReveal';

export function About() {
  return (
    <section id="about" className="py-20 border-t border-hairline">
      <div className="container mx-auto px-4 max-w-3xl">
        <ScrollReveal>
          <h2 className="text-sm font-mono text-muted mb-8">// 01 — About</h2>
        </ScrollReveal>
        <ScrollReveal className="text-lg md:text-xl leading-relaxed text-primary">
          <p className="mb-6">
            I'm a Full Stack Developer with a passion for building robust, scalable applications. With a strong foundation in both frontend and backend technologies, I specialize in creating seamless user experiences powered by highly efficient server architectures.
          </p>
          <p>
            When I'm not coding, I'm exploring the latest advancements in AI and discovering new ways to integrate machine learning into everyday applications.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}

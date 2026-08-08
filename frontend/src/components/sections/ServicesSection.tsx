import * as React from 'react';
import { Card } from '../ui/Card';
import { Server, Layout, Database, Bot } from 'lucide-react';
import { ScrollReveal } from '../ui/ScrollReveal';

import { Service } from '../../types/service';

interface ServicesSectionProps {
  services: Service[];
}

export function ServicesSection({ services }: ServicesSectionProps) {
  return (
    <section id="services" className="py-20 border-t border-hairline">
      <div className="container mx-auto px-4 max-w-5xl">
        <ScrollReveal>
          <div className="flex flex-col gap-2 mb-12 md:mb-16">
            <div className="flex items-center gap-3">
              <div className="h-[2px] w-8 bg-signal"></div>
              <span className="text-sm font-mono text-signal uppercase tracking-widest">// 02</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-gradient">Services</h2>
          </div>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => (
            <ScrollReveal key={index}>
              <Card className="p-8 hover:border-signal transition-colors">
              {service.icon}
              <h3 className="text-xl font-display font-bold mb-3">{service.title}</h3>
              <p className="text-muted leading-relaxed">{service.description}</p>
            </Card>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}


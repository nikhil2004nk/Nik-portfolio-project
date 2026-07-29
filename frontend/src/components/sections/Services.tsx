import * as React from 'react';
import { Card } from '../ui/Card';
import { Server, Layout, Database, Bot } from 'lucide-react';

export function Services() {
  const services = [
    {
      title: 'Backend Architecture',
      description: 'Designing and building scalable, secure, and highly-available REST and GraphQL APIs using NestJS and Node.js.',
      icon: <Server className="w-8 h-8 text-signal mb-4" />
    },
    {
      title: 'Frontend Development',
      description: 'Crafting responsive, accessible, and highly interactive user interfaces with React, Next.js, and Tailwind CSS.',
      icon: <Layout className="w-8 h-8 text-signal mb-4" />
    },
    {
      title: 'Database Design',
      description: 'Structuring optimized relational and NoSQL databases using PostgreSQL, MongoDB, and Redis via Prisma ORM.',
      icon: <Database className="w-8 h-8 text-signal mb-4" />
    },
    {
      title: 'AI Integrations',
      description: 'Implementing Retrieval-Augmented Generation (RAG) pipelines and LLM integrations using OpenAI and LangChain.',
      icon: <Bot className="w-8 h-8 text-signal mb-4" />
    }
  ];

  return (
    <section id="services" className="py-20 bg-panel border-t border-hairline">
      <div className="container mx-auto px-4 max-w-5xl">
        <h2 className="text-sm font-mono text-muted mb-12">// 02 — Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="p-8 hover:border-signal transition-colors">
              {service.icon}
              <h3 className="text-xl font-display font-bold mb-3">{service.title}</h3>
              <p className="text-muted leading-relaxed">{service.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src', 'components', 'sections');

// About
fs.writeFileSync(path.join(srcDir, 'About.tsx'), `import * as React from 'react';

export function About() {
  return (
    <section id="about" className="py-20 border-t border-hairline">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-sm font-mono text-muted mb-8">// 01 — About</h2>
        <div className="text-lg md:text-xl leading-relaxed text-primary">
          <p className="mb-6">
            I'm a Full Stack Developer with a passion for building robust, scalable applications. With a strong foundation in both frontend and backend technologies, I specialize in creating seamless user experiences powered by highly efficient server architectures.
          </p>
          <p>
            When I'm not coding, I'm exploring the latest advancements in AI and discovering new ways to integrate machine learning into everyday applications.
          </p>
        </div>
      </div>
    </section>
  );
}
`);

// Services
fs.writeFileSync(path.join(srcDir, 'Services.tsx'), `import * as React from 'react';
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
`);

// FreelanceProcess
fs.writeFileSync(path.join(srcDir, 'FreelanceProcess.tsx'), `import * as React from 'react';

export function FreelanceProcess() {
  const steps = [
    { num: '01', title: 'Discovery', desc: 'Understanding your business goals, target audience, and technical requirements.' },
    { num: '02', title: 'Architecture', desc: 'Designing the database schema, API structure, and choosing the right tech stack.' },
    { num: '03', title: 'Development', desc: 'Writing clean, testable code with regular progress updates and continuous integration.' },
    { num: '04', title: 'Deployment', desc: 'Setting up CI/CD pipelines, cloud hosting, and monitoring for a smooth launch.' },
  ];

  return (
    <section id="process" className="py-20 border-t border-hairline">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-sm font-mono text-muted mb-12">// 08 — Freelance Process</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="text-4xl font-display font-bold text-hairline mb-4">{step.num}</div>
              <h3 className="text-lg font-bold text-primary mb-2">{step.title}</h3>
              <p className="text-sm text-muted">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
`);

// FAQ
fs.writeFileSync(path.join(srcDir, 'FAQ.tsx'), `import * as React from 'react';

export function FAQ() {
  const faqs = [
    {
      q: 'What is your typical tech stack?',
      a: 'I primarily work with Next.js (React) for the frontend and NestJS (Node.js) for the backend, typically paired with PostgreSQL and Prisma ORM. I also frequently use Tailwind CSS for styling.'
    },
    {
      q: 'Do you take on freelance projects?',
      a: 'Yes! I am currently available for freelance opportunities. Use the contact form below to get in touch and we can discuss your project requirements.'
    },
    {
      q: 'Can you integrate AI into my application?',
      a: 'Absolutely. I have experience building RAG (Retrieval-Augmented Generation) pipelines and integrating LLMs from OpenAI into web applications to provide smart, context-aware features.'
    }
  ];

  return (
    <section id="faq" className="py-20 bg-panel border-t border-hairline">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-sm font-mono text-muted mb-12">// 09 — FAQ</h2>
        <div className="space-y-8">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-hairline pb-8 last:border-0 last:pb-0">
              <h3 className="text-lg font-bold text-primary mb-3 flex gap-3">
                <span className="text-signal font-mono">Q.</span>
                {faq.q}
              </h3>
              <div className="text-muted leading-relaxed flex gap-3">
                <span className="text-hairline font-mono">A.</span>
                <p>{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
`);

console.log('Remaining static sections scaffolded successfully.');

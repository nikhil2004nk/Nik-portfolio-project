import * as React from 'react';

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

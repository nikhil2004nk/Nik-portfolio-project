'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { ScrollReveal } from '../ui/ScrollReveal';

export function FAQ() {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  const faqs = [
    {
      q: 'What is your typical tech stack?',
      a: 'I primarily work with React.js and Next.js for the frontend and NestJS for the backend, typically paired with MySQL or ClickHouse. I also frequently use Tailwind CSS for styling.'
    },
    {
      q: 'Do you take on freelance projects?',
      a: 'Yes! I am currently available for freelance opportunities. Use the contact form below to get in touch and we can discuss your project requirements.'
    },
    {
      q: 'Can you build secure fintech workflows?',
      a: 'Absolutely. I have experience building secure KYC/KYB onboarding systems, payment workflows, and integrating various verification APIs for fintech platforms.'
    }
  ];

  return (
    <section id="faq" className="py-20 bg-panel border-t border-hairline">
      <ScrollReveal className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-sm font-mono text-muted mb-12">// 09 — FAQ</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-hairline pb-4 last:border-0 last:pb-0">
              <button
                className="w-full text-left flex items-center justify-between py-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal rounded-md"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <h3 className="text-lg font-bold text-primary flex gap-3">
                  <span className="text-signal font-mono">Q.</span>
                  {faq.q}
                </h3>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="w-5 h-5 text-muted" />
                </motion.div>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="text-muted leading-relaxed flex gap-3 pt-2 pb-6">
                      <span className="text-hairline font-mono">A.</span>
                      <p>{faq.a}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}

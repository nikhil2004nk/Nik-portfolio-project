'use client';

import * as React from 'react';
import ReactMarkdown from 'react-markdown';

interface ProjectContentTabsProps {
  project: any;
}

const SmartContentRenderer = ({ content }: { content: string }) => {
  try {
    // Try to parse the content as JSON
    const parsed = JSON.parse(content);
    
    // If it's an array of objects (like Timeline, Highlights, or Case Study)
    if (Array.isArray(parsed)) {
      return (
        <ul className="space-y-8">
          {parsed.map((item, idx) => (
            <li key={idx} className={item.heading ? "mb-12" : "bg-panel border border-hairline p-6 rounded-xl"}>
              {item.heading && <h2 className="text-2xl font-display font-bold text-signal mb-4 border-b border-hairline pb-2">{item.heading}</h2>}
              {item.title && <h3 className="text-xl font-display font-bold text-signal mb-2">{item.title}</h3>}
              {item.phase && <h3 className="text-xl font-display font-bold text-signal mb-2">{item.phase}</h3>}
              {item.description && <p className="text-muted leading-relaxed">{item.description}</p>}
              {item.content && (
                <div className="prose prose-invert prose-headings:text-primary prose-a:text-signal prose-strong:text-signal max-w-none text-primary leading-relaxed mt-4">
                  <ReactMarkdown>{item.content}</ReactMarkdown>
                </div>
              )}
            </li>
          ))}
        </ul>
      );
    }
    
    // If it's a generic JSON object (like Architecture or Deployment)
    if (typeof parsed === 'object' && parsed !== null) {
      return (
        <div className="space-y-8">
          {Object.entries(parsed).map(([key, value], idx) => {
            const formatKey = (k: string) => k.replace(/_/g, ' ').toUpperCase();
            
            // Handle String values
            if (typeof value === 'string') {
              return (
                <div key={idx} className="bg-panel/50 border border-hairline p-6 rounded-xl">
                  <h3 className="text-sm font-mono text-signal mb-2">{formatKey(key)}</h3>
                  <p className="text-primary leading-relaxed">{value}</p>
                </div>
              );
            }
            
            // Handle Array of Objects (e.g. Architecture components)
            if (Array.isArray(value) && typeof value[0] === 'object') {
              return (
                <div key={idx}>
                  <h3 className="text-sm font-mono text-signal mb-4">{formatKey(key)}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {value.map((item, i) => (
                      <div key={i} className="bg-panel border border-hairline p-5 rounded-xl">
                        {item.name && <h4 className="font-bold text-primary mb-1">{item.name}</h4>}
                        {item.technology && <span className="inline-block text-xs font-mono text-signal mb-2 bg-signal/10 px-2 py-1 rounded">{item.technology}</span>}
                        {item.responsibility && <p className="text-muted text-sm">{item.responsibility}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              );
            }
            
            // Handle Array of Strings (e.g. Architecture flow)
            if (Array.isArray(value) && typeof value[0] === 'string') {
              return (
                <div key={idx}>
                  <h3 className="text-sm font-mono text-signal mb-4">{formatKey(key)}</h3>
                  <div className="flex flex-wrap gap-2">
                    {value.map((item, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <span className="bg-panel border border-hairline text-primary px-3 py-1.5 rounded-lg text-sm">{item}</span>
                        {i < value.length - 1 && <span className="text-muted">→</span>}
                      </div>
                    ))}
                  </div>
                </div>
              );
            }
            
            // Handle Nested Objects (e.g. Deployment frontend/backend)
            if (typeof value === 'object' && !Array.isArray(value)) {
              return (
                <div key={idx}>
                  <h3 className="text-sm font-mono text-signal mb-4">{formatKey(key)}</h3>
                  <div className="bg-panel border border-hairline p-6 rounded-xl space-y-4">
                    {Object.entries(value as object).map(([subKey, subVal], i) => (
                      <div key={i}>
                        <strong className="block text-primary text-sm font-medium mb-1 capitalize">{subKey.replace(/_/g, ' ')}</strong>
                        <span className="text-muted text-sm">{String(subVal)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            }

            return null;
          })}
        </div>
      );
    }
  } catch (e) {
    // Not valid JSON, fallback to Markdown rendering
  }

  return (
    <div className="text-base md:text-lg text-primary leading-relaxed prose prose-invert prose-headings:text-primary prose-headings:font-display prose-h1:text-3xl prose-h2:text-2xl prose-a:text-signal prose-strong:text-signal max-w-none">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
};

export function ProjectContentTabs({ project }: ProjectContentTabsProps) {
  // Extract all sections that actually have content
  const tabs = [
    { id: 'caseStudy', label: 'Case Study', content: project.caseStudy?.content },
    { id: 'highlights', label: 'Highlights', content: project.highlights?.content },
    { id: 'architecture', label: 'Architecture', content: project.architecture?.content },
    { id: 'deployment', label: 'Deployment', content: project.deployment?.content },
    { id: 'timeline', label: 'Timeline', content: project.timeline?.content },
  ].filter(tab => tab.content);

  const [activeTab, setActiveTab] = React.useState(tabs[0]?.id);

  if (tabs.length === 0) return null;

  return (
    <div className="w-full">
      {/* Tabs Navigation */}
      <div className="flex border-b border-hairline mb-8 overflow-x-auto scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-4 text-sm font-mono whitespace-nowrap border-b-2 transition-all ${
              activeTab === tab.id 
                ? 'border-signal text-signal' 
                : 'border-transparent text-muted hover:text-primary hover:border-hairline'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      
      {/* Tab Content Panels */}
      <div>
        {tabs.map((tab) => (
          <div 
            key={tab.id} 
            className={activeTab === tab.id ? 'block animate-in fade-in duration-500' : 'hidden'}
          >
            <SmartContentRenderer content={tab.content} />
          </div>
        ))}
      </div>
    </div>
  );
}

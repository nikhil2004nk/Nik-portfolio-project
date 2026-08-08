import React, { useState } from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { TextField } from '../../../../../components/forms/TextField';
import { TextAreaField } from '../../../../../components/forms/TextAreaField';
import { RichTextField } from '../../../../../components/forms/RichTextField';
import { Button } from '../../../../../components/ui/Button';

export function OverviewTab() {
  const { register, control, setValue } = useFormContext();
  const [expandedSections, setExpandedSections] = useState({
    caseStudy: true,
    highlights: false,
  });
  const [expandedOptions, setExpandedOptions] = useState<Record<string, boolean>>({
    caseStudyRaw: false,
    caseStudyStructured: false,
    highlightsRaw: false,
    highlightsStructured: false,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const toggleOption = (option: string) => {
    setExpandedOptions(prev => ({ ...prev, [option]: !prev[option] }));
  };

  const { fields: caseStudyFields, append: appendCaseStudy, remove: removeCaseStudy } = useFieldArray({
    control,
    name: 'caseStudyArr',
  });

  const { fields: highlightFields, append: appendHighlight, remove: removeHighlight } = useFieldArray({
    control,
    name: 'highlightsArr',
  });

  return (
    <div className="space-y-6">
      {/* CASE STUDY */}
      <div className="bg-ink/30 border border-hairline rounded-xl overflow-hidden">
        <div className="p-6 flex items-center justify-between cursor-pointer hover:bg-ink/50 transition-colors" onClick={() => toggleSection('caseStudy')}>
          <div>
            <h3 className="text-lg font-display text-signal mb-1">Case Study</h3>
            <p className="text-sm text-muted font-mono">Raw Markdown OR Structured Sections</p>
          </div>
          <span className="text-signal">{expandedSections.caseStudy ? '▼' : '▶'}</span>
        </div>
        {expandedSections.caseStudy && (
          <div className="p-6 border-t border-hairline space-y-4 bg-panel/30">
            {/* Case Study Option 1 */}
            <div className="border border-hairline rounded-lg overflow-hidden bg-ink/20">
              <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-ink/40 transition-colors" onClick={() => toggleOption('caseStudyRaw')}>
                <div className="text-sm font-mono text-muted">Option 1: Raw Markdown</div>
                <div className="flex items-center gap-4">
                  <Button type="button" variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); setValue('content', '', { shouldDirty: true }); }} className="text-alert hover:bg-alert/10 h-8 text-xs">Clear Raw</Button>
                  <span className="text-signal text-xs">{expandedOptions.caseStudyRaw ? '▼' : '▶'}</span>
                </div>
              </div>
              {expandedOptions.caseStudyRaw && (
                <div className="p-4 border-t border-hairline bg-panel/30">
                  <RichTextField label="Raw Markdown Content" registration={register('content')} className="min-h-[250px] font-mono text-sm" />
                </div>
              )}
            </div>

            {/* Case Study Option 2 */}
            <div className="border border-hairline rounded-lg overflow-hidden bg-ink/20">
              <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-ink/40 transition-colors" onClick={() => toggleOption('caseStudyStructured')}>
                <div className="text-sm font-mono text-muted">Option 2: Structured Sections</div>
                <div className="flex items-center gap-4">
                  <Button type="button" variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); setValue('caseStudyArr', [], { shouldDirty: true }); }} className="text-alert hover:bg-alert/10 h-8 text-xs">Clear All</Button>
                  <Button type="button" variant="outline" size="sm" onClick={(e) => { e.stopPropagation(); appendCaseStudy({ heading: '', content: '' }); }}>+ Add Section</Button>
                  <span className="text-signal text-xs">{expandedOptions.caseStudyStructured ? '▼' : '▶'}</span>
                </div>
              </div>
              {expandedOptions.caseStudyStructured && (
                <div className="p-4 border-t border-hairline bg-panel/30 space-y-4">
                  {caseStudyFields.map((field, index) => (
                    <div key={field.id} className="flex gap-4 items-start p-4 bg-ink/50 border border-hairline rounded-lg">
                      <div className="flex-1 space-y-4">
                        <TextField label={`Section ${index + 1} Heading`} registration={register(`caseStudyArr.${index}.heading` as const)} required />
                        <TextAreaField label="Content" registration={register(`caseStudyArr.${index}.content` as const)} />
                      </div>
                      <Button type="button" variant="outline" className="text-alert border-alert/20 hover:bg-alert/10 mt-6" onClick={() => removeCaseStudy(index)}>Remove</Button>
                    </div>
                  ))}
                  {caseStudyFields.length === 0 && <p className="text-sm text-muted text-center py-4 bg-panel rounded border border-hairline">No sections added. Using Option 1 (Raw Markdown).</p>}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* HIGHLIGHTS */}
      <div className="bg-ink/30 border border-hairline rounded-xl overflow-hidden">
        <div className="p-6 flex items-center justify-between cursor-pointer hover:bg-ink/50 transition-colors" onClick={() => toggleSection('highlights')}>
          <div>
            <h3 className="text-lg font-display text-signal mb-1">Highlights</h3>
            <p className="text-sm text-muted font-mono">Raw Markdown OR Structured List</p>
          </div>
          <span className="text-signal">{expandedSections.highlights ? '▼' : '▶'}</span>
        </div>
        {expandedSections.highlights && (
          <div className="p-6 border-t border-hairline space-y-4 bg-panel/30">
            {/* Highlights Option 1 */}
            <div className="border border-hairline rounded-lg overflow-hidden bg-ink/20">
              <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-ink/40 transition-colors" onClick={() => toggleOption('highlightsRaw')}>
                <div className="text-sm font-mono text-muted">Option 1: Raw Markdown</div>
                <div className="flex items-center gap-4">
                  <Button type="button" variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); setValue('highlightsRaw', '', { shouldDirty: true }); }} className="text-alert hover:bg-alert/10 h-8 text-xs">Clear Raw</Button>
                  <span className="text-signal text-xs">{expandedOptions.highlightsRaw ? '▼' : '▶'}</span>
                </div>
              </div>
              {expandedOptions.highlightsRaw && (
                <div className="p-4 border-t border-hairline bg-panel/30">
                  <RichTextField label="Raw Markdown Content" registration={register('highlightsRaw')} className="min-h-[200px] font-mono text-sm" />
                </div>
              )}
            </div>

            {/* Highlights Option 2 */}
            <div className="border border-hairline rounded-lg overflow-hidden bg-ink/20">
              <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-ink/40 transition-colors" onClick={() => toggleOption('highlightsStructured')}>
                <div className="text-sm font-mono text-muted">Option 2: Structured List</div>
                <div className="flex items-center gap-4">
                  <Button type="button" variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); setValue('highlightsArr', [], { shouldDirty: true }); }} className="text-alert hover:bg-alert/10 h-8 text-xs">Clear All</Button>
                  <Button type="button" variant="outline" size="sm" onClick={(e) => { e.stopPropagation(); appendHighlight({ title: '', description: '' }); }}>+ Add Highlight</Button>
                  <span className="text-signal text-xs">{expandedOptions.highlightsStructured ? '▼' : '▶'}</span>
                </div>
              </div>
              {expandedOptions.highlightsStructured && (
                <div className="p-4 border-t border-hairline bg-panel/30 space-y-4">
                  {highlightFields.map((field, index) => (
                    <div key={field.id} className="flex gap-4 items-start p-4 bg-ink/50 border border-hairline rounded-lg">
                      <div className="flex-1 space-y-4">
                        <TextField label={`Highlight ${index + 1} Title`} registration={register(`highlightsArr.${index}.title` as const)} required />
                        <TextAreaField label="Description" registration={register(`highlightsArr.${index}.description` as const)} />
                      </div>
                      <Button type="button" variant="outline" className="text-alert border-alert/20 hover:bg-alert/10 mt-6" onClick={() => removeHighlight(index)}>Remove</Button>
                    </div>
                  ))}
                  {highlightFields.length === 0 && <p className="text-sm text-muted text-center py-4 bg-panel rounded border border-hairline">No highlights added. Using Option 1 (Raw Markdown).</p>}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

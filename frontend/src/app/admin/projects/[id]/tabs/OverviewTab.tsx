import React, { useState } from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { TextField } from '../../../../../components/forms/TextField';
import { TextAreaField } from '../../../../../components/forms/TextAreaField';
import { RichTextField } from '../../../../../components/forms/RichTextField';
import { Button } from '../../../../../components/ui/Button';
import { DEFAULT_STRUCTURED_SECTIONS, DEFAULT_HIGHLIGHTS_ARR } from '../constants';

export function OverviewTab() {
  const { register, control, setValue, watch } = useFormContext();
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
  const [confirmDialog, setConfirmDialog] = useState<{ message: string, onConfirm: () => void } | null>(null);

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const toggleOption = (option: string) => {
    setExpandedOptions(prev => ({ ...prev, [option]: !prev[option] }));
  };

  const { fields: caseStudyFields, append: appendCaseStudy, remove: removeCaseStudy, replace: replaceCaseStudy } = useFieldArray({
    control,
    name: 'caseStudyArr',
  });

  const { fields: highlightFields, append: appendHighlight, remove: removeHighlight, replace: replaceHighlight } = useFieldArray({
    control,
    name: 'highlightsArr',
  });

  // Watch raw fields to determine active states
  const contentVal = watch('content');
  const highlightsRawVal = watch('highlightsRaw');

  const isCaseStudyStructuredActive = caseStudyFields.length > 0;
  const isCaseStudyRawActive = !isCaseStudyStructuredActive;

  const isHighlightsStructuredActive = highlightFields.length > 0;
  const isHighlightsRawActive = !isHighlightsStructuredActive;

  const handleAddCaseStudy = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isCaseStudyStructuredActive) {
      if (contentVal && contentVal.trim().length > 0) {
        setConfirmDialog({
          message: 'This will clear your Raw Markdown. Continue?',
          onConfirm: () => {
            setValue('content', '', { shouldDirty: true });
            replaceCaseStudy(DEFAULT_STRUCTURED_SECTIONS);
            setExpandedOptions(prev => ({ ...prev, caseStudyStructured: true, caseStudyRaw: false }));
          }
        });
        return;
      }
      replaceCaseStudy(DEFAULT_STRUCTURED_SECTIONS);
    } else {
      appendCaseStudy({ heading: '', content: '' });
    }
    setExpandedOptions(prev => ({ ...prev, caseStudyStructured: true, caseStudyRaw: false }));
  };

  const handleAddHighlight = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isHighlightsStructuredActive) {
      if (highlightsRawVal && highlightsRawVal.trim().length > 0) {
        setConfirmDialog({
          message: 'This will clear your Raw Markdown. Continue?',
          onConfirm: () => {
            setValue('highlightsRaw', '', { shouldDirty: true });
            replaceHighlight(DEFAULT_HIGHLIGHTS_ARR);
            setExpandedOptions(prev => ({ ...prev, highlightsStructured: true, highlightsRaw: false }));
          }
        });
        return;
      }
      replaceHighlight(DEFAULT_HIGHLIGHTS_ARR);
    } else {
      appendHighlight({ title: '', description: '' });
    }
    setExpandedOptions(prev => ({ ...prev, highlightsStructured: true, highlightsRaw: false }));
  };

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
            <div className={`border rounded-lg overflow-hidden transition-all ${isCaseStudyRawActive ? 'border-signal bg-ink/30' : 'border-hairline bg-ink/10 opacity-70'}`}>
              <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-ink/40 transition-colors" onClick={() => toggleOption('caseStudyRaw')}>
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${isCaseStudyRawActive ? 'bg-signal' : 'bg-hairline'}`}></div>
                  <div className={`text-sm font-mono ${isCaseStudyRawActive ? 'text-signal' : 'text-muted'}`}>Option 1: Raw Markdown {isCaseStudyRawActive && '(Active)'}</div>
                </div>
                <div className="flex items-center gap-4">
                  <Button type="button" variant="ghost" size="sm" onClick={(e) => { 
                    e.stopPropagation(); 
                    setConfirmDialog({
                      message: 'This will clear your Raw Markdown. Continue?',
                      onConfirm: () => setValue('content', '', { shouldDirty: true })
                    });
                  }} className="text-alert hover:bg-alert/10 h-8 text-xs">Clear Raw</Button>
                  <span className="text-signal text-xs">{expandedOptions.caseStudyRaw ? '▼' : '▶'}</span>
                </div>
              </div>
              {expandedOptions.caseStudyRaw && (
                <div className="p-4 border-t border-hairline bg-panel/30 relative">
                  {!isCaseStudyRawActive && (
                    <div className="absolute inset-0 z-10 bg-panel/80 flex items-center justify-center backdrop-blur-sm">
                      <div className="text-center p-4 bg-ink border border-hairline rounded shadow-lg">
                        <p className="text-sm text-muted mb-3">Structured Mode is currently active.</p>
                        <Button type="button" variant="outline" size="sm" onClick={() => { 
                          setConfirmDialog({
                            message: 'This will clear your Structured Sections. Continue?',
                            onConfirm: () => {
                              replaceCaseStudy([]); 
                              setValue('content', ' ', {shouldDirty: true}); 
                              setTimeout(()=>setValue('content', '', {shouldDirty: true}), 0);
                            }
                          });
                        }}>Clear Structured to Use Raw</Button>
                      </div>
                    </div>
                  )}
                  <RichTextField label="Raw Markdown Content" registration={register('content')} className="min-h-[250px] font-mono text-sm" />
                </div>
              )}
            </div>

            {/* Case Study Option 2 */}
            <div className={`border rounded-lg overflow-hidden transition-all ${isCaseStudyStructuredActive ? 'border-signal bg-ink/30' : 'border-hairline bg-ink/10'}`}>
              <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-ink/40 transition-colors" onClick={() => toggleOption('caseStudyStructured')}>
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${isCaseStudyStructuredActive ? 'bg-signal' : 'bg-hairline'}`}></div>
                  <div className={`text-sm font-mono ${isCaseStudyStructuredActive ? 'text-signal' : 'text-muted'}`}>Option 2: Structured Sections {isCaseStudyStructuredActive && '(Active)'}</div>
                </div>
                <div className="flex items-center gap-4">
                  <Button type="button" variant="ghost" size="sm" onClick={(e) => { 
                    e.stopPropagation(); 
                    setConfirmDialog({
                      message: 'This will clear your Structured Sections. Continue?',
                      onConfirm: () => replaceCaseStudy([])
                    });
                  }} className="text-alert hover:bg-alert/10 h-8 text-xs">Clear All</Button>
                  <Button type="button" variant="outline" size="sm" onClick={handleAddCaseStudy}>+ Add Section</Button>
                  <span className="text-signal text-xs">{expandedOptions.caseStudyStructured ? '▼' : '▶'}</span>
                </div>
              </div>
              {expandedOptions.caseStudyStructured && (
                <div className="p-4 border-t border-hairline bg-panel/30 space-y-4 relative">
                  {caseStudyFields.map((field, index) => (
                    <div key={field.id} className="flex gap-4 items-start p-4 bg-ink/50 border border-hairline rounded-lg">
                      <div className="flex-1 space-y-4">
                        <TextField label={`Section ${index + 1} Heading`} registration={register(`caseStudyArr.${index}.heading` as const)} required />
                        <TextAreaField label="Content" registration={register(`caseStudyArr.${index}.content` as const)} />
                      </div>
                      <Button type="button" variant="outline" className="text-alert border-alert/20 hover:bg-alert/10 mt-6" onClick={() => removeCaseStudy(index)}>Remove</Button>
                    </div>
                  ))}
                  {caseStudyFields.length === 0 && (
                    <div className="text-center py-8 bg-panel rounded border border-hairline">
                      <p className="text-sm text-muted mb-3">No sections added. Click below to switch to Structured Mode.</p>
                      <Button type="button" variant="primary" size="sm" onClick={handleAddCaseStudy}>Switch to Structured Mode</Button>
                    </div>
                  )}
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
            <div className={`border rounded-lg overflow-hidden transition-all ${isHighlightsRawActive ? 'border-signal bg-ink/30' : 'border-hairline bg-ink/10 opacity-70'}`}>
              <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-ink/40 transition-colors" onClick={() => toggleOption('highlightsRaw')}>
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${isHighlightsRawActive ? 'bg-signal' : 'bg-hairline'}`}></div>
                  <div className={`text-sm font-mono ${isHighlightsRawActive ? 'text-signal' : 'text-muted'}`}>Option 1: Raw Markdown {isHighlightsRawActive && '(Active)'}</div>
                </div>
                <div className="flex items-center gap-4">
                  <Button type="button" variant="ghost" size="sm" onClick={(e) => { 
                    e.stopPropagation(); 
                    setConfirmDialog({
                      message: 'This will clear your Raw Markdown. Continue?',
                      onConfirm: () => setValue('highlightsRaw', '', { shouldDirty: true })
                    });
                  }} className="text-alert hover:bg-alert/10 h-8 text-xs">Clear Raw</Button>
                  <span className="text-signal text-xs">{expandedOptions.highlightsRaw ? '▼' : '▶'}</span>
                </div>
              </div>
              {expandedOptions.highlightsRaw && (
                <div className="p-4 border-t border-hairline bg-panel/30 relative">
                  {!isHighlightsRawActive && (
                    <div className="absolute inset-0 z-10 bg-panel/80 flex items-center justify-center backdrop-blur-sm">
                      <div className="text-center p-4 bg-ink border border-hairline rounded shadow-lg">
                        <p className="text-sm text-muted mb-3">Structured Mode is currently active.</p>
                        <Button type="button" variant="outline" size="sm" onClick={() => { 
                          setConfirmDialog({
                            message: 'This will clear your Structured List. Continue?',
                            onConfirm: () => {
                              replaceHighlight([]); 
                              setValue('highlightsRaw', ' ', {shouldDirty: true}); 
                              setTimeout(()=>setValue('highlightsRaw', '', {shouldDirty: true}), 0);
                            }
                          });
                        }}>Clear Structured to Use Raw</Button>
                      </div>
                    </div>
                  )}
                  <RichTextField label="Raw Markdown Content" registration={register('highlightsRaw')} className="min-h-[200px] font-mono text-sm" />
                </div>
              )}
            </div>

            {/* Highlights Option 2 */}
            <div className={`border rounded-lg overflow-hidden transition-all ${isHighlightsStructuredActive ? 'border-signal bg-ink/30' : 'border-hairline bg-ink/10'}`}>
              <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-ink/40 transition-colors" onClick={() => toggleOption('highlightsStructured')}>
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${isHighlightsStructuredActive ? 'bg-signal' : 'bg-hairline'}`}></div>
                  <div className={`text-sm font-mono ${isHighlightsStructuredActive ? 'text-signal' : 'text-muted'}`}>Option 2: Structured List {isHighlightsStructuredActive && '(Active)'}</div>
                </div>
                <div className="flex items-center gap-4">
                  <Button type="button" variant="ghost" size="sm" onClick={(e) => { 
                    e.stopPropagation(); 
                    setConfirmDialog({
                      message: 'This will clear your Structured List. Continue?',
                      onConfirm: () => replaceHighlight([])
                    });
                  }} className="text-alert hover:bg-alert/10 h-8 text-xs">Clear All</Button>
                  <Button type="button" variant="outline" size="sm" onClick={handleAddHighlight}>+ Add Highlight</Button>
                  <span className="text-signal text-xs">{expandedOptions.highlightsStructured ? '▼' : '▶'}</span>
                </div>
              </div>
              {expandedOptions.highlightsStructured && (
                <div className="p-4 border-t border-hairline bg-panel/30 space-y-4 relative">
                  {highlightFields.map((field, index) => (
                    <div key={field.id} className="flex gap-4 items-start p-4 bg-ink/50 border border-hairline rounded-lg">
                      <div className="flex-1 space-y-4">
                        <TextField label={`Highlight ${index + 1} Title`} registration={register(`highlightsArr.${index}.title` as const)} required />
                        <TextAreaField label="Description" registration={register(`highlightsArr.${index}.description` as const)} />
                      </div>
                      <Button type="button" variant="outline" className="text-alert border-alert/20 hover:bg-alert/10 mt-6" onClick={() => removeHighlight(index)}>Remove</Button>
                    </div>
                  ))}
                  {highlightFields.length === 0 && (
                    <div className="text-center py-8 bg-panel rounded border border-hairline">
                      <p className="text-sm text-muted mb-3">No highlights added. Click below to switch to Structured Mode.</p>
                      <Button type="button" variant="primary" size="sm" onClick={handleAddHighlight}>Switch to Structured Mode</Button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      {confirmDialog && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-ink border border-hairline rounded-xl p-6 shadow-2xl max-w-sm w-full animate-in fade-in zoom-in duration-200">
            <h3 className="text-lg font-display text-alert mb-2">Confirm Action</h3>
            <p className="text-muted text-sm mb-6">{confirmDialog.message}</p>
            <div className="flex justify-end gap-3">
              <Button type="button" variant="outline" size="sm" onClick={() => setConfirmDialog(null)}>Cancel</Button>
              <Button type="button" size="sm" onClick={() => { confirmDialog.onConfirm(); setConfirmDialog(null); }} className="bg-alert text-white hover:bg-alert/90">Continue</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

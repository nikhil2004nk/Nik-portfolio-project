import React, { useState } from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { TextField } from '../../../../../components/forms/TextField';
import { TextAreaField } from '../../../../../components/forms/TextAreaField';
import { RichTextField } from '../../../../../components/forms/RichTextField';
import { Button } from '../../../../../components/ui/Button';

export function ArchitectureTab() {
  const { register, control, setValue } = useFormContext();
  const [expanded, setExpanded] = useState(true);
  const [expandedOptions, setExpandedOptions] = useState<Record<string, boolean>>({
    raw: false,
    structured: false,
  });

  const toggleOption = (option: string) => {
    setExpandedOptions(prev => ({ ...prev, [option]: !prev[option] }));
  };

  const { fields: archFlowFields, append: appendArchFlow, remove: removeArchFlow } = useFieldArray({
    control,
    name: 'architectureFlowArr',
  });

  const { fields: archCompFields, append: appendArchComp, remove: removeArchComp } = useFieldArray({
    control,
    name: 'architectureCompArr',
  });

  return (
    <div className="space-y-6">
      {/* ARCHITECTURE */}
      <div className="bg-ink/30 border border-hairline rounded-xl overflow-hidden">
        <div className="p-6 flex items-center justify-between cursor-pointer hover:bg-ink/50 transition-colors" onClick={() => setExpanded(!expanded)}>
          <div>
            <h3 className="text-lg font-display text-signal mb-1">Architecture</h3>
            <p className="text-sm text-muted font-mono">Raw Markdown OR Structured Builder</p>
          </div>
          <span className="text-signal">{expanded ? '▼' : '▶'}</span>
        </div>
        {expanded && (
          <div className="p-6 border-t border-hairline space-y-4 bg-panel/30">
            {/* Architecture Option 1 */}
            <div className="border border-hairline rounded-lg overflow-hidden bg-ink/20">
              <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-ink/40 transition-colors" onClick={() => toggleOption('raw')}>
                <div className="text-sm font-mono text-muted">Option 1: Raw Markdown</div>
                <div className="flex items-center gap-4">
                  <Button type="button" variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); setValue('architectureRaw', '', { shouldDirty: true }); }} className="text-alert hover:bg-alert/10 h-8 text-xs">Clear Raw</Button>
                  <span className="text-signal text-xs">{expandedOptions.raw ? '▼' : '▶'}</span>
                </div>
              </div>
              {expandedOptions.raw && (
                <div className="p-4 border-t border-hairline bg-panel/30">
                  <RichTextField label="Raw Markdown Content" registration={register('architectureRaw')} className="min-h-[200px] font-mono text-sm" />
                </div>
              )}
            </div>

            {/* Architecture Option 2 */}
            <div className="border border-hairline rounded-lg overflow-hidden bg-ink/20">
              <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-ink/40 transition-colors" onClick={() => toggleOption('structured')}>
                <div className="text-sm font-mono text-muted">Option 2: Structured Builder</div>
                <div className="flex items-center gap-4">
                  <Button type="button" variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); setValue('architectureOverview', '', { shouldDirty: true }); setValue('architectureFlowArr', [], { shouldDirty: true }); setValue('architectureCompArr', [], { shouldDirty: true }); }} className="text-alert hover:bg-alert/10 h-8 text-xs">Clear All</Button>
                  <span className="text-signal text-xs">{expandedOptions.structured ? '▼' : '▶'}</span>
                </div>
              </div>
              {expandedOptions.structured && (
                <div className="p-4 border-t border-hairline bg-panel/30 space-y-8">
                  <TextAreaField label="Overview" registration={register('architectureOverview')} />
                  
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-primary">Flow / Pipeline</span>
                      <Button type="button" variant="outline" onClick={() => appendArchFlow({ step: '' })}>+ Add Step</Button>
                    </div>
                    <div className="space-y-4">
                      {archFlowFields.map((field, index) => (
                        <div key={field.id} className="flex gap-4 items-start">
                          <div className="flex-1">
                            <TextField label={`Step ${index + 1}`} registration={register(`architectureFlowArr.${index}.step` as const)} required />
                          </div>
                          <Button type="button" variant="outline" className="text-alert border-alert/20 hover:bg-alert/10 mt-6" onClick={() => removeArchFlow(index)}>Remove</Button>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-primary">Components</span>
                      <Button type="button" variant="outline" onClick={() => appendArchComp({ name: '', technology: '', responsibility: '' })}>+ Add Component</Button>
                    </div>
                    <div className="space-y-4">
                      {archCompFields.map((field, index) => (
                        <div key={field.id} className="flex gap-4 items-start p-4 bg-ink/50 border border-hairline rounded-lg">
                          <div className="flex-1 grid grid-cols-2 gap-4">
                            <TextField label="Component Name" registration={register(`architectureCompArr.${index}.name` as const)} required />
                            <TextField label="Technology" registration={register(`architectureCompArr.${index}.technology` as const)} required />
                            <div className="col-span-2">
                              <TextAreaField label="Responsibility" registration={register(`architectureCompArr.${index}.responsibility` as const)} />
                            </div>
                          </div>
                          <Button type="button" variant="outline" className="text-alert border-alert/20 hover:bg-alert/10 mt-6" onClick={() => removeArchComp(index)}>Remove</Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

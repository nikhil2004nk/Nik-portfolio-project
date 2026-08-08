import React, { useState } from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { TextField } from '../../../../../components/forms/TextField';
import { TextAreaField } from '../../../../../components/forms/TextAreaField';
import { RichTextField } from '../../../../../components/forms/RichTextField';
import { Button } from '../../../../../components/ui/Button';

export function DeploymentTab() {
  const { register, control, setValue } = useFormContext();
  const [expanded, setExpanded] = useState(true);
  const [expandedOptions, setExpandedOptions] = useState<Record<string, boolean>>({
    raw: false,
    structured: false,
  });

  const toggleOption = (option: string) => {
    setExpandedOptions(prev => ({ ...prev, [option]: !prev[option] }));
  };

  const { fields: deploymentFields, append: appendDeployment, remove: removeDeployment } = useFieldArray({
    control,
    name: 'deploymentArr',
  });

  return (
    <div className="space-y-6">
      {/* DEPLOYMENT */}
      <div className="bg-ink/30 border border-hairline rounded-xl overflow-hidden">
        <div className="p-6 flex items-center justify-between cursor-pointer hover:bg-ink/50 transition-colors" onClick={() => setExpanded(!expanded)}>
          <div>
            <h3 className="text-lg font-display text-signal mb-1">Deployment</h3>
            <p className="text-sm text-muted font-mono">Raw Markdown OR Structured Environments</p>
          </div>
          <span className="text-signal">{expanded ? '▼' : '▶'}</span>
        </div>
        {expanded && (
          <div className="p-6 border-t border-hairline space-y-4 bg-panel/30">
            {/* Deployment Option 1 */}
            <div className="border border-hairline rounded-lg overflow-hidden bg-ink/20">
              <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-ink/40 transition-colors" onClick={() => toggleOption('raw')}>
                <div className="text-sm font-mono text-muted">Option 1: Raw Markdown</div>
                <div className="flex items-center gap-4">
                  <Button type="button" variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); setValue('deploymentRaw', '', { shouldDirty: true }); }} className="text-alert hover:bg-alert/10 h-8 text-xs">Clear Raw</Button>
                  <span className="text-signal text-xs">{expandedOptions.raw ? '▼' : '▶'}</span>
                </div>
              </div>
              {expandedOptions.raw && (
                <div className="p-4 border-t border-hairline bg-panel/30">
                  <RichTextField label="Raw Markdown Content" registration={register('deploymentRaw')} className="min-h-[200px] font-mono text-sm" />
                </div>
              )}
            </div>

            {/* Deployment Option 2 */}
            <div className="border border-hairline rounded-lg overflow-hidden bg-ink/20">
              <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-ink/40 transition-colors" onClick={() => toggleOption('structured')}>
                <div className="text-sm font-mono text-muted">Option 2: Structured Environments</div>
                <div className="flex items-center gap-4">
                  <Button type="button" variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); setValue('deploymentArr', [], { shouldDirty: true }); }} className="text-alert hover:bg-alert/10 h-8 text-xs">Clear All</Button>
                  <Button type="button" variant="outline" size="sm" onClick={(e) => { e.stopPropagation(); appendDeployment({ environment: '', technology: '', description: '' }); }}>+ Add Environment</Button>
                  <span className="text-signal text-xs">{expandedOptions.structured ? '▼' : '▶'}</span>
                </div>
              </div>
              {expandedOptions.structured && (
                <div className="p-4 border-t border-hairline bg-panel/30 space-y-4">
                  {deploymentFields.map((field, index) => (
                    <div key={field.id} className="flex gap-4 items-start p-4 bg-ink/50 border border-hairline rounded-lg">
                      <div className="flex-1 space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <TextField label="Environment Name (e.g. Frontend)" registration={register(`deploymentArr.${index}.environment` as const)} required />
                          <TextField label="Technology (e.g. Vercel)" registration={register(`deploymentArr.${index}.technology` as const)} required />
                        </div>
                        <TextAreaField label="Deployment Details" registration={register(`deploymentArr.${index}.description` as const)} />
                      </div>
                      <Button type="button" variant="outline" className="text-alert border-alert/20 hover:bg-alert/10 mt-6" onClick={() => removeDeployment(index)}>Remove</Button>
                    </div>
                  ))}
                  {deploymentFields.length === 0 && <p className="text-sm text-muted text-center py-4 bg-panel rounded border border-hairline">No environments added. Using Option 1 (Raw Markdown).</p>}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { TextField } from '../../../../../components/forms/TextField';
import { TextAreaField } from '../../../../../components/forms/TextAreaField';
import { RichTextField } from '../../../../../components/forms/RichTextField';
import { Button } from '../../../../../components/ui/Button';
import { DEFAULT_ARCHITECTURE_FLOW, DEFAULT_ARCHITECTURE_COMPONENTS, DEFAULT_ARCHITECTURE_OVERVIEW } from '../constants';

export function ArchitectureTab() {
  const { register, control, setValue, watch } = useFormContext();
  const [expanded, setExpanded] = useState(true);
  const [expandedOptions, setExpandedOptions] = useState<Record<string, boolean>>({
    raw: false,
    structured: false,
  });
  const [confirmDialog, setConfirmDialog] = useState<{ message: string, onConfirm: () => void } | null>(null);

  const toggleOption = (option: string) => {
    setExpandedOptions(prev => ({ ...prev, [option]: !prev[option] }));
  };

  const { fields: archFlowFields, append: appendArchFlow, remove: removeArchFlow, replace: replaceArchFlow } = useFieldArray({
    control,
    name: 'architectureFlowArr',
  });

  const { fields: archCompFields, append: appendArchComp, remove: removeArchComp, replace: replaceArchComp } = useFieldArray({
    control,
    name: 'architectureCompArr',
  });

  // Watch raw fields to determine active states
  const architectureRawVal = watch('architectureRaw');

  const isStructuredActive = archFlowFields.length > 0 || archCompFields.length > 0;
  const isRawActive = !isStructuredActive;

  const handleAddFlow = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isStructuredActive) {
      if (architectureRawVal && architectureRawVal.trim().length > 0) {
        setConfirmDialog({
          message: 'This will clear your Raw Markdown. Continue?',
          onConfirm: () => {
            setValue('architectureRaw', '', { shouldDirty: true });
            setValue('architectureOverview', DEFAULT_ARCHITECTURE_OVERVIEW, { shouldDirty: true });
            replaceArchFlow(DEFAULT_ARCHITECTURE_FLOW);
            replaceArchComp(DEFAULT_ARCHITECTURE_COMPONENTS);
            setExpandedOptions(prev => ({ ...prev, structured: true, raw: false }));
          }
        });
        return;
      }
      setValue('architectureOverview', DEFAULT_ARCHITECTURE_OVERVIEW, { shouldDirty: true });
      replaceArchFlow(DEFAULT_ARCHITECTURE_FLOW);
      replaceArchComp(DEFAULT_ARCHITECTURE_COMPONENTS);
    } else {
      appendArchFlow({ step: '' });
    }
    setExpandedOptions(prev => ({ ...prev, structured: true, raw: false }));
  };

  const handleAddComp = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isStructuredActive) {
      if (architectureRawVal && architectureRawVal.trim().length > 0) {
        setConfirmDialog({
          message: 'This will clear your Raw Markdown. Continue?',
          onConfirm: () => {
            setValue('architectureRaw', '', { shouldDirty: true });
            setValue('architectureOverview', DEFAULT_ARCHITECTURE_OVERVIEW, { shouldDirty: true });
            replaceArchFlow(DEFAULT_ARCHITECTURE_FLOW);
            replaceArchComp(DEFAULT_ARCHITECTURE_COMPONENTS);
            setExpandedOptions(prev => ({ ...prev, structured: true, raw: false }));
          }
        });
        return;
      }
      setValue('architectureOverview', DEFAULT_ARCHITECTURE_OVERVIEW, { shouldDirty: true });
      replaceArchFlow(DEFAULT_ARCHITECTURE_FLOW);
      replaceArchComp(DEFAULT_ARCHITECTURE_COMPONENTS);
    } else {
      appendArchComp({ name: '', technology: '', responsibility: '' });
    }
    setExpandedOptions(prev => ({ ...prev, structured: true, raw: false }));
  };

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
            <div className={`border rounded-lg overflow-hidden transition-all ${isRawActive ? 'border-signal bg-ink/30' : 'border-hairline bg-ink/10 opacity-70'}`}>
              <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-ink/40 transition-colors" onClick={() => toggleOption('raw')}>
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${isRawActive ? 'bg-signal' : 'bg-hairline'}`}></div>
                  <div className={`text-sm font-mono ${isRawActive ? 'text-signal' : 'text-muted'}`}>Option 1: Raw Markdown {isRawActive && '(Active)'}</div>
                </div>
                <div className="flex items-center gap-4">
                  <Button type="button" variant="ghost" size="sm" onClick={(e) => { 
                    e.stopPropagation(); 
                    setConfirmDialog({
                      message: 'This will clear your Raw Markdown. Continue?',
                      onConfirm: () => setValue('architectureRaw', '', { shouldDirty: true })
                    });
                  }} className="text-alert hover:bg-alert/10 h-8 text-xs">Clear Raw</Button>
                  <span className="text-signal text-xs">{expandedOptions.raw ? '▼' : '▶'}</span>
                </div>
              </div>
              {expandedOptions.raw && (
                <div className="p-4 border-t border-hairline bg-panel/30 relative">
                  {!isRawActive && (
                    <div className="absolute inset-0 z-10 bg-panel/80 flex items-center justify-center backdrop-blur-sm">
                      <div className="text-center p-4 bg-ink border border-hairline rounded shadow-lg">
                        <p className="text-sm text-muted mb-3">Structured Mode is currently active.</p>
                        <Button type="button" variant="outline" size="sm" onClick={() => { 
                          setConfirmDialog({
                            message: 'This will clear your Structured Builder. Continue?',
                            onConfirm: () => {
                              setValue('architectureOverview', '', { shouldDirty: true }); 
                              replaceArchFlow([]); 
                              replaceArchComp([]); 
                              setValue('architectureRaw', ' ', {shouldDirty: true}); 
                              setTimeout(()=>setValue('architectureRaw', '', {shouldDirty: true}), 0);
                            }
                          });
                        }}>Clear Structured to Use Raw</Button>
                      </div>
                    </div>
                  )}
                  <RichTextField label="Raw Markdown Content" registration={register('architectureRaw')} className="min-h-[200px] font-mono text-sm" />
                </div>
              )}
            </div>

            {/* Architecture Option 2 */}
            <div className={`border rounded-lg overflow-hidden transition-all ${isStructuredActive ? 'border-signal bg-ink/30' : 'border-hairline bg-ink/10'}`}>
              <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-ink/40 transition-colors" onClick={() => toggleOption('structured')}>
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${isStructuredActive ? 'bg-signal' : 'bg-hairline'}`}></div>
                  <div className={`text-sm font-mono ${isStructuredActive ? 'text-signal' : 'text-muted'}`}>Option 2: Structured Builder {isStructuredActive && '(Active)'}</div>
                </div>
                <div className="flex items-center gap-4">
                  <Button type="button" variant="ghost" size="sm" onClick={(e) => { 
                    e.stopPropagation(); 
                    setConfirmDialog({
                      message: 'This will clear your Structured Builder. Continue?',
                      onConfirm: () => {
                        setValue('architectureOverview', '', { shouldDirty: true }); 
                        replaceArchFlow([]); 
                        replaceArchComp([]);
                      }
                    });
                  }} className="text-alert hover:bg-alert/10 h-8 text-xs">Clear All</Button>
                  <span className="text-signal text-xs">{expandedOptions.structured ? '▼' : '▶'}</span>
                </div>
              </div>
              {expandedOptions.structured && (
                <div className="p-4 border-t border-hairline bg-panel/30 space-y-8 relative">
                  <TextAreaField label="Overview" registration={register('architectureOverview')} />
                  
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-primary">Flow / Pipeline</span>
                      <Button type="button" variant="outline" onClick={handleAddFlow}>+ Add Step</Button>
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
                      {archFlowFields.length === 0 && (
                        <div className="text-center py-4 bg-panel rounded border border-hairline">
                          <p className="text-sm text-muted mb-3">No steps added. Click below to switch to Structured Mode.</p>
                          <Button type="button" variant="primary" size="sm" onClick={handleAddFlow}>Add Step</Button>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-primary">Components</span>
                      <Button type="button" variant="outline" onClick={handleAddComp}>+ Add Component</Button>
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
                      {archCompFields.length === 0 && (
                        <div className="text-center py-4 bg-panel rounded border border-hairline">
                          <p className="text-sm text-muted mb-3">No components added. Click below to switch to Structured Mode.</p>
                          <Button type="button" variant="primary" size="sm" onClick={handleAddComp}>Add Component</Button>
                        </div>
                      )}
                    </div>
                  </div>
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

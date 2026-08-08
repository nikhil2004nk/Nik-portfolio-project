import React from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { TextField } from '../../../../../components/forms/TextField';
import { TextAreaField } from '../../../../../components/forms/TextAreaField';
import { Button } from '../../../../../components/ui/Button';

export function FeaturesTab() {
  const { register, control } = useFormContext();

  const { fields: featureFields, append: appendFeature, remove: removeFeature } = useFieldArray({
    control,
    name: 'features',
  });

  const { fields: metricFields, append: appendMetric, remove: removeMetric } = useFieldArray({
    control,
    name: 'metrics',
  });

  return (
    <div className="space-y-12">
      {/* FEATURES */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <label className="block text-xs font-mono text-muted uppercase tracking-wider">Features</label>
          <Button type="button" variant="outline" onClick={() => appendFeature({ title: '', description: '' })}>+ Add Feature</Button>
        </div>
        <div className="space-y-4">
          {featureFields.map((field, index) => (
            <div key={field.id} className="flex gap-4 items-start p-4 bg-ink/50 border border-hairline rounded-lg">
              <div className="flex-1 space-y-4">
                <TextField label={`Feature ${index + 1} Title`} registration={register(`features.${index}.title` as const)} required />
                <TextAreaField label="Description" registration={register(`features.${index}.description` as const)} />
              </div>
              <Button type="button" variant="outline" className="text-alert border-alert/20 hover:bg-alert/10 mt-6" onClick={() => removeFeature(index)}>Remove</Button>
            </div>
          ))}
          {featureFields.length === 0 && <p className="text-sm text-muted text-center py-4">No features added yet.</p>}
        </div>
      </div>

      {/* METRICS */}
      <div className="bg-ink/30 border border-hairline rounded-xl overflow-hidden p-6">
        <div className="flex items-center justify-between mb-4">
          <label className="block text-xs font-mono text-muted uppercase tracking-wider">Metrics</label>
          <Button type="button" variant="outline" onClick={() => appendMetric({ label: '', value: '' })}>+ Add Metric</Button>
        </div>
        <div className="space-y-4">
          {metricFields.map((field, index) => (
            <div key={field.id} className="flex gap-4 items-start p-4 bg-ink/50 border border-hairline rounded-lg">
              <div className="flex-1 grid grid-cols-2 gap-4">
                <TextField label={`Metric ${index + 1} Label (e.g. Speed)`} registration={register(`metrics.${index}.label` as const)} required />
                <TextField label="Value (e.g. 10x)" registration={register(`metrics.${index}.value` as const)} required />
              </div>
              <Button type="button" variant="outline" className="text-alert border-alert/20 hover:bg-alert/10 mt-6" onClick={() => removeMetric(index)}>Remove</Button>
            </div>
          ))}
          {metricFields.length === 0 && <p className="text-sm text-muted text-center py-4">No metrics added yet.</p>}
        </div>
      </div>
    </div>
  );
}

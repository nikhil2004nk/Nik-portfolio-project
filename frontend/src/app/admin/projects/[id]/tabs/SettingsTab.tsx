import React from 'react';
import { useFormContext } from 'react-hook-form';
import { TextField } from '../../../../../components/forms/TextField';
import { TextAreaField } from '../../../../../components/forms/TextAreaField';

export function SettingsTab() {
  const { register } = useFormContext();

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b border-hairline">
        <div className="space-y-4">
          <label className="flex items-center gap-2 text-sm font-mono text-primary cursor-pointer">
            <input type="checkbox" {...register('published')} className="form-checkbox bg-ink border-hairline text-signal rounded" />
            Published (Visible to public)
          </label>
          <label className="flex items-center gap-2 text-sm font-mono text-primary cursor-pointer">
            <input type="checkbox" {...register('featured')} className="form-checkbox bg-ink border-hairline text-signal rounded" />
            Featured (Show on homepage)
          </label>
        </div>
        <div className="space-y-4">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-mono text-muted uppercase">Status</label>
            <select {...register('status')} className="bg-ink border border-hairline rounded px-3 py-2 text-primary focus:border-signal outline-none">
              <option value="COMPLETED">Completed</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="ARCHIVED">Archived</option>
            </select>
          </div>
          <TextField label="Sort Order (0 = first)" registration={register('order')} type="number" />
        </div>
      </div>

      <div className="space-y-6">
        <label className="block text-xs font-mono text-muted uppercase tracking-wider border-b border-hairline pb-2">SEO Meta Data</label>
        <TextField label="Meta Title" registration={register('seoTitle')} />
        <TextAreaField label="Meta Description" registration={register('seoDescription')} />
        <TextField label="Keywords (comma separated)" registration={register('seoKeywords')} />
      </div>
    </div>
  );
}

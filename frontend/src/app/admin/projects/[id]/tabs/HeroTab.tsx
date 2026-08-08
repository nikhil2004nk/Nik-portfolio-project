import React from 'react';
import { useFormContext } from 'react-hook-form';
import { TextField } from '../../../../../components/forms/TextField';
import { TextAreaField } from '../../../../../components/forms/TextAreaField';

interface HeroTabProps {
  categories: any[];
  technologies: any[];
  tags: any[];
}

export function HeroTab({ categories, technologies, tags }: HeroTabProps) {
  const { register } = useFormContext();

  return (
    <div className="space-y-6">
      <TextField label="Name" registration={register('name')} required />
      <TextField label="Slug" registration={register('slug')} required />
      <TextAreaField label="Description" registration={register('description')} />

      <div className="pt-6 border-t border-hairline">
        <label className="block text-xs font-mono text-muted uppercase tracking-wider mb-4">Taxonomies</label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h4 className="text-sm text-primary mb-2">Categories</h4>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {categories.map((c: any) => (
                <label key={c.id} className="flex items-center gap-2 text-sm text-muted cursor-pointer">
                  <input type="checkbox" value={c.id} {...register('categoryIds')} className="form-checkbox bg-ink border-hairline text-signal rounded" />
                  {c.name}
                </label>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-sm text-primary mb-2">Technologies</h4>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {technologies.map((t: any) => (
                <label key={t.id} className="flex items-center gap-2 text-sm text-muted cursor-pointer">
                  <input type="checkbox" value={t.id} {...register('technologyIds')} className="form-checkbox bg-ink border-hairline text-signal rounded" />
                  {t.name}
                </label>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-sm text-primary mb-2">Tags</h4>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {tags.map((t: any) => (
                <label key={t.id} className="flex items-center gap-2 text-sm text-muted cursor-pointer">
                  <input type="checkbox" value={t.id} {...register('tagIds')} className="form-checkbox bg-ink border-hairline text-signal rounded" />
                  {t.name}
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="pt-6 border-t border-hairline space-y-6">
        <label className="block text-xs font-mono text-muted uppercase tracking-wider mb-4">External Links</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TextField label="Demo URL" registration={register('demoUrl')} />
          <TextField label="GitHub URL" registration={register('githubUrl')} />
        </div>
      </div>
    </div>
  );
}

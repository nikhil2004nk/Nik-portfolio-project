'use client';

import * as React from 'react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { projectService } from '../../../../features/project-builder/services/project.service';
import { Project } from '../../../../types/project';
import { TextField } from '../../../../components/forms/TextField';
import { TextAreaField } from '../../../../components/forms/TextAreaField';
import { RichTextField } from '../../../../components/forms/RichTextField';
import { ImageUploader } from '../../../../components/upload/ImageUploader';
import { Button } from '../../../../components/ui/Button';

export default function ProjectEditorPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const isNew = params.id === 'new';
  const [activeTab, setActiveTab] = useState('basic');
  const [loading, setLoading] = useState(!isNew);
  const [saveSuccess, setSaveSuccess] = useState(false);
  
  const { register, handleSubmit, reset, setValue, watch, formState: { isSubmitting } } = useForm<Partial<Project>>();

  const thumbnail = watch('thumbnailUrl');
  const cover = watch('coverImageUrl');

  useEffect(() => {
    if (!isNew) {
      const loadProject = async () => {
        try {
          const data = await projectService.getById(params.id);
          reset(data);
        } catch (e) {
          console.error(e);
        } finally {
          setLoading(false);
        }
      };
      loadProject();
    }
  }, [params.id, isNew, reset]);

  const onSubmit = async (data: Partial<Project>) => {
    try {
      setSaveSuccess(false);
      if (isNew) {
        await projectService.create(data);
        router.push('/admin/projects');
      } else {
        await projectService.update(params.id, data);
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleImageUpload = (field: 'thumbnailUrl' | 'coverImageUrl') => (file: File) => {
    // Mock upload: in real life, call uploadService and set URL
    console.log('Uploading', file.name);
    const mockUrl = URL.createObjectURL(file);
    setValue(field, mockUrl, { shouldDirty: true });
  };

  if (loading) return <div className="animate-pulse">Loading project...</div>;

  return (
    <div className="max-w-5xl mx-auto pb-20">
      <div className="flex items-center justify-between mb-8 border-b border-hairline pb-4">
        <h1 className="text-3xl font-display font-bold">
          {isNew ? 'New Project' : 'Edit Project'}
        </h1>
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => router.push('/admin/projects')}>Cancel</Button>
          <Button variant="primary" onClick={handleSubmit(onSubmit)} disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Save Project'}
          </Button>
        </div>
      </div>

      <div className="flex gap-8">
        <div className="w-48 shrink-0 flex flex-col gap-2">
          {['basic', 'content', 'media', 'settings'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-left px-4 py-3 rounded-md font-mono text-sm uppercase tracking-wider transition-colors ${
                activeTab === tab ? 'bg-signal/10 text-signal' : 'text-muted hover:bg-hairline hover:text-primary'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex-1 bg-panel border border-hairline p-8 rounded-lg">
          {saveSuccess && (
            <div className="mb-6 p-4 bg-signal/10 border border-signal/20 text-signal rounded font-mono text-sm">
              Project saved successfully!
            </div>
          )}

          <form className="space-y-6">
            <div className={activeTab === 'basic' ? 'block' : 'hidden'}>
              <div className="space-y-6">
                <TextField label="Title" registration={register('title')} required />
                <TextField label="Slug" registration={register('slug')} required />
                <TextAreaField label="Description" registration={register('description')} />
              </div>
            </div>

            <div className={activeTab === 'content' ? 'block' : 'hidden'}>
              <RichTextField 
                label="Main Content" 
                registration={register('content')} 
                className="min-h-[400px]"
              />
            </div>

            <div className={activeTab === 'media' ? 'block' : 'hidden'}>
              <div className="space-y-8">
                <ImageUploader 
                  label="Thumbnail Image" 
                  onUpload={handleImageUpload('thumbnailUrl')}
                  currentImage={thumbnail}
                />
                <ImageUploader 
                  label="Cover Image" 
                  onUpload={handleImageUpload('coverImageUrl')}
                  currentImage={cover}
                />
              </div>
            </div>

            <div className={activeTab === 'settings' ? 'block' : 'hidden'}>
              <div className="space-y-6">
                <label className="flex items-center gap-2 text-sm font-mono text-muted cursor-pointer">
                  <input type="checkbox" {...register('published')} className="form-checkbox bg-ink border-hairline text-signal rounded" />
                  Published
                </label>

                <TextField label="Demo URL" registration={register('demoUrl')} />
                <TextField label="GitHub URL" registration={register('githubUrl')} />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

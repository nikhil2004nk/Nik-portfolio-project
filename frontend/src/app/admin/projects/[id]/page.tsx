'use client';

import * as React from 'react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, useFieldArray } from 'react-hook-form';
import { projectService } from '../../../../features/project-builder/services/project.service';
import { uploadService } from '../../../../features/project-builder/services/upload.service';
import { Project } from '../../../../types/project';
import { TextField } from '../../../../components/forms/TextField';
import { TextAreaField } from '../../../../components/forms/TextAreaField';
import { RichTextField } from '../../../../components/forms/RichTextField';
import { ImageUploader } from '../../../../components/upload/ImageUploader';
import { GalleryUploader } from '../../../../components/upload/GalleryUploader';
import { Button } from '../../../../components/ui/Button';

export default function ProjectEditorPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = React.use(params);
  const router = useRouter();
  const isNew = resolvedParams.id === 'new';
  const [activeTab, setActiveTab] = useState('basic');
  const [loading, setLoading] = useState(!isNew);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState<'thumbnail' | 'cover' | null>(null);

  const [categories, setCategories] = useState<any[]>([]);
  const [technologies, setTechnologies] = useState<any[]>([]);
  const [tags, setTags] = useState<any[]>([]);
  
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    caseStudy: true,
    highlights: false,
    architecture: false,
    deployment: false,
    timeline: false
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const { register, control, handleSubmit, reset, setValue, watch, formState: { isSubmitting, isDirty } } = useForm<any>({
    defaultValues: {
      categoryIds: [],
      technologyIds: [],
      tagIds: [],
      caseStudyArr: [],
      highlightsArr: [],
      timelineArr: [],
      architectureFlowArr: [],
      architectureCompArr: [],
      deploymentArr: [],
      content: '',
      highlightsRaw: '',
      architectureRaw: '',
      deploymentRaw: '',
      timelineRaw: ''
    }
  });

  const { fields: featureFields, append: appendFeature, remove: removeFeature } = useFieldArray({ control, name: "features" });
  const { fields: metricFields, append: appendMetric, remove: removeMetric } = useFieldArray({ control, name: "metrics" });
  const { fields: caseStudyFields, append: appendCaseStudy, remove: removeCaseStudy } = useFieldArray({ control, name: "caseStudyArr" });
  const { fields: highlightFields, append: appendHighlight, remove: removeHighlight } = useFieldArray({ control, name: "highlightsArr" });
  const { fields: timelineFields, append: appendTimeline, remove: removeTimeline } = useFieldArray({ control, name: "timelineArr" });
  const { fields: archFlowFields, append: appendArchFlow, remove: removeArchFlow } = useFieldArray({ control, name: "architectureFlowArr" });
  const { fields: archCompFields, append: appendArchComp, remove: removeArchComp } = useFieldArray({ control, name: "architectureCompArr" });
  const { fields: deploymentFields, append: appendDeployment, remove: removeDeployment } = useFieldArray({ control, name: "deploymentArr" });

  const thumbnail = watch('thumbnailUrl');
  const gallery = watch('gallery');

  useEffect(() => {
    const fetchTaxonomies = async () => {
      try {
        const [cats, techs, tgs] = await Promise.all([
          projectService.getCategories(),
          projectService.getTechnologies(),
          projectService.getTags(),
        ]);
        setCategories(cats);
        setTechnologies(techs);
        setTags(tgs);
      } catch (e) {
        console.error('Failed to fetch taxonomies', e);
      }
    };
    fetchTaxonomies();

    if (!isNew) {
      const loadProject = async () => {
        try {
          const data = await projectService.getById(resolvedParams.id);
          // Helper to extract dual-mode data
          const extractDualMode = (dbContent: any, isArray: boolean = true) => {
            if (!dbContent) return { raw: '', parsed: isArray ? [] : {} };
            try {
              const p = JSON.parse(dbContent);
              if ((isArray && Array.isArray(p)) || (!isArray && typeof p === 'object' && !Array.isArray(p))) {
                return { raw: '', parsed: p };
              }
              return { raw: dbContent, parsed: isArray ? [] : {} };
            } catch {
              return { raw: dbContent, parsed: isArray ? [] : {} };
            }
          };

          const csData = extractDualMode(data.caseStudy?.content, true);
          const hlData = extractDualMode(data.highlights?.content, true);
          const tlData = extractDualMode(data.timeline?.content, true);
          const archData = extractDualMode(data.architecture?.content, false);
          const depData = extractDualMode(data.deployment?.content, false);

          const archOverview = archData.parsed?.overview || '';
          const archFlow = (archData.parsed?.flow || []).map((f: string) => ({ step: f }));
          const archComps = archData.parsed?.components || [];
          
          const depArr = Object.entries(depData.parsed || {}).map(([key, val]: any) => ({
             environment: key.replace(/_/g, ' '),
             ...(typeof val === 'object' ? val : { technology: val, description: '' })
          }));

          // Hydrate the form with the API data mapped to our UI fields
          reset({
            ...data,
            content: csData.raw,
            caseStudyArr: csData.parsed,
            highlightsRaw: hlData.raw,
            highlightsArr: hlData.parsed,
            timelineRaw: tlData.raw,
            timelineArr: tlData.parsed,
            architectureRaw: archData.raw,
            architectureOverview: archOverview,
            architectureFlowArr: archFlow,
            architectureCompArr: archComps,
            deploymentRaw: depData.raw,
            deploymentArr: depArr,
            githubUrl: data.links?.github || '',
            demoUrl: data.links?.demo || '',
            thumbnailUrl: data.thumbnail || '',
            gallery: data.gallery || [],
            seoTitle: data.seo?.title || '',
            seoDescription: data.seo?.description || '',
            seoKeywords: data.seo?.keywords || '',
            categoryIds: data.categories?.map((c: any) => c.categoryId) || [],
            technologyIds: data.technologies?.map((t: any) => t.technologyId) || [],
            tagIds: data.tags?.map((t: any) => t.tagId) || [],
          });
        } catch (e) {
          console.error(e);
        } finally {
          setLoading(false);
        }
      };
      loadProject();
    }
  }, [resolvedParams.id, isNew, reset]);

  const onSubmit = async (data: any) => {
    try {
      setSaveSuccess(false);
      setSaveError(null);

      // Cleanly map the UI fields to the exact shape the backend expects
      const submitData = {
        name: data.name,
        slug: data.slug,
        description: data.description,
        published: !!data.published,
        featured: !!data.featured,
        status: data.status || 'COMPLETED',
        order: data.order ? parseInt(data.order, 10) : 0,
        thumbnail: data.thumbnailUrl,
        gallery: data.gallery,
        categoryIds: data.categoryIds || [],
        technologyIds: data.technologyIds || [],
        tagIds: data.tagIds || [],
        features: data.features?.map(({ id, projectId, createdAt, updatedAt, ...f }: any, i: number) => ({ ...f, order: i })) || [],
        metrics: data.metrics?.map(({ id, projectId, createdAt, updatedAt, ...m }: any, i: number) => ({ ...m, order: i })) || [],
        caseStudy: { content: data.caseStudyArr?.length > 0 ? JSON.stringify(data.caseStudyArr.map(({ id, ...rest }: any) => rest)) : (data.content || '') },
        highlights: { content: data.highlightsArr?.length > 0 ? JSON.stringify(data.highlightsArr.map(({ id, ...rest }: any) => rest)) : (data.highlightsRaw || '') },
        architecture: { 
          content: (data.architectureOverview || data.architectureFlowArr?.length > 0 || data.architectureCompArr?.length > 0) ? JSON.stringify({
            overview: data.architectureOverview || '',
            flow: data.architectureFlowArr?.map((f: any) => f.step) || [],
            components: data.architectureCompArr?.map(({ id, ...rest }: any) => rest) || []
          }) : (data.architectureRaw || '')
        },
        deployment: { 
          content: data.deploymentArr?.length > 0 ? JSON.stringify(
            data.deploymentArr.reduce((acc: any, curr: any) => {
              if (!curr.environment) return acc;
              const key = curr.environment.toLowerCase().replace(/\s+/g, '_');
              acc[key] = { technology: curr.technology, description: curr.description };
              return acc;
            }, {})
          ) : (data.deploymentRaw || '')
        },
        timeline: { content: data.timelineArr?.length > 0 ? JSON.stringify(data.timelineArr.map(({ id, ...rest }: any) => rest)) : (data.timelineRaw || '') },
        seo: {
          title: data.seoTitle,
          description: data.seoDescription,
          keywords: data.seoKeywords,
        },
        links: {
          github: data.githubUrl,
          demo: data.demoUrl,
        }
      };

      if (isNew) {
        await projectService.create(submitData);
      } else {
        await projectService.update(resolvedParams.id, submitData);
      }
      router.push('/admin/projects');
    } catch (e: any) {
      console.error(e);
      setSaveError(e.message || 'Failed to save project. Please check your inputs.');
    }
  };

  const handleImageUpload = (field: 'thumbnailUrl') => async (file: File) => {
    // We require the project slug to be set before uploading an image so we know where to save it
    const currentSlug = watch('slug');
    if (!currentSlug) {
      setSaveError('Please enter a "Slug" in the Basic tab before uploading images so we can create a dedicated folder for this project.');
      setActiveTab('basic');
      return;
    }

    try {
      setSaveError(null);
      setUploadingImage('thumbnail');
      
      const uploadedUrl = await uploadService.uploadProjectImage(currentSlug, file);
      setValue(field, uploadedUrl, { shouldDirty: true });
    } catch (e: any) {
      console.error(e);
      setSaveError(e.message || 'Failed to upload image.');
    } finally {
      setUploadingImage(null);
    }
  };

  const handleGalleryUpload = async (file: File) => {
    const currentSlug = watch('slug');
    if (!currentSlug) {
      setSaveError('Please enter a "Slug" in the Basic tab before uploading images.');
      setActiveTab('basic');
      throw new Error("Slug required");
    }
    return await uploadService.uploadProjectImage(currentSlug, file);
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
          <Button variant="primary" onClick={handleSubmit(onSubmit)} disabled={isSubmitting || !isDirty}>
            {isSubmitting ? 'Saving...' : 'Save Project'}
          </Button>
        </div>
      </div>

      <div className="flex gap-8">
        <div className="w-48 shrink-0 flex flex-col gap-2">
          {['basic', 'content', 'features', 'media', 'settings'].map(tab => (
            <button
              key={tab}
              type="button"
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
          {saveError && (
            <div className="mb-6 p-4 bg-alert/10 border border-alert/20 text-alert rounded font-mono text-sm">
              {saveError}
            </div>
          )}

          <form className="space-y-6">
            <div className={activeTab === 'basic' ? 'block' : 'hidden'}>
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
              </div>
            </div>

            <div className={activeTab === 'content' ? 'block' : 'hidden'}>
              <div className="space-y-6">
                
                {/* CASE STUDY */}
                <div className="bg-ink/30 border border-hairline rounded-xl overflow-hidden">
                  <div className="p-6 flex items-center justify-between cursor-pointer hover:bg-ink/50 transition-colors" onClick={() => toggleSection('caseStudy')}>
                    <div><h3 className="text-lg font-display text-signal mb-1">Case Study</h3><p className="text-sm text-muted font-mono">Raw Markdown OR Structured Sections</p></div>
                    <span className="text-signal">{expandedSections.caseStudy ? '▼' : '▶'}</span>
                  </div>
                  {expandedSections.caseStudy && (
                    <div className="p-6 border-t border-hairline space-y-8 bg-panel/30">
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <div className="text-sm font-mono text-muted">Option 1: Raw Markdown</div>
                          <Button type="button" variant="ghost" size="sm" onClick={() => setValue('content', '', { shouldDirty: true })} className="text-alert hover:bg-alert/10 h-8 text-xs">Clear Raw</Button>
                        </div>
                        <RichTextField label="Raw Markdown Content" registration={register('content')} className="min-h-[250px] font-mono text-sm" />
                      </div>
                      <div className="pt-6 border-t border-hairline">
                        <div className="flex items-center justify-between mb-4">
                          <label className="block text-sm font-mono text-muted">Option 2: Structured Sections</label>
                          <div className="space-x-2">
                            <Button type="button" variant="ghost" size="sm" onClick={() => setValue('caseStudyArr', [], { shouldDirty: true })} className="text-alert hover:bg-alert/10 h-8 text-xs">Clear All</Button>
                            <Button type="button" variant="outline" onClick={() => appendCaseStudy({ heading: '', content: '' })}>+ Add Section</Button>
                          </div>
                        </div>
                        <div className="space-y-4">
                          {caseStudyFields.map((field, index) => (
                            <div key={field.id} className="flex gap-4 items-start p-4 bg-ink/50 border border-hairline rounded-lg">
                              <div className="flex-1 space-y-4">
                                <TextField label={`Section ${index + 1} Heading (e.g. The Challenge)`} registration={register(`caseStudyArr.${index}.heading` as const)} required />
                                <TextAreaField label="Content (Markdown supported)" registration={register(`caseStudyArr.${index}.content` as const)} />
                              </div>
                              <Button type="button" variant="outline" className="text-alert border-alert/20 hover:bg-alert/10 mt-6" onClick={() => removeCaseStudy(index)}>Remove</Button>
                            </div>
                          ))}
                          {caseStudyFields.length === 0 && <p className="text-sm text-muted text-center py-4 bg-panel rounded border border-hairline">No sections added. Using Option 1 (Raw Markdown).</p>}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* HIGHLIGHTS */}
                <div className="bg-ink/30 border border-hairline rounded-xl overflow-hidden">
                  <div className="p-6 flex items-center justify-between cursor-pointer hover:bg-ink/50 transition-colors" onClick={() => toggleSection('highlights')}>
                    <div><h3 className="text-lg font-display text-signal mb-1">Highlights</h3><p className="text-sm text-muted font-mono">Raw Markdown OR Structured List</p></div>
                    <span className="text-signal">{expandedSections.highlights ? '▼' : '▶'}</span>
                  </div>
                  {expandedSections.highlights && (
                    <div className="p-6 border-t border-hairline space-y-8 bg-panel/30">
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <div className="text-sm font-mono text-muted">Option 1: Raw Markdown</div>
                          <Button type="button" variant="ghost" size="sm" onClick={() => setValue('highlightsRaw', '', { shouldDirty: true })} className="text-alert hover:bg-alert/10 h-8 text-xs">Clear Raw</Button>
                        </div>
                        <RichTextField label="Raw Markdown Content" registration={register('highlightsRaw')} className="min-h-[200px] font-mono text-sm" />
                      </div>
                      <div className="pt-6 border-t border-hairline">
                        <div className="flex items-center justify-between mb-4">
                          <label className="block text-sm font-mono text-muted">Option 2: Structured List</label>
                          <div className="space-x-2">
                            <Button type="button" variant="ghost" size="sm" onClick={() => setValue('highlightsArr', [], { shouldDirty: true })} className="text-alert hover:bg-alert/10 h-8 text-xs">Clear All</Button>
                            <Button type="button" variant="outline" onClick={() => appendHighlight({ title: '', description: '' })}>+ Add Highlight</Button>
                          </div>
                        </div>
                        <div className="space-y-4">
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
                      </div>
                    </div>
                  )}
                </div>

                {/* ARCHITECTURE */}
                <div className="bg-ink/30 border border-hairline rounded-xl overflow-hidden">
                  <div className="p-6 flex items-center justify-between cursor-pointer hover:bg-ink/50 transition-colors" onClick={() => toggleSection('architecture')}>
                    <div><h3 className="text-lg font-display text-signal mb-1">Architecture</h3><p className="text-sm text-muted font-mono">Raw Markdown OR Structured Builder</p></div>
                    <span className="text-signal">{expandedSections.architecture ? '▼' : '▶'}</span>
                  </div>
                  {expandedSections.architecture && (
                    <div className="p-6 border-t border-hairline space-y-8 bg-panel/30">
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <div className="text-sm font-mono text-muted">Option 1: Raw Markdown</div>
                          <Button type="button" variant="ghost" size="sm" onClick={() => setValue('architectureRaw', '', { shouldDirty: true })} className="text-alert hover:bg-alert/10 h-8 text-xs">Clear Raw</Button>
                        </div>
                        <RichTextField label="Raw Markdown Content" registration={register('architectureRaw')} className="min-h-[200px] font-mono text-sm" />
                      </div>
                      <div className="pt-6 border-t border-hairline space-y-8">
                        <div className="mb-4 flex items-center justify-between">
                          <label className="block text-sm font-mono text-muted">Option 2: Structured Builder</label>
                          <Button type="button" variant="ghost" size="sm" onClick={() => { setValue('architectureOverview', '', { shouldDirty: true }); setValue('architectureFlowArr', [], { shouldDirty: true }); setValue('architectureCompArr', [], { shouldDirty: true }); }} className="text-alert hover:bg-alert/10 h-8 text-xs">Clear All</Button>
                        </div>
                        <TextAreaField label="Overview" registration={register('architectureOverview')} />
                        <div>
                          <div className="flex items-center justify-between mb-4"><span className="text-sm text-primary">Flow / Pipeline</span><Button type="button" variant="outline" onClick={() => appendArchFlow({ step: '' })}>+ Add Step</Button></div>
                          <div className="space-y-4">
                            {archFlowFields.map((field, index) => (
                              <div key={field.id} className="flex gap-4 items-start"><div className="flex-1"><TextField label={`Step ${index + 1}`} registration={register(`architectureFlowArr.${index}.step` as const)} required /></div><Button type="button" variant="outline" className="text-alert border-alert/20 hover:bg-alert/10 mt-6" onClick={() => removeArchFlow(index)}>Remove</Button></div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-4"><span className="text-sm text-primary">Components</span><Button type="button" variant="outline" onClick={() => appendArchComp({ name: '', technology: '', responsibility: '' })}>+ Add Component</Button></div>
                          <div className="space-y-4">
                            {archCompFields.map((field, index) => (
                              <div key={field.id} className="flex gap-4 items-start p-4 bg-ink/50 border border-hairline rounded-lg">
                                <div className="flex-1 grid grid-cols-2 gap-4"><TextField label="Component Name" registration={register(`architectureCompArr.${index}.name` as const)} required /><TextField label="Technology" registration={register(`architectureCompArr.${index}.technology` as const)} required /><div className="col-span-2"><TextAreaField label="Responsibility" registration={register(`architectureCompArr.${index}.responsibility` as const)} /></div></div>
                                <Button type="button" variant="outline" className="text-alert border-alert/20 hover:bg-alert/10 mt-6" onClick={() => removeArchComp(index)}>Remove</Button>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* DEPLOYMENT */}
                <div className="bg-ink/30 border border-hairline rounded-xl overflow-hidden">
                  <div className="p-6 flex items-center justify-between cursor-pointer hover:bg-ink/50 transition-colors" onClick={() => toggleSection('deployment')}>
                    <div><h3 className="text-lg font-display text-signal mb-1">Deployment</h3><p className="text-sm text-muted font-mono">Raw Markdown OR Structured Environments</p></div>
                    <span className="text-signal">{expandedSections.deployment ? '▼' : '▶'}</span>
                  </div>
                  {expandedSections.deployment && (
                    <div className="p-6 border-t border-hairline space-y-8 bg-panel/30">
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <div className="text-sm font-mono text-muted">Option 1: Raw Markdown</div>
                          <Button type="button" variant="ghost" size="sm" onClick={() => setValue('deploymentRaw', '', { shouldDirty: true })} className="text-alert hover:bg-alert/10 h-8 text-xs">Clear Raw</Button>
                        </div>
                        <RichTextField label="Raw Markdown Content" registration={register('deploymentRaw')} className="min-h-[200px] font-mono text-sm" />
                      </div>
                      <div className="pt-6 border-t border-hairline">
                        <div className="flex items-center justify-between mb-4">
                          <label className="block text-sm font-mono text-muted">Option 2: Structured Environments</label>
                          <div className="space-x-2">
                            <Button type="button" variant="ghost" size="sm" onClick={() => setValue('deploymentArr', [], { shouldDirty: true })} className="text-alert hover:bg-alert/10 h-8 text-xs">Clear All</Button>
                            <Button type="button" variant="outline" onClick={() => appendDeployment({ environment: '', technology: '', description: '' })}>+ Add Environment</Button>
                          </div>
                        </div>
                        <div className="space-y-4">
                          {deploymentFields.map((field, index) => (
                            <div key={field.id} className="flex gap-4 items-start p-4 bg-ink/50 border border-hairline rounded-lg">
                              <div className="flex-1 space-y-4">
                                <div className="grid grid-cols-2 gap-4"><TextField label="Environment Name (e.g. Frontend)" registration={register(`deploymentArr.${index}.environment` as const)} required /><TextField label="Technology (e.g. Vercel)" registration={register(`deploymentArr.${index}.technology` as const)} required /></div>
                                <TextAreaField label="Deployment Details" registration={register(`deploymentArr.${index}.description` as const)} />
                              </div>
                              <Button type="button" variant="outline" className="text-alert border-alert/20 hover:bg-alert/10 mt-6" onClick={() => removeDeployment(index)}>Remove</Button>
                            </div>
                          ))}
                          {deploymentFields.length === 0 && <p className="text-sm text-muted text-center py-4 bg-panel rounded border border-hairline">No environments added. Using Option 1 (Raw Markdown).</p>}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* TIMELINE */}
                <div className="bg-ink/30 border border-hairline rounded-xl overflow-hidden">
                  <div className="p-6 flex items-center justify-between cursor-pointer hover:bg-ink/50 transition-colors" onClick={() => toggleSection('timeline')}>
                    <div><h3 className="text-lg font-display text-signal mb-1">Timeline</h3><p className="text-sm text-muted font-mono">Raw Markdown OR Structured Phases</p></div>
                    <span className="text-signal">{expandedSections.timeline ? '▼' : '▶'}</span>
                  </div>
                  {expandedSections.timeline && (
                    <div className="p-6 border-t border-hairline space-y-8 bg-panel/30">
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <div className="text-sm font-mono text-muted">Option 1: Raw Markdown</div>
                          <Button type="button" variant="ghost" size="sm" onClick={() => setValue('timelineRaw', '', { shouldDirty: true })} className="text-alert hover:bg-alert/10 h-8 text-xs">Clear Raw</Button>
                        </div>
                        <RichTextField label="Raw Markdown Content" registration={register('timelineRaw')} className="min-h-[200px] font-mono text-sm" />
                      </div>
                      <div className="pt-6 border-t border-hairline">
                        <div className="flex items-center justify-between mb-4">
                          <label className="block text-sm font-mono text-muted">Option 2: Structured Phases</label>
                          <div className="space-x-2">
                            <Button type="button" variant="ghost" size="sm" onClick={() => setValue('timelineArr', [], { shouldDirty: true })} className="text-alert hover:bg-alert/10 h-8 text-xs">Clear All</Button>
                            <Button type="button" variant="outline" onClick={() => appendTimeline({ phase: '', description: '' })}>+ Add Phase</Button>
                          </div>
                        </div>
                        <div className="space-y-4">
                          {timelineFields.map((field, index) => (
                            <div key={field.id} className="flex gap-4 items-start p-4 bg-ink/50 border border-hairline rounded-lg">
                              <div className="flex-1 space-y-4">
                                <TextField label={`Phase ${index + 1} Name`} registration={register(`timelineArr.${index}.phase` as const)} required />
                                <TextAreaField label="Description" registration={register(`timelineArr.${index}.description` as const)} />
                              </div>
                              <Button type="button" variant="outline" className="text-alert border-alert/20 hover:bg-alert/10 mt-6" onClick={() => removeTimeline(index)}>Remove</Button>
                            </div>
                          ))}
                          {timelineFields.length === 0 && <p className="text-sm text-muted text-center py-4 bg-panel rounded border border-hairline">No timeline phases added. Using Option 1 (Raw Markdown).</p>}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

              </div>
            </div>

            <div className={activeTab === 'features' ? 'block' : 'hidden'}>
              <div className="space-y-12">
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

                <div>
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
            </div>

            <div className={activeTab === 'media' ? 'block' : 'hidden'}>
              <div className="space-y-8">
                <ImageUploader 
                  label="Thumbnail Image" 
                  onUpload={handleImageUpload('thumbnailUrl')}
                  currentImage={thumbnail}
                  isUploading={uploadingImage === 'thumbnail'}
                />
                <GalleryUploader 
                  label="Project Gallery"
                  images={gallery}
                  onChange={(imgs) => setValue('gallery', imgs, { shouldDirty: true })}
                  onUpload={handleGalleryUpload}
                />
              </div>
            </div>

            <div className={activeTab === 'settings' ? 'block' : 'hidden'}>
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
                  <label className="block text-xs font-mono text-muted uppercase tracking-wider border-b border-hairline pb-2">External Links</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <TextField label="Demo URL" registration={register('demoUrl')} />
                    <TextField label="GitHub URL" registration={register('githubUrl')} />
                  </div>
                </div>

                <div className="space-y-6">
                  <label className="block text-xs font-mono text-muted uppercase tracking-wider border-b border-hairline pb-2">SEO Meta Data</label>
                  <TextField label="Meta Title" registration={register('seoTitle')} />
                  <TextAreaField label="Meta Description" registration={register('seoDescription')} />
                  <TextField label="Keywords (comma separated)" registration={register('seoKeywords')} />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

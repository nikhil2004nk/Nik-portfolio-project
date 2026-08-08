"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, FormProvider } from "react-hook-form";
import { HeroTab } from "./tabs/HeroTab";
import { OverviewTab } from "./tabs/OverviewTab";
import { FeaturesTab } from "./tabs/FeaturesTab";
import { ArchitectureTab } from "./tabs/ArchitectureTab";
import { DeploymentTab } from "./tabs/DeploymentTab";
import { TimelineTab } from "./tabs/TimelineTab";
import { MediaTab } from "./tabs/MediaTab";
import { SettingsTab } from "./tabs/SettingsTab";
import { projectService } from "../../../../features/project-builder/services/project.service";
import { uploadService } from "../../../../features/project-builder/services/upload.service";
import { Project } from "../../../../types/project";
import { TextField } from "../../../../components/forms/TextField";
import { TextAreaField } from "../../../../components/forms/TextAreaField";
import { RichTextField } from "../../../../components/forms/RichTextField";
import { ImageUploader } from "../../../../components/upload/ImageUploader";
import { GalleryUploader } from "../../../../components/upload/GalleryUploader";

import { Button } from "../../../../components/ui/Button";
import {
  DEFAULT_CASE_STUDY_TEMPLATE,
  DEFAULT_STRUCTURED_SECTIONS,
  DEFAULT_HIGHLIGHTS_ARR,
  DEFAULT_HIGHLIGHTS_RAW,
  DEFAULT_ARCHITECTURE_OVERVIEW,
  DEFAULT_ARCHITECTURE_COMPONENTS,
  DEFAULT_ARCHITECTURE_FLOW,
  DEFAULT_ARCHITECTURE_RAW,
  DEFAULT_DEPLOYMENT_ARR,
  DEFAULT_DEPLOYMENT_RAW,
  DEFAULT_TIMELINE_ARR,
  DEFAULT_TIMELINE_RAW,
  DEFAULT_FEATURES_ARR,
  DEFAULT_METRICS_ARR
} from "./constants";

export default function ProjectEditorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = React.use(params);
  const router = useRouter();
  const isNew = resolvedParams.id === "new";
  const [activeTab, setActiveTab] = useState("hero");
  const [loading, setLoading] = useState(!isNew);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState<
    "thumbnail" | "cover" | null
  >(null);

  const [categories, setCategories] = useState<any[]>([]);
  const [technologies, setTechnologies] = useState<any[]>([]);
  const [tags, setTags] = useState<any[]>([]);

  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({
    caseStudy: true,
    highlights: false,
    architecture: false,
    deployment: false,
    timeline: false,
  });

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const methods = useForm<any>({
    defaultValues: {
      categoryIds: [],
      technologyIds: [],
      tagIds: [],
      features: DEFAULT_FEATURES_ARR,
      metrics: DEFAULT_METRICS_ARR,
      caseStudyArr: DEFAULT_STRUCTURED_SECTIONS,
      highlightsArr: DEFAULT_HIGHLIGHTS_ARR,
      timelineArr: DEFAULT_TIMELINE_ARR,
      architectureFlowArr: DEFAULT_ARCHITECTURE_FLOW,
      architectureCompArr: DEFAULT_ARCHITECTURE_COMPONENTS,
      deploymentArr: DEFAULT_DEPLOYMENT_ARR,
      content: DEFAULT_CASE_STUDY_TEMPLATE,
      highlightsRaw: DEFAULT_HIGHLIGHTS_RAW,
      architectureRaw: DEFAULT_ARCHITECTURE_RAW,
      architectureOverview: DEFAULT_ARCHITECTURE_OVERVIEW,
      deploymentRaw: DEFAULT_DEPLOYMENT_RAW,
      timelineRaw: DEFAULT_TIMELINE_RAW,
    },
  });

  const { handleSubmit, reset, watch, setValue, formState: { isSubmitting, isDirty } } = methods;

  const thumbnail = watch("thumbnailUrl");
  const gallery = watch("gallery");

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
        console.error("Failed to fetch taxonomies", e);
      }
    };
    fetchTaxonomies();

    if (!isNew) {
      const loadProject = async () => {
        try {
          const data = await projectService.getById(resolvedParams.id);
          // Helper to extract dual-mode data
          const extractDualMode = (dbContent: any, isArray: boolean = true) => {
            if (!dbContent) return { raw: "", parsed: isArray ? [] : {} };
            try {
              const p = JSON.parse(dbContent);
              if (
                (isArray && Array.isArray(p)) ||
                (!isArray && typeof p === "object" && !Array.isArray(p))
              ) {
                return { raw: "", parsed: p };
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

          const archOverview = archData.parsed?.overview || "";
          const archFlow = (archData.parsed?.flow || []).map((f: string) => ({
            step: f,
          }));
          const archComps = archData.parsed?.components || [];

          const depArr = Object.entries(depData.parsed || {}).map(
            ([key, val]: any) => ({
              environment: key.replace(/_/g, " "),
              ...(typeof val === "object"
                ? val
                : { technology: val, description: "" }),
            }),
          );

          // Hydrate the form with the API data mapped to our UI fields
          const isCaseStudyEmpty = !csData.raw && (!csData.parsed || csData.parsed.length === 0);
          const isHighlightsEmpty = !hlData.raw && (!hlData.parsed || hlData.parsed.length === 0);
          const isTimelineEmpty = !tlData.raw && (!tlData.parsed || tlData.parsed.length === 0);
          const isArchEmpty = !archData.raw && (!archFlow || archFlow.length === 0) && (!archComps || archComps.length === 0);
          const isDepEmpty = !depData.raw && (!depArr || depArr.length === 0);

          reset({
            ...data,
            content: isCaseStudyEmpty ? DEFAULT_CASE_STUDY_TEMPLATE : csData.raw,
            caseStudyArr: isCaseStudyEmpty ? DEFAULT_STRUCTURED_SECTIONS : (csData.parsed || []),
            
            highlightsRaw: isHighlightsEmpty ? DEFAULT_HIGHLIGHTS_RAW : hlData.raw,
            highlightsArr: isHighlightsEmpty ? DEFAULT_HIGHLIGHTS_ARR : (hlData.parsed || []),
            
            timelineRaw: isTimelineEmpty ? DEFAULT_TIMELINE_RAW : tlData.raw,
            timelineArr: isTimelineEmpty ? DEFAULT_TIMELINE_ARR : (tlData.parsed || []),
            
            architectureRaw: isArchEmpty ? DEFAULT_ARCHITECTURE_RAW : archData.raw,
            architectureOverview: isArchEmpty ? DEFAULT_ARCHITECTURE_OVERVIEW : archOverview,
            architectureFlowArr: isArchEmpty ? DEFAULT_ARCHITECTURE_FLOW : (archFlow || []),
            architectureCompArr: isArchEmpty ? DEFAULT_ARCHITECTURE_COMPONENTS : (archComps || []),
            
            deploymentRaw: isDepEmpty ? DEFAULT_DEPLOYMENT_RAW : depData.raw,
            deploymentArr: isDepEmpty ? DEFAULT_DEPLOYMENT_ARR : (depArr || []),
            
            githubUrl: data.links?.github || "",
            demoUrl: data.links?.demo || "",
            thumbnailUrl: data.thumbnail || "",
            gallery: data.gallery || [],
            seoTitle: data.seo?.title || "",
            seoDescription: data.seo?.description || "",
            seoKeywords: data.seo?.keywords || "",
            categoryIds: data.categories?.map((c: any) => c.categoryId) || [],
            technologyIds: data.technologies?.map((t: any) => t.technologyId) || [],
            tagIds: data.tags?.map((t: any) => t.tagId) || [],
            
            features: (data.features && data.features.length > 0) ? data.features : [],
            metrics: (data.metrics && data.metrics.length > 0) ? data.metrics : [],
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
        status: data.status || "COMPLETED",
        order: data.order ? parseInt(data.order, 10) : 0,
        thumbnail: data.thumbnailUrl,
        gallery: data.gallery,
        categoryIds: data.categoryIds || [],
        technologyIds: data.technologyIds || [],
        tagIds: data.tagIds || [],
        features:
          data.features?.map(
            (
              { id, projectId, createdAt, updatedAt, ...f }: any,
              i: number,
            ) => ({ ...f, order: i }),
          ) || [],
        metrics:
          data.metrics?.map(
            (
              { id, projectId, createdAt, updatedAt, ...m }: any,
              i: number,
            ) => ({ ...m, order: i }),
          ) || [],
        caseStudy: {
          content:
            data.caseStudyArr?.length > 0
              ? JSON.stringify(
                  data.caseStudyArr.map(({ id, ...rest }: any) => rest),
                )
              : data.content || "",
        },
        highlights: {
          content:
            data.highlightsArr?.length > 0
              ? JSON.stringify(
                  data.highlightsArr.map(({ id, ...rest }: any) => rest),
                )
              : data.highlightsRaw || "",
        },
        architecture: {
          content:
            data.architectureOverview ||
            data.architectureFlowArr?.length > 0 ||
            data.architectureCompArr?.length > 0
              ? JSON.stringify({
                  overview: data.architectureOverview || "",
                  flow: data.architectureFlowArr?.map((f: any) => f.step) || [],
                  components:
                    data.architectureCompArr?.map(
                      ({ id, ...rest }: any) => rest,
                    ) || [],
                })
              : data.architectureRaw || "",
        },
        deployment: {
          content:
            data.deploymentArr?.length > 0
              ? JSON.stringify(
                  data.deploymentArr.reduce((acc: any, curr: any) => {
                    if (!curr.environment) return acc;
                    const key = curr.environment
                      .toLowerCase()
                      .replace(/\s+/g, "_");
                    acc[key] = {
                      technology: curr.technology,
                      description: curr.description,
                    };
                    return acc;
                  }, {}),
                )
              : data.deploymentRaw || "",
        },
        timeline: {
          content:
            data.timelineArr?.length > 0
              ? JSON.stringify(
                  data.timelineArr.map(({ id, ...rest }: any) => rest),
                )
              : data.timelineRaw || "",
        },
        seo: {
          title: data.seoTitle,
          description: data.seoDescription,
          keywords: data.seoKeywords,
        },
        links: {
          github: data.githubUrl,
          demo: data.demoUrl,
        },
      };

      if (isNew) {
        await projectService.create(submitData);
      } else {
        await projectService.update(resolvedParams.id, submitData);
      }
      router.push("/admin/projects");
    } catch (e: any) {
      console.error(e);
      setSaveError(
        e.message || "Failed to save project. Please check your inputs.",
      );
    }
  };

  const handleImageUpload = (field: "thumbnailUrl") => async (file: File) => {
    // We require the project slug to be set before uploading an image so we know where to save it
    const currentSlug = watch("slug");
    if (!currentSlug) {
      setSaveError(
        'Please enter a "Slug" in the Basic tab before uploading images so we can create a dedicated folder for this project.',
      );
      setActiveTab("basic");
      return;
    }

    try {
      setSaveError(null);
      setUploadingImage("thumbnail");

      const uploadedUrl = await uploadService.uploadProjectImage(
        currentSlug,
        file,
      );
      setValue(field, uploadedUrl, { shouldDirty: true });
    } catch (e: any) {
      console.error(e);
      setSaveError(e.message || "Failed to upload image.");
    } finally {
      setUploadingImage(null);
    }
  };

  const handleGalleryUpload = async (file: File) => {
    const currentSlug = watch("slug");
    if (!currentSlug) {
      setSaveError(
        'Please enter a "Slug" in the Basic tab before uploading images.',
      );
      setActiveTab("basic");
      throw new Error("Slug required");
    }
    return await uploadService.uploadProjectImage(currentSlug, file);
  };

  if (loading) return <div className="animate-pulse">Loading project...</div>;

  return (
    <div className="max-w-5xl mx-auto pb-20">
      <div className="flex items-center justify-between mb-8 border-b border-hairline pb-4">
        <h1 className="text-3xl font-display font-bold">
          {isNew ? "New Project" : "Edit Project"}
        </h1>
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={() => router.push("/admin/projects")}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleSubmit(onSubmit)}
            disabled={isSubmitting || !isDirty}
          >
            {isSubmitting ? "Saving..." : "Save Project"}
          </Button>
        </div>
      </div>

      <div className="flex gap-8">
        <div className="w-48 shrink-0 flex flex-col gap-2">
          {[
            "hero",
            "overview",
            "features",
            "architecture",
            "deployment",
            "timeline",
            "media",
            "settings",
          ].map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`text-left px-4 py-3 rounded-md font-mono text-sm uppercase tracking-wider transition-colors ${
                activeTab === tab
                  ? "bg-signal/10 text-signal"
                  : "text-muted hover:bg-hairline hover:text-primary"
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

          <FormProvider {...methods}>
            <form className="space-y-6">
              <div className={activeTab === "hero" ? "block" : "hidden"}>
                <HeroTab
                  categories={categories}
                  technologies={technologies}
                  tags={tags}
                />
              </div>

              <div className={activeTab === "overview" ? "block" : "hidden"}>
                <OverviewTab />
              </div>

              <div className={activeTab === "features" ? "block" : "hidden"}>
                <FeaturesTab />
              </div>

              <div
                className={activeTab === "architecture" ? "block" : "hidden"}
              >
                <ArchitectureTab />
              </div>

              <div className={activeTab === "deployment" ? "block" : "hidden"}>
                <DeploymentTab />
              </div>

              <div className={activeTab === "timeline" ? "block" : "hidden"}>
                <TimelineTab />
              </div>

              <div className={activeTab === "media" ? "block" : "hidden"}>
                <MediaTab
                  thumbnail={thumbnail}
                  gallery={gallery}
                  uploadingImage={uploadingImage}
                  handleImageUpload={handleImageUpload}
                  handleGalleryUpload={handleGalleryUpload}
                />
              </div>

              <div className={activeTab === "settings" ? "block" : "hidden"}>
                <SettingsTab />
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
}

import { HeroSection } from "../../components/sections/HeroSection";
import { AboutSection } from "../../components/sections/AboutSection";
import { ServicesSection } from "../../components/sections/ServicesSection";
import { FeaturedProjectsSection } from "../../components/sections/FeaturedProjectsSection";
import { SkillsSection } from "../../components/sections/SkillsSection";
import { ExperienceSection } from "../../components/sections/ExperienceSection";
import { EducationSection } from "../../components/sections/EducationSection";
import { FAQSection } from "../../components/sections/FAQSection";
import { ContactSection } from "../../components/sections/ContactSection";

export const dynamic = 'force-dynamic';

async function getData() {
  try {
    const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';
    
    const res = await fetch(`${API_BASE}/portfolio`, { next: { revalidate: 0 } });
    if (!res.ok) throw new Error('Failed to fetch portfolio data');
    const json = await res.json();
    return json.data;
  } catch (e) {
    console.error('Failed to fetch data:', e);
    return {
      profile: null,
      socials: [],
      services: [],
      skills: [],
      experience: [],
      education: [],
      certifications: [],
      featuredProjects: [],
      testimonials: []
    };
  }
}

export default async function Home() {
  const data = await getData();

  return (
    <>
      <HeroSection profile={data.profile} socials={data.socials} />
      <AboutSection profile={data.profile} />
      <ServicesSection services={data.services} />
      <FeaturedProjectsSection projects={data.featuredProjects} />
      <SkillsSection skills={data.skills} />
      <ExperienceSection experience={data.experience} />
      <EducationSection education={data.education} certs={data.certifications} />
      <FAQSection />
      <ContactSection />
    </>
  );
}

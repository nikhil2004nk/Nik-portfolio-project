import { Hero } from "../components/sections/Hero";
import { About } from "../components/sections/About";
import { Services } from "../components/sections/Services";
import { FeaturedProjects } from "../components/sections/FeaturedProjects";
import { Skills } from "../components/sections/Skills";
import { Experience } from "../components/sections/Experience";
import { Education } from "../components/sections/Education";
import { FreelanceProcess } from "../components/sections/FreelanceProcess";
import { FAQ } from "../components/sections/FAQ";
import { Contact } from "../components/sections/Contact";

export const dynamic = 'force-dynamic';

async function getData() {
  try {
    const API_BASE = 'http://127.0.0.1:4000';
    
    const [projectsRes, skillsRes, expRes, eduRes, certRes] = await Promise.all([
      fetch(`${API_BASE}/projects`, { next: { revalidate: 10 } }).catch(() => null),
      fetch(`${API_BASE}/skills`, { next: { revalidate: 10 } }).catch(() => null),
      fetch(`${API_BASE}/experience`, { next: { revalidate: 10 } }).catch(() => null),
      fetch(`${API_BASE}/education`, { next: { revalidate: 10 } }).catch(() => null),
      fetch(`${API_BASE}/certifications`, { next: { revalidate: 10 } }).catch(() => null),
    ]);

    return {
      projects: projectsRes?.ok ? await projectsRes.json() : [],
      skills: skillsRes?.ok ? await skillsRes.json() : [],
      experience: expRes?.ok ? await expRes.json() : [],
      education: eduRes?.ok ? await eduRes.json() : [],
      certifications: certRes?.ok ? await certRes.json() : [],
    };
  } catch (e) {
    console.error('Failed to fetch data:', e);
    return { projects: [], skills: [], experience: [], education: [], certifications: [] };
  }
}

export default async function Home() {
  const data = await getData();

  return (
    <>
      <Hero />
      <About />
      <Services />
      <FeaturedProjects projects={data.projects} />
      <Skills skills={data.skills} />
      <Experience experience={data.experience} />
      <Education education={data.education} certs={data.certifications} />
      <FreelanceProcess />
      <FAQ />
      <Contact />
    </>
  );
}

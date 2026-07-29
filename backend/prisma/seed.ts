import { PrismaClient, SkillCategory } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import * as dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  // Clear existing data (optional, useful for development)
  await prisma.project.deleteMany();
  await prisma.skill.deleteMany();
  await prisma.experience.deleteMany();
  await prisma.education.deleteMany();
  await prisma.certification.deleteMany();

  console.log('Seeding data...');

  // 1. Seed Skills
  await prisma.skill.createMany({
    data: [
      { name: 'React', category: SkillCategory.FRONTEND },
      { name: 'Next.js', category: SkillCategory.FRONTEND },
      { name: 'Tailwind CSS', category: SkillCategory.FRONTEND },
      { name: 'NestJS', category: SkillCategory.BACKEND },
      { name: 'TypeScript', category: SkillCategory.BACKEND },
      { name: 'Node.js', category: SkillCategory.BACKEND },
      { name: 'PostgreSQL', category: SkillCategory.DATABASE },
      { name: 'Prisma', category: SkillCategory.DATABASE },
      { name: 'Redis', category: SkillCategory.DATABASE },
      { name: 'OpenAI API', category: SkillCategory.AI },
      { name: 'LangChain', category: SkillCategory.AI },
      { name: 'Docker', category: SkillCategory.DEVOPS },
      { name: 'AWS', category: SkillCategory.DEVOPS },
      { name: 'Git', category: SkillCategory.TOOLS },
    ],
  });

  // 2. Seed Projects
  await prisma.project.create({
    data: {
      name: 'FinTech Dashboard',
      slug: 'fintech-dashboard',
      description: 'A comprehensive financial dashboard for tracking investments and analyzing market trends in real-time.',
      problem: 'Investors needed a consolidated view of their fragmented portfolio data with real-time market updates.',
      solution: 'Built a real-time tracking platform with WebSockets, Next.js frontend, and a high-performance NestJS backend.',
      techStack: ['Next.js', 'NestJS', 'PostgreSQL', 'WebSockets', 'Tailwind CSS'],
      features: ['Real-time updates', 'Portfolio Analytics', 'Multi-currency support'],
      screenshots: [],
      liveUrl: 'https://example.com/fintech',
      githubUrl: 'https://github.com/nik/fintech-dashboard',
      featured: true,
      order: 1,
    },
  });

  await prisma.project.create({
    data: {
      name: 'AI Customer Support Bot',
      slug: 'ai-support-bot',
      description: 'An AI-driven chatbot capable of resolving tier-1 customer support queries using RAG (Retrieval-Augmented Generation).',
      problem: 'High volume of repetitive support tickets overwhelming the human team.',
      solution: 'Developed a custom RAG pipeline using LangChain and OpenAI to answer queries directly from company documentation.',
      techStack: ['Python', 'FastAPI', 'React', 'OpenAI API', 'Pinecone'],
      features: ['Context-aware responses', 'Seamless human handoff', 'Analytics dashboard'],
      screenshots: [],
      liveUrl: 'https://example.com/ai-bot',
      githubUrl: 'https://github.com/nik/ai-support-bot',
      featured: true,
      order: 2,
    },
  });

  // 3. Seed Experience
  await prisma.experience.create({
    data: {
      company: 'Tech Innovators Inc.',
      role: 'Full Stack Developer',
      startDate: new Date('2021-06-01'),
      endDate: new Date('2024-01-01'),
      bullets: [
        'Led the development of a microservices-based API using NestJS, handling over 1M requests/day.',
        'Migrated legacy React app to Next.js 14 App Router, improving LCP by 40%.',
        'Implemented a custom RAG system for internal knowledge retrieval, reducing onboarding time for new hires.',
      ],
    },
  });

  // 4. Seed Education
  await prisma.education.create({
    data: {
      institution: 'Thakur college of Engineering and Technology',
      degree: 'B.E. in Electronics and Telecommunication',
      cgpa: '9.01',
      year: '2021',
    },
  });

  // 5. Seed Certifications
  await prisma.certification.create({
    data: {
      name: 'AWS Certified Solutions Architect – Associate',
      org: 'Amazon Web Services',
      skills: ['Cloud Architecture', 'AWS Services', 'Deployment'],
      certificateUrl: 'https://aws.amazon.com/verification',
    },
  });

  console.log('Seeding completed successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

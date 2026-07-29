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
      { name: 'React.js', category: SkillCategory.FRONTEND },
      { name: 'Next.js', category: SkillCategory.FRONTEND },
      { name: 'TypeScript', category: SkillCategory.FRONTEND },
      { name: 'TailwindCSS', category: SkillCategory.FRONTEND },
      { name: 'NestJS', category: SkillCategory.BACKEND },
      { name: 'Node.js', category: SkillCategory.BACKEND },
      { name: 'REST APIs', category: SkillCategory.BACKEND },
      { name: 'Microservices', category: SkillCategory.BACKEND },
      { name: 'MySQL', category: SkillCategory.DATABASE },
      { name: 'PostgreSQL', category: SkillCategory.DATABASE },
      { name: 'ClickHouse', category: SkillCategory.DATABASE },
      { name: 'Git', category: SkillCategory.TOOLS },
      { name: 'GitHub', category: SkillCategory.TOOLS },
      { name: 'Docker', category: SkillCategory.DEVOPS },
      { name: 'Postman', category: SkillCategory.TOOLS },
      { name: 'JWT', category: SkillCategory.BACKEND },
      { name: 'RBAC', category: SkillCategory.BACKEND },
    ],
  });

  // 2. Seed Projects
  await prisma.project.create({
    data: {
      name: 'Fitpreeti Yog Institute Platform',
      slug: 'fitpreeti-yog-institute-platform',
      description: 'An ERP platform for scheduling, attendance, staff management, and lead tracking.',
      problem: 'Needed a comprehensive system to manage institute operations and leads.',
      solution: 'Built an ERP platform with automated notifications and deployed on Hostinger KVM servers.',
      techStack: ['React.js', 'NestJS', 'MySQL'],
      features: ['Scheduling', 'Attendance tracking', 'Staff management', 'Lead tracking', 'Automated notifications'],
      screenshots: [],
      liveUrl: 'https://fitpreetiyoginstitute.com',
      featured: true,
      order: 1,
    },
  });

  await prisma.project.create({
    data: {
      name: 'PeaceLife E-commerce Platform',
      slug: 'peacelife-ecommerce-platform',
      description: 'A complete e-commerce platform with product management, coupon systems, checkout flow, and order tracking.',
      problem: 'Required a robust e-commerce solution with custom backend operations.',
      solution: 'Developed frontend features and designed backend APIs, database schemas, and admin dashboards.',
      techStack: ['React.js', 'NestJS', 'MySQL'],
      features: ['Product management', 'Coupon systems', 'Checkout flow', 'Order tracking', 'Admin dashboards'],
      screenshots: [],
      liveUrl: 'https://peacelifeofficial.com',
      featured: true,
      order: 2,
    },
  });

  const githubProjects = [
    { name: 'fitpreeti-admin-portal', language: 'TypeScript' },
    { name: 'fitpreeti-yog-backend', language: 'TypeScript' },
    { name: 'Fitpreeti-yog-institute', language: 'TypeScript' },
    { name: 'sammy-agent', language: 'TypeScript' },
    { name: 'Stock-AI-Analysis', language: 'TypeScript' },
    { name: 'Website-chatbot', language: 'TypeScript' },
    { name: 'storing_50k_Transactions', language: 'TypeScript' },
    { name: 'nexus-inventory-flow', language: 'TypeScript' },
    { name: 'Payment-demopage', language: 'TypeScript' },
    { name: 'peacelife-svc', language: 'TypeScript' },
    { name: 'Peacelife-frontend', language: 'TypeScript' },
    { name: 'whatsapp-bot', language: 'TypeScript' },
    { name: 'V-special', language: 'HTML' },
    { name: 'zen-flow-studio-53', language: 'TypeScript' },
    { name: 'shra-calendar', language: 'TypeScript' },
    { name: 'expense-tracker-frontend-ts', language: 'TypeScript' },
    { name: 'expense-tracker-service', language: 'TypeScript' },
    { name: 'MyDayLog', language: 'TypeScript' },
    { name: 'my-daily-log-svc', language: 'TypeScript' },
    { name: 'Expense-Tracker-Web-App', language: 'JavaScript' },
    { name: 'Resume', language: 'HTML' },
    { name: 'coding-assist', language: 'Python' },
    { name: 'emp-portal', language: 'JavaScript' },
    { name: 'demo-project', language: 'TypeScript' },
    { name: 'EaseTalk-Sign-Language-Recognition-and-Learning-Platform', language: 'JavaScript', desc: 'Intelligent Hand Gesture Recognition System Real-time hand gesture recognition using computer vision and machine learning.' },
    { name: 'personal-website', language: 'CSS' },
    { name: 'watched-movie-record', language: 'CSS' },
    { name: 'book-store-mng', language: 'TypeScript' },
    { name: 'EaseTalk-ISL-Platform-FRONTEND-', language: 'CSS' },
    { name: 'Profile-website', language: 'CSS', desc: 'Profile website for Introducing myself.' },
    { name: 'Trip-list-maker', language: 'JavaScript' },
    { name: 'tip-calculator', language: 'CSS' },
    { name: 'Landing-page', language: 'HTML' },
    { name: 'News-website', language: 'CSS', desc: 'A simple News website' },
    { name: 'GameHub', language: 'JavaScript', desc: 'Built with using HTML, CSS & JS.' },
    { name: 'SGPI-Journey', language: 'JavaScript', desc: 'SGPI Journey through Animation.' },
    { name: 'Friends-bucket', language: 'JavaScript' },
    { name: 'JavaScript-Projects-Hub', language: 'CSS', desc: 'Select a project to explore :' },
    { name: 'simple-arithmetic-operation', language: 'HTML', desc: 'simple calculator made using switch case in JavaScript using html' },
    { name: 'recipe-panipuri', language: 'HTML' },
    { name: 'sketching-website', language: 'HTML' },
    { name: 'Tindog', language: 'HTML' }
  ];

  for (let i = 0; i < githubProjects.length; i++) {
    const p = githubProjects[i];
    await prisma.project.create({
      data: {
        name: p.name,
        slug: p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        description: p.desc || `GitHub repository for ${p.name}.`,
        techStack: p.language ? [p.language] : [],
        features: [],
        screenshots: [],
        featured: false,
        order: i + 3,
        githubUrl: `https://github.com/nikhil2004nk/${p.name}`
      }
    });
  }

  // 3. Seed Experience
  await prisma.experience.create({
    data: {
      company: 'Trishvi Fintech Solutions Private Limited',
      role: 'Junior Software Developer',
      startDate: new Date('2025-06-01'),
      endDate: new Date(), // Using current date for 'Present' or leaving it null if schema allows, but schema might require it. Let's put a future date or just current date
      bullets: [
        'Developed full-stack modules for Autopay, Pay-In, Pay-Out, and Collection platforms using NestJS, React.js, Next.js, and MySQL.',
        'Built KYC/KYB onboarding workflows integrating Aadhaar, PAN, and Bank Verification APIs for merchant onboarding.',
        'Implemented JWT authentication and RBAC authorization across multiple fintech applications.',
        'Utilized ClickHouse for high-performance transaction analytics, reporting, and dashboard data aggregation.',
        'Developed scalable backend services using NestJS, TypeScript, MySQL, and PostgreSQL in both monolithic and microservice-based architectures.',
        'Contributed to fintech systems processing ₹20 Lakhs+ TPV during the first week of production deployment.',
        'Improved merchant onboarding experience through responsive and optimized frontend interfaces.'
      ],
    },
  });

  // 4. Seed Education
  await prisma.education.create({
    data: {
      institution: 'Thakur college of Engineering and Technology',
      degree: 'Bachelor of Engineering in Electronics & Telecommunication',
      cgpa: '9.01 CGPI',
      year: '2025',
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

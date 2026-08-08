import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
dotenv.config();
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Seeding database...');

  // 1. Create Profile
  const profile = await prisma.profile.upsert({
    where: { id: 'default-profile' },
    update: {},
    create: {
      id: 'default-profile',
      name: 'Nikhil Kushwaha',
      headline: 'Full Stack Developer',
      bio: 'Passionate Full Stack Developer with expertise in React, Next.js, and NestJS.',
      profileImage: 'https://github.com/shadcn.png',
      location: 'India',
      email: 'contact@nikhilkushwaha.com',
      freelanceAvailable: true,
      remoteAvailable: true,
      resumeUrl: '#'
    }
  });
  console.log('Profile created');

  // 2. Create Skills
  const skills = [
    { name: 'React', category: 'FRONTEND', level: 'EXPERT', icon: 'react', order: 1 },
    { name: 'Next.js', category: 'FRONTEND', level: 'ADVANCED', icon: 'nextjs', order: 2 },
    { name: 'TypeScript', category: 'FRONTEND', level: 'ADVANCED', icon: 'typescript', order: 3 },
    { name: 'NestJS', category: 'BACKEND', level: 'ADVANCED', icon: 'nestjs', order: 4 },
    { name: 'Prisma', category: 'DATABASE', level: 'INTERMEDIATE', icon: 'prisma', order: 5 },
    { name: 'PostgreSQL', category: 'DATABASE', level: 'INTERMEDIATE', icon: 'postgresql', order: 6 },
    { name: 'Tailwind CSS', category: 'FRONTEND', level: 'EXPERT', icon: 'tailwind', order: 7 },
  ];

  for (const skill of skills) {
    await prisma.skill.create({ 
      data: {
        name: skill.name,
        category: skill.category as any,
        level: skill.level as any,
        icon: skill.icon,
        order: skill.order
      }
    });
  }
  console.log('Skills created');

  // 3. Create Experience
  await prisma.experience.create({
    data: {
      company: 'Tech Solutions Inc.',
      role: 'Full Stack Developer',
      location: 'Remote',
      startDate: new Date('2022-01-01'),
      currentlyWorking: true,
      achievements: {
        create: [
          { title: 'Led Frontend Architecture', description: 'Developing high-performance web applications using Next.js and NestJS.' }
        ]
      }
    }
  });
  console.log('Experience created');

  // 4. Create Education
  await prisma.education.create({
    data: {
      institution: 'University of Technology',
      degree: 'Bachelor of Technology',
      fieldOfStudy: 'Computer Science',
      startYear: 2018,
      endYear: 2022,
      description: 'Graduated with Honors. Specialized in Web Technologies and Distributed Systems.'
    }
  });
  console.log('Education created');

  // 5. Create Projects
  await prisma.project.create({
    data: {
      name: 'E-Commerce Platform',
      slug: 'e-commerce-platform',
      description: 'A modern, high-performance e-commerce platform built with Next.js App Router and NestJS.',
      thumbnail: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80',
      gallery: ['https://images.unsplash.com/photo-1557821552-17105176677c?w=1600&q=80'],
      published: true,
      links: {
        githubUrl: 'https://github.com/nikhil/ecommerce',
        demoUrl: 'https://ecommerce-demo.vercel.app'
      },
      categories: {
        create: [
          { category: { create: { name: 'Full Stack' } } }
        ]
      },
      technologies: {
        create: [
          { technology: { create: { name: 'Next.js' } } },
          { technology: { create: { name: 'NestJS' } } }
        ]
      }
    }
  });

  console.log('Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

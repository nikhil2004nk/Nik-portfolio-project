export const DEFAULT_CASE_STUDY_TEMPLATE = `## Overview\n\n\n## Problem\n\n\n## Target Audience\n\n\n## Solution\n\n\n## Pipeline & Workflow\n\n\n## Key Features\n\n\n## Technology Stack\n\n\n## Architecture\n\n\n## Challenges & Learnings\n\n\n## Outcome\n\n\n## Future Roadmap\n\n`;

export const DEFAULT_STRUCTURED_SECTIONS = [
  { heading: 'Overview', content: '' },
  { heading: 'Problem', content: '' },
  { heading: 'Target Audience', content: '' },
  { heading: 'Solution', content: '' },
  { heading: 'Pipeline & Workflow', content: '' },
  { heading: 'Key Features', content: '' },
  { heading: 'Technology Stack', content: '' },
  { heading: 'Architecture', content: '' },
  { heading: 'Challenges & Learnings', content: '' },
  { heading: 'Future Roadmap', content: '' },
];

export const DEFAULT_HIGHLIGHTS_ARR = [
  { title: "Key Achievement 1", description: "" },
  { title: "Key Achievement 2", description: "" },
  { title: "Key Achievement 3", description: "" }
];

export const DEFAULT_HIGHLIGHTS_RAW = "- **Key Achievement 1**: \n- **Key Achievement 2**: \n- **Key Achievement 3**: ";

export const DEFAULT_ARCHITECTURE_OVERVIEW = "Modular full-stack architecture designed for scalability and performance.";

export const DEFAULT_ARCHITECTURE_COMPONENTS = [
  { name: "Frontend", technology: "Next.js / React", responsibility: "User interface and client-side logic." },
  { name: "Backend API", technology: "Node.js / Express or NestJS", responsibility: "Core business logic, authentication, and API endpoints." },
  { name: "Database", technology: "PostgreSQL / MongoDB", responsibility: "Data persistence and querying." }
];

export const DEFAULT_ARCHITECTURE_FLOW = [
  { step: "User Interaction" },
  { step: "Frontend App" },
  { step: "Backend API" },
  { step: "Database" }
];

export const DEFAULT_ARCHITECTURE_RAW = `### Overview\n${DEFAULT_ARCHITECTURE_OVERVIEW}\n\n### Components\n- **Frontend (Next.js / React)**: User interface and client-side logic.\n- **Backend API (Node.js)**: Core business logic, authentication, and API endpoints.\n- **Database (PostgreSQL / MongoDB)**: Data persistence and querying.\n\n### Pipeline / Flow\nUser Interaction ➔ Frontend App ➔ Backend API ➔ Database`;

export const DEFAULT_DEPLOYMENT_ARR = [
  { environment: "Frontend", technology: "Vercel / Netlify", description: "Production-ready web deployment." },
  { environment: "Backend API", technology: "Render / AWS", description: "Containerized API service." },
  { environment: "Database", technology: "Supabase / RDS", description: "Managed or production PostgreSQL environment." }
];

export const DEFAULT_DEPLOYMENT_RAW = `### Frontend\n- **Technology**: Vercel / Netlify\n- **Deployment**: Production-ready web deployment.\n\n### Backend API\n- **Technology**: Render / AWS\n- **Deployment**: Containerized API service.\n\n### Database\n- **Technology**: Supabase / RDS\n- **Deployment**: Managed or production PostgreSQL environment.`;

export const DEFAULT_TIMELINE_ARR = [
  { phase: "Planning & Architecture", description: "Defined the system architecture, technology stack, and core application modules." },
  { phase: "Core Platform Development", description: "Implemented authentication, database schemas, and core backend APIs." },
  { phase: "Feature Implementation", description: "Built the primary features, user interfaces, and business logic." },
  { phase: "Testing & Refinement", description: "Validated the complete workflow, fixed bugs, and improved UX." },
  { phase: "Deployment & Launch", description: "Prepared the application for production deployment and launched." }
];

export const DEFAULT_TIMELINE_RAW = DEFAULT_TIMELINE_ARR.map(t => `### ${t.phase}\n${t.description}`).join('\n\n');

export const DEFAULT_FEATURES_ARR = [
  { title: "Authentication & Security", description: "Secure user authentication using JWT and role-based access control." },
  { title: "Responsive Dashboard", description: "A fully responsive admin dashboard built with Tailwind CSS." },
  { title: "API Integration", description: "Seamless integration with third-party services and RESTful APIs." }
];

export const DEFAULT_METRICS_ARR = [
  { label: "Performance", value: "10x Faster" },
  { label: "Uptime", value: "99.9%" },
  { label: "User Retention", value: "+40%" }
];

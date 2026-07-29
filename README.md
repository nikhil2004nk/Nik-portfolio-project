# Nik Portfolio Project

A full-stack developer portfolio with a "Live System" visual identity.

## Tech Stack
- **Frontend:** Next.js 14 (App Router), Tailwind CSS v4, Framer Motion
- **Backend:** NestJS, Prisma ORM, PostgreSQL
- **Language:** TypeScript

## Setup Instructions

### 1. Database Setup
1. Ensure you have a PostgreSQL database running.
2. In the `backend` folder, copy `.env.example` to `.env` and set your `DATABASE_URL`.
3. Run migrations and seed the database:
   ```bash
   cd backend
   npx prisma migrate dev
   npx prisma db seed
   ```

### 2. Running the Backend (NestJS)
```bash
cd backend
npm install
npm run dev
```
The backend API will run on `http://localhost:4000`.

### 3. Running the Frontend (Next.js)
In a new terminal:
```bash
cd frontend
npm install
npm run dev
```
The frontend will run on `http://localhost:3000`.

### 4. Contact Form Setup
To receive emails from the contact form, configure your SMTP settings in `backend/.env`:
```env
SMTP_HOST=smtp.yourprovider.com
SMTP_PORT=587
SMTP_USER=your_username
SMTP_PASS=your_password
CONTACT_TO_EMAIL=your.email@example.com
```

# SecureGate

A security management dashboard built with **Next.js 16** (App Router). Provides full authentication flow (signup, email verification, login, password reset) combined with a security-themed admin dashboard for monitoring threats, managing access control, viewing activity logs, and configuring settings.

## Features

- **Authentication & User Management**
  - User registration with password strength meter
  - Email verification via Resend
  - Login with credentials (NextAuth v4, JWT sessions)
  - Rate-limited login (Upstash Redis)
  - Forgot / reset password flow
  - Protected dashboard routes (middleware)

- **Dashboard**
  - Overview with threat stats, authentication health chart, and security activity feed
  - Threat Monitor with live summary, bar chart visualization, and active incidents table
  - Activity Log with searchable/sortable event table
  - Access Control with user management table and role badges
  - Settings with profile editing, security settings, notifications, and API keys tabs
  - Responsive sidebar navigation and top navigation bar with notifications dropdown

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 |
| Auth | NextAuth v4 (CredentialsProvider, JWT) |
| Database ORM | Prisma 5 |
| Database | PostgreSQL (Neon) / SQLite (dev) |
| Email | Resend + React Email |
| Rate Limiting | Upstash Redis |
| Styling | Tailwind CSS v4 + Geist font |
| Icons | Lucide React |
| Forms | React Hook Form + Zod |

## Getting Started

Live Demo: https://securegateco.vercel.app/

## Project Structure

- `app/` -- App Router pages (auth, dashboard, API routes)
- `lib/` -- Utilities (auth config, mail, rate limiting, Prisma client)
- `prisma/` -- Database schema and migrations
- `emails/` -- React Email templates
- `middleware.ts` -- Route protection

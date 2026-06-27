# Nexus AI

A portfolio-grade AI SaaS dashboard — a production-style MVP built to demonstrate full-stack product engineering for GitHub portfolios, Upwork clients, and live demos.

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?style=flat-square&logo=tailwindcss)
![Prisma](https://img.shields.io/badge/Prisma-5-2D3748?style=flat-square&logo=prisma)

## Overview

Nexus AI is a modern SaaS dashboard with an AI chat assistant, analytics overview, chat history, settings, and pricing pages. It is designed to look and feel like a real startup product — clean UI, consistent layout, and stable backend logic.

**Purpose:** Portfolio SaaS MVP showcasing Next.js App Router, Prisma ORM, API routes, and polished product UI.

## Features

- **Landing page** — SaaS hero section with CTA
- **Dashboard** — Overview cards with live stats from the database
- **AI Chat** — User/assistant messaging with loading states
- **Chat History** — Browse and reopen previous conversations
- **Settings** — Mock user profile and preferences
- **Pricing** — Free / Pro / Enterprise billing UI
- **Smart AI** — OpenAI when configured, intelligent mock responses otherwise
- **Persistent storage** — Chats and messages saved via Prisma + SQLite

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Database | Prisma ORM + SQLite |
| AI | OpenAI API (optional) |
| Deployment | Vercel-ready |

## Pages

| Route | Description |
|-------|-------------|
| `/` | Marketing landing page |
| `/dashboard` | Analytics overview + quick actions |
| `/chat` | AI chat interface |
| `/history` | Previous conversations |
| `/settings` | Account settings (mock) |
| `/pricing` | Subscription plans |

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/artyomwhite/ai-saas-dashboard.git
cd ai-saas-dashboard

# Install dependencies
npm install

# Set up environment and database
cp .env.example .env
npm run db:setup

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

Create a `.env` file in the project root:

```env
DATABASE_URL="file:./dev.db"
OPENAI_API_KEY=""
```

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | Yes | SQLite path for local development |
| `OPENAI_API_KEY` | No | OpenAI API key. Leave empty to use built-in mock AI responses |

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run db:setup` | Push schema + seed default user |
| `npm run db:push` | Sync Prisma schema to database |
| `npm run db:seed` | Seed default user |

## Project Structure

```
app/
  page.tsx                 # Landing page
  (app)/                   # Dashboard shell (sidebar + topbar)
    dashboard/
    chat/
    history/
    settings/
    pricing/
  api/chat/                # Chat messaging API
  api/chats/               # Chat history API
components/                # Reusable UI components
lib/                       # prisma, ai, user helpers
prisma/schema.prisma       # Database schema
```

## Deployment

### GitHub

Push the project to GitHub. See [GITHUB_PUSH.md](./GITHUB_PUSH.md) for step-by-step instructions.

### Vercel

1. Import the GitHub repository at [vercel.com/new](https://vercel.com/new)
2. Vercel auto-detects Next.js — no extra config needed
3. Add environment variables:
   - `DATABASE_URL` — use a hosted database for production (SQLite is local-only)
   - `OPENAI_API_KEY` — optional, for real AI responses
4. Deploy

> **Production note:** SQLite works for local development. For Vercel production, switch to PostgreSQL (Neon, Supabase) or Turso and update `DATABASE_URL`.

## License

MIT — free to use for portfolio and learning purposes.

---

Built as a portfolio SaaS MVP · [GitHub](https://github.com/artyomwhite/ai-saas-dashboard)

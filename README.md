# Ramadan Cut Tracker

A production-ready web app for tracking your 4-week Ramadan workout plan. Built with React, TypeScript, Vite, Tailwind CSS, and Supabase.

## Features

- **4-week calendar** starting Feb 22, 2026 (28 days)
- **Daily workout checklist** with Pre-Iftar Fat Burn, Gym (A/B/C selector), Walk, and Rest
- **Completion tracking** persisted in Supabase with optimistic UI updates
- **Magic link auth** (passwordless email login)

## Tech Stack

- **Frontend:** React 19, TypeScript, Vite 7
- **UI:** Tailwind CSS v4
- **Routing:** React Router v7
- **Backend:** Supabase (PostgreSQL, Auth, RLS)
- **Deployment:** Netlify

## Local Development

### Prerequisites

- Node.js 18+
- A Supabase project

### Setup

1. **Clone and install dependencies**

   ```bash
   git clone <repo-url>
   cd ramadan-workout
   npm install
   ```

2. **Create a Supabase project**

   - Go to [supabase.com](https://supabase.com) and create a new project
   - Wait for the project to finish provisioning

3. **Run the database migration**

   - In Supabase Dashboard → SQL Editor, paste and run the contents of `supabase/migrations/001_initial_schema.sql`
   - Or use the Supabase CLI: `supabase db push` (if linked)

4. **Configure environment variables**

   ```bash
   cp .env.example .env
   ```

   Edit `.env` and set:

   - `VITE_SUPABASE_URL` — from Supabase Dashboard → Settings → API → Project URL
   - `VITE_SUPABASE_ANON_KEY` — from Supabase Dashboard → Settings → API → Project API keys → anon public

5. **Enable Email Auth (magic link)**

   - In Supabase Dashboard → Authentication → Providers → Email, ensure Email is enabled
   - Configure "Confirm email" as needed (for magic link, you may disable it for local testing)

6. **Start the dev server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:5173](http://localhost:5173).

## Netlify Deployment

1. **Connect your repository** to Netlify.
2. **Set build settings** (usually auto-detected from `netlify.toml`):
   - Build command: `npm run build`
   - Publish directory: `dist`
3. **Add environment variables** in Netlify → Site settings → Environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. **Deploy.**

## Project Structure

```
src/
├── lib/supabase.ts       # Supabase client
├── hooks/
│   ├── useAuth.ts        # Auth state + seed on login
│   └── usePlanDays.ts    # Fetch plan days with optimistic updates
├── services/
│   ├── auth.ts           # Magic link sign-in
│   ├── planService.ts    # Seed 28-day plan
│   └── taskService.ts    # Toggle tasks, update gym type
├── constants/planTemplates.ts  # Day-of-week mapping, task definitions
├── pages/                # Login, Dashboard, DayDetail
├── components/           # TodayCard, CalendarGrid, DayCard, etc.
└── types/index.ts
supabase/
└── migrations/
    └── 001_initial_schema.sql
```

## Plan Logic

The 4-week plan repeats weekly:

| Day       | Plan              | Gym |
|-----------|-------------------|-----|
| Monday    | Pre-Iftar + Gym   | A   |
| Tuesday   | Pre-Iftar only    | -   |
| Wednesday | Pre-Iftar + Gym   | B   |
| Thursday  | Pre-Iftar only    | -   |
| Friday    | Pre-Iftar + Gym   | C   |
| Saturday  | Walk only         | -   |
| Sunday    | Rest / Light Walk | -   |

On first login, the app seeds 28 `plan_days` and `day_tasks` for the user. Seeding is idempotent; existing rows are not duplicated.

## Sample Seed Data (for testing)

To populate the DB with test data **before** signing in (e.g. to demo or test the UI):

1. Create a test user in **Supabase Dashboard → Authentication → Users → Add user**
2. Copy the user's **UUID** from the Users table
3. Open `supabase/seed.sql` and replace `'YOUR_USER_ID_HERE'` with that UUID
4. Run the script in **Supabase Dashboard → SQL Editor**

The seed creates all 28 plan days with tasks and marks a few tasks as completed (Feb 23–25) for visual variety.

## License

MIT

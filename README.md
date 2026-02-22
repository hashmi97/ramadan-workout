# Ramadan Cut Tracker

A static web app for tracking your 4-week Ramadan workout plan. No backend required—plan data is hardcoded and completion state is saved in your browser's localStorage.

## Features

- **4-week calendar** starting Feb 22, 2026 (28 days)
- **Daily workout checklist** with Fat-Burn Circuit, Gym (A/B/C selector), and Walk
- **Completion tracking** persisted in localStorage
- **Optional passgate** — protect the app with a password (enabled via .env)

## Tech Stack

- **Frontend:** React 19, TypeScript, Vite 7
- **UI:** Tailwind CSS v4
- **Routing:** React Router v7
- **Storage:** localStorage (browser-only)

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

### Optional: Enable Passgate

Create `.env` and set:

```
VITE_PASSGATE_ENABLED=true
VITE_PASSGATE_PASSWORD=your_password
```

## Build & Deploy

```bash
npm run build
```

Deploy the `dist` folder to any static host (Netlify, Vercel, GitHub Pages, etc.).

## Plan Logic

Week starts Sunday. Gym days: Sunday, Tuesday, Thursday.

| Day     | Pre-Iftar        | After Iftar |
|---------|------------------|-------------|
| Sunday  | Fat-Burn Circuit | Gym A (Chest, Shoulders, Triceps, Abs) |
| Monday  | Fat-Burn Circuit | — |
| Tuesday | Fat-Burn Circuit | Gym B (Back, Biceps, Abs) |
| Wednesday | Fat-Burn Circuit | — |
| Thursday | Fat-Burn Circuit | Gym C (Legs, Shoulders, Abs) |
| Friday  | Fat-Burn Circuit | — |
| Saturday | Walk 45 min      | — |

## License

MIT

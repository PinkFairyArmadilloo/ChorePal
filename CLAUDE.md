# ChorePal — Claude Context

## What this app does
ChorePal is a family chore management app. Parents create chore assignments for their children, track weekly completion, and view a progress dashboard. The "Wanted Poster" feature highlights the child with the lowest completion rate.

## Dev commands
```bash
# Frontend (from /frontend)
npm run dev          # Vite dev server → http://localhost:5173

# Backend (from /backend)
node connect.js      # Express server → http://localhost:3000
npx nodemon connect.js  # with auto-reload
```

## Tech stack
| Layer | Tech |
|---|---|
| Frontend | React 19, Redux Toolkit, React Router DOM 7, Tailwind CSS 4, Vite |
| Backend | Node.js, Express 5, MongoDB (Mongoose), JWT, bcrypt, Multer |
| Storage | AWS S3 (bucket: ptangatuestorage, region: us-east-2) |
| Testing | Jest (frontend + backend) |

## Key file paths
```
/frontend/src/
  App.jsx                    — routes (/ login, /dashboard)
  main.jsx                   — Redux Provider + BrowserRouter
  index.css                  — global styles + CSS custom properties
  pages/Login.jsx            — auth (login + signup toggle)
  pages/Dashboard.jsx        — main view (loads chores, renders WeekView + ProgressWeekly + Navbar)
  components/Navbar.jsx      — top nav + wanted poster display
  components/WeekView.jsx    — 7-day grid of DayCards
  components/DayCard.jsx     — per-day chore list with status select
  components/AddChore.jsx    — inline form to create a chore
  utils/ProgressBar.jsx      — single-child progress bar with ARIA
  utils/ProgressWeekly.jsx   — all-children progress summary
  redux/choreSlice.js        — async thunks: fetchChores, addChore, completeChore, deleteChore
  redux/store.js             — Redux store

/backend/
  server.js                  — Express app, middleware, route mounting
  connect.js                 — MongoDB Atlas connection entry point
  userRoutes.js              — GET/POST/PUT/DELETE /users, POST /users/login (JWT)
  choreRoutes.js             — GET/POST/PUT/DELETE /chores
  childRoutes.js             — GET/POST/PUT/DELETE /children
  awsRoutes.js               — GET /images/:filename (S3 → base64)
```

## Color scheme (CSS custom properties in index.css)
| Variable | Hex | Usage |
|---|---|---|
| `--color-primaryDark` | `#1a2b4c` | Navy — backgrounds |
| `--color-accentOrange` | `#ff6600` | Orange — decorative only (fails AA for text) |
| `--color-accentOrangeDark` | `#cc5200` | Dark orange — text/interactive (4.77:1 on white ✓) |
| `--color-surface` | `#2e3a59` | Lighter navy — card surfaces |
| `--color-lightGray` | `#f7f9fa` | Page background |

## Accessibility (WCAG 2.1 AA)
See `/docs/accessibility.md` for full decision log.

**Key decisions:**
- `role="progressbar"` + `aria-valuenow/min/max` on ProgressBar
- `role="alert"` + `aria-live="assertive"` on error messages
- `role="status"` + `aria-live="polite"` on loading/success messages
- Skip link `<a href="#main-content">` at top of App
- Global `*:focus-visible` outline using `--color-accentOrangeDark`
- All `<select>` elements have `aria-label`
- `<nav aria-label="Main navigation">` wraps Navbar
- `bg-red-700` / `bg-green-700` in ProgressBar (meet 4.5:1 AA ratio)
- DOM-based error messages replace `alert()` in AddChore

## Redux state shape
```js
{
  chores: {
    chores: [],        // chore objects: { choreName, isWeekly, isCompleted, rating, childName, image, day }
    loading: Boolean,
    status: 'idle' | 'loading' | 'succeeded' | 'failed',
    error: null | String
  }
}
```

## Auth
- JWT stored in `localStorage` as `token`
- 1-hour expiry
- bcrypt password hashing (6 salt rounds)
- No protected route guard currently in frontend

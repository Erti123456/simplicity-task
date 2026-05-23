# Simplicity Task

A small CRUD app for managing announcements. Built as a take-home for a job application.

React frontend, Node/Express backend, Postgres on Neon. One repo, two packages.

## Stack

- **Backend** — Node + TypeScript, Express 5, Prisma, PostgreSQL (Neon), socket.io, zod
- **Frontend** — React 19 + Vite, TypeScript, Tailwind v4, React Router, react-select, sonner, socket.io-client

## Running locally

### Backend

```bash
cd backend
cp .env.example .env
# put your Neon Postgres connection string into DATABASE_URL
npm install
npx prisma migrate deploy
npm run dev
```

Backend runs at `http://localhost:3000`.

Optionally seed 20 fake announcements:

```bash
npm run seed
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at `http://localhost:5173`.

## API

| Method | Endpoint | What it does |
|---|---|---|
| GET | `/announcements` | Paginated list. Query: `page`, `limit`, `search`, `category` |
| GET | `/announcements/:id` | One announcement |
| POST | `/announcements` | Create. Also emits `announcement:created` over socket.io |
| PUT | `/announcements/:id` | Update |
| DELETE | `/announcements/:id` | Delete |
| GET | `/health` | Health check |

The list endpoint returns a paginated envelope:

```json
{ "data": [...], "total": 22, "page": 1, "limit": 10, "totalPages": 3 }
```

All other endpoints return the resource directly. Errors come back as `{ "error": { "code": "...", "message": "..." } }`.

### Request body (POST / PUT)

```json
{
  "title": "string",
  "body": "string",
  "categories": ["CITY", "HEALTH"],
  "publishedAt": "2024-01-15T10:00:00.000Z"
}
```

Available categories: `CITY`, `COMMUNITY_EVENTS`, `CRIME_AND_SAFETY`, `CULTURE`, `DISCOUNTS_AND_BENEFITS`, `EMERGENCIES`, `FOR_SENIORS`, `HEALTH`, `KIDS_AND_FAMILY`. At least one is required.

### Filtering example

```
GET /announcements?page=1&search=park&category=HEALTH
```

## WebSocket

When a new announcement is created, the server emits `announcement:created` (payload: the new announcement) to all connected socket.io clients. The frontend listens for this and shows a sonner toast.

To test in Postman/curl, just POST while the frontend is open — toast pops up in the browser.

## Notes

- The UI shows dates as `MM/DD/YYYY HH:mm` per the assignment. On the wire they're ISO 8601 strings.
- Category enum values are uppercase (`CITY`); the UI maps them to nice labels (`City`) client-side.
- `.env` is gitignored — use `.env.example` as the template.

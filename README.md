# Simplicity Task

Fullstack CRUD app for managing announcements. React frontend + Node/Express backend with Postgres.

## Stack

- **Backend:** Node, TypeScript, Express 5, Prisma, PostgreSQL (Neon), socket.io, zod
- **Frontend:** React 19, Vite, TypeScript, Tailwind, React Router, TanStack Query

## Running locally

### Backend

```bash
cd backend
cp .env.example .env
# fill in DATABASE_URL with your Postgres connection string
npm install
npx prisma migrate deploy
npm run dev
```

Server runs on `http://localhost:3000`.

To seed the DB with fake data:

```bash
npm run seed
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

App runs on `http://localhost:5173`.

## API endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/announcements` | List all announcements. Supports `?search=text` and `?category=CITY` |
| GET | `/announcements/:id` | Get single announcement |
| POST | `/announcements` | Create announcement |
| PUT | `/announcements/:id` | Update announcement |
| DELETE | `/announcements/:id` | Delete announcement |
| GET | `/health` | Health check |

### Request body (POST / PUT)

```json
{
  "title": "string",
  "body": "string",
  "categories": ["CITY", "HEALTH"],
  "publishedAt": "2024-01-15T10:00:00.000Z"
}
```

Available categories: `CITY`, `COMMUNITY_EVENTS`, `CRIME_AND_SAFETY`, `CULTURE`, `DISCOUNTS_AND_BENEFITS`, `EMERGENCIES`, `FOR_SENIORS`, `HEALTH`, `KIDS_AND_FAMILY`

## Testing with Postman

Import the base URL `http://localhost:3000` and hit the endpoints above. For POST/PUT set `Content-Type: application/json`.

Example filter: `GET /announcements?category=HEALTH&search=park`

## WebSocket

The server emits an `announcement:created` event via socket.io whenever a new announcement is created. Connect to `http://localhost:3000` with a socket.io client and listen for that event.

## Notes

- Dates are ISO 8601 on the API (`publishedAt`), formatted in the UI
- `.env` is gitignored — use `.env.example` as a template

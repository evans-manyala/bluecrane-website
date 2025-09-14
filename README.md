# IT Tech Service — Full‑Stack Template

Stack:
- **Frontend**: React (Vite) + Tailwind CSS
- **Backend**: FastAPI + SQLAlchemy (MySQL)
- **Reverse Proxy**: NGINX (serves frontend & proxies `/api` to backend)
- **Runtime**: Docker Compose (with MySQL 8)

## Quick start

1) Install Docker & Docker Compose.

2) Copy env:
```bash
cp .env.example .env
```

3) Build & run:
```bash
docker compose up -d --build
```

4) Open:
- Website: http://localhost
- API: http://localhost/api/health
- API docs (Swagger): http://localhost/api/docs

## Seeding services

Use Swagger UI (http://localhost/api/docs) → `POST /api/services` to add offerings. Example body:
```json
{
  "name": "Website Maintenance",
  "slug": "website-maintenance",
  "description": "Monthly updates, backups, and monitoring.",
  "price": 199.0
}
```

Those will appear on the homepage under **Our Services**.

## Project layout

```
it-tech-service/
├── docker-compose.yml
├── .env.example
├── docker/
│   └── mysql/init.sql
├── backend/
│   ├── Dockerfile
│   ├── requirements.txt
│   └── app/
│       ├── __init__.py
│       ├── config.py
│       ├── crud.py
│       ├── db.py
│       ├── main.py
│       ├── models.py
│       └── schemas.py
└── web/
    ├── Dockerfile  (builds frontend, serves with nginx)
    ├── nginx.conf
    └── frontend/
        ├── index.html
        ├── package.json
        ├── vite.config.ts
        ├── tailwind.config.js
        ├── postcss.config.cjs
        └── src/
            ├── App.tsx
            ├── main.tsx
            ├── styles.css
            └── components/...
```

## Custom domain & HTTPS

- Put this behind an nginx or Traefik reverse proxy with TLS (e.g. via Let's Encrypt).
- For production, set stricter `CORS_ORIGINS` in `.env` (e.g. your domain).

## Dev tips

- Live editing the frontend locally: run `npm run dev` inside `web/frontend` and point API calls to `http://localhost:8000/api` (or add a Vite proxy). For the containerized build we bundle the frontend and serve with nginx.
- Extend the DB schema in `backend/app/models.py` then run the stack; tables auto-create on start.
- Add auth later (e.g., OAuth/OpenID) and role-based admin UI to manage services & tickets.

---

## Admin & Branding

### Admin login
Set credentials in `.env` before building:
```
ADMIN_USER=admin
ADMIN_PASS=change-me
JWT_SECRET=change-this-secret
JWT_EXPIRE_MIN=240
```
Then build and run:
```
docker compose up -d --build
```
Open **Admin** at `http://localhost/#admin`. Use your `ADMIN_USER`/`ADMIN_PASS` to log in. You can create, edit, and delete services, and view incoming tickets.

### Branding
Edit `web/frontend/src/branding.ts` for site name, tagline, and palette. Replace `web/frontend/src/assets/logo.svg` with your logo and update the navbar if needed.

---

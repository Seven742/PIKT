# PIKT — Next.js

Single Next.js (App Router) app. It replaces the old `Frontend/` (React + Vite) and `Backend/` (Express) projects.

## Setup
```bash
npm install
cp .env.example .env.local      # fill in DB, Cloudinary, JWT_SECRET
# import database.sql into MySQL (phpMyAdmin / Workbench)
npm run create-admin            # creates the admin user (or: npm run create-admin -- newpassword)
npm run dev                     # http://localhost:3000
```
Admin panel: `/admin/login`

Check setup any time: open `/api/health` — it shows which env vars are set and whether MySQL is reachable (tables listed).

## Structure
| Old | New |
|-----|-----|
| `Frontend/src/routes/AppRoutes.jsx` | `src/app/**/page.jsx` (file-based routing) |
| `MainLayout` + `<Outlet/>` | `src/app/(site)/layout.jsx` |
| `ProtectedRoute` | `src/app/admin/(panel)/layout.jsx` |
| `Backend/controllers + routes` | `src/app/api/**/route.ts` |
| `authMiddleware.protect` | `src/lib/auth.ts` → `protect()` |
| `multer` | `src/lib/form.ts` → `readBody()` (FormData) |
| `config/db.js`, `config/cloudinary.js` | `src/lib/db.ts`, `src/lib/cloudinary.ts` |
| `index.html` meta tags | `metadata` in `src/app/layout.tsx` |
| Tailwind v3 `tailwind.config.js` | `@theme` in `src/app/globals.css` (Tailwind v4) |

API endpoints are unchanged (`/api/auth/*`, `/api/teachers`, `/api/news`, `/api/courses`, `/api/cooperations`).

## Notes
- Upload limit is 4 MB (Vercel rejects request bodies above ~4.5 MB). Change `MAX_UPLOAD_BYTES` in `src/lib/form.ts` if you self-host.
- `JWT_SECRET` is required in production.
- Change the default admin password (`pikt2024`) via `ADMIN_PASSWORD` or `npm run create-admin -- <password>`.

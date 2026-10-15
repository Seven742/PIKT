# 🎓 PIKT — វិទ្យាស្ថានពហុបច្ចេកទេស ខេត្តកំពង់ធំ
### Polytechnic Institute of Kampong Thom — Web Portal & Admin CMS

[![Next.js](https://img.shields.io/badge/Next.js-16.3-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=flat&logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![MySQL](https://img.shields.io/badge/MySQL-8.x-4479A1?style=flat&logo=mysql)](https://www.mysql.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Cloudinary](https://img.shields.io/badge/Cloudinary-Media-3448C5?style=flat&logo=cloudinary)](https://cloudinary.com/)

A modern, unified web portal and content management system for the **Polytechnic Institute of Kampong Thom (PIKT)**. Built with Next.js App Router, replacing the legacy two-tier setup (Vite React frontend + Express backend) with a single, high-performance full-stack codebase.

---

## 🌟 Key Features

- **Public Web Portal**:
  - 🏛️ **Institute Overview & History**: Vision, mission, history, and official accreditations/licenses.
  - 📚 **Academic Programs**: Detailed course catalog across Technical (AD) and Vocational tracks.
  - 👨‍🏫 **Faculty & Staff Directory**: Teacher profiles, positions, subjects, and contact info.
  - 📰 **News & Announcements**: Campus updates, enrollment deadlines, and photo galleries.
  - 🤝 **Partnerships & Cooperation**: Local and international partner organizations (ADB, JICA, KOICA, ministries).
  - 📬 **Contact & Admissions**: Campus location, contact details, and admissions inquiry channels.

- **Admin Management Panel (`/admin`)**:
  - 🔐 **Secure Authentication**: JWT-based session auth with salted `bcrypt` password hashing.
  - 📊 **Dashboard Overview**: Fast status checks and management overview.
  - ✏️ **Full Content CRUD**: Manage News, Courses, Teachers, and Cooperation partners.
  - ☁️ **Media Pipeline**: Direct server-side upload and optimization to Cloudinary with 4 MB payload handling.
  - 🔑 **Account Security**: In-panel password change tool and CLI emergency reset script.

- **Architecture & Performance**:
  - 🚀 **Next.js 16 App Router**: Server-Side Rendering (SSR) & Static Generation (SSG) with TypeScript.
  - 🎨 **Tailwind CSS v4**: Ultra-fast utility styling utilizing modern `@theme` design tokens.
  - 🐬 **Robust MySQL Pooling**: Connection pool persistence across development hot-reloads and production serverless invocations, including SSL support.
  - 🩺 **Built-in Diagnostic API**: Real-time health check endpoint (`/api/health`) verifying environment and DB connectivity.

---

## 📁 Project Structure

```text
pikt-next/
├── database.sql                  # Complete MySQL schema & initial seed data
├── scripts/
│   └── create-admin.mjs          # CLI script to seed/reset admin credentials
├── public/                       # Static public assets (logos, icons, images)
└── src/
    ├── app/                      # Next.js App Router routes & APIs
    │   ├── (site)/               # Public-facing pages (Home, About, Courses, etc.)
    │   │   ├── about/
    │   │   ├── contact/
    │   │   ├── cooperation/
    │   │   ├── courses/
    │   │   ├── history/
    │   │   ├── license/
    │   │   ├── news/
    │   │   ├── teacher/
    │   │   ├── layout.jsx        # Public layout (Header/Navbar & Footer)
    │   │   └── page.jsx          # Homepage
    │   ├── admin/                # Admin CMS pages
    │   │   ├── (panel)/          # Protected admin dashboard & CRUD views
    │   │   └── login/            # Admin login screen
    │   ├── api/                  # Serverless Route Handlers
    │   │   ├── auth/             # Login, profile, password change
    │   │   ├── cooperations/     # Partnerships endpoints
    │   │   ├── courses/          # Courses endpoints
    │   │   ├── health/           # Health check & system diagnostics
    │   │   ├── news/             # News & announcements endpoints
    │   │   └── teachers/         # Faculty directory endpoints
    │   ├── globals.css           # Tailwind v4 theme & global styles
    │   └── layout.tsx            # Root HTML & SEO metadata
    ├── components/               # UI components
    │   ├── Admin/                # Admin panel tables, forms, modals
    │   ├── Home/                 # Section components for public portal
    │   └── Layout/               # Shared Navbar and Footer components
    ├── lib/                      # Backend utilities & server helpers
    │   ├── auth.ts               # JWT sign/verify & protect() middleware helper
    │   ├── cloudinary.ts         # Cloudinary SDK wrapper
    │   ├── db.ts                 # MySQL pool configuration & SSL handler
    │   ├── form.ts               # Multipart FormData body parser
    │   └── http.ts               # Standardized JSON response helpers
    └── services/                 # Frontend client-side API callers
```

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v20.x or later recommended)
- [MySQL](https://dev.mysql.com/downloads/) (v8.0+ or MariaDB 10.5+)
- [Cloudinary](https://cloudinary.com/) free tier account (for photo uploads)

### 2. Installation
Clone the repository and install dependencies:
```bash
git clone https://github.com/Seven742/PIKT.git
cd pikt-next
npm install
```

### 3. Environment Configuration
Create a local environment file by copying `.env.example`:
```bash
cp .env.example .env.local
```

Fill in the required environment variables in `.env.local`:
```ini
# ── Database (MySQL) ──────────────────────────
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=pikt_db
DB_PORT=3306
# DB_SSL=false                    # set to "true" for cloud databases (PlanetScale, Aiven, etc.)

# ── Cloudinary (Image Uploads) ────────────────
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# ── JWT Authentication ────────────────────────
JWT_SECRET=use_a_secure_long_random_string_here
JWT_EXPIRES_IN=7d

# ── Admin Account Creation ────────────────────
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your_secure_password
```

### 4. Database Setup
Import the database schema and sample data located in [`database.sql`](file:///d:/Technology/Next%20Js/pikt-next/pikt-next/database.sql):

- **Via MySQL CLI**:
  ```bash
  mysql -u root -p < database.sql
  ```
- **Via phpMyAdmin / MySQL Workbench**:
  Open phpMyAdmin or Workbench, create database `pikt_db` (utf8mb4), and import `database.sql`.

### 5. Seed or Reset Admin User
Run the setup script to create the initial admin user with bcrypt hashed password:
```bash
npm run create-admin
```
*(To set a specific password on the fly: `npm run create-admin -- MySecretPass123`)*

### 6. Start Development Server
```bash
npm run dev
```
Open your browser:
- **Public Portal**: [http://localhost:3000](http://localhost:3000)
- **Admin CMS**: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
- **Health Check**: [http://localhost:3000/api/health](http://localhost:3000/api/health)

---

## 🩺 System Diagnostic & Health Check

You can verify that all environment variables and database connections are operating correctly at any time:
- Navigate to: `http://localhost:3000/api/health`
- **Response Example**:
  ```json
  {
    "healthy": true,
    "env": {
      "DB_HOST": true,
      "DB_USER": true,
      "DB_PASSWORD": true,
      "DB_NAME": true,
      "JWT_SECRET": true,
      "CLOUDINARY_CLOUD_NAME": true,
      "CLOUDINARY_API_KEY": true,
      "CLOUDINARY_API_SECRET": true
    },
    "db": {
      "ok": true,
      "tables": ["admins", "cooperations", "courses", "news", "teachers"]
    }
  }
  ```

---

## 📡 API Overview

| Endpoint | Method | Access | Description |
|---|---|---|---|
| `/api/health` | `GET` | Public | System & DB connectivity diagnostics |
| `/api/auth/login` | `POST` | Public | Admin login (returns JWT token) |
| `/api/auth/me` | `GET` | Admin | Get current admin profile |
| `/api/auth/change-password` | `PUT` | Admin | Update admin password |
| `/api/teachers` | `GET`, `POST` | Public / Admin | List faculty / Create teacher (with photo upload) |
| `/api/teachers/[id]` | `GET`, `PUT`, `DELETE` | Public / Admin | Read / Update / Delete teacher |
| `/api/news` | `GET`, `POST` | Public / Admin | List news / Create announcement (with image upload) |
| `/api/news/[id]` | `GET`, `PUT`, `DELETE` | Public / Admin | Read / Update / Delete article |
| `/api/courses` | `GET`, `POST` | Public / Admin | List courses / Create course program |
| `/api/courses/[id]` | `GET`, `PUT`, `DELETE` | Public / Admin | Read / Update / Delete course |
| `/api/cooperations` | `GET`, `POST` | Public / Admin | List partners / Create partner (with logo upload) |
| `/api/cooperations/[id]` | `GET`, `PUT`, `DELETE` | Public / Admin | Read / Update / Delete partner |

---

## 🛠️ Available Scripts

| Command | Action |
|---|---|
| `npm run dev` | Starts the Next.js development server at `http://localhost:3000` |
| `npm run build` | Builds optimized production bundle |
| `npm run start` | Runs the production build server |
| `npm run lint` | Runs ESLint check across all files |
| `npm run create-admin` | Seeds or updates the admin account in MySQL |

---

## 🚢 Deployment & Production Notes

- **Vercel / Cloud Platforms**:
  - Add all `.env.local` variables into your deployment platform's Environment Variables settings.
  - Vercel serverless request body upload limit is ~4.5 MB. The built-in parser in `src/lib/form.ts` restricts individual uploads to 4 MB by default.
  - If connecting to remote managed MySQL (PlanetScale, AWS RDS, Aiven, TiDB Cloud), ensure SSL is enabled by setting `DB_SSL=true`.
- **Custom / Self-Hosted VPS**:
  - You can increase `MAX_UPLOAD_BYTES` in [`src/lib/form.ts`](file:///d:/Technology/Next%20Js/pikt-next/pikt-next/src/lib/form.ts) if your reverse proxy (Nginx/Caddy) allows higher request body limits.

---

## 📄 License & Credits

Developed for **វិទ្យាស្ថានពហុបច្ចេកទេស ខេត្តកំពង់ធំ (Polytechnic Institute of Kampong Thom - PIKT)**. <br/>
Developed by: Sai Koemsean <br/>
All rights reserved © 2026.

# 💼 Job Finder — Full-Stack Job Search & Employer Portal

[![Node.js](https://img.shields.io/badge/Node.js-v18%2B-green?logo=node.js)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-v19.0-blue?logo=react)](https://react.dev/)
[![Express](https://img.shields.io/badge/Express-v4.19-lightgrey?logo=express)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-brightgreen?logo=mongodb)](https://www.mongodb.com/)
[![Vite](https://img.shields.io/badge/Vite-v6.1-purple?logo=vite)](https://vitejs.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

A full-stack **Job Finder & Employer Portal** built with the **MERN** stack (MongoDB, Express, React, Node.js). Features role-based access control (RBAC), real-time multi-criteria job filtering, administrative job management with real-time analytics, and a seamless job application workflow for job seekers.

---

## ✨ Key Features

### 👤 Job Seekers (Users)
- **Real-Time Search & Filtering**: Instantly search jobs by keyword, category (IT, Design, Marketing, Finance, HR), location, job type (Full Time, Part Time, Remote, Internship), and experience level.
- **One-Click Application**: Apply directly for open positions with instant client feedback and application state toggles.
- **Application Tracking Dashboard**: View personalized user profile info decoded from JWT payloads and inspect all submitted job applications with real-time status details.

### ⚡ Employers & Administrators (Admins)
- **Role-Based Protection**: Strict backend middleware (`protect`, `adminOnly`) and frontend client-side route protection (`ProtectedRoute`).
- **Employer Analytics Dashboard**: Real-time summary metrics tracking total jobs, registered job seekers, applications received, and recent listings.
- **Job Publishing & Management**: Create new job listings with rich validation or manage/delete existing positions with database cascade cleanup.

### 🛠️ Developer Experience
- **Database Seeding Utility**: Pre-configured `seed.js` script to instantly populate test accounts and sample job listings.
- **RESTful Architecture**: Modular controllers, Mongoose schemas, and Express route handlers.

---

## 🏗️ Architecture & Tech Stack

```
Job_Finder/
├── Backend/              # Node.js + Express API Server
│   ├── config/           # Database Connection Setup
│   ├── controllers/      # Business & Auth Logic
│   ├── middleware/       # JWT Auth & Admin Protection
│   ├── models/           # Mongoose Schemas (User, Job, Application)
│   ├── routes/           # RESTful API Endpoint Definitions
│   ├── seed.js           # Database Seed Script
│   └── server.js         # Express App Entrypoint
└── Frontend/             # React 19 + Vite Application
    └── src/
        ├── Components/   # Reusable UI (Navbar, JobCard, JobFilter, AdminLayout)
        └── pages/        # Router Pages (Home, Jobs, Login, Register, Dashboards)
```

---

## ⚡ Quick Start & Local Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.0.0 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community) running locally on default port `27017` (or a MongoDB Atlas connection string).

---

### 1. Clone the Repository
```bash
git clone https://github.com/YOUR_USERNAME/Job_Finder.git
cd Job_Finder
```

---

### 2. Backend Setup
```bash
# Navigate to backend directory
cd Backend

# Install dependencies
npm install

# Create environment configuration
# Ensure your Backend/.env contains:
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/job_finder
JWT_SECRET=jobfinder_secret_key

# Seed database with sample data & default accounts
node seed.js

# Start backend server
npm start
```

---

### 3. Frontend Setup
```bash
# Open a new terminal and navigate to frontend directory
cd Frontend

# Install dependencies
npm install

# Launch Vite development server
npm run dev
```

Visit **[http://localhost:5173](http://localhost:5173)** in your browser!

---

## 🔑 Demo Test Accounts

Seed script populates default test accounts for testing both roles:

| Role | Email | Password | Access Rights |
| :--- | :--- | :--- | :--- |
| **Employer / Admin** | `admin@jobfinder.com` | `admin123` | Full access to `/admin`, stats, job posting & deletion |
| **Job Seeker / User** | `user@jobfinder.com` | `user123` | Access to `/jobs`, filtering, application submission & `/dashboard` |

---

## 🔌 API Endpoint Documentation

### Authentication (`/api/auth`)
- `POST /api/auth/register` — Register a new account (`role`: `"user"` or `"admin"`)
- `POST /api/auth/login` — Authenticate and receive JWT token + user profile

### Jobs (`/api/jobs`)
- `GET /api/jobs` — Fetch all jobs (supports query params: `search`, `category`, `location`, `type`, `experience`)
- `GET /api/jobs/:id` — Fetch single job details by ID
- `GET /api/jobs/stats` — 🔐 Get administrative analytics and metrics (*Admin only*)
- `POST /api/jobs` — 🔐 Post a new job listing (*Admin only*)
- `DELETE /api/jobs/:id` — 🔐 Delete a job listing and associated applications (*Admin only*)

### Applications (`/api/apply`)
- `POST /api/apply/:jobId` — 🔐 Apply for a job (*Authenticated user*)
- `GET /api/apply/my` — 🔐 Get all applications submitted by logged-in user (*Authenticated user*)

---

## 📄 License
This project is licensed under the [MIT License](LICENSE).

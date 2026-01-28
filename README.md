# 🚚 UltraShip TMS – High-Performance Logistics Dashboard

A professional, full-stack SaaS-style Transportation Management System built to demonstrate scalable architecture, enterprise-grade UI/UX, and robust data management.

## 🚀 Recent Updates & Pro Features
- **Dynamic Theming:** Seamless Light/Dark mode with a custom Indigo/Slate palette.
- **Advanced Data Grid:** Server-side pagination, multi-field filtering, and persistent sorting.
- **Optimised UX:** Responsive sidebar with mobile drawer, glassmorphic header, and interactive shipment drawer.
- **Apollo Cache Management:** Instant UI updates via cache normalization and smart refetching.

## 🧱 System Architecture
**React (Frontend)** → **Apollo Client** → **GraphQL API (Node.js)** → **MongoDB**

### Frontend
- **Framework:** React 18+ with TypeScript
- **State:** Apollo Client (Server State) & Context API (UI State)
- **Styling:** MUI v6/v7 with Emotion & Responsive Breakpoints
- **Feedback:** Notistack (Snackbars) & MUI Skeletons

### Backend
- **Server:** Apollo Server + Express
- **Database:** MongoDB + Mongoose (Parallel query execution)
- **Security:** JWT Authentication & Middleware-based RBAC
- **Schema:** Strict GraphQL Type System with Input Objects

## ✨ Key Features

### 🔐 Security & RBAC
- **Admin:** Full CRUD access to shipments.
- **Employee:** View-only access with "Flagging" privileges.
- **Auth:** Secure Bcrypt hashing and JWT-protected resolvers.

### 📦 Logistics Workflow
- **Dual Views:** High-density Data Grid and modern Tile/Card layouts.
- **Data Controls:** 
  - **Filter:** Instant status-based filtering (Pending, In Transit, etc.).
  - **Sort:** Persistent server-side sorting by Rate and Date.
  - **Pagination:** Offset-based navigation with dynamic page counts.
- **Detail Drawer:** Deep-dive view with "Logistics Route Map" visualization.

## 📁 Project Structure
`tms-app/`
├── `frontend/` → React application (Vite-based)
└── `backend/` → GraphQL API server (Express/Node)

## 🚀 Getting Started

### 1️⃣ Run Backend
```bash
cd backend && npm install && npm run dev
GraphQL Sandbox: http://localhost:4000/graphql
```

### 2️⃣ Run Frontend
```bash
cd frontend && npm install && npm run dev
App runs at: http://localhost:5173
```

👤 Demo Accounts
Admin: admin@test.com / admin123
Employee: emp@test.com / emp123

👨‍💻 Author: Rahul
# 🚚 Transportation Management System (TMS) – Fullstack Demo

A full-stack SaaS-style Transportation Management System built to demonstrate scalable architecture, clean UI design, and role-based system behavior.

This project simulates a real-world logistics dashboard used to manage shipment operations.


## 🧱 System Architecture

**React (Frontend)** → **Apollo Client** → **GraphQL API (Node.js)** → **MongoDB**

### Frontend
- React + TypeScript
- Apollo Client
- MUI (Material UI)
- Context-based UI state management

### Backend
- Node.js + Express
- Apollo GraphQL Server
- MongoDB + Mongoose
- JWT Authentication
- Role-Based Access Control (RBAC)

## ✨ Key Features

### 🔐 Authentication & Roles
- Secure login using JWT
- Two roles: **Admin** and **Employee**
- Backend-enforced authorization

### 📦 Shipment Management
- Grid and Tile views
- Shipment detail drawer
- Add, Edit, Delete shipments (Admin only)
- Flag shipments for attention (Admin & Employee)

### 🎨 Product-Level UI
- Enterprise dashboard layout
- Sidebar navigation
- Header with user profile & logout
- Loading skeletons
- Toast notifications
- Responsive design

## 📁 Project Structure

tms-app/
├── frontend/ → React application
└── backend/ → GraphQL API server

## 🚀 Getting Started

### 1️⃣ Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/tms-app.git
cd tms-app
```

▶️ Run Backend
> cd backend
> npm install
> npm run dev

GraphQL runs at: http://localhost:4000/graphql

▶️ Run Frontend
> cd frontend
> npm install
> npm run dev

App runs at: http://localhost:5173

👤 Demo Accounts
Admin - email - admin@test.com password - admin123
Employee - email - emp@test.com password - emp123

👨‍💻 Author
Rahul
🔗 LinkedIn: https://www.linkedin.com/in/rahurabh/
🐦 X: https://x.com/KumarRahul1195
💻 GitHub: https://github.com/RahuRabh

💬 Final Note
This project demonstrates real-world product engineering practices with a focus on scalability, maintainability, and polished user experience.
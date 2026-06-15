# 🏋️‍♂️ TALEEM GYM — Premium Fitness Management System & Member App (PWA)

[![Vite](https://img.shields.io/badge/Vite-8.x-646CFF?logo=vite&style=flat-square)](https://vite.dev/)
[![React](https://img.shields.io/badge/React-19.x-61DAFB?logo=react&style=flat-square)](https://react.dev/)
[![Firebase](https://img.shields.io/badge/Firebase-12.x-FFCA28?logo=firebase&style=flat-square)](https://firebase.google.com/)
[![PWA](https://img.shields.io/badge/PWA-Installable-0288D1?logo=pwa&style=flat-square)](https://web.dev/progressive-web-apps/)
[![License](https://img.shields.io/badge/License-MIT-4CAF50?style=flat-square)](LICENSE)

**Taleem Gym** is a premium, mobile-first, installable **Progressive Web App (PWA)** that streamlines daily gym operations. It provides a multi-role system designed for **Gym Owners (Admins)**, **Staff members (Trainers)**, and **Gym Members** to automate check-ins, process renewals, freeze memberships, and manage payments seamlessly.

---

## 🌟 Key Features

### 👑 Admin Dashboard (Owner)
* **Real-time Analytics**: Track total active members, expired subscriptions, daily attendance, and combined revenue.
* **Member CRM**: Add, search, edit, and filter member profiles. Track plan durations and active/expired statuses.
* **Plan Configurator**: Configure flexible subscription plans (Monthly, Quarterly, Annual, etc.) with custom rates.
* **Double Payment Ledger**: Record manual cash/UPI payments (offline) and monitor online gateway transactions.
* **Staff Controls**: Register gym trainers and managers, setting customized permissions.

### 📱 Member PWA (Client App)
* **QR Check-in**: Instantly log daily attendance by scanning the front desk QR code or showing the member QR to staff.
* **Membership Freeze**: Temporarily pause membership validity (e.g. for travel/injury) with a configurable pause fee.
* **Self-Renewal Hub**: Select a renewal package and checkout online securely.
* **Logbook**: View a full log of past payments, billing receipts, and attendance calendars.

### 📋 Staff Portal (Trainer / Reception)
* **Live Scanner**: Scan member QR codes at the entry gate using a mobile camera. The UI flashes **Green** (Granted) or **Red** (Denied).
* **Manual Logs**: Mark attendance manually for members who forgot their devices.

---

## 💻 Tech Stack

* **Frontend**: React 19, React Router DOM (v7), Vite
* **Database & BaaS**: Firebase Firestore
* **Animations**: Framer Motion
* **3D Visuals**: Spline React Runtime
* **PWA Engine**: Vite PWA Plugin
* **Icons & Styling**: Lucide React, Custom Responsive Vanilla CSS (sleek dark glassmorphism)
* **QR Processing**: HTML5 QR Code Scanner

---

## 📂 Project Structure

```text
taleem-gym/
├── public/                 # Static assets, icons, manifest config
├── docs/                   # Detailed guides and documents
│   ├── SETUP_GUIDE.md      # Installation & Database Setup
│   └── USER_GUIDE.md       # Role Manuals (Admin, Member, Staff)
├── src/
│   ├── assets/             # Brand logos and images
│   ├── components/         # Shared components (PWA installer, 3D scenes)
│   ├── context/            # Global GymContext state manager
│   ├── pages/              # Role-specific dashboards & screens
│   │   ├── admin/          # Admin CRUD, plans, and revenue
│   │   ├── member/         # Member QR scan, payments, profile
│   │   ├── staff/          # Staff check-in & scanners
│   │   └── Landing.jsx     # Premium public entrance page
│   ├── firebase.js         # Firebase initialized client config
│   ├── main.jsx            # React root mount
│   └── index.css           # Global typography & design system token variables
├── .env.example            # Environment variables configuration template
├── package.json            # Scripts & project dependencies
└── vite.config.js          # Vite configuration & PWA manifest setup
```

---

## ⚡ Quick Start

### 1. Installation
```bash
# Clone the repository
git clone <your-repo-url>

# Install packages
npm install
```

### 2. Configure Environment
Create a `.env` file at the root and insert your Firebase configuration values:
```env
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

### 3. Run Development Server
```bash
# Serves the application with host access enabled
npm run dev
```

---

## 📖 Deep-Dive Guides

For comprehensive step-by-step instructions, please read our dedicated files:
* 🛠️ **Installation, Database Schema & Deployment**: Refer to the [Setup Guide](file:///d:/Taleem%20Gym/docs/SETUP_GUIDE.md)
* 📖 **Operational Manuals for Roles**: Refer to the [User Guide](file:///d:/Taleem%20Gym/docs/USER_GUIDE.md)

---

## 🏷️ GitHub Metadata & Captions

Use these metadata parameters when creating your GitHub repository:

* **Repository Name**: `taleem-gym`
* **Short Description**: `A premium, installable Gym Management & Member PWA System built with React, Vite, and Firebase. Features QR-code attendance, membership freezing, multi-role dashboards (Admin, Member, Staff), and dual offline/online payment logging.`
* **Suggested Topics (Tags)**: `react`, `vite`, `pwa`, `firebase`, `firestore`, `gym-management`, `dashboard`, `qr-code`, `framer-motion`, `responsive-web-app`, `admin-portal`, `member-portal`

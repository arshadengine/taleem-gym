# Taleem Gym Setup & Deployment Guide

Welcome to the **Taleem Gym Management System** setup guide. This document provides step-by-step instructions for developers and administrators to configure, run, and deploy the application.

---

## 🛠️ Prerequisites

Before you begin, ensure you have the following installed:
* **Node.js** (v18.0.0 or higher recommended)
* **npm** (v9.0.0 or higher)
* A **Firebase Account** (free/Spark plan is sufficient)

---

## 🚀 Local Installation

Follow these steps to get your local development environment up and running:

### 1. Clone & Prepare Files
First, download or clone the repository to your local directory:
```bash
git clone <your-repository-url>
cd taleem-gym
```

### 2. Install Dependencies
Install all required Node modules defined in `package.json`:
```bash
npm install
```

### 3. Environment Variables Configuration
To keep database credentials secure, you need to set up environment variables.
1. Duplicate the template file:
   ```bash
   cp .env.example .env
   ```
2. Open `.env` and fill in your unique Firebase project keys:
   ```env
   VITE_FIREBASE_API_KEY=AIzaSy...
   VITE_FIREBASE_AUTH_DOMAIN=your-app.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your-app-id
   VITE_FIREBASE_STORAGE_BUCKET=your-app.firebasestorage.app
   VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
   VITE_FIREBASE_APP_ID=1:your-sender-id:web:your-app-hash
   VITE_FIREBASE_MEASUREMENT_ID=G-your-measurement-id
   ```

> [!CAUTION]
> Never commit your `.env` file to a public git repository. It is included in `.gitignore` by default to prevent accidental data leaks.

---

## 🔥 Firebase Database Setup

This project utilizes **Firebase Firestore** for database management. You need to configure a Firestore Database instance in your Firebase Console.

### 1. Create Firestore Database
1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Select or create your project.
3. Click on **Firestore Database** in the left menu, then click **Create Database**.
4. Choose a database location close to your users and start in **Production Mode**.

### 2. Firestore Collection Schemas

Create the following root collections in your Firestore database. The application will write documents with these structures:

| Collection | Description | Document Fields |
| :--- | :--- | :--- |
| **`members`** | Holds all registered gym member records. | `id` (string), `name` (string), `phone` (string), `planId` (string), `startDate` (timestamp), `expiryDate` (timestamp), `status` (string: "Active" / "Expired" / "Frozen"), `freezeDuration` (number), `createdAt` (timestamp) |
| **`attendance`** | Tracks daily member check-ins. | `id` (string), `memberId` (string), `memberName` (string), `date` (string: YYYY-MM-DD), `timestamp` (timestamp), `markedBy` (string: "self" / "admin" / "staff") |
| **`plans`** | Defines subscription options. | `id` (string), `name` (string: e.g. "Monthly"), `durationMonths` (number), `price` (number), `description` (string) |
| **`staff`** | Gym employees / trainers. | `id` (string), `name` (string), `email` (string), `role` (string: "trainer" / "front-desk"), `phone` (string) |
| **`payments`** | Records financial transactions. | `id` (string), `memberId` (string), `amount` (number), `date` (timestamp), `type` (string: "online" / "offline"), `method` (string: "UPI" / "Cash" / "Card"), `status` (string: "Success" / "Pending" / "Failed") |

### 3. Recommended Security Rules

Configure the following rules in the **Rules** tab of your Firestore Database console to protect your data:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Helper function to check if user is authenticated
    function isAuthenticated() {
      return request.auth != null;
    }
    
    // Default rule: Allow read/write for authenticated users
    match /{document=**} {
      allow read, write: if isAuthenticated();
    }
    
    // Custom fine-grained rules can be added here
    match /members/{memberId} {
      allow read: if isAuthenticated();
      allow write: if isAuthenticated();
    }
    
    match /attendance/{attendanceId} {
      allow read: if isAuthenticated();
      allow write: if isAuthenticated();
    }
  }
}
```

---

## 💻 Running the Application

### Development Server
Run the local Vite development server with Hot Module Replacement (HMR) and network hosting enabled:
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your web browser. The `--host` flag allows devices on the same local Wi-Fi network (like your testing Android phone) to access the server via your computer's IP address (e.g. `http://192.168.1.100:5173`).

### Production Build
Compile and optimize assets for deployment:
```bash
npm run build
```
This command outputs static files to the `/dist` directory.

### Preview Build
Preview your local production build:
```bash
npm run preview
```

---

## 📱 Progressive Web App (PWA) Setup

This app is built as a PWA using `vite-plugin-pwa`. It includes offline assets caching and mobile-install capability.

* **PWA Assets**: App icons are stored in `public/logo192.png` and `public/logo512.png`. Make sure to replace them with your custom gym brand logos keeping the exact dimensions.
* **Manifest Config**: Customize your application name, short name, and theme colors inside `vite.config.js`.
* **Testing Mobile Installation**: To test installation on Android or iOS:
  1. Serve the app over HTTPS (required by browsers for PWA installation). You can use services like [ngrok](https://ngrok.com/) to tunnel your local port or deploy directly to Firebase Hosting.
  2. Open the URL in Google Chrome (Android) or Safari (iOS).
  3. Click "Add to Home Screen" when prompted, or select it from the browser menu.

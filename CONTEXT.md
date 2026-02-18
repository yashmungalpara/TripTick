# Project Context: TripTick (Ticket Booking System)

## 📌 Overview
**TripTick** is a client-side Single Page Application (SPA) for travel booking and management. It allows users to browse destinations, book trips, and manage their profiles. It features a separate Admin Dashboard for managing trips and users.

- **Type**: Single Page Application (SPA)
- **Repo Url**: `https://github.com/yashmungalpara/TripTick`

## 🛠️ Tech Stack
- **Frontend**: HTML5, Vanilla JavaScript (ES Modules), Tailwind CSS (via CDN).
- **Backend/Database**: Supabase (PostgreSQL, Auth, Realtime).
- **Icons**: FontAwesome 6.
- **Routing**: Custom Hash-based Client-side Routing (in `app.js`).

## 📂 Project Structure

```
/
├── index.html            # Main entry point (Shell)
├── admin.html            # Admin panel entry point
├── debug_supabase.html   # Connection diagnostic tool
├── js/
│   ├── app.js            # Main Application Logic (Router, Global State)
│   ├── admin.js          # Admin Application Logic
│   ├── config.js         # Supabase Configuration (URL, Keys)
│   ├── supabaseClient.js # Supabase Client Initialization
│   │
│   ├── components/       # Reusable UI Components
│   │   ├── Navbar.js, Footer.js, Hero.js, Toast.js, etc.
│   │
│   ├── pages/            # Application Pages/Views
│   │   ├── Home.js       # Landing Page
│   │   ├── Login.js, Signup.js
│   │   ├── Booking.js    # Booking Flow
│   │   ├── Destinations.js, Packages.js
│   │   ├── Profile.js    # User Dashboard
│   │
│   └── admin/            # Admin Panel Modules
│       ├── Dashboard.js, Trips.js, Users.js, Bookings.js
│
└── css/
    └── style.css         # Custom overrides & animations
```

## 🔑 Key Workflows

### 1. Authentication
- **Provider**: Supabase Auth (Email/Password).
- **Client**: `js/supabaseClient.js`.
- **Flow**:
    - Users sign up/login via `Login.js` / `Signup.js`.
    - Session is persisted automatically by Supabase.
    - `app.js` listens for `onAuthStateChange` to update the Navbar/UI.

### 2. Routing (`js/app.js`)
- Uses **Hash-based routing** (e.g., `#home`, `#login`, `#booking?id=123`).
- `renderPage()` function handles URL changes and renders the appropriate Page component into `<main id="main-content">`.
- Supports Layouts:
    - `default`: Includes Navbar & Footer.
    - `auth`: Full-screen pages (Login/Signup).

### 3. Data Management
- **Trips**: Stored in Supabase `trips` table.
- **Bookings**: Managed via Supabase (table likely `bookings`, inferred from `js/admin/Bookings.js`).
- **Users**: Managed via Supabase Auth + `users` table (system).

## ⚠️ Security & Configuration
- **Configuration**: `js/config.js` contains the Supabase URL and Anon Key.
- **CRITICAL**: The `DATABASE_URL` is currently exposed in `config.js`. This is a security risk and should be removed in production.
- **RLS**: Row Level Security is enabled on tables (verified in `supabase_schema.sql`).

## 🚀 How to Run
1. **Prerequisites**: Node.js installed (for local server).
2. **Start Server**:
   ```bash
   npx serve .
   ```
3. **Access**:
   - App: `http://localhost:3000`
   - Admin: `http://localhost:3000/admin.html`
   - Debug: `http://localhost:3000/debug_supabase.html`

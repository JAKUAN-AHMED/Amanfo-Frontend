# Bantama3 Frontend

A modern, role-based community management web application built with React 19 and Vite. Bantama3 streamlines administration for senior member directories, announcements, surveys, and membership workflows through a clean, responsive interface.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Routing](#routing)
- [Configuration](#configuration)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Author](#author)

---

## Overview

**Bantama3 Frontend** is the client-side application of the Bantama3 platform — a community management system designed to support two primary user roles:

- **Administrators** — manage members, publish announcements, design surveys, and oversee community operations.
- **Senior Members** — access dashboards, browse the member directory, view announcements, and manage their personal profile.

The application provides a complete authentication suite (login, OTP verification, password reset, membership request) and a fully role-segmented experience after sign-in.

---

## Features

- **Role-based dashboards** for Admins and Senior Members
- **Authentication flows** — login, forgot password, OTP verification, password reset
- **Membership requests** with success confirmation screens
- **Member management** — add, edit, view, and list senior members
- **Announcements module** with a rich text editor for creating and updating posts
- **Survey system** — create, view, and manage surveys with detail views
- **Profile management** for both Admin and Senior users
- **Responsive UI** styled with Tailwind CSS
- **Modern icon system** powered by Lucide React
- **Client-side routing** via React Router v7

---

## Tech Stack

| Layer       | Technology                              |
| ----------- | --------------------------------------- |
| Framework   | React 19                                |
| Build Tool  | Vite 8                                  |
| Routing     | React Router DOM 7                      |
| Styling     | Tailwind CSS 3, PostCSS, Autoprefixer   |
| Icons       | Lucide React                            |
| Linting     | ESLint 10 with React Hooks plugin       |
| Language    | JavaScript (JSX)                        |

---

## Project Structure

```
Bantama3-Frontend/
├── public/                  # Static assets served as-is
├── src/
│   ├── assets/              # Images, logos, and SVGs
│   ├── components/          # Reusable UI components
│   │   ├── AuthShell.jsx
│   │   ├── Logo.jsx
│   │   ├── RichTextEditor.jsx
│   │   ├── Sidebar.jsx
│   │   ├── StatCards.jsx
│   │   └── TopBar.jsx
│   ├── data/                # Static / mock data
│   ├── layouts/             # Role-based layout wrappers
│   │   ├── AdminLayout.jsx
│   │   └── SeniorLayout.jsx
│   ├── pages/
│   │   ├── admin/           # Admin-only pages
│   │   ├── senior/          # Senior member pages
│   │   └── *.jsx            # Public auth / landing pages
│   ├── App.jsx              # Root component & route definitions
│   ├── main.jsx             # Application entry point
│   └── index.css            # Global styles (Tailwind directives)
├── index.html
├── vite.config.js
├── eslint.config.js
└── package.json
```

---

## Getting Started

### Prerequisites

- **Node.js** v18 or higher
- **npm** v9 or higher (or `pnpm` / `yarn` if preferred)

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/Jakuan-Ahmed/Bantama3-Frontend.git
cd Bantama3-Frontend
npm install
```

### Run the Development Server

```bash
npm run dev
```

The application will be available at **http://localhost:5173** (default Vite port).

---

## Available Scripts

| Command           | Description                              |
| ----------------- | ---------------------------------------- |
| `npm run dev`     | Start the Vite development server (HMR)  |
| `npm run build`   | Create an optimized production build     |
| `npm run preview` | Preview the production build locally     |
| `npm run lint`    | Run ESLint across the project            |

---

## Routing

The application uses **React Router v7** with the following route map:

### Public Routes

| Path                  | Description                     |
| --------------------- | ------------------------------- |
| `/`                   | Landing page                    |
| `/login`              | Member login                    |
| `/forgot-password`    | Password recovery               |
| `/verify-otp`         | OTP verification                |
| `/reset-password`     | Reset password form             |
| `/reset-success`      | Reset confirmation              |
| `/request-membership` | New member request              |
| `/request-success`    | Membership request confirmation |

### Admin Routes (`/admin/*`)

- `dashboard`, `seniors`, `seniors/new`, `seniors/:id`, `seniors/:id/edit`
- `announcement`, `announcement/new`, `announcement/create-update`
- `survey`, `survey/new`, `survey/:id`
- `profile`
- Auth: `login`, `forgot-password`, `verify-otp`, `reset-password`

### Senior Routes (`/senior/*`)

- `dashboard`, `directory`, `announcements`, `announcements/:id`, `profile`

---

## Configuration

The project ships with sensible defaults. Custom configuration can be applied through:

- **`vite.config.js`** — Vite build and dev server options
- **`eslint.config.js`** — Linting rules
- **`postcss.config.js`** / Tailwind config — Styling pipeline

Environment variables should be placed in a `.env` file at the project root and prefixed with `VITE_` to be exposed to the client.

---

## Deployment

To create a production-ready build:

```bash
npm run build
```

The bundled output will be generated in the `dist/` directory and can be deployed to any static host such as **Vercel**, **Netlify**, **Nginx**, or **GitHub Pages**.

To verify the production build locally:

```bash
npm run preview
```

---

## Contributing

Contributions are welcome. To propose changes:

1. Fork the repository
2. Create a feature branch (`git checkout -b feat/your-feature`)
3. Commit your changes following conventional commit messages
4. Push to your fork and open a Pull Request

Please ensure `npm run lint` passes before submitting.

---

## License

This project is currently private. All rights reserved © 2026.

---

## Author

**Documented and maintained by Jakuan Ahmed**

[![GitHub](https://img.shields.io/badge/GitHub-Jakuan--Ahmed-181717?style=for-the-badge&logo=github)](https://github.com/Jakuan-Ahmed)

> Click the badge above or visit **[github.com/Jakuan-Ahmed](https://github.com/Jakuan-Ahmed)** to explore more projects.

---

<p align="center">Built with React + Vite</p>

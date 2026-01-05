# 長期社會生態核心觀測｜阿里山站

## Long-Term Socio-Ecological Research | Alishan

Frontend project built with **Vite + React + TypeScript**, producing static assets for deployment.  
Production sites:

-   https://ltsertw-alishan.org/
-   https://ltsertwalishan.org/

---

## Project Overview

This is the frontend for the “Long-Term Socio-Ecological Research (LTSER)” Alishan site. It provides:

-   Landing, News, About, FAQ, Contact, and other info pages
-   Observation data, socio-economic data, and chart visualizations
-   User sign-in, download requests, and admin data lists (permissions required)
-   Static build artifacts deployable to Nginx, S3/CloudFront, or other static hosts

---

## Requirements

-   Node.js 18+ (LTS recommended)
-   npm (project uses npm scripts; yarn/pnpm are fine if you manage the lockfile yourself)

---

## Quick Start

1. Install dependencies:
    ```bash
    npm install
    ```
2. Create environment variable files (for local development, at least `.env.development`):
    ```bash
    VITE_API_BASE_URL=YOUR_API_BASE_URL
    VITE_MEDIA_URL=YOUR_MEDIA_BASE_URL   # Public base URL for backend files/images
    VITE_GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID
    ```
    - `VITE_API_BASE_URL`: Backend API base path, e.g., `https://api.example.com`
    - `VITE_MEDIA_URL`: Public media base URL for admin lists and downloads
    - `VITE_GOOGLE_CLIENT_ID`: Google sign-in client ID
      If you need production settings, create `.env.production` before building.
3. Start the dev server:
    ```bash
    npm run dev
    ```
    Default URL: http://localhost:5173

---

## Common Scripts

-   `npm run dev`: Start the dev server with HMR
-   `npm run build`: Output static assets to `dist/`
-   `npm run preview`: Preview the build with a local server
-   `npm run lint`: Run ESLint checks

---

## Project Structure

-   `src/pages`: Main pages (home, news, observation data, etc.)
-   `src/components`: Shared components (header/footer, login modal, tables, visualization cards)
-   `src/config`: Environment handling and API paths
-   `src/hooks` / `src/context`: Custom hooks and global state
-   `src/styles`: SCSS styles

---

## Deployment

1. Fill in `.env.production`, then run:
    ```bash
    npm run build
    ```
2. Deploy the generated `dist/` to a static host (Nginx, S3/CloudFront, Cloudflare Pages, etc.).

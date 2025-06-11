# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
```bash
# Install dependencies
npm ci

# Run development server with hot reloading
npm run dev

# Lint code (single quotes, no semicolons, trailing commas)
npm run lint

# Build for production (static export to /out directory)
npm run build

# Deploy to Firebase Hosting
firebase deploy
```

## Architecture

This is a Next.js 15 static portfolio site using the App Router pattern with Static Site Generation (SSG). Key architectural decisions:

### Routing Structure
- `/src/app/` - App Router directory
- Dynamic routes at `/i/[id]/` for individual illustrations
- All pages are statically generated at build time

### Page Architecture Pattern
Each route typically contains:
- `page.tsx` - Server Component that handles:
  - Metadata generation (`generateMetadata`)
  - Static path generation (`generateStaticParams`)
  - Data fetching and validation
  - Redirects and error handling
- `content.tsx` - Client Component (`'use client'`) that handles:
  - Interactive UI and browser-specific features
  - Emotion CSS-in-JS styling
  - React hooks and state management
  - All visual presentation logic

This separation optimizes for SSG by running server logic at build time while keeping client interactivity.

### Data Architecture
- Illustrations are centrally defined in `/src/config/illustrations.ts`
- Each illustration can have multiple IDs (for redirects)
- Categories: 'original', 'fanart'
- Images stored in `/public/images/illustrations/` 
- Thumbnail images have `.thumb.jpg` suffix (e.g., `abc.jpg` and `abc.thumb.jpg`)

### Styling
- Emotion CSS-in-JS with TypeScript support
- Global styles in `app/globals.scss`
- Components use `css` prop from `@emotion/react`
- Responsive grid layout with CSS aspect-ratio

### Key Configuration
- `next.config.js`: Static export mode with `output: 'export'` (SSG - outputs static HTML/CSS/JS)
- `trailingSlash: true` required for Firebase Hosting
- TypeScript strict mode enabled
- Path alias `@/*` maps to `./src/*`
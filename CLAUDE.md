# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

한국 노마드 (Korean Nomad) is a platform for digital nomads looking to find the best cities to live in South Korea. This is a Next.js 15 App Router project focused on UI implementation with mock data, using a skeuomorphic design system.

**Key Context**: This project is currently UI-focused without backend functionality. All data is mocked in `lib/mock-data.ts`. The PRD (Product Requirements Document) in `docs/prd.md` is the source of truth for requirements.

## Development Commands

```bash
# Install dependencies (includes autoprefixer - required for CSS compilation)
npm install

# Run development server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Run production server
npm start

# Lint code
npm lint
```

**Note**: The project uses pnpm as the package manager (see `package.json` packageManager field), but npm/yarn also work.

## Architecture and Design System

### Skeuomorphism Design System

The entire UI uses a custom skeuomorphic (3D, realistic) design system defined in `app/globals.css`. This is a critical architectural decision:

**Key CSS Classes** (defined in `@layer utilities`):
- `.card-skeu` - Cards with 3D shadow effects and inset highlights
- `.btn-skeu` - Buttons with raised, pressable appearance
- `.input-skeu` - Inputs with inset/depressed appearance
- `.progress-bar-skeu` / `.progress-fill-skeu` - 3D progress bars
- `.tag-skeu` - Raised badge/tag components

**When creating new components**: Always use these utility classes instead of recreating shadows. The design system creates depth through:
- Multiple box-shadows (outer highlight, outer shadow, inner highlight)
- Linear gradients for surface texture
- Transform effects on hover/active states

### Color System

Colors are defined in two places (keep them in sync):
1. CSS variables in `app/globals.css` (:root)
2. Tailwind config in `tailwind.config.ts`

**Important**: Use Tailwind class names, not CSS variable names:
- ✅ `text-foreground` (not `text-textPrimary`)
- ✅ `text-muted` (not `text-textSecondary`)
- ✅ `text-primary`, `bg-surface`, `bg-accent`, etc.

The mismatch between CSS variable names and Tailwind classes is intentional to follow Tailwind conventions.

### Component Architecture

**All components are Server Components by default** (Next.js 15 App Router). Only use Client Components when:
- State management is needed (useState, useReducer)
- Browser APIs are required (window, document)
- Event handlers are needed (onClick, onChange)
- Mark with `"use client"` directive at top of file

**Component Pattern**:
```typescript
// Server Component (default) - components/section-name.tsx
export function SectionName() {
  return <section>...</section>
}

// Client Component - components/interactive-widget.tsx
"use client";
import { useState } from "react";
export function InteractiveWidget() { ... }
```

### Data Model

Three core data types in `lib/types.ts`:
- **City**: Contains rating metrics (cafeRating, costRating, internetRating, housingRating), real-time data (weather, AQI), and metadata
- **Review**: User reviews with ratings and tags
- **Meetup**: Community meetup events with RSVP tracking

**Mock data location**: `lib/mock-data.ts` contains 5 cities, 4 meetups, and 3 reviews.

When adding new cities or data, follow the existing structure and ensure all required fields are populated.

## Styling Conventions

### Responsive Design

**Breakpoints** (from Tailwind defaults):
- Mobile: `< 768px` (no prefix) - 1 column grids
- Tablet: `md:` (`768px - 1024px`) - 2 column grids
- Desktop: `lg:` (`> 1024px`) - 3 column grids

**Example**:
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
```

### Font System

Fonts are currently set to system defaults (San Francisco, Segoe UI, Roboto). Pretendard font support is commented out in `app/globals.css`.

**To enable Pretendard**:
1. Download fonts from https://github.com/orioncactus/pretendard
2. Place woff2 files in `/public/fonts/`
3. Uncomment `@font-face` declarations in `app/globals.css`
4. Update body font-family to use 'Pretendard'

## Common Issues and Solutions

### CSS Compilation Errors

**Symptom**: Error about missing `autoprefixer` module

**Solution**: `autoprefixer` must be installed as a dev dependency:
```bash
npm install -D autoprefixer
```

This is already in package.json, but may be missing if dependencies weren't fully installed.

### Color Class Not Working

**Symptom**: Tailwind classes like `text-textPrimary` not applying styles

**Solution**: Use the correct Tailwind class names:
- `text-foreground` (for primary text)
- `text-muted` (for secondary text)

The CSS variables use different names than the Tailwind classes - always use the Tailwind class names in JSX.

### Component Import Errors

All components are in `/components` (flat structure, no subdirectories). Import using `@/components/component-name`:

```typescript
import { Navigation } from "@/components/navigation";
import { CityCard } from "@/components/city-card";
```

## Project Structure Principles

### Component Organization

Components are organized by section/feature:
- `navigation.tsx` - Top navigation bar (client component for mobile menu)
- `hero-section.tsx` - Hero section with headline and stats
- `search-filter-bar.tsx` - Search and filtering UI (client component)
- `city-card.tsx` - Individual city card
- `city-cards-section.tsx` - Section wrapper for city cards
- `meetup-section.tsx` - Meetup listing section
- `reviews-section.tsx` - Review listing section
- `recommendation-cta.tsx` - City recommendation CTA section
- `footer.tsx` - Site footer

**Section components** (like `city-cards-section.tsx`) are wrappers that:
- Handle layout and spacing
- Accept data arrays as props
- Render multiple child components
- Include section headers and "load more" buttons

**Card components** (like `city-card.tsx`) are presentational:
- Accept single data item as prop
- Handle individual item rendering
- Include item-specific interactions

### Page Structure

`app/page.tsx` is the main homepage and follows this section order (matches PRD):
1. Navigation (sticky header)
2. Hero Section
3. Search & Filter Bar
4. City Cards Section (top 3 cities)
5. City Cards Section (remaining cities) - in `bg-surface`
6. Meetup Section - in `bg-surface`
7. Reviews Section
8. Recommendation CTA
9. Footer

Sections alternate between white background and `bg-surface` (light gray) for visual rhythm.

## Korean Language Context

This project is primarily in Korean. When working with text content:
- UI labels and headings are in Korean
- Comments in code can be in English or Korean
- PRD and documentation are in Korean
- Variable names and functions are in English

**Key Korean terms**:
- 도시 (doshi) = city
- 리뷰 (rivyu) = review
- 밋업 (mitup) = meetup
- 생활비 (saenghwalbi) = cost of living
- 카페 (kape) = cafe

## Future Development Notes

**Planned but not implemented** (see README.md "다음 단계"):
- P1 features: Statistics dashboard, regional city rankings, newsletter subscription
- API integration (currently using mock data)
- Database connection (PostgreSQL/Supabase planned)
- Authentication (NextAuth.js planned)
- Additional pages (city detail pages, ranking pages, map view, etc.)

When implementing these features:
- Continue using Server Components where possible
- Keep the skeuomorphic design system consistent
- Add new data types to `lib/types.ts`
- Follow the existing component naming and structure patterns

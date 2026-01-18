# Comedy Creator v2 - Home Components

This project implements a Creator Charts landing page based on the Figma design with the following components:

## 🎨 Design System

The project uses the following color scheme from Figma:

- **Primary Color**: `#14532d` (Dark Green)
- **Text Color**: `#111111` (Almost Black)
- **Background Color**: `#f8fafc` (Light Gray)

## 📦 Components Structure

All home page components are located in `/components/home/`:

### 1. Navbar (`navbar.tsx`)

Navigation component with:

- Logo placeholder
- Navigation links (CHARTS, CREATORS, VIDEOS)
- Responsive mobile menu button
- Dark background (`#121416`)

### 2. Hero Section (`hero-section.tsx`)

Main hero section featuring:

- Large heading text about Creator Charts
- Descriptive paragraph
- "View Weekly Rankings" CTA button with primary color
- Progress indicator dots
- Two tilted image placeholders (replace with actual images)
- Fully responsive layout

### 3. Creators Table (`creators-table.tsx`)

Top 100 Creators table with:

- Purple gradient header card
- Table columns: #, CREATORS, LW, PEAK, WOC, CPI SCORE
- Rank badges (New, Re-entry, +/- trend indicators)
- Creator profile with avatar, name, verified badge, and platform icons
- Mock data for demonstration
- "View Creator Rankings" button

### 4. Videos Table (`videos-table.tsx`)

Top 100 Videos table with:

- Red gradient header card
- Similar table structure to Creators Table
- Columns: #, CREATORS (video title + creator), LW, PEAK, WOC, STREAMS
- Trend indicators and verified badges
- "View Video Rankings" button

### 5. Trending Creators (`trending-creators.tsx`)

Trending creators section with:

- Orange gradient header
- Card-based layout for each creator
- Shows: Rank, Name, Country (with flag emoji), Growth percentage
- Status badges ("At Peak", "Rising fast", "Approaching Peak")
- Status rank indicator
- Trending badges (New, Re-entry, Up/Down arrows)

### 6. Footer (`footer.tsx`)

Footer component with:

- Logo and description
- Social media icon placeholders
- Navigation links (Charts, Company sections)
- Newsletter signup form
- Dark background matching navbar

## 🚀 Usage

The main client component (`app/client.tsx`) imports and composes all these components:

```tsx
import Navbar from '@/components/home/navbar'
import HeroSection from '@/components/home/hero-section'
import CreatorsTable from '@/components/home/creators-table'
import VideosTable from '@/components/home/videos-table'
import TrendingCreators from '@/components/home/trending-creators'
import Footer from '@/components/home/footer'

// Use them in your layout
<Navbar />
<HeroSection />
<CreatorsTable />
<VideosTable />
<TrendingCreators />
<Footer />
```

Alternatively, use the barrel export:

```tsx
import {
  Navbar,
  HeroSection,
  CreatorsTable,
  VideosTable,
  TrendingCreators,
  Footer,
} from "@/components/home";
```

## 🎯 Features

- **Responsive Design**: All components are mobile-friendly
- **shadcn/ui Integration**: Uses Button, Badge, Table, and Input components
- **TypeScript**: Fully typed components
- **Mock Data**: Ready-to-replace placeholder data
- **Modular**: Each component is independent and reusable

## 🔧 Customization

### Replace Mock Data

Update the mock data arrays in each table component:

- `mockCreators` in `creators-table.tsx`
- `mockVideos` in `videos-table.tsx`
- `mockTrendingCreators` in `trending-creators.tsx`

### Add Images

1. Place images in `/public` folder
2. Replace image placeholders in:
   - Navbar logo
   - Hero section tilted images
   - Creator/Video avatars
   - Footer social icons

### Update Colors

Modify the color variables in `app/globals.css`:

```css
--primary-colour: #14532d;
--text-colour: #111111;
--background-colour: #f8fafc;
```

## 📋 Dependencies

Required shadcn/ui components:

- `button`
- `badge`
- `table`
- `input`

All installed via:

```bash
npx shadcn@latest add button badge table input
```

## 🎨 Design Reference

This implementation is based on the Figma design:

- Node ID: `9:6`
- Design includes hero section, multiple chart tables, trending creators, and footer
- Uses a dark theme for header/footer and light theme for content sections

## 💡 Next Steps

1. **Connect to API**: Replace mock data with real API calls
2. **Add Images**: Replace all placeholder images with actual assets
3. **Implement Routing**: Connect navigation links to actual pages
4. **Add Animations**: Consider adding transitions and hover effects
5. **SEO Optimization**: Add meta tags and structured data
6. **Performance**: Optimize images and implement lazy loading
7. **Accessibility**: Ensure WCAG compliance

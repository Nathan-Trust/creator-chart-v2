# Quick Start Guide

## 🎯 What Was Built

A complete landing page for Comedy Creator v2 with:

- Navigation bar
- Hero section with CTA
- Top 100 Creators table
- Top 100 Videos table
- Trending Creators section
- Footer with newsletter

## 🚀 Run the Project

```bash
cd c:\Users\Administrator\Desktop\comedy-creator-v2
pnpm install  # if not already done
pnpm dev
```

Visit: http://localhost:3000

## 📂 Key Files

- **Main Component**: `app/client.tsx` - Composes all home components
- **Components Folder**: `components/home/` - All landing page components
- **Styling**: `app/globals.css` - Design tokens and global styles
- **UI Components**: `components/ui/` - shadcn components

## 🎨 Design Tokens

```css
--primary-colour: #14532d /* Dark Green */ --text-colour: #111111
  /* Almost Black */ --background-colour: #f8fafc /* Light Gray */;
```

## 📋 Components List

1. **Navbar** - `components/home/navbar.tsx`
   - Logo + navigation links
   - Mobile responsive

2. **Hero Section** - `components/home/hero-section.tsx`
   - Main heading and description
   - CTA button
   - Image placeholders

3. **Creators Table** - `components/home/creators-table.tsx`
   - Top 100 creators ranking
   - Trend indicators (New, Re-entry, +/-)
   - Social media icons

4. **Videos Table** - `components/home/videos-table.tsx`
   - Top 100 videos ranking
   - Similar structure to creators
   - Video title + creator info

5. **Trending Creators** - `components/home/trending-creators.tsx`
   - Card-based layout
   - Growth percentages
   - Status indicators (At Peak, Rising fast)

6. **Footer** - `components/home/footer.tsx`
   - Links sections (Charts, Company)
   - Newsletter signup
   - Social icons

## 🔄 Import Pattern

```tsx
// Option 1: Individual imports
import Navbar from "@/components/home/navbar";
import HeroSection from "@/components/home/hero-section";

// Option 2: Barrel export
import { Navbar, HeroSection, CreatorsTable } from "@/components/home";
```

## ✏️ Customize Mock Data

Each table component has mock data arrays at the top:

**Creators Table:**

```tsx
const mockCreators: Creator[] = [
  {
    rank: 1,
    name: "Carter Efe",
    verified: true,
    // ...
  },
];
```

**Videos Table:**

```tsx
const mockVideos: Video[] = [
  {
    rank: 1,
    title: "Champion",
    creator: "Davido",
    // ...
  },
];
```

## 🖼️ Replace Images

1. **Logo** - Update in `navbar.tsx`:

```tsx
<Image src="/logo.png" alt="CreatorCharts" width={290} height={45} />
```

2. **Hero Images** - Update in `hero-section.tsx`
3. **Avatars** - Replace `<div className="w-16 h-16 bg-gray-200 rounded-lg" />` with actual images
4. **Social Icons** - Update in `footer.tsx`

## 🔌 Connect to API

Replace mock data with API calls:

```tsx
// Example in creators-table.tsx
const [creators, setCreators] = useState<Creator[]>([]);

useEffect(() => {
  fetch("/api/creators")
    .then((res) => res.json())
    .then((data) => setCreators(data));
}, []);
```

## 🎨 Styling System

- **Tailwind CSS v4** for utility classes
- **CSS Variables** for design tokens
- **Responsive** breakpoints (sm, md, lg, xl)
- **Dark mode** support ready

## 📱 Responsive Design

All components are responsive:

- Mobile: Single column layout
- Tablet: Adapted layouts
- Desktop: Full multi-column layouts

## ✅ Next Actions

1. ✅ shadcn is set up
2. ✅ Components are created
3. ✅ Figma design implemented
4. ✅ client.tsx updated
5. 🔲 Add real images
6. 🔲 Connect to API
7. 🔲 Implement routing

## 📚 Documentation

- Component docs: `components/home/README.md`
- Implementation details: `IMPLEMENTATION.md`
- This guide: `QUICKSTART.md`

## 💡 Pro Tips

1. **Components are independent** - Use any combination
2. **TypeScript types included** - Full type safety
3. **Easy to extend** - Add props to customize
4. **shadcn components** - Can be styled and modified
5. **Mobile-first** - Responsive by default

## 🐛 Troubleshooting

**Issue**: Components not showing

- Check imports in `client.tsx`
- Verify file paths

**Issue**: Styles not applying

- Check `globals.css` is imported
- Verify Tailwind config

**Issue**: Type errors

- Check TypeScript types
- Verify imports

## 🎉 You're Ready!

The landing page is fully implemented and ready for customization. Start by:

1. Running `pnpm dev`
2. Viewing the page at localhost:3000
3. Replacing images and mock data
4. Connecting to your API

Happy coding! 🚀

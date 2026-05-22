# Ànúrà Website - Code Documentation

## 📋 Files Documented with Comprehensive Comments

### ✅ Fully Commented Files:

#### **1. style.css** (Complete)
- **Global Styles**: CSS variables, typography, global resets
- **Keyframe Animations**: All animation definitions with explanations
- **Animated Background Blobs**: Floating background effect implementation
- **Glassmorphism Design System**: Core glass panel styling with blur effects
- **Navigation Bar**: Sticky header with logo and nav links styling
- **Button Styles**: Primary & secondary button variants with hover states
- **Hero Section**: Landing page headline and CTA area
- **Section Layouts**: Split sections, grids, and common layouts
- **Card Styles**: Glass cards with floating/hover animations
- **Opportunities Hub**: Special styling for opportunity cards with tags
- **Footer**: Bottom navigation and copyright area
- **Interactive Effects**: Ripple effects and scrollbars
- **Image Containers**: Placeholder and responsive image styling
- **Advanced Image Integration**: Background images with glassmorphic overlays
- **Responsive Design**: Mobile/tablet breakpoints at 768px

#### **2. animations.js** (Complete)
- **File Overview**: Complete explanation of all JS animations and effects
- **Intersection Observer Configuration**: Scroll detection setup
- **Scroll Animation Observer**: How elements fade in on scroll
- **Observe Elements for Scroll**: Element targeting for animations
- **Button Hover Effects**: Interactive button feedback
- **Parallax Background Blobs**: Scroll-triggered blob movement
- **Smooth Anchor Link Scrolling**: Smooth scroll to sections
- **Navigation Link Active State**: Active page highlighting
- **Ripple Click Effect**: Click animation on cards/buttons
- **Counter Animation for Statistics**: Number counting animations
- **Image Reveal Animation on Scroll**: Image fade-in effects
- **Scroll Progress Indicator**: Progress bar at top of page
- **Page Load Event Handler**: Load event setup

#### **3. anu.html** (Complete - Homepage)
- **Document Header**: Meta tags and font imports
- **Animated Background Blobs**: Floating background elements
- **Navigation Header**: Main site navigation and logo
- **Hero Section**: Main headline and value proposition
- **About Section**: Two-column "What is Ànúrà?" intro
- **Programs Overview**: First 3 programs with teaser content
- **Insights/Blog Section**: Latest thought leadership posts
- **Opportunities Hub**: Current opportunities and challenges
- **Impact Section**: Key metrics and statistics
- **Resource Library Preview**: Sample learning resources
- **Call-to-Action Sections**: Join community and support mission CTAs
- **Footer**: Copyright and footer navigation
- **JavaScript Integration**: Animations.js reference

#### **4. about.html** (Partially Commented)
- **Page Header**: Meta information
- **Page-specific Styles**: About-specific CSS included

### 📄 Additional Files Guide:

#### **programs.html** (Structure Overview)
- Navigation and header structure
- Programs grid with 7 hover-flip cards
- Each card has front (icon/title) and back (details)
- Program cards link to detail pages:
  - program-quarterly.html
  - program-resources.html
  - program-summer.html
  - program-community.html
  - program-mentorship.html
  - program-opportunities.html
  - blog.html (7th card - Insights)

#### **contact.html** (Structure Overview)
- Two-column layout: contact info + contact form
- Contact information section with:
  - Email link
  - Social media links (Instagram, LinkedIn)
  - Quick navigation links
- Contact form with fields:
  - Name (required)
  - Email (required)
  - Subject (required)
  - Message textarea (required)
- Responsive: Single column on mobile

#### **resources.html** (Structure Overview)
- 5 STEAM track categories:
  1. Science
  2. Technology
  3. Engineering
  4. Arts
  5. Mathematics
- Each track has downloadable resource guides
- Beginner-friendly learning materials

#### **program-*.html** (Detail Pages Structure)
All program detail pages follow same template:
- Hero section with program title
- Program description and overview
- Key features/benefits in cards
- Call-to-action buttons
- Related resources/links
- Back to programs link

#### **blog.html & blog-post-*.html** (Blog Structure)
- Main blog listing page with all posts
- Individual blog post pages
- Author information with emoji avatars
- Publication dates and read-time estimates
- Essay submission form (via Formspree)
- Discussion/community engagement sections

---

## 🎨 CSS Organization Summary

### Color Palette (Variables)
```css
--bg-base: #f6e8fa;           /* Soft purple background */
--primary-purple: #c07cd4;    /* Brand purple */
--text-dark: #1a1a1a;         /* Main text */
--text-light: #4a4a4a;        /* Secondary text */
--glass-bg: rgba(255,255,255,0.45);     /* Glassmorphism */
--glass-border: rgba(255,255,255,0.7);  /* Glass border */
--glass-shadow: 0 8px 32px rgba(192,124,212,0.1); /* Subtle shadow */
```

### Typography
- **Headings**: Sora font (bold, distinctive)
- **Body**: Inter font (modern, clean)
- **Line Height**: 1.6 (improved readability)

### Animation Speeds
- Most transitions: 0.3-0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)
- Section animations: 0.8s ease-out
- Scroll animations: Staggered by 100ms per card

### Responsive Breakpoint
- Mobile/Tablet: 768px and below
- Layout: Single column on mobile
- Images: Smaller heights on mobile

---

## 🔄 Animation Effects Summary

### Scroll Animations
1. **Fade In Up**: Elements appear with upward movement
2. **Slide In**: Elements slide from left or right
3. **Staggered Cards**: Each card animates in sequence

### Interactive Animations
1. **Button Hover**: Scale (1.02x) + Lift (-3px)
2. **Card Hover**: Lift (-10px) + Enhanced shadow
3. **Ripple Effect**: Click animation on interactive elements

### Parallax Effects
1. **Background Blobs**: Subtle movement on scroll
2. **Different speeds** for each blob (visual depth)

### Special Effects
1. **Scroll Progress Bar**: Top indicator of page scroll position
2. **Counter Animation**: Numbers count up when scrolled into view
3. **Image Reveal**: Images fade and scale on scroll

---

## 📱 Responsive Design Notes

### Desktop (>768px)
- Multi-column grids
- Side-by-side sections
- Full-size images
- Glassmorphic cards with hover effects

### Mobile (<768px)
- Single column layouts
- Stacked sections
- Smaller images (150px vs 220px)
- Hero reduced height (300px vs 500px)
- Simplified hover states

---

## 🔗 Navigation Structure

```
Home (anu.html)
├── About (about.html)
├── Programs (programs.html)
│   ├── Quarterly Touchpoints (program-quarterly.html)
│   ├── Resource Library (program-resources.html)
│   ├── Summer Workshop (program-summer.html)
│   ├── Community Building (program-community.html)
│   ├── Mentorship (program-mentorship.html)
│   ├── Opportunities Bulletin (program-opportunities.html)
│   └── Insights & Essays (blog.html)
├── Resources (resources.html)
├── Contact (contact.html)
└── Additional Pages:
    ├── Impact Report (impact.html)
    ├── Donate (donate.html)
    ├── Get Involved (get-involved.html)
    └── Blog Posts
        ├── blog-post-1.html
        ├── blog-post-2.html
        └── blog-post-3.html
```

---

## 💡 Key Component Documentation

### Glassmorphism Classes
- `.glass-panel` / `.glass-card` / `.glass-nav` / `.glass-footer`
  - Semi-transparent white background (45% opacity)
  - 16px backdrop blur filter
  - Light 1px border
  - Subtle purple shadow

### Button Classes
- `.btn-primary` : Black solid background (main CTAs)
- `.btn-secondary` : Transparent with border (alternative CTAs)
- Both have hover lift effect and scale transformation

### Grid Systems
- `.card-grid` : Auto-responsive 3-column layout (min 300px)
- `.hub-grid` : Auto-responsive columns (min 280px)
- `.team-grid` : Auto-responsive team layout (min 200px)

### Animation Triggers
- Intersection Observer: Triggers when element 10% visible
- Scroll Events: Parallax blobs update on scroll
- Hover Events: Button/card transformations
- Click Events: Ripple effect creation

---

## 📝 Comment Style Used

All comments follow this pattern:
```
/* ========================================
   SECTION NAME (uppercase)
   ======================================== */
/* Brief description of what this section does */
/* Individual item descriptions as needed */
```

---

## ✨ Code Quality Features

✅ **Accessibility**: Semantic HTML5, proper alt tags, ARIA compliant
✅ **Performance**: Optimized animations, CSS variables, minimal JS
✅ **Responsive**: Mobile-first design with media queries
✅ **Maintainability**: Comprehensive comments, organized structure
✅ **Compatibility**: Cross-browser support (webkit prefixes included)

---

## 🚀 Next Steps for Enhancement

- [ ] Comments on remaining HTML detail pages (program-*.html, blog pages)
- [ ] Inline comments in complex JS functions
- [ ] Performance optimization comments
- [ ] Accessibility audit notes
- [ ] SEO optimization tips in HTML headers

---

Last Updated: 2026-03-17
Documented Files: 3/20 (style.css, animations.js, anu.html, about.html partial)

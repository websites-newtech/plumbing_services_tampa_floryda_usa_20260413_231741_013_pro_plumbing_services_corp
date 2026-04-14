# Design Decisions — Pro Plumbing Services Corp

## Tech Stack

**Choice: HTML + Alpine.js (via CDN)**

**Reasoning:** 15 pages total. This sits right in the Alpine.js sweet spot (6–15 pages). Alpine.js provides:
- Mobile navigation toggle with clean declarative syntax
- Contact form state management (loading, submitted states)
- No build step required — push to GitHub Pages or Netlify directly
- Zero dependencies beyond a CDN link

## Visual Identity

### Color System
The company provided `#6FCFFB` (electric sky blue) as their primary brand color. We built the entire palette around it:

| Color | Hex | Usage |
|---|---|---|
| Deep Navy | `#0a1628` | Primary — dark background, text, navbar |
| Mid Navy | `#132240` | Hover states, mobile menu |
| Electric Blue | `#6FCFFB` | Brand accent — all highlights, icons, CTAs |
| Accent Dark | `#3aabdc` | Darker blue for text links (contrast ratio ≥ 4.5:1) |
| Warm Gold | `#f0a500` | Star ratings only |
| Warm White | `#f4f1ec` | Main background (never pure white) |
| Warm Alt | `#eae6de` | Alternating section backgrounds |

**Why navy + blue?** Plumbing companies often default to generic red/blue. We went deep navy + electric accent to feel premium, trustworthy, and industrial without being generic. The "electric" quality of `#6FCFFB` feels crisp and clean — appropriate for water.

### Typography
**Display: Bebas Neue** — Bold, condensed, impactful. Used for all headlines. Gives a strong "industrial professional" authority.

**Body: Source Sans 3** — Humanist sans-serif. Clean, highly readable at all weights. Contrasts beautifully with the display font's condensed mass.

**Why not Inter?** Inter is overused. Bebas Neue + Source Sans 3 immediately signals craft and intentionality.

### Backgrounds
- Never pure `#ffffff` — always warm off-whites (`#f4f1ec`, `#eae6de`)
- Dark sections use the navy with subtle radial gradients for depth
- CTA sections use the navy + faint blue radial glow to draw attention

## Layout Architecture

### Home Page
- **Hero:** Full-viewport dark overlay on photo, massive Bebas Neue headline, animated stagger entry. Left-weighted layout with stats bar.
- **Trust Bar:** 4-column icon strip immediately after hero — answers "why should I trust you?" within seconds of landing.
- **Services Grid:** 3-column card grid. Featured "Emergency" card uses navy background to break visual pattern and draw attention.
- **Why Us:** Asymmetric 2-column with image + badge overlay. Creates visual interest vs. equal grids.
- **Testimonials:** 3-column cards with star ratings, avatars, and real customer names from old site.
- **Blog Preview:** 3 cards teasing expert content — builds SEO authority signal.
- **CTA Banner:** Full-width navy with ghost text "24/7" — dramatic close.

### Inner Pages
- Consistent `page-hero` dark section at top — establishes hierarchy.
- Services page uses alternating image/content layout (detail pattern) — educational and scroll-friendly.
- Residential page adds "Warning Signs" section in dark navy — matches the emotional urgency.
- Commercial page has feature icons + promise section.
- Blog page uses 3-column card grid — clean, scannable.
- Contact page: 2-column layout — info left, form right. Emergency card prominently featured.

## Animation System

### Easing
Custom curves only:
- `--ease-out: cubic-bezier(0.23, 1, 0.32, 1)` — snappy, professional
- `--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1)` — used for interactive elements

### Entry Animations
Hero elements stagger at 0ms, 80ms, 160ms, 240ms, 320ms (headlines → body → CTAs → stats). Uses CSS `animation` with `both` fill mode.

Scroll-triggered elements use IntersectionObserver with:
- `threshold: 0.12` (triggers when 12% visible)
- `rootMargin: '0px 0px -40px 0px'` (slight offset for better timing)
- Elements in sibling groups get staggered `transition-delay` (65ms per item)

### Durations
- Buttons: 120ms transform, 150ms color/shadow
- Cards hover: 200ms
- Scroll entries: 500ms
- Hero stagger: 600ms

All respect `prefers-reduced-motion`.

## Content Migration

### From Old Site
- **Home page:** Full content migrated — hero messaging, service descriptions, trust indicators
- **Residential plumbing:** Content migrated including service list and warning signs
- **Commercial plumbing:** Content migrated and expanded
- **Blog articles:** 8 articles identified and listed with summaries:
  - 6 Common Plumbing Problems You Shouldn't Ignore
  - 3 Reasons to Contact Your Tampa Plumbing Contractor
  - How to Save Money by Upgrading Your Plumbing
  - 5 Ways Professional Drain Cleaning Protects Your Home
  - Chemical Drain Cleaners: What Are the Dangers?
  - 6 Key Things to Look for When Hiring a Residential Plumbing Contractor
  - No Plunger? 5 Creative Tips for Unclogging Your Toilet
  - 6 Signs That It's Time to Replace Your Water Heater

- **Phone number:** (813) 238-9511 — extracted from old site content
- **Testimonials:** Bridgette M., K. La., Dan R. — identified from old site image metadata

### New Pages Added
- `/services.html` — consolidated all services with detail view
- `/contact.html` — full contact form + emergency card

## Accessibility

- All touch targets ≥ 44×44px (buttons use `min-height: 48px`)
- Color contrast: dark navy on light bg ≥ 7:1, accent blue on navy ≥ 4.5:1
- `aria-label` on all icon-only buttons and icon links
- `aria-current="page"` on active nav links
- `aria-required="true"` on all required form fields
- `aria-describedby` architecture ready for form validation
- Skip link at top of every page
- Semantic HTML5 landmarks: `<header>`, `<nav>`, `<main>`, `<footer>`, `<section>`, `<article>`, `<blockquote>`
- `alt` text on every image describing content specifically
- `loading="lazy"` on all below-fold images

## SEO

- Unique `<title>` and `<meta name="description">` on every page
- Open Graph tags on home page
- Structured heading hierarchy (h1 → h2 → h3) on every page
- `aria-labelledby` connecting sections to their headings
- Semantic time elements with `datetime` attributes on blog posts

## Performance

- Google Fonts loaded with `preconnect` to minimize latency
- All images use `width` and `height` attributes to prevent layout shift
- Alpine.js and custom JS loaded with `defer`
- IntersectionObserver animates once (unobserved after trigger)
- Scroll listener uses `requestAnimationFrame` + passive event
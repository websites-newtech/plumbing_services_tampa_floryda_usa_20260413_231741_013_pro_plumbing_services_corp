# Pro Plumbing Services Corp — Website

Modern, production-ready website for Pro Plumbing Services Corp, Tampa Bay's trusted plumbers since 1975.

## Pages

| File | URL | Description |
|---|---|---|
| `index.html` | `/` | Home — hero, services, why us, testimonials, blog preview |
| `services.html` | `/services` | All Services — detailed view of every service |
| `residential.html` | `/residential` | Residential Plumbing — homeowner services & warning signs |
| `commercial.html` | `/commercial` | Commercial Plumbing — business solutions |
| `blog.html` | `/blog` | Blog — 8 expert articles |
| `contact.html` | `/contact` | Contact & Free Quote form |

## File Structure

```
website/
├── index.html
├── services.html
├── residential.html
├── commercial.html
├── blog.html
├── contact.html
├── assets/
│   ├── css/
│   │   └── main.css
│   ├── js/
│   │   └── main.js
│   └── images/
│       ├── hero_001.jpg       (place actual images here)
│       ├── hero_002.jpg
│       ├── hero_003.jpg
│       ├── image_001.jpg
│       ├── image_002.jpg
│       ├── image_003.jpg
│       ├── image_004.jpg
│       └── image_005.png
├── design_decisions.md
└── README.md
```

## Prerequisites

None. This is a static website — no build step, no Node.js, no database required.

## Deployment

### Option 1: GitHub Pages (Free, Recommended)

1. Create a new GitHub repository
2. Copy all files from `/website/` into the repository root
3. Go to **Settings → Pages**
4. Set **Source** to `Deploy from a branch` → `main` → `/ (root)`
5. Save — site will be live at `https://yourusername.github.io/repo-name`

```bash
git init
git add .
git commit -m "Initial commit — Pro Plumbing website"
git remote add origin https://github.com/YOUR_USERNAME/proplumbing.git
git push -u origin main
```

### Option 2: Netlify (Free, Recommended for Custom Domain)

1. Go to [netlify.com](https://netlify.com) and sign up
2. Click **"Add new site"** → **"Deploy manually"**
3. Drag and drop the entire `/website/` folder
4. Done — you'll get a live URL immediately
5. Connect a custom domain in **Domain settings**

### Option 3: Any Web Host (cPanel, etc.)

1. Log into your hosting control panel
2. Open **File Manager**
3. Navigate to `public_html/`
4. Upload all files maintaining the directory structure
5. Ensure `index.html` is in the root of `public_html/`

### Option 4: Local Preview

Simply open `index.html` in any modern web browser. No server required.

For best results (font loading, etc.), use a local server:

```bash
# Python 3
python -m http.server 8080

# Node.js (if installed)
npx serve .

# Then visit: http://localhost:8080
```

## Adding Images

Place image files in `assets/images/`:

| Filename | Recommended Size | Usage |
|---|---|---|
| `hero_001.jpg` | 1920×1080px | Home hero background |
| `hero_002.jpg` | 1200×800px | Blog card 1 |
| `hero_003.jpg` | 1200×800px | Blog card 2 |
| `image_001.jpg` | 800×600px | Why Us section, blog article |
| `image_002.jpg` | 800×600px | Services, commercial sections |
| `image_003.jpg` | 800×600px | Services page, blog |
| `image_004.jpg` | 800×600px | Blog article |
| `image_005.png` | 800×600px | Repiping service, blog |

**Recommended format:** WebP with JPEG fallback for best performance.

## Customization

### Update Phone Number

Search and replace `8132389511` and `(813) 238-9511` across all HTML files.

### Update Colors

In `assets/css/main.css`, modify the `:root` custom properties:

```css
:root {
  --color-primary:  #0a1628;  /* Navy */
  --color-accent:   #6FCFFB;  /* Electric Blue */
}
```

### Add Google Analytics

Paste your GA4 tag in the `<head>` of each HTML file, before `</head>`:

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### Connect Contact Form

The contact form is currently frontend-only (simulates submission). To make it functional:

**Option A: Netlify Forms** (if hosted on Netlify)
Add `netlify` attribute to the `<form>` tag:
```html
<form netlify name="quote-request" ...>
```

**Option B: Formspree**
1. Sign up at [formspree.io](https://formspree.io)
2. Create a form and get your endpoint
3. Replace the `@submit.prevent` handler with a real fetch:

```javascript
// In the form's @submit.prevent:
formLoading = true;
try {
  await fetch('https://formspree.io/f/YOUR_FORM_ID', {
    method: 'POST',
    body: new FormData($event.target),
    headers: { 'Accept': 'application/json' }
  });
  formSent = true;
} catch (error) {
  console.error(error);
} finally {
  formLoading = false;
}
```

**Option C: EmailJS**
Free client-side email sending — no backend needed.

## Browser Support

Tested and compatible with:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile Safari iOS 14+
- Chrome Android 90+

## Performance Checklist

- [ ] Compress images to WebP (use [squoosh.app](https://squoosh.app))
- [ ] Add Google Analytics tag
- [ ] Connect form backend (Netlify Forms or Formspree)
- [ ] Set up custom domain with HTTPS
- [ ] Submit sitemap to Google Search Console
- [ ] Verify all phone numbers are correct
- [ ] Test mobile experience on real device

## Credits

- **Fonts:** Bebas Neue + Source Sans 3 via Google Fonts
- **Icons:** Custom SVG (inline, no external dependency)
- **JS Framework:** Alpine.js 3.x via CDN
- **Design:** Emil Design Engineering system

---

**Pro Plumbing Services Corp** | Tampa Bay, FL | (813) 238-9511
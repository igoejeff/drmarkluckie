# Dr. Mark Luckie — The Performance Doctor
### High-End Personal Brand Website · v3.0

> *"Live Bold. Age Backwards."*
> Luxury personal brand website for Dr. Mark Luckie, DC — Bestselling Author · International Speaker · Regenerative Medicine Expert

---

## 🌐 Live Site
**Domain:** https://www.drmarkluckie.com  
**Social handle (all platforms):** @thedrluckie

---

## ✅ Completed Features

### Design & UX
- Full-screen hero with single static boat/yacht image (no grainy zoom animation)
- Gold/black luxury design system (Cormorant Garamond + Montserrat)
- Scroll-reveal animations, gold read-progress bar, page loader
- Mobile-responsive across all sections
- Gallery lightbox (click any gallery image)
- Testimonials carousel with swipe support and dot nav

### Sections (in order)
1. **Hero** — Single yacht photo (V58eDbTd), animated stats bar (22yr / 4 books / 5,000+ / 100+ stages), gold marquee ticker
2. **Press Bar** — Grant Cardone · Amazon Bestseller · Lowcountry Live · iHeartRadio · Charleston Magazine · Health Podcasts
3. **About** — Portrait + 2 accent photos, bio, specialty tags, CTA buttons in left column
4. **Philosophy** — Full-bleed quote section with 4 pillars (Optimize · Energize · Restore · Thrive)
5. **Services Snapshot** — 6 service cards (TRT, Red Light, Regenerative, Cognitive, Sleep, Inflammaging) → links to services.html
6. **Books** — 4 book covers with hover overlays → Amazon links
7. **Grant Cardone Interview** — Featured video section, Parts 1 & 2 embedded, "Coming Soon" tracker for Parts 3–5
8. **Speaking** — Speaking credentials + media
9. **Podcast & Media** — 2-col grid: featured TV card + TikTok (left), 6 media appearances (right), equal height
10. **Instagram Social Wall** — Auto-scrolling feed mockup, platform follow links, Behold.so integration ready
11. **Gallery** — Masonry photo grid with lightbox
12. **Blog Preview** — 3 featured articles → blog.html
13. **Testimonials** — Carousel with 4 patient/reader reviews
14. **Credentials/EEAT** — 6 trust cards + HIPAA/telehealth/board-certified trust bar
15. **Booking CTA** — 3 options: Patient Consultation · Free Discovery Call · Speaking Inquiry
16. **Contact** — Form (EmailJS + Table API), social links, address details
17. **Footer** — Nav, book links (→ Amazon), newsletter signup, auto-updating year, medical disclaimer

### SEO & Technical
- `<title>`, meta description, keywords tuned for international personal brand
- Open Graph + Twitter Card (image: E9tn7e26)
- JSON-LD: Person, MedicalBusiness, WebSite, FAQPage, 4× Book schemas
- 7× Article + BreadcrumbList schemas (blog posts)
- sitemap.xml (10 URLs), robots.txt
- SVG favicon (gold italic "L")
- Canonical URLs on all pages
- `max-snippet:-1, max-image-preview:large` robots directives

---

## 📁 File Structure

```
index.html              ← Main homepage (13+ sections)
services.html           ← Full services detail page
blog.html               ← Blog index (filterable, 7 articles)
blog/
  ├── testosterone-truth.html
  ├── inflammaging-explained.html
  ├── red-light-therapy-guide.html
  ├── ceo-health-guide.html
  ├── sleep-science.html
  ├── hormones-for-women.html
  └── longevity-blueprint.html
css/
  ├── style.css          ← Core design system, hero, about, layout
  ├── extras.css         ← Additional component styles
  ├── sections.css       ← Section-specific styles (podcast, credentials, etc.)
  └── article.css        ← Blog article page styles
js/
  ├── main.js            ← All JS: nav, animations, forms, testimonials, lightbox
  └── blog.js            ← Blog filter/search functionality
sitemap.xml
robots.txt
README.md
```

---

## 🗄️ Data Tables (RESTful API)

### `contact_submissions`
| Field | Type | Notes |
|---|---|---|
| id | text | UUID auto |
| first_name | text | |
| last_name | text | |
| email | text | |
| phone | text | optional |
| interest | text | consultation/telehealth/speaking/books/media/discovery/other |
| message | rich_text | |
| status | text | new / read / replied |

### `newsletter_subscribers`
| Field | Type | Notes |
|---|---|---|
| id | text | UUID auto |
| email | text | |
| first_name | text | optional |
| source | text | footer / popup / blog |
| active | bool | default true |

---

## 🔧 Before Going Live — Checklist

### 🔴 Critical (do before presenting)
- [ ] **EmailJS** — Replace `YOUR_PUBLIC_KEY` in `js/main.js` + add service/template IDs
- [ ] **Real phone number** — Add to contact section and MedicalBusiness schema (`"telephone": ""`)
- [ ] **Book Amazon URLs** — Replace `https://www.amazon.com/author/markluckie` with individual book ASINs for Testosterone, Red Light Revolution, and Rest to Repair
- [ ] **Real patient testimonials** — Replace placeholder names with real reviews (full name + photo = maximum trust)

### 🟡 High Priority
- [ ] **Instagram live feed** — Go to https://behold.so → connect @thedrluckie → replace `YOUR_FEED_ID` in index.html
- [ ] **Google Analytics 4** — Add GA4 `gtag` snippet (currently commented placeholder in `<head>`)
- [ ] **Calendly embed** — Replace `#contact` booking buttons with actual Calendly or Jane scheduling link
- [ ] **Grant Cardone Parts 3–5** — Add video cards + update tracker dots when videos are ready
- [ ] **Privacy Policy / Terms pages** — Footer links currently point to `#`
- [ ] **Google Business Profile** — Create/claim at business.google.com for Google Maps visibility

### 🟢 Growth (next 30 days)
- [ ] **Video testimonials** — 60-second patient clips embedded in the Testimonials section
- [ ] **Press/Media Kit page** — `/press.html` with downloadable one-pager, logos, quote sheet
- [ ] **Email opt-in lead magnet** — Free chapter of INFLAMMAGING in exchange for email (exit-intent popup)
- [ ] **Speaking inquiry page** — `/speaking.html` with topics, past events, rider/requirements
- [ ] **Podcast booking page** — Dedicated `/podcast.html` with his talking points and media kit

---

## 🌍 International SEO Recommendations

1. **Guest post on high-DA health/performance sites** (Dave Asprey, Ben Greenfield, Mindvalley)
2. **YouTube channel SEO** — Optimize @thedrluckie channel description with core keywords
3. **Wikipedia notability** — If possible, create/request a Wikipedia entry (huge authority signal)
4. **Amazon Author Central** — Maximize author bio + book descriptions with keywords
5. **Podcast guesting** — Appear on 2–3 top health podcasts per month, each episode creates backlinks

---

## 🎨 Design Tokens

```css
--black:    #090909
--off-black: #111111
--charcoal: #1A1A1A
--gold:     #C9A84C
--white:    #F5F5F0
--grey:     rgba(255,255,255,0.45)

--font-display: 'Cormorant Garamond', serif
--font-ui:      'Montserrat', sans-serif
--font-body:    'Inter', sans-serif
--font-mono:    'JetBrains Mono', monospace
```

---

*Last updated: March 18, 2026*

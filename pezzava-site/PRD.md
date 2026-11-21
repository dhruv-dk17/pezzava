# Pezzava — Product Requirements Document (PRD)

## 1. Project Overview

**Brand Name:** Pezzava  
**Category:** Women's Fashion — Cotton Wrap Around Skirts  
**Business Location:** Rajasthan, India  
**Office Address:** P.N. 7-b Brij Vihar, Badarama Kalwar Road, Govindpura, Jaipur, Rajasthan, 302012  
**Contact Number:** +91 820 919 9603  
**Marketplaces:** Amazon India & Flipkart  

---

## 2. Business Problem

Pezzava currently sells exclusively on Amazon and Flipkart. They need a branded website that:
- Acts as the primary brand presence and product catalog
- Redirects customers to Amazon/Flipkart to complete purchases (no in-house checkout)
- Builds brand trust and recognition beyond marketplace listings

---

## 3. Goals & Objectives

| Goal | Description |
|------|-------------|
| Brand Awareness | Establish Pezzava as a recognizable women's fashion brand |
| Product Discovery | Let customers browse all skirt variants in one place |
| Marketplace Redirect | "Add to Cart" → redirects to Amazon/Flipkart product listing |
| SEO & Discoverability | Rank for branded and category keywords |
| Trust Building | Show address, contact, and brand story |

---

## 4. Target Audience

- Women aged 18–45 in India
- Shoppers comfortable with online shopping on Amazon/Flipkart
- Buyers looking for traditional/ethnic cotton skirts (casual & festive)

---

## 5. Website Structure (Sitemap)

```
Home
├── Hero Banner (Brand Tagline + Shop Now CTA)
├── Featured Products (fetched/mirrored from Amazon/Flipkart)
├── Categories (by color, size, pattern)
├── About Pezzava
└── Contact

Products Page
├── All Skirts listing
├── Filter: Color / Size / Price
└── Product Card → Detail Page

Product Detail Page
├── Images (mirrored from Amazon/Flipkart)
├── Name, Price, Description, Size guide
├── "Buy on Amazon" button (redirects to Amazon listing)
├── "Buy on Flipkart" button (redirects to Flipkart listing)
└── No in-house payment/checkout

About Page
└── Brand story, values, Rajasthan craftsmanship

Contact Page
├── Address: P.N. 7-b Brij Vihar, Badarama Kalwar Road, Govindpura, Jaipur, Rajasthan, 302012
├── Phone: +91 820 919 9603
└── Google Maps embed
```

---

## 6. Core Feature: Marketplace Redirect Cart

> **"Add to Cart" on Pezzava website = Redirect to Amazon/Flipkart product page**

### How it works:
1. Customer browses products on pezzava.com
2. Clicks **"Add to Cart"** or **"Buy Now"**
3. A modal/drawer appears: "Choose where to buy"
   - 🟠 **Buy on Amazon**
   - 🔵 **Buy on Flipkart**
4. User clicks preferred marketplace → opens Amazon/Flipkart product URL in a new tab
5. Customer completes checkout natively on that platform

### Product Data Source:
- Product images, names, prices, descriptions are **manually curated** by the Pezzava team from their Amazon/Flipkart listings and uploaded to a product JSON or CMS
- OR in a future phase: Amazon PA-API (Product Advertising API) can be used to pull live pricing/availability (requires Amazon affiliate approval)

---

## 7. Technical Stack (Recommended)

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js (React) or plain HTML/CSS/JS |
| Hosting | Vercel / Netlify / cPanel |
| Product Data | Static JSON file or Notion CMS / Google Sheets as backend |
| Images | Hosted on Cloudinary or directly from Amazon CDN links |
| Analytics | Google Analytics 4 |
| Domain | pezzava.com (or .in) |

---

## 8. Design Guidelines

| Element | Spec |
|---------|------|
| Logo | Provided — olive/gold botanical ornamental crest with "Pezzava" wordmark |
| Primary Color | Olive Green (`#8B9B3E`) / Warm Gold (`#C9A84C`) |
| Background | Cream / Off-white (`#FAF7F2`) |
| Font (Display) | Cormorant Garamond or Playfair Display |
| Font (Body) | Lato or Nunito |
| Tone | Ethnic, traditional, warm, trustworthy |
| Photography | Lifestyle shots of women in cotton skirts, Rajasthani aesthetic |

---

## 9. Product Information (Sample Fields)

Each product listing should contain:
- Product Name
- SKU / Variant ID
- Price (₹)
- Available Sizes (S, M, L, XL, XXL, Free Size)
- Color / Print
- Fabric (100% Cotton)
- Care Instructions
- Amazon Product URL
- Flipkart Product URL
- Product Images (3–5 per SKU)
- Short Description
- Long Description

---

## 10. Pages Content Spec

### Home Page
- Hero: Full-width banner image, tagline, Shop Now CTA
- Section: "Why Pezzava?" — Cotton, Comfort, Craftsmanship
- Section: Featured / New Arrivals (4–8 products)
- Section: "As Seen On Amazon & Flipkart" trust badges
- Footer: Address, Phone, Social links

### Product Listing Page
- Grid of product cards (image, name, price, Buy button)
- Filters: Color, Size, Price range

### Product Detail Page
- Image gallery
- Product name, price, description
- Size chart
- **"Buy on Amazon"** button (primary)
- **"Buy on Flipkart"** button (secondary)
- Shipping note: "Fulfilled by Amazon / Flipkart"

### About Page
- Brand origin story (Rajasthan, cotton craftsmanship)
- Mission: Comfortable, affordable ethnic wear for Indian women

### Contact Page
- Address, phone, inquiry form
- Google Maps

---

## 11. Out of Scope (Phase 1)

- In-house payment gateway
- User accounts / login
- Wishlist sync across devices
- Live inventory tracking
- Amazon PA-API real-time pricing (Phase 2)

---

## 12. Success Metrics

| Metric | Target |
|--------|--------|
| Monthly website visitors | 500+ in 3 months |
| Click-through to Amazon/Flipkart | >30% of product page visitors |
| Bounce rate | <60% |
| Mobile traffic | >70% (design mobile-first) |

---

## 13. Contact & Stakeholders

**Business Owner:** Pezzava  
**Phone:** +91 820 919 9603  
**Address:** P.N. 7-b Brij Vihar, Badarama Kalwar Road, Govindpura, Jaipur, Rajasthan, 302012  

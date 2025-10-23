# Mocha Landing Page

A modern, animated landing page for Mocha - a WhatsApp-based money transfer service for Sierra Leone.

## Features

- 🎨 **Modern Design**: Clean, African-inspired UI with warm color palette
- 📱 **Responsive**: Mobile-first design that works on all devices
- ⚡ **Animated**: Smooth animations and micro-interactions using Framer Motion
- 🚀 **Fast**: Optimized for performance with Next.js 14
- 💬 **WhatsApp Integration**: Direct links to WhatsApp for user engagement
- 📝 **Form Validation**: Client-side validation with React Hook Form and Zod

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod
- **Font**: Poppins (Google Fonts)

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
mochala/
├── app/
│   ├── layout.tsx          # Root layout with fonts and metadata
│   ├── page.tsx           # Main landing page
│   └── globals.css        # Global styles and CSS variables
├── components/
│   ├── layout/
│   │   ├── Header.tsx     # Navigation header
│   │   └── Footer.tsx     # Footer with links and socials
│   ├── sections/
│   │   ├── HeroSection.tsx        # Hero with headline and CTAs
│   │   ├── HowItWorksSection.tsx  # 3-step process guide
│   │   ├── KeyFeaturesSection.tsx # Feature showcase
│   │   ├── WhyMochaSection.tsx   # Benefits and testimonials
│   │   └── ContactSection.tsx    # Waitlist form and FAQ
│   └── ui/
│       ├── Button.tsx            # Reusable button component
│       ├── Card.tsx              # Card component
│       ├── AnimatedCard.tsx      # Card with animations
│       ├── FeatureIcon.tsx       # Icon wrapper with animations
│       ├── StatsCounter.tsx      # Animated number counter
│       └── CountryFlags.tsx      # Country flag display
├── lib/
│   └── utils.ts           # Utility functions
└── public/                # Static assets
```

## Design System

The design uses a warm, earthy color palette inspired by Sierra Leone:

- **Primary**: #593b2c (Rich brown)
- **Secondary**: #cbc591 (Muted gold)
- **Accent**: #daffde (Soft mint)
- **Background**: #faf5e9 (Warm beige)

## Sections

1. **Hero**: Main value proposition with animated statistics and WhatsApp mockup
2. **How It Works**: 3-step process (Deposit → Send → Withdraw)
3. **Key Features**: 4 main features (WhatsApp, Currency Swap, Remittance, SNPL)
4. **Why Mocha**: Benefits, statistics, and testimonials
5. **Contact**: Waitlist form and FAQ

## WhatsApp Integration

The site includes WhatsApp deep linking for user engagement:
- Pre-filled messages for easy contact
- Direct links to WhatsApp chat
- Mobile-optimized experience

## Performance

- Optimized images with Next.js Image component
- Lazy loading for below-the-fold content
- GPU-accelerated animations
- Minimal bundle size with tree shaking

## Deployment

The site is ready for deployment on Vercel, Netlify, or any static hosting service.

```bash
npm run build
```

## License

© 2025 Mocha. All rights reserved.

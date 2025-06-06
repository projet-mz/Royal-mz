# Amarck Royal International School - Website

A modern, responsive website for Amarck Royal International School built with Next.js 14 and TypeScript.

## Overview

This is the standalone public-facing website for Amarck Royal International School, separated from the school management system for independent deployment. The website showcases the school's mission, programs, and provides essential information for prospective students and parents.

## Features

- **Responsive Design**: Optimized for all device sizes (mobile, tablet, desktop)
- **Modern UI**: Clean, professional design with 3D styling effects
- **Static Generation**: Pre-rendered pages for optimal performance
- **Contact Form**: Functional contact form for inquiries
- **SEO Optimized**: Proper meta tags and structure

## Pages

- **Home**: Welcome page with school overview and key features
- **About**: School mission, vision, values, and history
- **Academics**: Academic programs and curriculum information
- **Admissions**: Admission process and requirements
- **Contact**: Contact information and inquiry form
- **Privacy Policy**: Data privacy and protection policy
- **Terms of Service**: Website terms and conditions

## Technology Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom 3D effects
- **Icons**: Radix UI Icons and Lucide React
- **Deployment**: Optimized for Vercel

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/projet-mz/Royal-mz.git
cd Royal-mz
git checkout royal-web
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment to Vercel

This website is optimized for deployment on Vercel:

1. **Connect Repository**: Link your GitHub repository to Vercel
2. **Configure Build**: Vercel will automatically detect Next.js configuration
3. **Deploy**: Push to the `royal-web` branch to trigger deployment

### Build Commands

- **Development**: `npm run dev`
- **Build**: `npm run build`
- **Start**: `npm run start`
- **Lint**: `npm run lint`

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── about/             # About page
│   ├── academics/         # Academics page
│   ├── admissions/        # Admissions page
│   ├── contact/           # Contact page
│   ├── privacy/           # Privacy policy
│   ├── terms/             # Terms of service
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # Reusable components
│   ├── layout/           # Layout components
│   └── ContactForm.tsx   # Contact form component
└── lib/                  # Utilities and types
    └── types/            # TypeScript type definitions
```

## Customization

### Styling
- Colors and themes are defined in `tailwind.config.js`
- Custom 3D effects are in `src/app/globals.css`
- Component styles use Tailwind CSS classes

### Content
- Update page content in respective files under `src/app/`
- Modify contact information in `src/app/contact/page.tsx`
- Update school branding in `src/components/layout/MainLayout.tsx`

## Contact Information

**Amarck Royal International School**
- Address: 123 Education Avenue, Accra, Ghana
- Phone: +233 20 123 4567
- Email: info@amarckroyal.edu.gh

## License

This project is private and proprietary to Amarck Royal International School.   
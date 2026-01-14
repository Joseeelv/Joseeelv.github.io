# Portfolio Website

A modern, responsive portfolio website built with React, TypeScript, and Tailwind CSS. Features a blog section, project showcase, skills display, and contact form.

## Project Structure

```
.
├── app/
│   └── blog/
│       └── page.tsx              # Blog page component
├── src/
│   ├── components/               # React components
│   │   ├── contactForm.tsx
│   │   ├── divider.tsx
│   │   ├── hero.tsx
│   │   ├── navbar.tsx
│   │   ├── projects.tsx
│   │   ├── skills.tsx
│   │   └── whoami.tsx
│   ├── data/                     # Data files
│   │   ├── contactFormData.ts
│   │   ├── heroData.ts
│   │   ├── projectsData.ts
│   │   └── whoamiData.ts
│   ├── App.tsx
│   ├── App.css
│   ├── index.css
│   └── main.tsx
├── public/
│   ├── files/                    # PDF documents
│   └── images/                   # Static images
│       └── projects/
├── index.html
├── vite.config.ts
├── tailwind.config.cjs
├── postcss.config.cjs
├── tsconfig.json
└── package.json
```

## Features

- Responsive design with Tailwind CSS
- Modern component-based architecture
- Project showcase with image lazy loading
- Skills section with tech stack display
- Contact form integration
- Blog section
- Dark theme with cyan accent colors
- Smooth animations and transitions

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- PostCSS
- ESLint

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- pnpm package manager

### Installation

```bash
pnpm install
```

### Development

```bash
pnpm dev
```

The development server will start at `http://localhost:5173`

### Build

```bash
pnpm build
```

### Preview Build

```bash
pnpm preview
```

## Project Sections

- **Hero**: Eye-catching introduction section
- **About Me**: Personal background and goals
- **Experience**: Work experience and internships
- **Education**: Academic qualifications
- **Projects**: Portfolio of developed projects
- **Skills**: Technical skills and technologies
- **Contact**: Contact form for inquiries
- **Blog**: Blog page for articles

## Performance Optimization

Images use lazy loading to improve initial page load performance. The project uses Vite for fast development and optimized production builds.

## Author

Jose Luis Venega

## Contact

Email: jose.venegasan@gmail.com

Country: Spain
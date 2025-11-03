# Nyi Nyi Zaw - Portfolio Website

A modern, responsive portfolio and resume website built with Next.js 14, TypeScript, and Tailwind CSS. Features a clean, professional design with smooth animations, dark/light mode support, and downloadable PDF resume.

## 🌟 Live Demo

Check out the live demo: [https://resume-psi-blush-18.vercel.app/](https://resume-psi-blush-18.vercel.app/)

## ✨ Features

### Core Features
- **Fully Responsive**: Optimized for all screen sizes from mobile to desktop
- **Dark/Light Mode**: Seamless theme switching with system preference detection
- **PDF Resume Export**: Download a professionally formatted PDF resume with one click
- **Smooth Animations**: Elegant transitions powered by Framer Motion
- **Type-Safe**: Built with TypeScript for enhanced developer experience and fewer bugs
- **SEO Optimized**: Proper meta tags and structured data for better search engine visibility
- **Performance Optimized**: Fast page loads with Next.js App Router and static optimization

### Content Sections
- **Hero Section**: Eye-catching introduction with contact information and social links
- **Professional Summary**: Engaging bio highlighting nearly a decade of mobile development experience
- **Experience Timeline**: Detailed work history with career progression visualization
- **Technical Skills**: Categorized skill showcase with visual proficiency indicators
- **Projects Portfolio**: Highlighted personal and professional projects
- **Community Involvement**: Speaking engagements, meetups, and developer community contributions
- **Certifications**: Verified professional certifications with clickable links
- **Education**: Academic background and achievements

## 🛠 Tech Stack

### Core Technologies
- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)

### UI & Components
- **Icons**: [Lucide Icons](https://lucide.dev/)
- **Theme Management**: [next-themes](https://github.com/pacocoursey/next-themes)
- **PDF Generation**: [jsPDF](https://github.com/parallax/jsPDF)

### Development Tools
- **Linting**: ESLint with Next.js configuration
- **Formatting**: Prettier
- **Type Checking**: TypeScript strict mode
- **Deployment**: [Vercel](https://vercel.com/)

## 📁 Project Structure

```
resume/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx         # Root layout with theme provider
│   │   ├── page.tsx           # Main portfolio page
│   │   └── globals.css        # Global styles
│   ├── components/            # React components
│   │   ├── Certificates.tsx   # Certifications section
│   │   ├── CommunitySection.tsx  # Community involvement
│   │   ├── Experience.tsx     # Work experience timeline
│   │   ├── Hero.tsx          # Hero section with PDF download
│   │   ├── Preview.tsx       # Content preview wrapper
│   │   ├── Projects.tsx      # Projects showcase
│   │   ├── Skills.tsx        # Technical skills display
│   │   └── ThemeToggle.tsx   # Dark/light mode toggle
│   ├── data/
│   │   └── resume.ts         # Centralized resume data
│   └── lib/
│       ├── animations.ts     # Framer Motion animation variants
│       └── resumePdfExport.ts  # PDF generation logic
├── public/                    # Static assets
├── .eslintrc.json            # ESLint configuration
├── .prettierrc.json          # Prettier configuration
├── tailwind.config.ts        # Tailwind CSS configuration
└── tsconfig.json             # TypeScript configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/nyinyiz/resume.git
   cd resume
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000) to view the portfolio

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript compiler check

## 🎨 Customization

### Updating Resume Data

All resume content is centralized in `src/data/resume.ts`. Update this file to customize:

- Personal information
- Professional summary
- Work experience
- Technical skills
- Projects
- Certifications
- Education
- Community involvement

### Styling

The project uses Tailwind CSS for styling. Customize the theme in `tailwind.config.ts`:

```typescript
module.exports = {
  theme: {
    extend: {
      colors: {
        // Add custom colors
      },
      // Add custom theme extensions
    },
  },
}
```

### Animations

Animation variants are defined in `src/lib/animations.ts`. Modify or add new animation patterns:

```typescript
export const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}
```

## 📋 Features Deep Dive

### PDF Resume Export

The PDF export feature generates a professional, ATS-friendly resume with:
- Clean international format
- Proper typography and spacing
- Clickable links for LinkedIn, GitHub, and certifications
- Comprehensive technical expertise details
- Optimized for printing and digital sharing

Implementation: `src/lib/resumePdfExport.ts`

### Theme System

The dark/light mode system:
- Detects system preference on first visit
- Persists user preference in localStorage
- Smooth transitions between themes
- Fully accessible with proper ARIA labels

### Career Progression Display

Experience section intelligently groups multiple roles within the same company to showcase career growth and progression.

## 🔧 Development

### Code Quality

The project enforces code quality through:

- **TypeScript strict mode**: Catch errors at compile time
- **ESLint**: Maintain consistent code style
- **Prettier**: Automatic code formatting
- **Type safety**: All components and data are fully typed

### Best Practices

- Component-based architecture for reusability
- Centralized data management
- Responsive design patterns
- Accessibility considerations
- Performance optimization

## 🚢 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import the repository in [Vercel](https://vercel.com/new)
3. Vercel will auto-detect Next.js and configure the build
4. Click "Deploy"

### Deploy to Other Platforms

The project can be deployed to any platform that supports Node.js:

```bash
npm run build
npm run start
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines

- Follow existing code style and conventions
- Write meaningful commit messages
- Update documentation for significant changes
- Test thoroughly before submitting PR
- Ensure TypeScript compilation passes (`npm run type-check`)
- Run linting (`npm run lint`)

## 📝 License

This project is open source and available for personal and commercial use.

## 📞 Contact

**Nyi Nyi Zaw**
- Email: [nyinyizaw.dev@gmail.com](mailto:nyinyizaw.dev@gmail.com)
- LinkedIn: [linkedin.com/in/nyinyiz](https://linkedin.com/in/nyinyiz)
- GitHub: [github.com/nyinyiz](https://github.com/nyinyiz)
- Portfolio: [nyinyizaw.vercel.app](https://nyinyizaw.vercel.app/)

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Vercel for seamless deployment
- Open source community for the wonderful tools and libraries

---

**Built with ❤️ by Nyi Nyi Zaw**

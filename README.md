# Rotha Dapravith - Portfolio Website

A modern, responsive portfolio website for Full-Stack Developer & DevOps Engineer built with Next.js 16, TypeScript, and Radix UI components (via shadcn/ui).

## ✨ Features

- 🎨 **Modern Design** - Clean, professional design with smooth animations
- 📱 **Fully Responsive** - Optimized for all devices (mobile, tablet, desktop)
- 🌙 **Dark Mode Ready** - Built-in support for dark/light themes
- ⚡ **Fast Performance** - Optimized with Next.js App Router
- 🎯 **SEO Friendly** - Metadata and semantic HTML
- 🧩 **Component-Based** - Reusable Radix-based components from shadcn/ui
- 💼 **Sections Included**:
  - Hero section with professional introduction
  - About section with DevOps & Full-Stack experience
  - Projects showcase with DevOps and microservices projects
  - Skills with Frontend, Backend, and DevOps tools
  - Contact form with location in Cambodia
  - Footer with social links

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🎨 Customization

### Update Personal Information

Edit the following files to customize with your information:

1. **Hero Section** (`components/hero.tsx`):
   - Update your name
   - Change the tagline
   - Update social media links

2. **About Section** (`components/about.tsx`):
   - Add your experience
   - Update education details
   - Customize skills and bio

3. **Projects Section** (`components/projects.tsx`):
   - Add your projects
   - Update project images
   - Add GitHub and demo links

4. **Skills Section** (`components/skills.tsx`):
   - Update technology skills
   - Adjust proficiency levels
   - Add certifications

5. **Contact Section** (`components/contact.tsx`):
   - Update contact information
   - Configure email functionality
   - Update location

6. **Metadata** (`app/layout.tsx`):
   - Update page title
   - Modify description for SEO

### Styling

The project uses Tailwind CSS 3.x and Radix-powered shadcn/ui components. To customize:

- **Colors**: Edit `app/globals.css` CSS variables
- **Components**: Modify files in `components/ui/`
- **Layout**: Adjust spacing and sizing in component files

## 📦 Built With

- [Next.js 16](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS 3.x](https://tailwindcss.com/) - Styling
- [Radix UI via shadcn/ui](https://ui.shadcn.com/) - UI components
- [Lucide React](https://lucide.dev/) - Icons

## 🏗️ Project Structure

```
portfolio/
├── app/
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── components/
│   ├── ui/               # ShadCN UI components
│   ├── navbar.tsx        # Navigation bar
│   ├── hero.tsx          # Hero section
│   ├── about.tsx         # About section
│   ├── projects.tsx      # Projects section
│   ├── skills.tsx        # Skills section
│   ├── contact.tsx       # Contact section
│   └── footer.tsx        # Footer
├── lib/
│   └── utils.ts          # Utility functions
└── public/               # Static assets
```

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Deploy with one click!

### Build for Production

```bash
npm run build
npm start
```

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 🎯 Future Enhancements

- [ ] Add blog section
- [ ] Integrate contact form with email service
- [ ] Add animations with Framer Motion
- [ ] Include testimonials section
- [ ] Add project filters
- [ ] Implement analytics

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📧 Contact

Rotha Dapravith - rothadapravith@example.com

Portfolio: [https://dapravith-digital-portfolio.vercel.app](https://dapravith-digital-portfolio.vercel.app)

GitHub: [https://github.com/rothadapravith](https://github.com/rothadapravith)

---

⭐ Built with Next.js, TypeScript, and ShadCN UI

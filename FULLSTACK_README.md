# Portfolio - Fullstack Application

A modern, fullstack portfolio application built with Next.js 16, TypeScript, and Tailwind CSS.

## 📁 Project Structure

```
portfolio/
├── src/
│   ├── app/              # Next.js App Router
│   │   ├── api/          # API routes (backend)
│   │   │   ├── contact/  # Contact form endpoint
│   │   │   ├── projects/ # Projects API
│   │   │   └── blog/     # Blog API
│   │   ├── layout.tsx    # Root layout
│   │   ├── page.tsx      # Home page
│   │   └── globals.css   # Global styles
│   ├── components/       # React components
│   │   ├── ui/           # Reusable UI components
│   │   └── ...           # Feature components
│   ├── lib/              # Utility libraries
│   ├── hooks/            # Custom React hooks
│   ├── types/            # TypeScript type definitions
│   ├── utils/            # Helper functions & constants
│   └── styles/           # Additional styles
├── public/               # Static assets
├── tailwind.config.ts    # Tailwind configuration
├── tsconfig.json         # TypeScript configuration
└── package.json          # Dependencies

```

## 🚀 Getting Started

### Prerequisites
- Node.js 20.x or higher
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🛠️ Tech Stack

### Frontend
- **Next.js 16** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Radix UI** - Accessible UI components
- **Lucide Icons** - Icon library

### Backend (API Routes)
- **Next.js API Routes** - Serverless functions
- **TypeScript** - Type-safe APIs

## 📂 Key Directories

### `/src/app`
Next.js App Router pages and layouts. API routes are in `/src/app/api`.

### `/src/components`
Reusable React components organized by feature.

### `/src/hooks`
Custom React hooks:
- `useContactForm` - Contact form submission
- `useProjects` - Fetch projects data

### `/src/types`
TypeScript type definitions for the entire application.

### `/src/utils`
Helper functions and constants:
- `constants.ts` - App-wide constants
- `helpers.ts` - Utility functions

## 🔌 API Endpoints

### POST `/api/contact`
Submit contact form
```typescript
{
  name: string;
  email: string;
  message: string;
}
```

### GET `/api/projects`
Fetch projects (optional `?featured=true` query param)

## 🎨 Customization

### Update Constants
Edit `src/utils/constants.ts` to update:
- Social links
- App metadata
- API endpoints

### Add Components
Place new components in `src/components/` and import using `@/components/*`

### Add API Routes
Create new routes in `src/app/api/[route-name]/route.ts`

## 📦 Deployment

### Vercel (Recommended)
```bash
vercel --prod
```

### Other Platforms
```bash
npm run build
npm start
```

## 🔧 Configuration

### Environment Variables
Create `.env.local`:
```env
NEXT_PUBLIC_APP_URL=https://dapravith.pro
NEXT_PUBLIC_API_URL=/api
```

## 📝 License
MIT

## 👤 Author
Dapravith
- Website: https://dapravith.pro
- GitHub: [@dapravith](https://github.com/dapravith)

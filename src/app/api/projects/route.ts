import { NextRequest, NextResponse } from 'next/server';

// Mock projects data - replace with database
const projects = [
  {
    id: 1,
    title: 'E-commerce Platform',
    description: 'Full-stack e-commerce solution with payment integration',
    technologies: ['Next.js', 'TypeScript', 'PostgreSQL', 'Stripe'],
    github: 'https://github.com/yourusername/ecommerce',
    demo: 'https://demo.example.com',
    featured: true,
  },
  // Add more projects
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get('featured');

    const filteredProjects = featured === 'true' 
      ? projects.filter(p => p.featured)
      : projects;

    return NextResponse.json(filteredProjects, { status: 200 });
  } catch (error) {
    console.error('Projects API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

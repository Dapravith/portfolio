# Portfolio Content Update Guide

## 📄 STEP 1: Update Work Experience

Please provide your work experience from your resume in this format:

```javascript
{
  title: "Job Title",
  company: "Company Name",
  period: "Month Year - Month Year", // e.g., "Jan 2022 - Present"
  location: "City, Country", // Optional
  description: "Brief description of your role and achievements",
  technologies: ["Tech1", "Tech2", "Tech3"], // Optional
}
```

### Example:
```javascript
{
  title: "Senior Full-Stack Developer",
  company: "ABC Tech Solutions",
  period: "Jan 2022 - Present",
  location: "Phnom Penh, Cambodia",
  description: "Led development of enterprise applications using Java Spring Boot and React. Implemented CI/CD pipelines with Jenkins and Docker.",
  technologies: ["Java", "Spring Boot", "React", "Docker", "Jenkins"],
}
```

---

## 🚀 STEP 2: Update Projects (Top 5)

Visit your old portfolio: https://dapravith-digital-portfolio.vercel.app/

Select your **TOP 5 BEST PROJECTS** and provide details in this format:

```javascript
{
  title: "Project Name",
  description: "Brief description of what the project does",
  image: "/project-image.jpg", // Add image to public folder
  technologies: ["Tech1", "Tech2", "Tech3"],
  githubUrl: "https://github.com/yourusername/repo-name",
  demoUrl: "https://your-demo-link.com", // Can be Vercel, Netlify, etc.
  featured: true, // Set to true for your best project
}
```

### Example:
```javascript
{
  title: "Microservices E-Commerce Platform",
  description: "Full-stack e-commerce platform with microservices architecture, featuring user authentication, product management, and payment integration.",
  image: "/projects/ecommerce.jpg",
  technologies: ["Spring Boot", "React", "Docker", "Kubernetes", "PostgreSQL"],
  githubUrl: "https://github.com/rothadapravith/ecommerce-microservices",
  demoUrl: "https://ecommerce-demo.vercel.app",
  featured: true,
}
```

---

## 📋 FILL OUT THIS TEMPLATE:

### Work Experience (Copy from your resume):

**Experience 1:**
- Title: 
- Company: 
- Period: 
- Location: 
- Description: 
- Technologies: 

**Experience 2:**
- Title: 
- Company: 
- Period: 
- Location: 
- Description: 
- Technologies: 

**Experience 3:**
- Title: 
- Company: 
- Period: 
- Location: 
- Description: 
- Technologies: 

---

### Top 5 Projects (From old portfolio):

**Project 1 (Featured):**
- Title: 
- Description: 
- Technologies: 
- GitHub URL: 
- Demo URL: 
- Image: (filename in /public/projects/)

**Project 2:**
- Title: 
- Description: 
- Technologies: 
- GitHub URL: 
- Demo URL: 
- Image: 

**Project 3:**
- Title: 
- Description: 
- Technologies: 
- GitHub URL: 
- Demo URL: 
- Image: 

**Project 4:**
- Title: 
- Description: 
- Technologies: 
- GitHub URL: 
- Demo URL: 
- Image: 

**Project 5:**
- Title: 
- Description: 
- Technologies: 
- GitHub URL: 
- Demo URL: 
- Image: 

---

## 🎨 OPTIONAL: Project Images

If you have screenshots of your projects:

1. Add them to: `/public/projects/`
2. Name them: `project1.jpg`, `project2.jpg`, etc.
3. Reference them in the image field

Example:
```bash
cp ~/Pictures/my-project-screenshot.png public/projects/ecommerce.jpg
```

---

## ✅ ONCE YOU PROVIDE THE DETAILS:

I will update:
1. `components/about.tsx` - Work experience section
2. `components/projects.tsx` - Top 5 projects with real links
3. Make sure all GitHub and demo URLs work correctly

---

**Please fill out the template above and I'll update your portfolio!**

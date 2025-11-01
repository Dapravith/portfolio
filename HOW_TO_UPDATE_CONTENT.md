# 📋 How to Update Work Experience & Projects

## 🎯 Quick Overview

You need to update 2 main sections:
1. **Work Experience** - From your resume
2. **Projects** - Top 5 from your old portfolio

---

## 📝 STEP 1: Update Work Experience

### A. Open Your Resume
```bash
# Your resume is located at:
open public/resume.pdf
```

### B. Edit the About Component
```bash
# Open this file in your code editor:
code components/about-new.tsx

# Or use any text editor:
nano components/about-new.tsx
```

### C. Find the Experience Array (around line 18)

Look for this section:
```javascript
const experience = [
  {
    title: "YOUR JOB TITLE - Replace This", // ⚠️ UPDATE
    company: "COMPANY NAME", // ⚠️ UPDATE
    period: "Month Year - Present", // ⚠️ UPDATE
    location: "City, Country", // ⚠️ OPTIONAL
    description: "Replace with...", // ⚠️ UPDATE
    technologies: ["Tech1", "Tech2"], // ⚠️ OPTIONAL
  },
  // Add more jobs...
];
```

### D. Fill in Your Actual Details

**Example:**
```javascript
const experience = [
  {
    title: "Senior Full-Stack Developer",
    company: "Digital Cambodia Tech",
    period: "January 2022 - Present",
    location: "Phnom Penh, Cambodia",
    description: "Led development of enterprise applications using Java Spring Boot microservices and React frontend. Implemented CI/CD pipelines with Jenkins and Docker, reducing deployment time by 60%.",
    technologies: ["Spring Boot", "React", "Docker", "Kubernetes", "Jenkins"],
  },
  {
    title: "Backend Developer",
    company: "Tech Solutions Co.",
    period: "June 2020 - December 2021",
    location: "Phnom Penh, Cambodia",
    description: "Developed RESTful APIs and microservices using Spring Boot. Managed PostgreSQL databases and implemented OAuth2 authentication.",
    technologies: ["Spring Boot", "PostgreSQL", "OAuth2"],
  },
];
```

### E. Update Professional Summary (around line 102)

Replace this placeholder:
```javascript
Replace this with your professional summary from your resume...
```

With your actual summary:
```javascript
Full-Stack Developer with 5+ years of experience building scalable web applications.
Expert in Java Spring Boot microservices, React, and DevOps practices. Proven track
record of delivering enterprise solutions with CI/CD automation.
```

### F. Update Quick Facts (around line 117)

```javascript
<strong>5+ years</strong> of professional experience
Based in <strong>Phnom Penh, Cambodia</strong>
<strong>Available</strong> for new opportunities
```

---

## 🚀 STEP 2: Update Projects

### A. Visit Your Old Portfolio
```
https://dapravith-digital-portfolio.vercel.app/
```

Browse through and **select your TOP 5 BEST projects**

### B. Edit the Projects Component
```bash
code components/projects-new.tsx
```

### C. Find the Projects Array (around line 51)

```javascript
const projects = [
  {
    title: "PROJECT 1 - Your Featured Project",
    description: "Replace with...",
    image: "/projects/project1.jpg",
    technologies: ["Spring Boot", "React"],
    githubUrl: "https://github.com/rothadapravith/YOUR-REPO", // ⚠️ UPDATE
    demoUrl: "https://your-demo.vercel.app", // ⚠️ UPDATE
    featured: true,
  },
  // Add 4 more projects...
];
```

### D. Fill in Your Actual Projects

**Example from old portfolio:**
```javascript
const projects = [
  {
    title: "E-Commerce Microservices Platform",
    description: "Full-stack e-commerce platform built with microservices architecture. Features include user authentication, product catalog, shopping cart, and payment integration using Stripe.",
    image: "/projects/ecommerce.jpg",
    technologies: ["Spring Boot", "React", "Docker", "Kubernetes", "PostgreSQL", "Redis"],
    githubUrl: "https://github.com/rothadapravith/ecommerce-microservices",
    demoUrl: "https://ecommerce-demo.vercel.app",
    featured: true, // Your best project
  },
  {
    title: "DevOps CI/CD Pipeline",
    description: "Automated deployment pipeline with Jenkins, Docker, and Kubernetes. Implements blue-green deployment strategy with automated testing and rollback capabilities.",
    image: "/projects/cicd.jpg",
    technologies: ["Jenkins", "Docker", "Kubernetes", "GitLab", "Terraform"],
    githubUrl: "https://github.com/rothadapravith/cicd-pipeline",
    demoUrl: "https://github.com/rothadapravith/cicd-pipeline#demo",
    featured: false,
  },
  {
    title: "Real-Time Chat Application",
    description: "WebSocket-based chat application with real-time messaging, file sharing, and video calls. Built with Node.js and React.",
    image: "/projects/chat.jpg",
    technologies: ["Node.js", "React", "Socket.io", "MongoDB", "WebRTC"],
    githubUrl: "https://github.com/rothadapravith/realtime-chat",
    demoUrl: "https://chat-demo.vercel.app",
    featured: false,
  },
  {
    title: "Authentication Microservice",
    description: "Centralized authentication service using Keycloak with Spring Boot. Supports OAuth2, JWT, and SSO integration.",
    image: "/projects/auth.jpg",
    technologies: ["Spring Boot", "Keycloak", "OAuth2", "JWT", "PostgreSQL"],
    githubUrl: "https://github.com/rothadapravith/auth-service",
    demoUrl: "https://github.com/rothadapravith/auth-service#readme",
    featured: false,
  },
  {
    title: "Cloud Infrastructure as Code",
    description: "AWS infrastructure automation using Terraform and Ansible. Provisions VPC, EC2, RDS, and ECS with best practices.",
    image: "/projects/terraform.jpg",
    technologies: ["Terraform", "Ansible", "AWS", "Docker", "Python"],
    githubUrl: "https://github.com/rothadapravith/aws-terraform",
    demoUrl: "https://github.com/rothadapravith/aws-terraform/wiki",
    featured: false,
  },
];
```

### E. Add Project Screenshots

1. Take screenshots of your projects
2. Add them to `public/projects/` folder
3. Name them: `project1.jpg`, `project2.jpg`, etc.

```bash
# Example:
cp ~/Downloads/my-ecommerce-screenshot.png public/projects/ecommerce.jpg
cp ~/Downloads/my-chat-screenshot.png public/projects/chat.jpg
```

**Or use placeholders** (images will auto-generate with project name):
- The component will create a placeholder if image is missing
- You can add real screenshots later

---

## ✅ STEP 3: Apply Your Updates

### Option A: Use the Helper Script (Easiest)
```bash
./update-content.sh
```

Follow the menu:
1. View templates
2. When ready, select "Apply Updates"
3. Script will backup old files and apply new ones

### Option B: Manual Update
```bash
# Backup old components
cp components/about.tsx components/about.backup.tsx
cp components/projects.tsx components/projects.backup.tsx

# Apply new components
cp components/about-new.tsx components/about.tsx
cp components/projects-new.tsx components/projects.tsx
```

---

## 🚀 STEP 4: Test Your Changes

```bash
# Start development server
npm run dev

# Open in browser
open http://localhost:3000
```

### Check:
- ✅ Work experience shows correctly
- ✅ Projects display with proper links
- ✅ GitHub links work
- ✅ Demo links work
- ✅ Project images appear (or placeholders)

---

## 📸 Adding Project Images (Optional)

### Best Practices:
- **Size:** 1200x800px or 16:9 ratio
- **Format:** JPG or PNG
- **Quality:** High quality but compressed
- **Name:** Descriptive (e.g., `ecommerce-platform.jpg`)

### Tools to create screenshots:
- **Mac:** Cmd + Shift + 4
- **Windows:** Windows + Shift + S
- **Online:** https://www.screely.com/ (adds browser frame)

### Add to portfolio:
```bash
# Copy your screenshot
cp ~/Pictures/my-screenshot.png public/projects/project-name.jpg

# Or create placeholder with project name
# (Component will auto-generate if missing)
```

---

## 🔗 GitHub & Demo URLs

### GitHub URL Format:
```
https://github.com/rothadapravith/repository-name
```

### Demo URL Options:
1. **Live Demo:** `https://your-app.vercel.app`
2. **GitHub Pages:** `https://rothadapravith.github.io/repo-name`
3. **README:** `https://github.com/rothadapravith/repo#readme`
4. **Video Demo:** `https://youtu.be/your-video-id`

### If no live demo:
- Use GitHub README link
- Add demo video/screenshots to README
- Or use GitHub repository URL for both

---

## 📝 Checklist

### Work Experience:
- [ ] Copied all jobs from resume
- [ ] Added job titles and companies
- [ ] Included correct dates
- [ ] Added locations (optional)
- [ ] Wrote descriptions
- [ ] Listed technologies used (optional)
- [ ] Updated professional summary
- [ ] Updated quick facts

### Projects:
- [ ] Selected top 5 projects
- [ ] Added project titles
- [ ] Wrote descriptions
- [ ] Listed technologies
- [ ] Added GitHub URLs
- [ ] Added demo URLs
- [ ] Set featured project
- [ ] Added project images (or using placeholders)

### Testing:
- [ ] Ran `npm run dev`
- [ ] Checked work experience section
- [ ] Clicked all GitHub links
- [ ] Clicked all demo links
- [ ] Verified project images load
- [ ] Tested on mobile view

---

## 🆘 Need Help?

### Common Issues:

**Q: My project images don't show**
A: Make sure images are in `public/projects/` folder and named correctly in code

**Q: GitHub link goes to 404**
A: Double-check repository name and make sure it's public

**Q: Can I have more/less than 5 projects?**
A: Yes! Just add/remove items from the projects array

**Q: How do I undo changes?**
A: Restore from backup:
```bash
cp components/about.backup.tsx components/about.tsx
cp components/projects.backup.tsx components/projects.tsx
```

---

## 🎯 Final Steps

Once everything looks good:

1. **Remove warning boxes** (optional)
   - Edit components and remove the yellow warning sections

2. **Deploy to Vercel/Netlify**
   ```bash
   git add .
   git commit -m "Update work experience and projects"
   git push
   ```

3. **Share your portfolio!**
   - Update LinkedIn
   - Update resume
   - Share with recruiters

---

**Ready to update? Start with STEP 1! 🚀**

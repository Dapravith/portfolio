#!/bin/bash

# Portfolio Content Update Helper Script
# This script helps you update work experience and projects

echo "╔════════════════════════════════════════════════════════════════╗"
echo "║                                                                ║"
echo "║        Portfolio Content Update Helper                         ║"
echo "║                                                                ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""

# Function to show menu
show_menu() {
    echo "What would you like to update?"
    echo ""
    echo "1. View Work Experience Template"
    echo "2. View Projects Template"
    echo "3. Apply Updates (Replace components)"
    echo "4. Open Resume PDF"
    echo "5. Create project images folder"
    echo "6. Exit"
    echo ""
}

# Function to view work experience template
view_work_template() {
    echo "╔════════════════════════════════════════════════════════════════╗"
    echo "║             WORK EXPERIENCE TEMPLATE                           ║"
    echo "╚════════════════════════════════════════════════════════════════╝"
    echo ""
    echo "Copy this template and fill in with your resume details:"
    echo ""
    cat << 'EOF'
{
  title: "Senior Full-Stack Developer",
  company: "ABC Tech Company",
  period: "Jan 2022 - Present",
  location: "Phnom Penh, Cambodia",
  description: "Led development of enterprise applications using Java Spring Boot and React...",
  technologies: ["Spring Boot", "React", "Docker", "Kubernetes"],
}
EOF
    echo ""
    echo "Open components/about-new.tsx and update the experience array"
    echo ""
}

# Function to view projects template
view_projects_template() {
    echo "╔════════════════════════════════════════════════════════════════╗"
    echo "║                  PROJECTS TEMPLATE                             ║"
    echo "╚════════════════════════════════════════════════════════════════╝"
    echo ""
    echo "Visit your old portfolio and select TOP 5 projects:"
    echo "https://dapravith-digital-portfolio.vercel.app/"
    echo ""
    cat << 'EOF'
{
  title: "Microservices E-Commerce Platform",
  description: "Full-stack e-commerce with microservices architecture...",
  image: "/projects/ecommerce.jpg",
  technologies: ["Spring Boot", "React", "Docker", "Kubernetes"],
  githubUrl: "https://github.com/rothadapravith/repo-name",
  demoUrl: "https://your-demo.vercel.app",
  featured: true,
}
EOF
    echo ""
    echo "Open components/projects-new.tsx and update the projects array"
    echo ""
}

# Function to apply updates
apply_updates() {
    echo "╔════════════════════════════════════════════════════════════════╗"
    echo "║                 APPLYING UPDATES                               ║"
    echo "╚════════════════════════════════════════════════════════════════╝"
    echo ""
    
    read -p "Have you updated about-new.tsx with your work experience? (y/n): " about_ready
    read -p "Have you updated projects-new.tsx with your projects? (y/n): " projects_ready
    
    if [[ "$about_ready" == "y" && "$projects_ready" == "y" ]]; then
        echo ""
        echo "Backing up old components..."
        cp components/about.tsx components/about.backup.tsx
        cp components/projects.tsx components/projects.backup.tsx
        
        echo "Applying new components..."
        cp components/about-new.tsx components/about.tsx
        cp components/projects-new.tsx components/projects.tsx
        
        echo ""
        echo "✅ Updates applied successfully!"
        echo ""
        echo "Backups saved:"
        echo "  - components/about.backup.tsx"
        echo "  - components/projects.backup.tsx"
        echo ""
        echo "Run 'npm run dev' to see your changes!"
    else
        echo ""
        echo "⚠️  Please update the components first before applying."
        echo ""
    fi
}

# Function to open resume
open_resume() {
    echo "Opening resume PDF..."
    if [[ -f "public/resume.pdf" ]]; then
        open public/resume.pdf 2>/dev/null || xdg-open public/resume.pdf 2>/dev/null || echo "Please manually open: public/resume.pdf"
    else
        echo "❌ Resume not found at: public/resume.pdf"
    fi
}

# Function to create projects folder
create_projects_folder() {
    echo "Creating projects images folder..."
    mkdir -p public/projects
    echo "✅ Folder created: public/projects/"
    echo ""
    echo "Add your project screenshots here:"
    echo "  - public/projects/project1.jpg"
    echo "  - public/projects/project2.jpg"
    echo "  - etc..."
    echo ""
    ls -la public/projects/ 2>/dev/null || echo "Folder is empty"
}

# Main menu loop
while true; do
    show_menu
    read -p "Enter your choice (1-6): " choice
    echo ""
    
    case $choice in
        1)
            view_work_template
            ;;
        2)
            view_projects_template
            ;;
        3)
            apply_updates
            ;;
        4)
            open_resume
            ;;
        5)
            create_projects_folder
            ;;
        6)
            echo "Goodbye! 👋"
            exit 0
            ;;
        *)
            echo "Invalid choice. Please select 1-6."
            ;;
    esac
    
    echo ""
    read -p "Press Enter to continue..."
    clear
done

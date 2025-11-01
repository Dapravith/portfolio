#!/bin/bash

echo "🎨 Portfolio Asset Setup Helper"
echo "================================"
echo ""

# Check for profile photo
if [ -f "public/profile.jpg" ]; then
    echo "✅ Profile photo found: public/profile.jpg"
else
    echo "⚠️  Profile photo NOT found"
    echo "   Please add your photo to: public/profile.jpg"
    echo "   Recommended size: 800x800px (square)"
fi

echo ""

# Check for resume
if [ -f "public/resume.pdf" ]; then
    echo "✅ Resume found: public/resume.pdf"
else
    echo "⚠️  Resume NOT found"
    echo "   Please add your resume to: public/resume.pdf"
fi

echo ""
echo "📝 Quick Commands:"
echo "   Copy photo:  cp /path/to/your/photo.jpg public/profile.jpg"
echo "   Copy resume: cp /path/to/your/resume.pdf public/resume.pdf"
echo ""
echo "🚀 After adding files, run: npm run dev"

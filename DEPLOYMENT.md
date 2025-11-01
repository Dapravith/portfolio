# Deployment Guide - Fullstack Portfolio

## 🚀 Quick Deploy to Vercel

### 1. Prerequisites
- Vercel CLI installed: `npm i -g vercel`
- Git repository initialized

### 2. Deploy Steps

```bash
# Login to Vercel
vercel login

# Deploy to production
vercel --prod
```

## 📋 Pre-Deployment Checklist

### ✅ Configuration
- [ ] Update `src/utils/constants.ts` with your information
- [ ] Set up environment variables
- [ ] Configure custom domain (optional)
- [ ] Test build locally: `npm run build`

### ✅ Environment Variables
Create `.env.local` for local development:
```env
NEXT_PUBLIC_APP_URL=https://dapravith.pro
NEXT_PUBLIC_API_URL=/api

# Optional: Email service (SendGrid, Resend, etc.)
EMAIL_API_KEY=your_api_key
EMAIL_FROM=noreply@dapravith.pro

# Optional: Database
DATABASE_URL=postgresql://...
```

Add to Vercel:
```bash
vercel env add NEXT_PUBLIC_APP_URL
vercel env add EMAIL_API_KEY
```

## 🔧 Build Configuration

The project uses:
- **Framework**: Next.js 16
- **Build Command**: `next build --webpack`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

## 🌐 Custom Domain Setup

### Option 1: Configure DNS (Recommended)
Add A record to your DNS provider:
```
Type: A
Name: @ (or your subdomain)
Value: 76.76.21.21
TTL: 3600
```

### Option 2: Use Vercel Nameservers
Update your domain's nameservers to Vercel's:
- Check in Vercel dashboard for your specific nameservers

### Verify Domain
```bash
vercel domains inspect dapravith.pro
```

## 🔄 Continuous Deployment

### GitHub Integration
1. Connect repository to Vercel
2. Every push to `main` branch auto-deploys
3. Preview deployments for pull requests

### Manual Deploy
```bash
# Production
vercel --prod

# Preview
vercel
```

## 📊 Post-Deployment

### Monitor
- Check build logs: `vercel logs`
- View analytics in Vercel dashboard
- Monitor performance

### Test
```bash
# Test API endpoints
curl https://dapravith.pro/api/projects
curl -X POST https://dapravith.pro/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","message":"Hello"}'
```

## 🔐 Security

### API Routes
- Add rate limiting
- Validate input
- Sanitize data
- Use CORS headers

### Environment Variables
- Never commit `.env` files
- Use Vercel Environment Variables
- Rotate keys regularly

## 🐛 Troubleshooting

### Build Fails
```bash
# Clear cache
rm -rf .next node_modules
npm install
npm run build
```

### Domain Not Working
1. Check DNS propagation: `nslookup dapravith.pro`
2. Verify SSL certificate: `vercel domains inspect dapravith.pro`
3. Wait 24-48 hours for DNS propagation

### API Routes Not Working
- Check function logs in Vercel dashboard
- Verify environment variables
- Test locally first

## 📱 Performance Optimization

### Implemented
- ✅ Static page generation
- ✅ Image optimization (Next.js Image)
- ✅ Code splitting
- ✅ CSS optimization

### Recommended
- [ ] Add CDN for assets
- [ ] Implement caching strategies
- [ ] Use Edge Functions for API routes
- [ ] Enable compression

## 📈 Scaling Considerations

### Current Setup
- Serverless functions (API routes)
- Static generation where possible
- Edge network distribution

### Future Enhancements
- Database integration (PostgreSQL, MongoDB)
- Redis caching
- Background job processing
- Email service integration
- CMS integration

## 🔗 Useful Commands

```bash
# View deployments
vercel ls

# Rollback to previous deployment
vercel rollback [deployment-url]

# View logs
vercel logs [deployment-url]

# Remove deployment
vercel rm [deployment-name]

# Check current project
vercel whoami
vercel project ls
```

## 📞 Support

- Vercel Docs: https://vercel.com/docs
- Next.js Docs: https://nextjs.org/docs
- GitHub Issues: Create issue in repository

---

**Last Updated**: November 2025  
**Author**: Dapravith

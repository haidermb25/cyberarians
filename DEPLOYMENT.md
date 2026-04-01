# Hostinger Deployment Guide

## Prerequisites

1. Hostinger account with Node.js hosting
2. Supabase database already set up with tables created
3. Git repository (optional but recommended)

## Environment Variables

Make sure these are set in your Hostinger environment:

```env
NEXT_PUBLIC_SUPABASE_URL=https://dqogtbrqhgqvfpggmwti.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_u7I4b8mMa1D_wtGo-Em2SQ_hcHB4bHV
# Optional storage bucket names for admin image uploads
NEXT_PUBLIC_SUPABASE_RESEARCHERS_BUCKET=researchers
NEXT_PUBLIC_SUPABASE_COMMUNITIES_BUCKET=communities
ADMIN_PASSWORD=admin123
```

## Deployment Steps

### Option 1: Direct Upload

1. **Build the project locally:**
   ```bash
   npm run build
   ```

2. **Upload these folders/files to Hostinger:**
   - `.next/` folder
   - `public/` folder
   - `node_modules/` folder (or run `npm install` on server)
   - `package.json`
   - `package-lock.json`
   - `.env.local` (with production values)

3. **Set start command in Hostinger:**
   ```bash
   npm start
   ```

### Option 2: Git Deploy (Recommended)

1. **Push code to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Connect repository in Hostinger:**
   - Go to Hostinger panel
   - Select "Git Deployment"
   - Connect your repository
   - Set build command: `npm install && npm run build`
   - Set start command: `npm start`

3. **Configure environment variables in Hostinger panel**

## Post-Deployment Checklist

- [ ] Environment variables are set correctly
- [ ] Supabase connection is working
- [ ] Admin login works at `/admin/login`
- [ ] Researchers page loads at `/researchers`
- [ ] Communities page loads at `/communities`
- [ ] All CRUD operations work in admin panel

## Troubleshooting

**Issue: "Missing Supabase environment variables"**
- Verify environment variables in Hostinger panel
- Restart the application

**Issue: Database connection failed**
- Check Supabase project is active
- Verify API credentials are correct
- Check network/firewall settings

**Issue: 500 errors**
- Check Hostinger logs
- Verify all dependencies are installed
- Ensure Node.js version is compatible (Node 18+)

## URLs After Deployment

- Homepage: `https://yourdomain.com`
- Researchers: `https://yourdomain.com/researchers`
- Communities: `https://yourdomain.com/communities`
- Admin Login: `https://yourdomain.com/admin/login`

## Performance Tips

1. Enable caching in Hostinger
2. Use CDN for static assets
3. Enable gzip compression
4. Set up proper caching headers
5. Monitor Supabase usage and upgrade plan if needed

## Security Recommendations

1. Change `ADMIN_PASSWORD` from default
2. Enable HTTPS (should be automatic on Hostinger)
3. Set up Row Level Security in Supabase
4. Use strong API keys
5. Regular backups of database

---

**Need help?** Contact Hostinger support or check their Next.js deployment documentation.

# Deployment Guide

This guide covers deploying your Next.js Full-Stack Template to production.

## 🚀 Quick Deploy Options

### Option 1: Vercel (Recommended for Next.js)

Vercel provides the easiest deployment experience for Next.js applications.

#### Steps:

1. **Push to GitHub**

   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Deploy to Vercel**

   - Visit [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Connect your GitHub repository
   - Vercel auto-detects Next.js configuration

3. **Configure Environment Variables**

   In Vercel Dashboard → Settings → Environment Variables:

   ```
   DATABASE_URL=postgresql://user:password@host:5432/database
   NEXTAUTH_SECRET=<generate-secure-secret>
   NEXTAUTH_URL=https://your-app.vercel.app
   GOOGLE_CLIENT_ID=<your-google-client-id> (optional)
   GOOGLE_CLIENT_SECRET=<your-google-secret> (optional)
   ```

4. **Setup Production Database**

   Use a managed PostgreSQL service:

   - [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres)
   - [Supabase](https://supabase.com)
   - [Railway](https://railway.app)
   - [Neon](https://neon.tech)

5. **Run Migrations**

   After deploying, run migrations via Vercel CLI:

   ```bash
   vercel env pull .env.local
   npm run migration:run
   ```

✅ **Done!** Your app is live.

---

### Option 2: Railway

Railway offers simple deployment with built-in PostgreSQL.

#### Steps:

1. **Create Railway Account**

   - Visit [railway.app](https://railway.app)
   - Sign in with GitHub

2. **Create New Project**

   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository

3. **Add PostgreSQL**

   - In your project, click "New"
   - Select "Database" → "PostgreSQL"
   - Railway automatically creates `DATABASE_URL`

4. **Configure Environment Variables**

   In Railway Dashboard → Variables:

   ```
   NEXTAUTH_SECRET=<generate-secure-secret>
   NEXTAUTH_URL=${{RAILWAY_PUBLIC_DOMAIN}}
   NODE_ENV=production
   ```

5. **Run Migrations**

   Add build command in Railway settings:

   ```bash
   npm run build && npm run migration:run
   ```

6. **Deploy**
   - Railway auto-deploys on push
   - Your app is available at generated Railway domain

---

### Option 3: Docker + VPS

Deploy using Docker on any VPS (DigitalOcean, AWS, etc.).

#### Prerequisites:

- VPS with Docker installed
- Domain name (optional)

#### Steps:

1. **Create Dockerfile**

   Create `Dockerfile` in project root:

   ```dockerfile
   FROM node:18-alpine AS base

   # Install dependencies
   FROM base AS deps
   RUN apk add --no-cache libc6-compat
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci

   # Build application
   FROM base AS builder
   WORKDIR /app
   COPY --from=deps /app/node_modules ./node_modules
   COPY . .
   RUN npm run build

   # Production image
   FROM base AS runner
   WORKDIR /app

   ENV NODE_ENV production

   RUN addgroup --system --gid 1001 nodejs
   RUN adduser --system --uid 1001 nextjs

   COPY --from=builder /app/public ./public
   COPY --from=builder /app/.next/standalone ./
   COPY --from=builder /app/.next/static ./.next/static
   COPY --from=builder /app/src/lib/db ./src/lib/db
   COPY --from=builder /app/src/entities ./src/entities

   USER nextjs

   EXPOSE 3000

   ENV PORT 3000

   CMD ["node", "server.js"]
   ```

2. **Update next.config.js**

   Add to `next.config.js`:

   ```javascript
   module.exports = {
     output: "standalone",
     // ...existing config
   };
   ```

3. **Create docker-compose.prod.yml**

   ```yaml
   version: "3.8"

   services:
     app:
       build: .
       ports:
         - "3000:3000"
       environment:
         - DATABASE_URL=postgresql://user:password@db:5432/tododb
         - NEXTAUTH_SECRET=${NEXTAUTH_SECRET}
         - NEXTAUTH_URL=${NEXTAUTH_URL}
       depends_on:
         - db

     db:
       image: postgres:16
       environment:
         POSTGRES_USER: user
         POSTGRES_PASSWORD: password
         POSTGRES_DB: tododb
       volumes:
         - postgres_data:/var/lib/postgresql/data
       ports:
         - "5432:5432"

   volumes:
     postgres_data:
   ```

4. **Deploy to VPS**

   ```bash
   # SSH into your VPS
   ssh user@your-server-ip

   # Clone repository
   git clone <your-repo-url>
   cd NextJsTemplate

   # Create .env file
   nano .env
   # Add your environment variables

   # Build and run
   docker-compose -f docker-compose.prod.yml up -d

   # Run migrations
   docker-compose -f docker-compose.prod.yml exec app npm run migration:run
   ```

5. **Setup Nginx (Optional)**

   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

6. **Setup SSL with Certbot**

   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d yourdomain.com
   ```

---

## 🔐 Pre-Deployment Checklist

### Security

- [ ] Generate strong `NEXTAUTH_SECRET`

  ```bash
  openssl rand -base64 32
  ```

- [ ] Update `NEXTAUTH_URL` to production URL

- [ ] Use strong database password

- [ ] Enable SSL/HTTPS

- [ ] Review and update CORS settings if needed

- [ ] Ensure `.env` files are in `.gitignore`

- [ ] Remove any test/debug code

### Database

- [ ] Setup production PostgreSQL database

- [ ] Update `DATABASE_URL` to production database

- [ ] Run migrations on production database

  ```bash
  npm run migration:run
  ```

- [ ] **DO NOT** run seed script in production

- [ ] Setup database backups

- [ ] Configure connection pooling for production

### Application

- [ ] Test build locally

  ```bash
  npm run build
  npm start
  ```

- [ ] Update API rate limiting if implemented

- [ ] Configure error tracking (Sentry, etc.)

- [ ] Setup monitoring and logging

- [ ] Test all authentication flows

- [ ] Verify email service if implemented

### Environment Variables

Required variables for production:

```env
# Database
DATABASE_URL=postgresql://user:password@host:5432/database

# NextAuth
NEXTAUTH_URL=https://your-production-domain.com
NEXTAUTH_SECRET=<strong-random-secret>

# OAuth (if using)
GOOGLE_CLIENT_ID=<your-client-id>
GOOGLE_CLIENT_SECRET=<your-client-secret>

# Email (if implemented)
EMAIL_SERVER_HOST=smtp.example.com
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=your-email@example.com
EMAIL_SERVER_PASSWORD=your-password
EMAIL_FROM=noreply@yourdomain.com

# Application
NODE_ENV=production
```

---

## 🗄️ Database Hosting Options

### Vercel Postgres

- **Pros**: Integrated with Vercel, easy setup
- **Cons**: Limited free tier
- **Best for**: Vercel deployments
- **Setup**: [Vercel Postgres Docs](https://vercel.com/docs/storage/vercel-postgres)

### Supabase

- **Pros**: Generous free tier, additional features (auth, storage, realtime)
- **Cons**: Learning curve for full feature set
- **Best for**: Startups, MVPs
- **Setup**: [Supabase Quickstart](https://supabase.com/docs/guides/getting-started)

### Railway

- **Pros**: Simple setup, good free tier, integrated deployment
- **Cons**: Pricing can increase with scale
- **Best for**: Small to medium applications
- **Setup**: [Railway PostgreSQL](https://docs.railway.app/databases/postgresql)

### Neon

- **Pros**: Serverless PostgreSQL, modern architecture, generous free tier
- **Cons**: Relatively new service
- **Best for**: Serverless deployments
- **Setup**: [Neon Quickstart](https://neon.tech/docs/get-started-with-neon/signing-up)

### AWS RDS

- **Pros**: Highly scalable, reliable, many features
- **Cons**: More complex setup, higher cost
- **Best for**: Enterprise applications
- **Setup**: [AWS RDS for PostgreSQL](https://aws.amazon.com/rds/postgresql/)

---

## 📊 Post-Deployment

### Monitoring

1. **Setup Application Monitoring**

   - [Vercel Analytics](https://vercel.com/analytics)
   - [Google Analytics](https://analytics.google.com)
   - [Plausible](https://plausible.io) (privacy-friendly)

2. **Error Tracking**

   - [Sentry](https://sentry.io)
   - [LogRocket](https://logrocket.com)

3. **Uptime Monitoring**
   - [UptimeRobot](https://uptimerobot.com)
   - [Pingdom](https://www.pingdom.com)

### Performance

1. **Test Performance**

   - [Google PageSpeed Insights](https://pagespeed.web.dev)
   - [GTmetrix](https://gtmetrix.com)

2. **Setup CDN** (if not using Vercel)

   - Cloudflare
   - AWS CloudFront

3. **Enable Caching**
   - Configure Next.js cache headers
   - Use Redis for session storage (optional)

### Backup

1. **Database Backups**

   ```bash
   # PostgreSQL backup
   pg_dump $DATABASE_URL > backup.sql

   # Automate with cron
   0 2 * * * pg_dump $DATABASE_URL > /backups/backup-$(date +\%Y\%m\%d).sql
   ```

2. **Code Backups**
   - Already handled by Git/GitHub
   - Consider multiple remotes

---

## 🔄 CI/CD Setup (Optional)

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: "18"

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm test

      - name: Build
        run: npm run build

      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: "--prod"
```

---

## 🆘 Troubleshooting

### Build Fails

**Issue**: Build fails on deployment platform

**Solutions**:

- Check build logs for specific errors
- Ensure all dependencies in `package.json`
- Test build locally: `npm run build`
- Verify Node.js version matches

### Database Connection Failed

**Issue**: Can't connect to database

**Solutions**:

- Verify `DATABASE_URL` is correct
- Check database is running and accessible
- Verify firewall rules allow connection
- Check SSL settings (add `?sslmode=require` if needed)

### Authentication Not Working

**Issue**: Can't log in or session issues

**Solutions**:

- Verify `NEXTAUTH_SECRET` is set
- Check `NEXTAUTH_URL` matches your domain
- Clear cookies and try again
- Check browser console for errors

### Migrations Failed

**Issue**: Database migrations don't run

**Solutions**:

- Verify database connection
- Check migration files exist
- Run migrations manually: `npm run migration:run`
- Check for TypeORM configuration issues

---

## 📝 Domain Setup

### Custom Domain with Vercel

1. Add domain in Vercel dashboard
2. Update DNS records:

   ```
   Type: A
   Name: @
   Value: 76.76.21.21

   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

3. Wait for DNS propagation (up to 48 hours)
4. Vercel auto-provisions SSL certificate

### Custom Domain with Other Platforms

Follow platform-specific guides:

- Railway: [Custom Domains](https://docs.railway.app/deploy/exposing-your-app#custom-domains)
- VPS: Configure Nginx + Certbot (see Docker section above)

---

## 🎉 Success!

Your Next.js Full-Stack Template is now deployed!

**Next Steps**:

- Monitor application performance
- Setup automated backups
- Configure custom domain
- Enable analytics
- Setup error tracking
- Test all features in production

For issues or questions, see [CONTRIBUTING.md](CONTRIBUTING.md) or open an issue.

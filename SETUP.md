# Quick Setup Guide

Follow these steps to get your Next.js Todo App up and running.

## 1. Install Dependencies

\`\`\`bash
npm install
\`\`\`

## 2. Set Up Environment Variables

The \`.env.local\` file has been created with default development values.

**Important**: Update these values before deploying to production:

- \`NEXTAUTH_SECRET\`: Generate using: \`openssl rand -base64 32\`
- Google OAuth credentials (if using Google SSO)
- Email service credentials (if implementing password reset)

## 3. Start PostgreSQL Database

\`\`\`bash
docker-compose up -d
\`\`\`

Wait a few seconds for PostgreSQL to initialize.

## 4. Run Database Migrations

\`\`\`bash
npm run migration:run
\`\`\`

## 5. (Optional) Seed Sample Data

\`\`\`bash
npm run seed
\`\`\`

This creates test users and sample todos:

- **Admin**: admin@example.com / admin123
- **User 1**: john@example.com / user123
- **User 2**: jane@example.com / user123

## 6. Start Development Server

\`\`\`bash
npm run dev
\`\`\`

Visit: http://localhost:3000

## Next Steps

### Configure Google OAuth (Optional)

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create OAuth 2.0 credentials
3. Add redirect URI: \`http://localhost:3000/api/auth/callback/google\`
4. Update \`GOOGLE_CLIENT_ID\` and \`GOOGLE_CLIENT_SECRET\` in \`.env.local\`

### Implement Email Service (Optional)

Update \`src/app/api/auth/reset-password/route.ts\` to integrate with your email service provider.

### Production Deployment

**Before deploying:**

1. Update \`NEXTAUTH_SECRET\` with a secure random string
2. Update \`NEXTAUTH_URL\` to your production domain
3. Set up a production PostgreSQL database
4. Update \`DATABASE_URL\` to your production database
5. Configure email service for password resets
6. Review and test all authentication flows

## Common Commands

- \`npm run dev\` - Start development server
- \`npm run build\` - Build for production
- \`npm run start\` - Start production server
- \`npm run migration:run\` - Run database migrations
- \`npm run seed\` - Seed database with sample data
- \`docker-compose up -d\` - Start PostgreSQL
- \`docker-compose down\` - Stop PostgreSQL

## Troubleshooting

### Database Connection Issues

If you see database connection errors:

1. Check Docker is running: \`docker ps\`
2. Restart PostgreSQL: \`docker-compose restart\`
3. Verify DATABASE_URL in \`.env.local\`

### NextAuth Issues

If authentication doesn't work:

1. Ensure NEXTAUTH_SECRET is set
2. Check NEXTAUTH_URL matches your current URL
3. Clear browser cookies and try again

### TypeORM Issues

If migrations fail:

1. Ensure PostgreSQL is running
2. Check database credentials
3. Try: \`npm run migration:revert\` then \`npm run migration:run\`

## Features Overview

✅ Email/password authentication
✅ Google SSO (requires configuration)
✅ Password reset (email service requires configuration)
✅ Role-based access control (Admin, User)
✅ Full CRUD operations for todos
✅ Search, filter, and sort todos
✅ Pagination (10, 20, 50 items per page)
✅ User profile management
✅ Protected routes and API endpoints
✅ Responsive design with Tailwind CSS

## File Structure Reference

- \`src/app/\` - Pages and API routes
- \`src/components/\` - Reusable React components
- \`src/entities/\` - TypeORM database entities
- \`src/lib/auth/\` - Authentication utilities
- \`src/lib/db/\` - Database configuration and migrations
- \`src/types/\` - TypeScript type definitions

Enjoy building with your new Next.js Todo App! 🚀

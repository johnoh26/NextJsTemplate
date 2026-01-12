# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-01-12

### Added

#### Marketing Site

- **Landing Page** - Corporate homepage with hero section, features showcase, and statistics
- **Products Page** - Product features and three-tier pricing (Basic, Professional, Enterprise)
- **About Us Page** - Company story, core values, and team profiles
- **Careers Page** - Job board with 22+ job listings
  - Filter by city (San Francisco, New York, Remote, Austin, Seattle)
  - Filter by department (Engineering, Product, Design, Marketing, Sales, Operations)
  - Pagination with 10, 20, or 50 jobs per page
- **Contact Page** - Contact form with multiple inquiry types
- **Marketing Navbar** - Responsive navigation with mobile menu
- **Marketing Footer** - Multi-column footer with company links

#### Application Features

- **AppHeader Component** - Shared navigation header for authenticated pages
  - Context-aware navigation (hides current page link)
  - TaskFlow branding with clickable link to todos
  - User profile and sign out functionality
- **LoadingSpinner Component** - Reusable loading indicator with three sizes (sm, md, lg)
- **Custom 404 Page** - Animated error page with orbiting circles
- **Debounced Search** - 500ms delay on todo search for better performance
- **Sign Out Redirect** - Redirects to landing page instead of login page

#### Core Functionality

- **Authentication System**
  - Email/password registration and login
  - NextAuth.js session management
  - Password reset flow (structure ready, email integration needed)
  - Google OAuth support (ready to configure)
  - Role-based access control (User and Admin roles)
- **Todo Management**
  - Create, read, update, delete todos
  - Search by title with debouncing
  - Filter by status (pending, in-progress, completed)
  - Filter by priority (low, medium, high)
  - Sort by multiple criteria (date, status, priority)
  - Pagination (10, 20, 50 items per page)
  - Individual todo detail pages
  - Rich todo data (title, description, status, priority, due date)
- **User Management**
  - User profile view and edit
  - Admin user list view
  - Session-based authentication

#### Database

- **TypeORM Setup**
  - PostgreSQL 16 integration
  - User and Todo entities
  - Relationships (User has many Todos)
  - Migration system
  - Database seeding script
  - Direct imports for Next.js compatibility

#### Developer Experience

- **TypeScript** - Full type safety across the application
- **Tailwind CSS** - Utility-first styling with custom animations
- **Docker Compose** - PostgreSQL development environment
- **Database Seeding** - Test users and sample data
- **Comprehensive Documentation**
  - README.md - Overview and quick start
  - SETUP.md - Step-by-step setup guide
  - API.md - Complete API documentation
  - ARCHITECTURE.md - Technical architecture details
  - CONTRIBUTING.md - Contribution guidelines
  - CHANGELOG.md - Version history

### Technical Details

#### Dependencies

- Next.js 14.2.0 with App Router
- React 18.3.0
- TypeScript 5.4.0
- TypeORM 0.3.20
- PostgreSQL 16 (via Docker)
- NextAuth.js 4.24.0
- Tailwind CSS 3.4.0
- bcryptjs for password hashing
- Zod for schema validation
- date-fns for date formatting

#### Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (marketing pages)   # Landing, Products, About, Careers, Contact
│   ├── (auth pages)        # Login, Signup, Reset Password
│   ├── (app pages)         # Todos, Profile
│   ├── api/                # API routes
│   └── not-found.tsx       # Custom 404
├── components/
│   ├── marketing/          # Marketing components
│   ├── AppHeader.tsx       # Shared app header
│   ├── LoadingSpinner.tsx  # Loading component
│   └── Providers.tsx       # Session provider
├── entities/               # TypeORM entities
├── lib/
│   ├── auth/              # Authentication utilities
│   └── db/                # Database configuration
└── types/                 # TypeScript definitions
```

### Security

- Password hashing with bcrypt (10 rounds)
- JWT-based session management
- CSRF protection via NextAuth
- SQL injection protection via TypeORM
- Input validation with Zod schemas
- Protected API routes with middleware

### Performance Optimizations

- Debounced search (500ms delay)
- Server Components for reduced JavaScript bundle
- Database indexing on frequently queried fields
- Next.js automatic code splitting
- Optimized queries with TypeORM QueryBuilder

## [0.1.0] - Initial Release

### Added

- Basic Next.js project setup
- Initial TypeORM configuration
- Basic authentication structure
- Todo entity and API routes

---

## Version Upgrade Guide

### Upgrading to 1.0.0

This is the first stable release. If you're upgrading from a previous version:

1. **Update Dependencies**

   ```bash
   npm install
   ```

2. **Database Migrations**

   ```bash
   npm run migration:run
   ```

3. **Environment Variables**

   - Verify all required environment variables are set in `.env.local`
   - Generate new `NEXTAUTH_SECRET` for production

4. **Review Documentation**
   - Read through updated README.md
   - Check ARCHITECTURE.md for technical details
   - Review API.md for endpoint changes

---

## Roadmap

### Planned for Future Releases

#### v1.1.0

- [ ] Email integration for password reset
- [ ] Email verification on signup
- [ ] Google OAuth configuration guide
- [ ] User avatar upload
- [ ] Todo attachments

#### v1.2.0

- [ ] Real-time notifications
- [ ] WebSocket support
- [ ] Collaborative todos
- [ ] Todo sharing between users
- [ ] Activity log

#### v1.3.0

- [ ] Mobile app (React Native)
- [ ] PWA support
- [ ] Offline mode
- [ ] Push notifications

#### Future Considerations

- Unit and integration tests
- E2E testing with Playwright
- CI/CD pipeline
- API rate limiting
- Multi-language support (i18n)
- Dark mode
- Advanced analytics
- Export/import functionality
- Todo categories and tags
- Recurring todos
- Todo templates

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on contributing to this project.

## License

See [LICENSE](LICENSE) for license information.

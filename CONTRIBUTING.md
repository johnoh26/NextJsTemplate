# Contributing to Next.js Full-Stack Template

Thank you for your interest in contributing! This document provides guidelines and information for contributors.

## 🏗️ Project Architecture

### Application Structure

This project consists of two main sections:

1. **Marketing Site** - Public-facing pages showcasing the product
2. **Todo Application** - Authenticated application with full CRUD functionality

### Key Technologies

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript 5.4
- **Database**: PostgreSQL 16 with TypeORM 0.3
- **Authentication**: NextAuth.js v4
- **Styling**: Tailwind CSS 3.4
- **Validation**: Zod for schema validation

## 🚀 Development Setup

1. **Fork and Clone**

   ```bash
   git clone <your-fork-url>
   cd NextJsTemplate
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Start Database**

   ```bash
   docker-compose up -d
   ```

4. **Run Migrations**

   ```bash
   npm run migration:run
   ```

5. **Seed Data (Optional)**

   ```bash
   npm run seed
   ```

6. **Start Dev Server**
   ```bash
   npm run dev
   ```

## 📝 Code Style Guidelines

### TypeScript

- Use TypeScript for all new files
- Define proper types and interfaces
- Avoid `any` type unless absolutely necessary
- Use type imports when possible: `import type { User } from '@/entities/User'`

### React Components

- Use functional components with hooks
- Prefer server components unless client-side interactivity is needed
- Use `"use client"` directive only when necessary
- Keep components focused and single-responsibility

### File Naming

- **Components**: PascalCase (e.g., `AppHeader.tsx`, `LoadingSpinner.tsx`)
- **Pages**: lowercase with Next.js conventions (e.g., `page.tsx`, `layout.tsx`)
- **Utilities**: camelCase (e.g., `auth-options.ts`, `data-source.ts`)
- **Types**: PascalCase for entities (e.g., `User.ts`, `Todo.ts`)

### Code Organization

- Marketing pages go in `/src/app/` root level
- Authenticated app pages go in `/src/app/todos`, `/src/app/profile`
- Shared components go in `/src/components/`
- Marketing-specific components go in `/src/components/marketing/`
- Database entities go in `/src/entities/`
- Utilities go in `/src/lib/`

## 🔄 Git Workflow

### Branch Naming

- `feature/description` - New features
- `fix/description` - Bug fixes
- `docs/description` - Documentation updates
- `refactor/description` - Code refactoring

### Commit Messages

Follow conventional commits format:

```
type(scope): description

- feat: A new feature
- fix: A bug fix
- docs: Documentation changes
- style: Code style changes (formatting)
- refactor: Code refactoring
- test: Adding tests
- chore: Maintenance tasks
```

Examples:

```
feat(todos): add debounced search functionality
fix(auth): correct password reset email link
docs(readme): update project structure section
refactor(components): extract AppHeader component
```

### Pull Request Process

1. Create a feature branch from `main`
2. Make your changes with clear, descriptive commits
3. Test your changes thoroughly
4. Update documentation if needed
5. Submit a pull request with a clear description
6. Wait for review and address feedback

## 🧪 Testing

Before submitting a PR, ensure:

- [ ] The application builds successfully: `npm run build`
- [ ] No TypeScript errors: `npm run lint`
- [ ] Database migrations run without errors
- [ ] All features work in development mode
- [ ] Authentication flows work correctly
- [ ] Both marketing and app sections are functional

## 📁 Component Guidelines

### Creating New Components

1. **Determine Type**

   - Server Component (default) - For static content, data fetching
   - Client Component - For interactivity, hooks, browser APIs

2. **Location**

   - Shared app components → `/src/components/`
   - Marketing components → `/src/components/marketing/`
   - Page-specific components → Create within page directory

3. **Structure**

   ```tsx
   // Server Component (default)
   export default function MyComponent() {
     return <div>...</div>;
   }

   // Client Component
   ("use client");
   import { useState } from "react";

   export default function MyComponent() {
     const [state, setState] = useState();
     return <div>...</div>;
   }
   ```

### Styling Guidelines

- Use Tailwind CSS utility classes
- Follow mobile-first responsive design
- Maintain consistent spacing and color schemes
- Use custom classes in `globals.css` for complex repeated patterns
- Reference existing components for styling patterns

## 🗄️ Database Guidelines

### Creating Migrations

```bash
# Generate migration from entity changes
npm run typeorm -- migration:generate src/lib/db/migrations/MigrationName

# Run migrations
npm run migration:run

# Revert last migration
npm run migration:revert
```

### Entity Guidelines

- Define entities in `/src/entities/`
- Use TypeORM decorators properly
- Define relationships clearly
- Add indexes for frequently queried fields
- Use `cascade` options carefully

### Seeding Data

- Update `src/lib/db/seed.ts` for development data
- Don't include sensitive information in seeds
- Keep seed data realistic and useful for testing

## 🔐 Security Considerations

- Never commit sensitive data or credentials
- Use environment variables for all secrets
- Validate all user inputs with Zod schemas
- Sanitize data before database operations
- Use TypeORM's built-in protections against SQL injection
- Keep dependencies updated

## 📚 Documentation

When adding features, update:

- `README.md` - If adding major features or changing setup
- `SETUP.md` - If changing installation/setup steps
- Code comments - For complex logic
- Type definitions - For new data structures
- API documentation - For new endpoints

## 🐛 Reporting Issues

When reporting issues, include:

- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Environment details (OS, Node version, etc.)
- Error messages or screenshots
- Relevant code snippets

## 💡 Feature Requests

For feature requests:

- Check existing issues first
- Describe the feature clearly
- Explain the use case
- Provide examples if possible
- Consider implementation approach

## 📞 Getting Help

- Check the README and SETUP guides
- Review existing issues
- Check TypeORM, Next.js, and NextAuth documentation
- Create a new issue with detailed information

## 🙏 Thank You

Thank you for contributing to this project! Your efforts help make this template better for everyone.

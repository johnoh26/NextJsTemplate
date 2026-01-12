# Project Architecture

This document provides a comprehensive overview of the Next.js Full-Stack Template architecture.

## 🏛️ High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Client Browser                        │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    Next.js Application                       │
│  ┌─────────────────────┐      ┌─────────────────────────┐   │
│  │  Marketing Site     │      │  Todo Application       │   │
│  │  (Public)           │      │  (Authenticated)        │   │
│  │                     │      │                         │   │
│  │  - Landing          │      │  - Todo CRUD            │   │
│  │  - Products         │      │  - Search/Filter        │   │
│  │  - About            │      │  - Profile              │   │
│  │  - Careers          │      │  - User Management      │   │
│  │  - Contact          │      │                         │   │
│  └─────────────────────┘      └─────────────────────────┘   │
│                            │                                 │
│  ┌────────────────────────┼────────────────────────────┐    │
│  │         API Routes     │                            │    │
│  │  - /api/auth/*         │                            │    │
│  │  - /api/todos/*        │                            │    │
│  │  - /api/users/*        │                            │    │
│  └────────────────────────┼────────────────────────────┘    │
└────────────────────────────┼──────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    Authentication Layer                      │
│                     (NextAuth.js v4)                         │
│  - Session Management                                        │
│  - JWT Token Generation                                      │
│  - Credential Validation                                     │
│  - OAuth Integration (Google)                                │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                      Data Access Layer                       │
│                     (TypeORM 0.3.20)                         │
│  - Entity Management                                         │
│  - Query Building                                            │
│  - Relationship Handling                                     │
│  - Migration Management                                      │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                  PostgreSQL Database (v16)                   │
│  - User Data                                                 │
│  - Todo Data                                                 │
│  - Session Storage                                           │
└─────────────────────────────────────────────────────────────┘
```

## 📂 Directory Structure Explained

### `/src/app` - Next.js App Router

The app directory follows Next.js 14 conventions with file-based routing.

**Public Pages (Marketing Site)**

- `/` - Landing page (page.tsx)
- `/products` - Product showcase
- `/about` - Company information
- `/careers` - Job listings with filtering
- `/contact` - Contact form

**Authenticated Pages (Todo App)**

- `/todos` - Todo list with search, filter, pagination
- `/todos/new` - Create new todo
- `/todos/[id]` - Individual todo detail/edit
- `/profile` - User profile management

**Authentication Pages**

- `/login` - User login
- `/signup` - User registration
- `/reset-password` - Password reset flow

**API Routes**

- `/api/auth/[...nextauth]` - NextAuth handler
- `/api/auth/signup` - User registration endpoint
- `/api/auth/reset-password` - Password reset endpoints
- `/api/todos` - Todo CRUD operations
- `/api/users` - User management

### `/src/components` - React Components

**Shared Application Components**

- `AppHeader.tsx` - Navigation header for authenticated pages
  - Context-aware navigation
  - Sign out functionality
  - User display
- `LoadingSpinner.tsx` - Reusable loading indicator

  - Three sizes (sm, md, lg)
  - Used across all loading states

- `Providers.tsx` - Session provider wrapper
  - Wraps app with NextAuth SessionProvider

**Marketing Components** (`/marketing`)

- `Navbar.tsx` - Marketing site navigation
  - Mobile responsive menu
  - Request Demo and Login CTAs
- `Footer.tsx` - Marketing site footer
  - Multi-column layout
  - Company links and information

### `/src/entities` - TypeORM Entities

Database entity definitions with TypeORM decorators.

**User.ts**

```typescript
@Entity()
class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column({ default: "user" })
  role: string;

  @OneToMany(() => Todo, (todo) => todo.user)
  todos: Todo[];
}
```

**Todo.ts**

```typescript
@Entity()
class Todo {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column({ type: "text", nullable: true })
  description: string;

  @Column({ default: "pending" })
  status: string;

  @Column({ default: "medium" })
  priority: string;

  @Column({ type: "timestamp", nullable: true })
  dueDate: Date;

  @ManyToOne(() => User, (user) => user.todos)
  user: User;
}
```

### `/src/lib` - Utility Libraries

**Authentication (`/lib/auth`)**

- `auth-options.ts` - NextAuth configuration
  - Credential provider setup
  - Session strategy
  - Callbacks for JWT and session
- `password.ts` - Password utilities
  - bcrypt hashing
  - Password validation
- `session.ts` - Session helpers
  - Get current user
  - Require authentication

**Database (`/lib/db`)**

- `data-source.ts` - TypeORM DataSource configuration
  - Direct entity imports (Next.js compatible)
  - Migration setup
  - Connection pooling
- `seed.ts` - Database seeding script
  - Creates test users
  - Creates sample todos
- `/migrations` - Database migrations
  - Version-controlled schema changes
  - Reversible migrations

### `/src/types` - TypeScript Type Definitions

- `index.ts` - App-wide type definitions
  - API response types
  - Component prop types
- `next-auth.d.ts` - NextAuth type extensions
  - Custom user properties
  - Session type augmentation

## 🔄 Data Flow

### Authentication Flow

```
User Login Request
    │
    ▼
POST /api/auth/callback/credentials
    │
    ▼
NextAuth Credential Provider
    │
    ├─► Validate credentials (email/password)
    │
    ├─► Query User from database (TypeORM)
    │
    ├─► Verify password (bcrypt)
    │
    ▼
Generate JWT Token
    │
    ▼
Create Session
    │
    ▼
Return to Client (Set Cookie)
    │
    ▼
Redirect to /todos
```

### Todo CRUD Flow

**Create Todo**

```
Client Form Submit
    │
    ▼
POST /api/todos
    │
    ├─► Verify session (middleware)
    │
    ├─► Validate input (Zod schema)
    │
    ├─► Create Todo entity
    │
    ├─► Save to database (TypeORM)
    │
    ▼
Return created Todo
    │
    ▼
Client updates UI
```

**List Todos with Search/Filter**

```
Client navigates to /todos
    │
    ▼
GET /api/todos?search=...&status=...&priority=...
    │
    ├─► Verify session
    │
    ├─► Build query with filters (TypeORM QueryBuilder)
    │
    ├─► Apply pagination
    │
    ├─► Execute query
    │
    ▼
Return paginated results
    │
    ▼
Client renders with debounced search (500ms)
```

## 🔒 Security Architecture

### Authentication & Authorization

1. **Password Security**

   - Passwords hashed with bcrypt (10 rounds)
   - Never stored in plain text
   - Password reset via secure tokens (structure ready)

2. **Session Management**

   - JWT-based sessions
   - HttpOnly cookies
   - Secure flag in production
   - CSRF protection via NextAuth

3. **Route Protection**
   - Middleware protects authenticated routes
   - Session validation on every request
   - Role-based access control

### Input Validation

- All API inputs validated with Zod schemas
- TypeScript type checking at compile time
- TypeORM parameter binding prevents SQL injection

### Environment Variables

```
DATABASE_URL          # PostgreSQL connection (sensitive)
NEXTAUTH_SECRET       # Session encryption key (critical)
NEXTAUTH_URL          # App URL
GOOGLE_CLIENT_ID      # OAuth (optional)
GOOGLE_CLIENT_SECRET  # OAuth secret (optional)
```

## 🎨 UI/UX Architecture

### Design System

**Colors (Tailwind)**

- Primary: `primary-600` (blue)
- Success: `green-600`
- Warning: `yellow-600`
- Danger: `red-600`
- Neutral: `gray-*`

**Component Patterns**

- Cards with shadow and rounded corners
- Consistent spacing (4, 8, 16, 24, 32px)
- Hover states for interactive elements
- Loading states with spinner
- Error states with messages

### Responsive Design

- Mobile-first approach
- Breakpoints: sm, md, lg, xl, 2xl
- Mobile menu for marketing navbar
- Responsive tables and grids

## 🔄 State Management

### Server State

- Next.js Server Components for initial data
- API routes fetch fresh data
- TypeORM manages database state

### Client State

- React hooks (useState, useEffect)
- NextAuth session (useSession)
- Form state with controlled components
- Debounced search state (500ms delay)

### URL State

- Search parameters for filters
- Pagination state in URL
- Sort order in query params

## 🚀 Performance Optimizations

1. **Debounced Search**

   - 500ms delay before API call
   - Prevents excessive requests
   - Maintains user input state

2. **Server Components**

   - Reduced JavaScript bundle size
   - Faster initial page loads
   - SEO-friendly rendering

3. **Database Indexing**

   - Indexed user email for lookups
   - Indexed todo relationships
   - Query optimization with TypeORM

4. **Code Splitting**
   - Route-based splitting (Next.js default)
   - Dynamic imports where needed

## 🧪 Testing Strategy

### Development Testing

- Manual testing with seeded data
- TypeScript type checking
- ESLint for code quality

### Recommended Testing (Future Enhancement)

- Unit tests for utilities (Jest)
- Integration tests for API routes (Supertest)
- E2E tests for critical flows (Playwright)
- Component tests (React Testing Library)

## 📦 Deployment Architecture

### Build Process

```bash
npm run build
# Compiles TypeScript
# Optimizes bundles
# Generates static pages where possible
```

### Production Considerations

- Use production PostgreSQL (not Docker)
- Set NEXTAUTH_SECRET to secure random value
- Enable SSL for database connections
- Configure proper CORS settings
- Set up email service for password reset
- Enable OAuth providers (Google)
- Use environment-specific .env files

### Recommended Platforms

- **Vercel** - Zero-config Next.js hosting
- **Railway** - PostgreSQL hosting
- **AWS** - Full control deployment
- **DigitalOcean** - App Platform

## 🔧 Configuration Files

- `next.config.js` - Next.js configuration
- `tsconfig.json` - TypeScript configuration
- `tsconfig.typeorm.json` - TypeORM-specific TypeScript config
- `tailwind.config.ts` - Tailwind CSS configuration
- `postcss.config.js` - PostCSS configuration
- `docker-compose.yml` - Local PostgreSQL setup

## 📝 Best Practices Implemented

1. **TypeScript Everywhere** - Full type safety
2. **Server Components First** - Use client components only when needed
3. **Direct Imports for TypeORM** - Avoid glob patterns in Next.js
4. **Separation of Concerns** - Marketing vs App pages
5. **Reusable Components** - Shared header, spinner, providers
6. **Environment Variables** - No hardcoded secrets
7. **Database Migrations** - Version-controlled schema
8. **Input Validation** - Zod schemas for all inputs
9. **Error Handling** - Try-catch with meaningful messages
10. **Loading States** - Provide feedback to users

## 🔍 Debugging Tips

### Database Issues

```bash
# Check database connection
docker ps
docker logs nextjs-todo-postgres

# Reset database
docker-compose down -v
docker-compose up -d
npm run migration:run
npm run seed
```

### TypeORM Issues

- Use direct imports, not glob patterns
- Check entity decorators
- Verify relationship definitions
- Check migration files

### Authentication Issues

- Verify NEXTAUTH_SECRET is set
- Check session in browser DevTools
- Verify database has user records
- Check password hashing/validation

### Next.js Issues

- Clear `.next` directory: `rm -rf .next`
- Restart dev server
- Check for client/server component boundaries
- Verify "use client" directives

This architecture supports both rapid development and production scalability while maintaining code quality and security.

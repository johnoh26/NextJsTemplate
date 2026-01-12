# 📝 Next.js Todo App Template

> A production-ready, full-stack todo application with authentication, role-based access control, and comprehensive task management features.

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue?style=flat-square&logo=typescript)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-blue?style=flat-square&logo=postgresql)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=flat-square&logo=tailwind-css)

---

## 🚀 Quick Start (5 Minutes)

Get up and running in just a few commands:

```bash
# 1. Install dependencies
npm install

# 2. Start PostgreSQL database
docker-compose up -d

# 3. Run database migrations
npm run migration:run

# 4. Seed sample data (optional but recommended)
npm run seed

# 5. Start development server
npm run dev
```

**That's it!** 🎉 Open [http://localhost:3000](http://localhost:3000) and start using the app.

### 🔑 Test Credentials (After Seeding)

| Role  | Email             | Password |
| ----- | ----------------- | -------- |
| Admin | admin@example.com | admin123 |
| User  | john@example.com  | user123  |
| User  | jane@example.com  | user123  |

---

## 📋 Table of Contents

- [What's Inside](#-whats-inside)
- [Prerequisites](#-prerequisites)
- [Detailed Setup Guide](#-detailed-setup-guide)
- [Project Structure](#-project-structure)
- [Features Deep Dive](#-features-deep-dive)
- [API Documentation](#-api-documentation)
- [Configuration](#-configuration)
- [Troubleshooting](#-troubleshooting)
- [Deployment](#-deployment)

---

## ✨ What's Inside

### Authentication & Security 🔐

- ✅ Email/password authentication with secure bcrypt hashing
- ✅ Google SSO integration (ready to configure)
- ✅ Password reset flow (email service structure ready)
- ✅ Role-based access control (Admin & User roles)
- ✅ Protected routes and API endpoints
- ✅ CSRF protection and SQL injection prevention

### Todo Management 📋

- ✅ Full CRUD operations for todos
- ✅ Real-time search by title
- ✅ Advanced filtering (status, priority)
- ✅ Multi-criteria sorting (date, status, priority)
- ✅ Flexible pagination (10, 20, or 50 items per page)
- ✅ Rich todo data (title, description, status, priority, due date)

### User Experience 👥

- ✅ Responsive design with Tailwind CSS
- ✅ User profile management
- ✅ Intuitive UI with loading states and error handling
- ✅ Toast notifications for actions

### Developer Experience 🛠️

- ✅ TypeScript for type safety
- ✅ TypeORM for database management
- ✅ Database migrations and seeding
- ✅ API route validation with Zod
- ✅ Comprehensive error handling

---

## 📦 Prerequisites

Before you begin, make sure you have these installed:

| Tool               | Version | Check Installation         |
| ------------------ | ------- | -------------------------- |
| **Node.js**        | 18.0+   | `node --version`           |
| **npm**            | 9.0+    | `npm --version`            |
| **Docker**         | 20.0+   | `docker --version`         |
| **Docker Compose** | 2.0+    | `docker-compose --version` |

### Installing Prerequisites

<details>
<summary><strong>📥 macOS</strong></summary>

```bash
# Install Homebrew if not already installed
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Node.js
brew install node

# Install Docker Desktop
brew install --cask docker
```

</details>

<details>
<summary><strong>📥 Windows</strong></summary>

1. Download and install [Node.js](https://nodejs.org/)
2. Download and install [Docker Desktop](https://www.docker.com/products/docker-desktop)
</details>

<details>
<summary><strong>📥 Linux (Ubuntu/Debian)</strong></summary>

```bash
# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Install Docker Compose
sudo apt-get install docker-compose-plugin
```

</details>

---

## 🎯 Detailed Setup Guide

### Step 1: Clone the Repository

```bash
git clone <your-repo-url>
cd NextJsTemplate
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install all required packages including Next.js, TypeORM, NextAuth.js, and more.

### Step 3: Environment Configuration

The project includes a pre-configured `.env.local` file for development. For production, you'll need to update these values:

```bash
# The .env.local file is already created with development defaults
# For production, update these values:
```

**Important Environment Variables:**

| Variable               | Description                   | Required    |
| ---------------------- | ----------------------------- | ----------- |
| `DATABASE_URL`         | PostgreSQL connection string  | ✅ Yes      |
| `NEXTAUTH_SECRET`      | Secret for session encryption | ✅ Yes      |
| `NEXTAUTH_URL`         | Your app's URL                | ✅ Yes      |
| `GOOGLE_CLIENT_ID`     | Google OAuth Client ID        | ❌ Optional |
| `GOOGLE_CLIENT_SECRET` | Google OAuth Secret           | ❌ Optional |

<details>
<summary><strong>🔐 Generate a secure NEXTAUTH_SECRET</strong></summary>

```bash
# On Linux/macOS
openssl rand -base64 32

# On Windows (PowerShell)
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }))
```

</details>

### Step 4: Start PostgreSQL Database

```bash
docker-compose up -d
```

**What this does:**

- Starts a PostgreSQL 16 container
- Creates a database named `tododb`
- Exposes port 5432 for connections
- Persists data in a Docker volume

**Verify it's running:**

```bash
docker ps
# You should see a container named "nextjs-todo-postgres"
```

### Step 5: Run Database Migrations

```bash
npm run migration:run
```

This creates all necessary database tables (users, todos) with proper indexes and constraints.

### Step 6: Seed Sample Data (Recommended)

```bash
npm run seed
```

**What gets created:**

- 1 Admin user
- 2 Regular users
- 8 Sample todos with various statuses and priorities

### Step 7: Start Development Server

```bash
npm run dev
```

The app will be available at **http://localhost:3000**

---

## 📁 Project Structure

```
NextJsTemplate/
├── 📂 src/
│   ├── 📂 app/                      # Next.js App Router
│   │   ├── 📂 api/                  # API Routes
│   │   │   ├── 📂 auth/            # Authentication endpoints
│   │   │   │   ├── [...nextauth]/  # NextAuth.js handler
│   │   │   │   ├── signup/         # User registration
│   │   │   │   └── reset-password/ # Password reset
│   │   │   ├── 📂 todos/           # Todo CRUD operations
│   │   │   └── 📂 users/           # User management
│   │   ├── 📂 login/               # Login page
│   │   ├── 📂 signup/              # Registration page
│   │   ├── 📂 reset-password/      # Password reset page
│   │   ├── 📂 todos/               # Todo list & detail pages
│   │   ├── 📂 profile/             # User profile page
│   │   ├── layout.tsx              # Root layout with providers
│   │   ├── page.tsx                # Home page (redirects to /todos)
│   │   └── globals.css             # Global styles
│   ├── 📂 components/              # React components
│   │   └── Providers.tsx           # Session provider wrapper
│   ├── 📂 entities/                # TypeORM database entities
│   │   ├── User.ts                 # User entity with relations
│   │   └── Todo.ts                 # Todo entity with relations
│   ├── 📂 lib/                     # Utility libraries
│   │   ├── 📂 auth/               # Authentication utilities
│   │   │   ├── auth-options.ts    # NextAuth configuration
│   │   │   ├── password.ts        # Password hashing utilities
│   │   │   └── session.ts         # Session helpers
│   │   └── 📂 db/                 # Database configuration
│   │       ├── data-source.ts     # TypeORM data source
│   │       ├── seed.ts            # Database seeding script
│   │       └── 📂 migrations/     # Database migrations
│   ├── 📂 types/                   # TypeScript definitions
│   │   ├── index.ts               # App-wide types
│   │   └── next-auth.d.ts         # NextAuth type extensions
│   └── middleware.ts               # Route protection middleware
├── 📄 .env.local                   # Environment variables (local)
├── 📄 .env.example                 # Environment template
├── 📄 docker-compose.yml           # PostgreSQL container config
├── 📄 package.json                 # Dependencies and scripts
├── 📄 tsconfig.json                # TypeScript configuration
├── 📄 next.config.js               # Next.js configuration
├── 📄 tailwind.config.ts           # Tailwind CSS configuration
└── 📄 README.md                    # You are here!
```

---

## 🎨 Features Deep Dive

### Authentication Flow

1. **Sign Up**: New users register with email and password
2. **Email Verification**: Structure ready for email confirmation
3. **Login**: Email/password or Google SSO
4. **Password Reset**: Request reset link via email (structure ready)
5. **Session Management**: JWT-based sessions with NextAuth.js

### Todo Management Features

**Create Todos**

- Set title, description, priority, status, and due date
- Automatic timestamp tracking

**View & Search**

- List view with pagination
- Search by title (real-time)
- Filter by status and priority
- Sort by multiple criteria

**Update Todos**

- Edit all todo properties
- Status tracking (pending → in-progress → completed)
- Priority levels (low, medium, high)

**Delete Todos**

- Confirmation dialog before deletion
- Cascade deletion (removes user's todos when user is deleted)

### Role-Based Access Control

| Feature            | User Role | Admin Role |
| ------------------ | --------- | ---------- |
| View own todos     | ✅        | ✅         |
| Create todos       | ✅        | ✅         |
| Edit own todos     | ✅        | ✅         |
| Delete own todos   | ✅        | ✅         |
| View all todos     | ❌        | ✅         |
| List all users     | ❌        | ✅         |
| Manage own profile | ✅        | ✅         |

---

## 🔌 Tech Stack

### Core Framework

- **[Next.js 14](https://nextjs.org/)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[React 18](https://react.dev/)** - UI library

### Database & ORM

- **[PostgreSQL 16](https://www.postgresql.org/)** - Relational database
- **[TypeORM 0.3](https://typeorm.io/)** - TypeScript ORM
- **[pg](https://node-postgres.com/)** - PostgreSQL client

### Authentication

- **[NextAuth.js v4](https://next-auth.js.org/)** - Authentication for Next.js
- **[bcryptjs](https://github.com/dcodeIO/bcrypt.js)** - Password hashing

### Styling & UI

- **[Tailwind CSS 3.4](https://tailwindcss.com/)** - Utility-first CSS
- **[date-fns](https://date-fns.org/)** - Date formatting

### Validation

- **[Zod](https://zod.dev/)** - TypeScript-first schema validation

---

## 📡 API Documentation

All API endpoints are RESTful and return JSON responses.

All API endpoints are RESTful and return JSON responses.

### Authentication Endpoints

**Register a new user**

```http
POST /api/auth/signup
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}
```

**Login with credentials**

```http
POST /api/auth/signin
```

Uses NextAuth.js - handled through the UI

**Request password reset**

```http
POST /api/auth/reset-password
Content-Type: application/json

{
  "email": "user@example.com"
}
```

**Confirm password reset**

```http
POST /api/auth/reset-password/confirm
Content-Type: application/json

{
  "token": "reset-token",
  "password": "newpassword123"
}
```

### Todo Endpoints

**Get all todos** (with filtering, sorting, pagination)

```http
GET /api/todos?page=1&limit=10&status=pending&priority=high&search=task&sortBy=createdAt&sortOrder=DESC
```

Query Parameters:

- `page` (number): Page number (default: 1)
- `limit` (10|20|50): Items per page (default: 10)
- `status` (pending|in-progress|completed): Filter by status
- `priority` (low|medium|high): Filter by priority
- `search` (string): Search by title
- `sortBy` (createdAt|dueDate|priority|status): Sort field
- `sortOrder` (ASC|DESC): Sort direction

**Create a new todo**

```http
POST /api/todos
Content-Type: application/json

{
  "title": "Complete project",
  "description": "Finish the documentation",
  "status": "pending",
  "priority": "high",
  "dueDate": "2026-01-15T00:00:00Z"
}
```

**Get a specific todo**

```http
GET /api/todos/{id}
```

**Update a todo**

```http
PATCH /api/todos/{id}
Content-Type: application/json

{
  "status": "completed",
  "priority": "medium"
}
```

**Delete a todo**

```http
DELETE /api/todos/{id}
```

### User Endpoints

**Get current user profile**

```http
GET /api/users/profile
```

**Update current user profile**

```http
PATCH /api/users/profile
Content-Type: application/json

{
  "name": "Jane Doe",
  "email": "jane@example.com"
}
```

**List all users** (Admin only)

```http
GET /api/users?page=1&limit=10
```

---

## ⚙️ Configuration

### Database Configuration

The database is configured via the `DATABASE_URL` environment variable:

```bash
# Format
DATABASE_URL=postgresql://username:password@host:port/database

# Development (default)
DATABASE_URL=postgresql://todouser:todopassword@localhost:5432/tododb
```

### Google OAuth Setup (Optional)

<details>
<summary><strong>📱 Step-by-step Google OAuth configuration</strong></summary>

1. **Go to Google Cloud Console**

   - Visit [Google Cloud Console](https://console.cloud.google.com/)
   - Sign in with your Google account

2. **Create or Select a Project**

   - Click "Select a Project" → "New Project"
   - Enter project name → Click "Create"

3. **Enable Google+ API**

   - Go to "APIs & Services" → "Library"
   - Search for "Google+ API"
   - Click "Enable"

4. **Create OAuth 2.0 Credentials**

   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "OAuth client ID"
   - Select "Web application"
   - Add authorized redirect URI:
     ```
     http://localhost:3000/api/auth/callback/google
     ```
   - For production, add:
     ```
     https://yourdomain.com/api/auth/callback/google
     ```

5. **Copy Credentials to .env.local**

   ```bash
   GOOGLE_CLIENT_ID=your-client-id-here
   GOOGLE_CLIENT_SECRET=your-client-secret-here
   ```

6. **Restart Development Server**
   ```bash
   npm run dev
   ```

</details>

### Email Service Setup (Optional)

The password reset feature is structured and ready. To enable it:

<details>
<summary><strong>📧 Configure email service</strong></summary>

1. **Choose an email provider:**

   - [SendGrid](https://sendgrid.com/) (Recommended)
   - [Resend](https://resend.com/)
   - [AWS SES](https://aws.amazon.com/ses/)
   - [NodeMailer](https://nodemailer.com/) with SMTP

2. **Update environment variables:**

   ```bash
   EMAIL_SERVER_HOST=smtp.sendgrid.net
   EMAIL_SERVER_PORT=587
   EMAIL_SERVER_USER=apikey
   EMAIL_SERVER_PASSWORD=your-sendgrid-api-key
   EMAIL_FROM=noreply@yourdomain.com
   ```

3. **Implement email sending:**
   Update `src/app/api/auth/reset-password/route.ts` to send actual emails

</details>

---

## 🔧 Available Scripts

| Script                       | Description                                       |
| ---------------------------- | ------------------------------------------------- |
| `npm run dev`                | Start development server on http://localhost:3000 |
| `npm run build`              | Build production application                      |
| `npm start`                  | Start production server                           |
| `npm run lint`               | Run ESLint to check code quality                  |
| `npm run migration:generate` | Generate a new database migration                 |
| `npm run migration:run`      | Apply pending migrations                          |
| `npm run migration:revert`   | Rollback last migration                           |
| `npm run seed`               | Populate database with sample data                |

### Database Management Commands

**Create a new migration:**

```bash
npm run migration:generate -- src/lib/db/migrations/MigrationName
```

**View migration status:**

```bash
npm run typeorm -- migration:show -d src/lib/db/data-source.ts
```

**Reset database (⚠️ Destroys all data):**

```bash
docker-compose down -v
docker-compose up -d
npm run migration:run
npm run seed
```

---

## 🐛 Troubleshooting

### Common Issues and Solutions

<details>
<summary><strong>❌ Database connection failed</strong></summary>

**Problem:** Can't connect to PostgreSQL

**Solutions:**

1. Check if Docker is running:

   ```bash
   docker ps
   ```

2. Restart the database:

   ```bash
   docker-compose restart
   ```

3. Check logs:

   ```bash
   docker-compose logs postgres
   ```

4. Verify DATABASE_URL in `.env.local`:
   ```bash
   cat .env.local | grep DATABASE_URL
   ```

</details>

<details>
<summary><strong>❌ NextAuth authentication not working</strong></summary>

**Problem:** Login fails or session not persisting

**Solutions:**

1. Ensure `NEXTAUTH_SECRET` is set in `.env.local`

2. Generate a new secret:

   ```bash
   openssl rand -base64 32
   ```

3. Clear browser cookies and try again

4. Check `NEXTAUTH_URL` matches your current URL:
   ```bash
   NEXTAUTH_URL=http://localhost:3000
   ```

</details>

<details>
<summary><strong>❌ Migrations won't run</strong></summary>

**Problem:** `npm run migration:run` fails

**Solutions:**

1. Ensure PostgreSQL is running:

   ```bash
   docker ps
   ```

2. Check if migrations table exists:

   ```bash
   docker exec -it nextjs-todo-postgres psql -U todouser -d tododb -c "\dt"
   ```

3. Revert and re-run:

   ```bash
   npm run migration:revert
   npm run migration:run
   ```

4. If all else fails, reset the database:
   ```bash
   docker-compose down -v
   docker-compose up -d
   npm run migration:run
   ```

</details>

<details>
<summary><strong>❌ Port 3000 already in use</strong></summary>

**Problem:** Development server won't start

**Solutions:**

1. Find and kill the process:

   ```bash
   # On macOS/Linux
   lsof -ti:3000 | xargs kill -9

   # On Windows (PowerShell)
   Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess | Stop-Process
   ```

2. Or use a different port:
   ```bash
   PORT=3001 npm run dev
   ```

</details>

<details>
<summary><strong>❌ TypeScript errors</strong></summary>

**Problem:** Type checking fails

**Solutions:**

1. Delete and reinstall dependencies:

   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

2. Rebuild TypeScript:
   ```bash
   npm run build
   ```

</details>

### Still Having Issues?

1. Check the [GitHub Issues](https://github.com/yourrepo/issues)
2. Review the logs: `docker-compose logs`
3. Ensure you're using the correct Node.js version: `node --version`
4. Try starting fresh:
   ```bash
   docker-compose down -v
   rm -rf node_modules .next
   npm install
   docker-compose up -d
   npm run migration:run
   npm run seed
   npm run dev
   ```

---

## 🚢 Deployment

### Deploy to Vercel (Recommended)

Vercel is the easiest way to deploy Next.js applications.

1. **Push to GitHub**

   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/your-repo.git
   git push -u origin main
   ```

2. **Import to Vercel**

   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository

3. **Configure Environment Variables**
   Add these in Vercel project settings:

   ```bash
   DATABASE_URL=your-production-database-url
   NEXTAUTH_SECRET=your-production-secret
   NEXTAUTH_URL=https://your-domain.vercel.app
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   ```

4. **Set up PostgreSQL**

   - Use [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres)
   - Or [Neon](https://neon.tech/)
   - Or [Supabase](https://supabase.com/)
   - Update `DATABASE_URL` with the connection string

5. **Run Migrations**
   After deployment, run migrations manually or set up a deployment script

6. **Deploy**
   - Click "Deploy"
   - Your app will be live at `https://your-project.vercel.app`

### Deploy to AWS, DigitalOcean, or VPS

<details>
<summary><strong>☁️ Manual deployment guide</strong></summary>

1. **Set up PostgreSQL database**

   - Use AWS RDS, DigitalOcean Managed Database, or self-hosted PostgreSQL
   - Note the connection string

2. **Configure environment variables**
   Create `.env.production`:

   ```bash
   DATABASE_URL=your-production-db-url
   NEXTAUTH_SECRET=your-production-secret
   NEXTAUTH_URL=https://yourdomain.com
   NODE_ENV=production
   ```

3. **Build the application**

   ```bash
   npm run build
   ```

4. **Start the application**

   ```bash
   npm start
   ```

5. **Use a process manager** (recommended)

   ```bash
   # Install PM2
   npm install -g pm2

   # Start with PM2
   pm2 start npm --name "todo-app" -- start

   # Set up auto-restart on reboot
   pm2 startup
   pm2 save
   ```

6. **Set up reverse proxy** (Nginx example)

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

</details>

---

## 🔒 Security Best Practices

### ✅ Built-in Security Features

- **Password Security**: Passwords are hashed with bcrypt (10 rounds)
- **Environment Variables**: Sensitive data never committed to Git
- **CSRF Protection**: Automatic via NextAuth.js
- **SQL Injection Prevention**: TypeORM parameterized queries
- **Input Validation**: Zod schema validation on all inputs
- **Session Security**: HTTP-only cookies, secure in production
- **Authorization Checks**: Every API route validates user permissions
- **XSS Protection**: React automatically escapes output

### 🛡️ Additional Security Recommendations

1. **Use strong secrets in production**

   ```bash
   # Generate secure NEXTAUTH_SECRET
   openssl rand -base64 32
   ```

2. **Enable HTTPS** in production (automatic on Vercel)

3. **Set secure cookie options** in NextAuth config

4. **Implement rate limiting** for API routes

5. **Regular dependency updates**

   ```bash
   npm audit
   npm update
   ```

6. **Use environment-specific configs**
   - Different secrets for dev/staging/production
   - Separate databases for each environment

---

## 📚 Additional Resources

### Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [NextAuth.js Guide](https://next-auth.js.org/getting-started/introduction)
- [TypeORM Documentation](https://typeorm.io/)
- [Tailwind CSS](https://tailwindcss.com/docs)

### Learning Resources

- [Next.js Learn Course](https://nextjs.org/learn)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [PostgreSQL Tutorial](https://www.postgresql.org/docs/tutorial/)

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 💬 Support

- **Issues**: [GitHub Issues](https://github.com/yourrepo/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourrepo/discussions)
- **Email**: support@yourdomain.com

---

<div align="center">

**Built with ❤️ using Next.js, TypeScript, and PostgreSQL**

⭐ Star this repo if you find it helpful!

[Report Bug](https://github.com/yourrepo/issues) · [Request Feature](https://github.com/yourrepo/issues)

</div>

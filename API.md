# API Documentation

This document provides detailed information about all API endpoints in the application.

## Base URL

```
Development: http://localhost:3000
Production: <your-production-url>
```

## Authentication

Most API endpoints require authentication. The application uses NextAuth.js with session-based authentication.

### Headers

For authenticated requests, cookies are automatically handled by the browser. No manual token management is required.

## Response Format

All API responses follow this general format:

### Success Response

```json
{
  "data": { ... },
  "message": "Success message"
}
```

### Error Response

```json
{
  "error": "Error message",
  "details": "Additional error details (optional)"
}
```

## Endpoints

### Authentication Endpoints

#### Register New User

Create a new user account.

**Endpoint:** `POST /api/auth/signup`

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "securePassword123",
  "name": "John Doe"
}
```

**Validation Rules:**

- `email`: Valid email format, unique in database
- `password`: Minimum 6 characters
- `name`: Minimum 2 characters

**Success Response (201):**

```json
{
  "message": "User created successfully"
}
```

**Error Responses:**

- `400` - Invalid input or validation error
- `409` - Email already exists

**Example:**

```bash
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "newuser@example.com",
    "password": "password123",
    "name": "New User"
  }'
```

---

#### Login

Login handled by NextAuth.js

**Endpoint:** `POST /api/auth/callback/credentials`

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Note:** Use the NextAuth `signIn` function instead of calling this directly:

```typescript
import { signIn } from "next-auth/react";

await signIn("credentials", {
  email: "user@example.com",
  password: "password123",
  redirect: true,
  callbackUrl: "/todos",
});
```

---

#### Request Password Reset

Request a password reset email.

**Endpoint:** `POST /api/auth/reset-password`

**Request Body:**

```json
{
  "email": "user@example.com"
}
```

**Success Response (200):**

```json
{
  "message": "If an account exists with this email, a reset link has been sent"
}
```

**Note:** Email service integration required. Currently returns success message but doesn't send email.

---

#### Confirm Password Reset

Reset password using a token.

**Endpoint:** `POST /api/auth/reset-password/confirm`

**Request Body:**

```json
{
  "token": "reset-token-from-email",
  "password": "newSecurePassword123"
}
```

**Success Response (200):**

```json
{
  "message": "Password reset successfully"
}
```

**Error Responses:**

- `400` - Invalid or expired token
- `400` - Invalid password

---

### Todo Endpoints

All todo endpoints require authentication.

#### Get All Todos

Retrieve todos for the authenticated user with optional filtering, sorting, and pagination.

**Endpoint:** `GET /api/todos`

**Query Parameters:**

| Parameter   | Type   | Description                                              | Default     |
| ----------- | ------ | -------------------------------------------------------- | ----------- |
| `search`    | string | Search by title (case-insensitive)                       | -           |
| `status`    | string | Filter by status: `pending`, `in-progress`, `completed`  | -           |
| `priority`  | string | Filter by priority: `low`, `medium`, `high`              | -           |
| `sortBy`    | string | Sort field: `createdAt`, `dueDate`, `priority`, `status` | `createdAt` |
| `sortOrder` | string | Sort order: `asc`, `desc`                                | `desc`      |
| `page`      | number | Page number (1-indexed)                                  | `1`         |
| `limit`     | number | Items per page: `10`, `20`, `50`                         | `10`        |

**Success Response (200):**

```json
{
  "todos": [
    {
      "id": "uuid-here",
      "title": "Complete project documentation",
      "description": "Write comprehensive API docs",
      "status": "in-progress",
      "priority": "high",
      "dueDate": "2024-12-31T23:59:59.000Z",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-15T12:00:00.000Z",
      "user": {
        "id": "user-uuid",
        "name": "John Doe",
        "email": "john@example.com"
      }
    }
  ],
  "total": 42,
  "page": 1,
  "totalPages": 5,
  "limit": 10
}
```

**Error Responses:**

- `401` - Unauthorized (not logged in)
- `400` - Invalid query parameters

**Example:**

```bash
curl http://localhost:3000/api/todos?search=documentation&status=in-progress&priority=high&page=1&limit=10
```

---

#### Get Single Todo

Retrieve a specific todo by ID.

**Endpoint:** `GET /api/todos/[id]`

**URL Parameters:**

- `id` - Todo UUID

**Success Response (200):**

```json
{
  "id": "uuid-here",
  "title": "Complete project documentation",
  "description": "Write comprehensive API docs",
  "status": "in-progress",
  "priority": "high",
  "dueDate": "2024-12-31T23:59:59.000Z",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-15T12:00:00.000Z",
  "user": {
    "id": "user-uuid",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

**Error Responses:**

- `401` - Unauthorized
- `404` - Todo not found
- `403` - Forbidden (user doesn't own this todo)

**Example:**

```bash
curl http://localhost:3000/api/todos/123e4567-e89b-12d3-a456-426614174000
```

---

#### Create Todo

Create a new todo for the authenticated user.

**Endpoint:** `POST /api/todos`

**Request Body:**

```json
{
  "title": "New task",
  "description": "Task description (optional)",
  "status": "pending",
  "priority": "medium",
  "dueDate": "2024-12-31T23:59:59.000Z"
}
```

**Validation Rules:**

- `title`: Required, 1-200 characters
- `description`: Optional, max 1000 characters
- `status`: Optional, one of: `pending`, `in-progress`, `completed` (default: `pending`)
- `priority`: Optional, one of: `low`, `medium`, `high` (default: `medium`)
- `dueDate`: Optional, valid ISO 8601 date string

**Success Response (201):**

```json
{
  "id": "newly-created-uuid",
  "title": "New task",
  "description": "Task description",
  "status": "pending",
  "priority": "medium",
  "dueDate": "2024-12-31T23:59:59.000Z",
  "createdAt": "2024-01-15T12:00:00.000Z",
  "updatedAt": "2024-01-15T12:00:00.000Z"
}
```

**Error Responses:**

- `401` - Unauthorized
- `400` - Validation error

**Example:**

```bash
curl -X POST http://localhost:3000/api/todos \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Review pull requests",
    "description": "Check and review all pending PRs",
    "status": "pending",
    "priority": "high",
    "dueDate": "2024-01-20T17:00:00.000Z"
  }'
```

---

#### Update Todo

Update an existing todo.

**Endpoint:** `PUT /api/todos/[id]`

**URL Parameters:**

- `id` - Todo UUID

**Request Body:**

```json
{
  "title": "Updated task title",
  "description": "Updated description",
  "status": "completed",
  "priority": "low",
  "dueDate": "2024-12-31T23:59:59.000Z"
}
```

**Validation Rules:**
Same as Create Todo endpoint.

**Success Response (200):**

```json
{
  "id": "todo-uuid",
  "title": "Updated task title",
  "description": "Updated description",
  "status": "completed",
  "priority": "low",
  "dueDate": "2024-12-31T23:59:59.000Z",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-15T12:30:00.000Z"
}
```

**Error Responses:**

- `401` - Unauthorized
- `404` - Todo not found
- `403` - Forbidden (user doesn't own this todo)
- `400` - Validation error

**Example:**

```bash
curl -X PUT http://localhost:3000/api/todos/123e4567-e89b-12d3-a456-426614174000 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated title",
    "status": "completed"
  }'
```

---

#### Delete Todo

Delete a todo.

**Endpoint:** `DELETE /api/todos/[id]`

**URL Parameters:**

- `id` - Todo UUID

**Success Response (200):**

```json
{
  "message": "Todo deleted successfully"
}
```

**Error Responses:**

- `401` - Unauthorized
- `404` - Todo not found
- `403` - Forbidden (user doesn't own this todo)

**Example:**

```bash
curl -X DELETE http://localhost:3000/api/todos/123e4567-e89b-12d3-a456-426614174000
```

---

### User Endpoints

#### Get User Profile

Get the authenticated user's profile.

**Endpoint:** `GET /api/users/profile`

**Success Response (200):**

```json
{
  "id": "user-uuid",
  "email": "user@example.com",
  "name": "John Doe",
  "role": "user",
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

**Error Responses:**

- `401` - Unauthorized

**Example:**

```bash
curl http://localhost:3000/api/users/profile
```

---

#### Update User Profile

Update the authenticated user's profile.

**Endpoint:** `PUT /api/users/profile`

**Request Body:**

```json
{
  "name": "Updated Name",
  "email": "newemail@example.com"
}
```

**Validation Rules:**

- `name`: Optional, minimum 2 characters
- `email`: Optional, valid email format, must be unique

**Success Response (200):**

```json
{
  "id": "user-uuid",
  "email": "newemail@example.com",
  "name": "Updated Name",
  "role": "user",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-15T12:00:00.000Z"
}
```

**Error Responses:**

- `401` - Unauthorized
- `400` - Validation error
- `409` - Email already in use

---

#### Get All Users (Admin Only)

Get a list of all users.

**Endpoint:** `GET /api/users`

**Authorization:** Requires admin role

**Success Response (200):**

```json
{
  "users": [
    {
      "id": "user-uuid-1",
      "email": "user1@example.com",
      "name": "User One",
      "role": "user",
      "createdAt": "2024-01-01T00:00:00.000Z"
    },
    {
      "id": "user-uuid-2",
      "email": "admin@example.com",
      "name": "Admin User",
      "role": "admin",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

**Error Responses:**

- `401` - Unauthorized
- `403` - Forbidden (not an admin)

---

## Error Codes

| Code  | Description                          |
| ----- | ------------------------------------ |
| `200` | Success                              |
| `201` | Created                              |
| `400` | Bad Request - Invalid input          |
| `401` | Unauthorized - Not authenticated     |
| `403` | Forbidden - Insufficient permissions |
| `404` | Not Found - Resource doesn't exist   |
| `409` | Conflict - Resource already exists   |
| `500` | Internal Server Error                |

## Rate Limiting

Currently, no rate limiting is implemented. Consider adding rate limiting for production deployments.

## Pagination

All list endpoints support pagination with these parameters:

- `page`: Page number (1-indexed)
- `limit`: Items per page (10, 20, or 50)

Response includes:

```json
{
  "data": [...],
  "total": 100,
  "page": 1,
  "totalPages": 10,
  "limit": 10
}
```

## Filtering and Sorting

### Todo Endpoints

**Filters:**

- `search`: Text search on title
- `status`: Exact match
- `priority`: Exact match

**Sort:**

- `sortBy`: Field to sort by
- `sortOrder`: `asc` or `desc`

## Testing the API

### Using cURL

```bash
# Register
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123","name":"Test User"}'

# Get todos (requires session cookie)
curl http://localhost:3000/api/todos \
  --cookie "next-auth.session-token=your-session-token"
```

### Using Postman

1. Import this API documentation
2. Set base URL to `http://localhost:3000`
3. Use Postman's cookie manager for authentication

### Using JavaScript/TypeScript

```typescript
// Register
const response = await fetch("/api/auth/signup", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    email: "user@example.com",
    password: "password123",
    name: "User Name",
  }),
});

// Get todos (authenticated)
const todos = await fetch("/api/todos?status=pending&limit=20");
const data = await todos.json();
```

## WebSocket Support

Currently not implemented. All communication is via HTTP REST API.

## API Versioning

Current version: v1 (implicit)
No versioning scheme implemented yet. Consider adding `/api/v1/` prefix for future versions.

## Security Considerations

1. **HTTPS**: Use HTTPS in production
2. **CORS**: Configure CORS for production domains
3. **Input Validation**: All inputs are validated with Zod
4. **SQL Injection**: Protected by TypeORM parameter binding
5. **XSS**: React automatically escapes output
6. **CSRF**: Protected by NextAuth.js

## Support

For issues or questions about the API:

1. Check this documentation
2. Review the source code in `/src/app/api`
3. Open an issue on the repository

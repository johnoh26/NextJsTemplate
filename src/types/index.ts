export enum UserRole {
  USER = "user",
  ADMIN = "admin",
}

export enum TodoStatus {
  PENDING = "pending",
  IN_PROGRESS = "in-progress",
  COMPLETED = "completed",
}

export enum TodoPriority {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
}

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface TodoFilters {
  status?: TodoStatus;
  priority?: TodoPriority;
  search?: string;
  sortBy?: "createdAt" | "dueDate" | "priority" | "status";
  sortOrder?: "ASC" | "DESC";
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

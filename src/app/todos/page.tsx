"use client";

import AppHeader from "@/components/AppHeader";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Todo } from "@/entities/Todo";
import { PaginatedResponse, TodoPriority, TodoStatus } from "@/types";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function TodosPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [todos, setTodos] = useState<PaginatedResponse<Todo> | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState("");

  // Filters
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [priorityFilter, setPriorityFilter] = useState<string>("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState<"ASC" | "DESC">("DESC");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchInput);
      setPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchInput]);

  useEffect(() => {
    if (status === "authenticated") {
      fetchTodos();
    }
  }, [
    status,
    search,
    statusFilter,
    priorityFilter,
    sortBy,
    sortOrder,
    page,
    limit,
  ]);

  const fetchTodos = async () => {
    try {
      setIsLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        sortBy,
        sortOrder,
      });

      if (search) params.append("search", search);
      if (statusFilter) params.append("status", statusFilter);
      if (priorityFilter) params.append("priority", priorityFilter);

      const response = await fetch(`/api/todos?${params}`);

      if (!response.ok) {
        throw new Error("Failed to fetch todos");
      }

      const data = await response.json();
      setTodos(data);
    } catch (err) {
      setError("Failed to load todos");
    } finally {
      setIsLoading(false);
      setInitialLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this todo?")) {
      return;
    }

    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchTodos();
      } else {
        alert("Failed to delete todo");
      }
    } catch (err) {
      alert("An error occurred");
    }
  };

  const getStatusColor = (status: TodoStatus) => {
    switch (status) {
      case TodoStatus.COMPLETED:
        return "bg-green-100 text-green-800";
      case TodoStatus.IN_PROGRESS:
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: TodoPriority) => {
    switch (priority) {
      case TodoPriority.HIGH:
        return "bg-red-100 text-red-800";
      case TodoPriority.MEDIUM:
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (status === "loading" || initialLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <LoadingSpinner size="lg" />
        <p className="text-lg text-gray-600">Loading your todos...</p>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AppHeader />

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">My Todos</h2>
            <Link
              href="/todos/new"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Create Todo
            </Link>
          </div>

          {/* Filters */}
          <div className="bg-white shadow rounded-lg p-4 mb-6 relative">
            {isLoading && (
              <div className="absolute top-2 right-2">
                <LoadingSpinner size="sm" />
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Search
                </label>
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Search by title..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  value={statusFilter}
                  onChange={(e) => {
                    setStatusFilter(e.target.value);
                    setPage(1);
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="">All</option>
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Priority
                </label>
                <select
                  value={priorityFilter}
                  onChange={(e) => {
                    setPriorityFilter(e.target.value);
                    setPage(1);
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="">All</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="createdAt">Created Date</option>
                  <option value="dueDate">Due Date</option>
                  <option value="priority">Priority</option>
                  <option value="status">Status</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Order
                </label>
                <select
                  value={sortOrder}
                  onChange={(e) =>
                    setSortOrder(e.target.value as "ASC" | "DESC")
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="DESC">Descending</option>
                  <option value="ASC">Ascending</option>
                </select>
              </div>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 p-4 rounded-md mb-4">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          {/* Todos List */}
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            {todos && todos.data.length > 0 ? (
              <ul className="divide-y divide-gray-200">
                {todos.data.map((todo) => (
                  <li key={todo.id}>
                    <div className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <Link href={`/todos/${todo.id}`} className="block">
                            <div className="flex items-center justify-between">
                              <p className="text-lg font-medium text-primary-600 truncate">
                                {todo.title}
                              </p>
                              <div className="ml-2 flex-shrink-0 flex space-x-2">
                                <span
                                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                                    todo.status
                                  )}`}
                                >
                                  {todo.status}
                                </span>
                                <span
                                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getPriorityColor(
                                    todo.priority
                                  )}`}
                                >
                                  {todo.priority}
                                </span>
                              </div>
                            </div>
                            {todo.description && (
                              <p className="mt-1 text-sm text-gray-600 truncate">
                                {todo.description}
                              </p>
                            )}
                            <div className="mt-2 flex items-center text-sm text-gray-500">
                              {todo.dueDate && (
                                <span>
                                  Due:{" "}
                                  {format(
                                    new Date(todo.dueDate),
                                    "MMM dd, yyyy"
                                  )}
                                </span>
                              )}
                              <span className="ml-4">
                                Created:{" "}
                                {format(
                                  new Date(todo.createdAt),
                                  "MMM dd, yyyy"
                                )}
                              </span>
                            </div>
                          </Link>
                        </div>
                        <div className="ml-4">
                          <button
                            onClick={() => handleDelete(todo.id)}
                            className="text-red-600 hover:text-red-900 text-sm font-medium"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">No todos found</p>
                <Link
                  href="/todos/new"
                  className="mt-4 inline-block text-primary-600 hover:text-primary-500"
                >
                  Create your first todo
                </Link>
              </div>
            )}
          </div>

          {/* Pagination */}
          {todos && todos.pagination.totalPages > 1 && (
            <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 mt-4 rounded-lg shadow">
              <div className="flex-1 flex justify-between sm:hidden">
                <button
                  onClick={() => setPage(Math.max(1, page - 1))}
                  disabled={page === 1}
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                >
                  Previous
                </button>
                <button
                  onClick={() =>
                    setPage(Math.min(todos.pagination.totalPages, page + 1))
                  }
                  disabled={page === todos.pagination.totalPages}
                  className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing{" "}
                    <span className="font-medium">
                      {(page - 1) * limit + 1}
                    </span>{" "}
                    to{" "}
                    <span className="font-medium">
                      {Math.min(page * limit, todos.pagination.total)}
                    </span>{" "}
                    of{" "}
                    <span className="font-medium">
                      {todos.pagination.total}
                    </span>{" "}
                    results
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <select
                    value={limit}
                    onChange={(e) => {
                      setLimit(Number(e.target.value));
                      setPage(1);
                    }}
                    className="px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="10">10 per page</option>
                    <option value="20">20 per page</option>
                    <option value="50">50 per page</option>
                  </select>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                    <button
                      onClick={() => setPage(Math.max(1, page - 1))}
                      disabled={page === 1}
                      className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() =>
                        setPage(Math.min(todos.pagination.totalPages, page + 1))
                      }
                      disabled={page === todos.pagination.totalPages}
                      className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                    >
                      Next
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

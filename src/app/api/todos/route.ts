import { Todo } from "@/entities/Todo";
import { requireAuth } from "@/lib/auth/session";
import { getDataSource } from "@/lib/db/data-source";
import { PaginatedResponse, UserRole } from "@/types";
import { NextRequest, NextResponse } from "next/server";
import { FindOptionsWhere, ILike } from "typeorm";
import { z } from "zod";

const createTodoSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional().nullable(),
  status: z.enum(["pending", "in-progress", "completed"]).optional(),
  priority: z.enum(["low", "medium", "high"]).optional(),
  dueDate: z.string().optional().nullable(),
});

// GET /api/todos - List todos with filters, sorting, and pagination
export async function GET(req: NextRequest) {
  try {
    const user = await requireAuth();
    const searchParams = req.nextUrl.searchParams;

    // Pagination
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");

    // Validate limit
    if (![10, 20, 50].includes(limit)) {
      return NextResponse.json(
        { error: "Limit must be 10, 20, or 50" },
        { status: 400 }
      );
    }

    // Filters
    const status = searchParams.get("status");
    const priority = searchParams.get("priority");
    const search = searchParams.get("search");
    const sortBy = searchParams.get("sortBy") || "createdAt";
    const sortOrder = (
      searchParams.get("sortOrder") || "DESC"
    ).toUpperCase() as "ASC" | "DESC";

    const dataSource = await getDataSource();
    const todoRepository = dataSource.getRepository(Todo);

    // Build where clause
    const where: FindOptionsWhere<Todo> = {};

    // Users can only see their own todos, admins can see all
    if (user.role !== UserRole.ADMIN) {
      where.userId = user.id;
    }

    if (status) {
      where.status = status as any;
    }

    if (priority) {
      where.priority = priority as any;
    }

    if (search) {
      where.title = ILike(`%${search}%`);
    }

    // Get total count
    const total = await todoRepository.count({ where });

    // Get paginated results
    const todos = await todoRepository.find({
      where,
      order: { [sortBy]: sortOrder },
      skip: (page - 1) * limit,
      take: limit,
      relations: ["user"],
    });

    const response: PaginatedResponse<Todo> = {
      data: todos,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Get todos error:", error);

    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.json(
      { error: "Failed to fetch todos" },
      { status: 500 }
    );
  }
}

// POST /api/todos - Create a new todo
export async function POST(req: NextRequest) {
  try {
    const user = await requireAuth();
    const body = await req.json();
    const validatedData = createTodoSchema.parse(body);

    const dataSource = await getDataSource();
    const todoRepository = dataSource.getRepository(Todo);

    const todo = todoRepository.create({
      ...validatedData,
      userId: user.id,
      dueDate: validatedData.dueDate ? new Date(validatedData.dueDate) : null,
    });

    await todoRepository.save(todo);

    return NextResponse.json(todo, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }

    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.error("Create todo error:", error);
    return NextResponse.json(
      { error: "Failed to create todo" },
      { status: 500 }
    );
  }
}

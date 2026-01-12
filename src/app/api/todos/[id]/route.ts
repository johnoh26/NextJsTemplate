import { Todo } from "@/entities/Todo";
import { requireAuth } from "@/lib/auth/session";
import { getDataSource } from "@/lib/db/data-source";
import { UserRole } from "@/types";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const updateTodoSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().optional().nullable(),
  status: z.enum(["pending", "in-progress", "completed"]).optional(),
  priority: z.enum(["low", "medium", "high"]).optional(),
  dueDate: z.string().optional().nullable(),
});

// GET /api/todos/[id] - Get a specific todo
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await requireAuth();
    const dataSource = await getDataSource();
    const todoRepository = dataSource.getRepository(Todo);

    const todo = await todoRepository.findOne({
      where: { id: params.id },
      relations: ["user"],
    });

    if (!todo) {
      return NextResponse.json({ error: "Todo not found" }, { status: 404 });
    }

    // Check authorization - users can only see their own todos
    if (user.role !== UserRole.ADMIN && todo.userId !== user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    return NextResponse.json(todo);
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.error("Get todo error:", error);
    return NextResponse.json(
      { error: "Failed to fetch todo" },
      { status: 500 }
    );
  }
}

// PATCH /api/todos/[id] - Update a todo
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await requireAuth();
    const body = await req.json();
    const validatedData = updateTodoSchema.parse(body);

    const dataSource = await getDataSource();
    const todoRepository = dataSource.getRepository(Todo);

    const todo = await todoRepository.findOne({
      where: { id: params.id },
    });

    if (!todo) {
      return NextResponse.json({ error: "Todo not found" }, { status: 404 });
    }

    // Check authorization
    if (user.role !== UserRole.ADMIN && todo.userId !== user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Update fields
    Object.assign(todo, validatedData);

    if (validatedData.dueDate !== undefined) {
      todo.dueDate = validatedData.dueDate
        ? new Date(validatedData.dueDate)
        : null;
    }

    await todoRepository.save(todo);

    return NextResponse.json(todo);
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

    console.error("Update todo error:", error);
    return NextResponse.json(
      { error: "Failed to update todo" },
      { status: 500 }
    );
  }
}

// DELETE /api/todos/[id] - Delete a todo
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await requireAuth();
    const dataSource = await getDataSource();
    const todoRepository = dataSource.getRepository(Todo);

    const todo = await todoRepository.findOne({
      where: { id: params.id },
    });

    if (!todo) {
      return NextResponse.json({ error: "Todo not found" }, { status: 404 });
    }

    // Check authorization
    if (user.role !== UserRole.ADMIN && todo.userId !== user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await todoRepository.remove(todo);

    return NextResponse.json({ message: "Todo deleted successfully" });
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.error("Delete todo error:", error);
    return NextResponse.json(
      { error: "Failed to delete todo" },
      { status: 500 }
    );
  }
}

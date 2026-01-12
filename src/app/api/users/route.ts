import { User } from "@/entities/User";
import { requireAdmin } from "@/lib/auth/session";
import { getDataSource } from "@/lib/db/data-source";
import { NextRequest, NextResponse } from "next/server";

// GET /api/users - List all users (Admin only)
export async function GET(req: NextRequest) {
  try {
    await requireAdmin();

    const searchParams = req.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");

    if (![10, 20, 50].includes(limit)) {
      return NextResponse.json(
        { error: "Limit must be 10, 20, or 50" },
        { status: 400 }
      );
    }

    const dataSource = await getDataSource();
    const userRepository = dataSource.getRepository(User);

    const [users, total] = await userRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: "DESC" },
      select: [
        "id",
        "email",
        "name",
        "role",
        "image",
        "emailVerified",
        "createdAt",
        "updatedAt",
      ],
    });

    return NextResponse.json({
      data: users,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "Unauthorized") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      if (error.message.includes("Forbidden")) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      }
    }

    console.error("Get users error:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}

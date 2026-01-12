import { User } from "@/entities/User";
import { requireAuth } from "@/lib/auth/session";
import { getDataSource } from "@/lib/db/data-source";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const updateProfileSchema = z.object({
  name: z.string().min(2).optional(),
  email: z.string().email().optional(),
});

// GET /api/users/profile - Get current user profile
export async function GET(req: NextRequest) {
  try {
    const user = await requireAuth();
    const dataSource = await getDataSource();
    const userRepository = dataSource.getRepository(User);

    const profile = await userRepository.findOne({
      where: { id: user.id },
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

    if (!profile) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(profile);
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.error("Get profile error:", error);
    return NextResponse.json(
      { error: "Failed to fetch profile" },
      { status: 500 }
    );
  }
}

// PATCH /api/users/profile - Update current user profile
export async function PATCH(req: NextRequest) {
  try {
    const currentUser = await requireAuth();
    const body = await req.json();
    const validatedData = updateProfileSchema.parse(body);

    const dataSource = await getDataSource();
    const userRepository = dataSource.getRepository(User);

    const user = await userRepository.findOne({
      where: { id: currentUser.id },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Check if email is being changed and if it's already taken
    if (validatedData.email && validatedData.email !== user.email) {
      const existingUser = await userRepository.findOne({
        where: { email: validatedData.email },
      });

      if (existingUser) {
        return NextResponse.json(
          { error: "Email already in use" },
          { status: 400 }
        );
      }
    }

    // Update fields
    if (validatedData.name) user.name = validatedData.name;
    if (validatedData.email) user.email = validatedData.email;

    await userRepository.save(user);

    return NextResponse.json({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      image: user.image,
    });
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

    console.error("Update profile error:", error);
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 }
    );
  }
}

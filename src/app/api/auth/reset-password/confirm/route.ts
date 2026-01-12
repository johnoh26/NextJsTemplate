import { User } from "@/entities/User";
import { hashPassword } from "@/lib/auth/password";
import { getDataSource } from "@/lib/db/data-source";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const resetConfirmSchema = z.object({
  token: z.string(),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { token, password } = resetConfirmSchema.parse(body);

    const dataSource = await getDataSource();
    const userRepository = dataSource.getRepository(User);

    const user = await userRepository.findOne({ where: { resetToken: token } });

    if (!user || !user.resetTokenExpiry) {
      return NextResponse.json(
        { error: "Invalid or expired reset token" },
        { status: 400 }
      );
    }

    // Check if token is expired
    if (new Date() > user.resetTokenExpiry) {
      return NextResponse.json(
        { error: "Reset token has expired" },
        { status: 400 }
      );
    }

    // Update password
    const hashedPassword = await hashPassword(password);
    user.password = hashedPassword;
    user.resetToken = null;
    user.resetTokenExpiry = null;
    await userRepository.save(user);

    return NextResponse.json({
      message: "Password reset successfully",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }

    console.error("Reset confirm error:", error);
    return NextResponse.json(
      { error: "Failed to reset password" },
      { status: 500 }
    );
  }
}

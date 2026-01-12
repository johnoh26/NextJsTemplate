import { User } from "@/entities/User";
import { generateResetToken } from "@/lib/auth/password";
import { getDataSource } from "@/lib/db/data-source";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const resetRequestSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email } = resetRequestSchema.parse(body);

    const dataSource = await getDataSource();
    const userRepository = dataSource.getRepository(User);

    const user = await userRepository.findOne({ where: { email } });

    // Always return success to prevent email enumeration
    if (!user) {
      return NextResponse.json({
        message: "If an account exists, a password reset email will be sent",
      });
    }

    // Generate reset token
    const resetToken = generateResetToken();
    const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour

    user.resetToken = resetToken;
    user.resetTokenExpiry = resetTokenExpiry;
    await userRepository.save(user);

    // TODO: Send email with reset link
    // In production, integrate with your email service:
    // const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password?token=${resetToken}`;
    // await sendResetEmail(user.email, resetUrl);

    console.log("Password reset requested for:", email);
    console.log("Reset token:", resetToken);

    return NextResponse.json({
      message: "If an account exists, a password reset email will be sent",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }

    console.error("Reset password error:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}

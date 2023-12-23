import { NextRequest, NextResponse } from "next/server";
import vine, { errors } from "@vinejs/vine";
import { CustomErrorReporter } from "@/validator/customErrorReporter";
import { loginSchema } from "@/validator/authSchema";
import { User } from "@prisma/client";
import bcrypt from "bcryptjs";
import prisma from "@/database/prisma.config";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    vine.errorReporter = () => new CustomErrorReporter();
    const validator = vine.compile(loginSchema);
    const validatedData = await validator.validate(data);

    // * Check if email exists in db
    const user: User | null = await prisma.user.findUnique({
      where: {
        email: validatedData.email,
      },
    });

    if (!user) {
      return NextResponse.json({
        status: 400,
        errors: {
          email: "This email does not exist.",
        },
      });
    }

    const isPasswordMatch: boolean = bcrypt.compareSync(
      validatedData.password,
      user.password!
    );
    if (isPasswordMatch) {
      return NextResponse.json({
        status: 200,
        message: "User logged in successfully",
      });
    }

    return NextResponse.json({
      status: 400,
      errors: {
        email: "Invalid credentials",
      },
    });
  } catch (error) {
    if (error instanceof errors.E_VALIDATION_ERROR) {
      return NextResponse.json({ status: 400, errors: error.messages });
    }
  }
}

import { NextRequest, NextResponse } from "next/server";
import vine, { errors } from "@vinejs/vine";
import { registerSchema } from "@/validator/authSchema";
import { CustomErrorReporter } from "@/validator/customErrorReporter";
import bcrypt from "bcryptjs";
import prisma from "@/database/prisma.config";
import { User } from "@prisma/client";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    vine.errorReporter = () => new CustomErrorReporter();
    const validator = vine.compile(registerSchema);
    const validatedData = await validator.validate(data);

    // * Check if email already exists
    const user: User | null = await prisma.user.findUnique({
      where: {
        email: validatedData.email,
      },
    });

    if (user) {
      return NextResponse.json({
        status: 400,
        errors: { email: "Email already exists!" },
      });
    }

    // * Generate salt to hash the password
    const salt = bcrypt.genSaltSync(10);
    validatedData.password = bcrypt.hashSync(validatedData.password, salt);

    // * To create new user
    await prisma.user.create({
      data: validatedData,
    });

    return NextResponse.json({
      status: 200,
      message: "Account created successfully!",
    });
  } catch (error) {
    if (error instanceof errors.E_VALIDATION_ERROR) {
      return NextResponse.json({ status: 400, errors: error.messages });
    }
  }
}

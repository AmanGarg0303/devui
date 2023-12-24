import { NextRequest, NextResponse } from "next/server";
import prisma from "@/database/prisma.config";

export async function GET(request: NextRequest) {
  try {
    const posts = await prisma.post.findMany({
      orderBy: {
        created_at: "desc",
      },
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
    });

    return NextResponse.json({ status: 200, data: posts });
  } catch (error) {
    return NextResponse.json({ status: 400, error: "Something went wrong." });
  }
}

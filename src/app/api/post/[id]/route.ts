import { NextRequest, NextResponse } from "next/server";
import prisma from "@/database/prisma.config";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: Number(params.id),
      },
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
    });

    return NextResponse.json({ status: 200, data: post });
  } catch (error) {
    return NextResponse.json({ status: 400, error: "Something went wrong!" });
  }
}

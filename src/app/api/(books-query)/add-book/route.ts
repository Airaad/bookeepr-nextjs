import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../(authentication-route)/auth/[...nextauth]/options";

const BookSchema = z.object({
  title: z.string(),
  author: z.string(),
  content: z.string(),
  rating: z.number(),
  year: z.number().optional(),
  coverId: z.number().optional(),
  bookKey: z.string(),
});

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await req.json();
    const validatedData = BookSchema.safeParse(data);

    if (!validatedData.success) {
      return NextResponse.json(
        { message: "Validation failed", errors: validatedData.error },
        { status: 400 }
      );
    }
    const { ...bookData } = validatedData.data;

    const existingUserId = session.user.id;
    const validUser = await prisma.user.findUnique({
      where: { id: existingUserId },
      select: { id: true },
    });

    if (!validUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const res = await prisma.book.create({
      data: {
        ...bookData,
        userId: validUser.id,
      },
    });
    return NextResponse.json(
      { message: "Book added successfully", success: true },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong", success: false },
      { status: 500 }
    );
  }
}

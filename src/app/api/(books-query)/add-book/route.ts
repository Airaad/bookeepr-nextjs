import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { bookKey, coverId, title, author, content, rating, userId, year } =
      await req.json();
    if (
      !title ||
      !author ||
      !content ||
      !rating ||
      !userId ||
      !bookKey
    ) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const id = userId;
    const validUser = await prisma.user.findUnique({ where: { id } });

    if (!validUser) {
      return NextResponse.json({ message: "No user found" }, { status: 400 });
    }

    const res = await prisma.book.create({
      data: {
        title,
        author,
        content,
        rating,
        userId: validUser.id,
        bookKey,
        coverId,
        year,
      },
    });
    return NextResponse.json(
      { message: "Book added successfully", success: true },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

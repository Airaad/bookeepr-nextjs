import { authOptions } from "@/app/api/(authentication-route)/auth/[...nextauth]/options";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: { bookId: string } }
) {
  const { content, rating } = await req.json();
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;
  const { bookId } = await params;

  try {
    const validUser = await prisma.user.findUnique({ where: { id: userId } });
    if (!validUser) {
      return NextResponse.json({ error: "No user found" }, { status: 404 });
    }
    const updatedItem = await prisma.book.update({
      where: { id: bookId, userId: userId },
      data: {
        content,
        rating,
      },
    });
    if (!updatedItem) {
      return NextResponse.json(
        { message: "Invalid book Id", success: false },
        { status: 403 }
      );
    }
    return NextResponse.json(
      { message: "Updated successfully", success: true },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

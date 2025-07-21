import { authOptions } from "@/app/api/(authentication-route)/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: Promise<{ bookId: string }>;
  }
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { bookId } = await params;
    const userId = session.user.id;
    const book = await prisma.book.findUnique({
      where: { id: bookId, userId: userId },
    });
    if (!book) {
      return NextResponse.json({ message: "Invalid Book Id" }, { status: 403 });
    }
    return NextResponse.json({ book });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to fetch book detail" },
      { status: 500 }
    );
  }
}

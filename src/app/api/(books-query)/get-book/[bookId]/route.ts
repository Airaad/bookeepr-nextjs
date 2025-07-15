import { authOptions } from "@/app/api/(authentication)/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET({ params }: { params: { bookId: string } }) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const id = parseInt(params.bookId);

  try {
    const book = await prisma.book.findUnique({ where: { id } });
    return NextResponse.json({ book });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch book detail" },
      { status: 500 }
    );
  }
}

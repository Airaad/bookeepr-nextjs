import { authOptions } from "../../(authentication-route)/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;

  try {
    const books = await prisma.book.findMany({
      where: { userId },
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json({ books });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to fetch books" },
      { status: 500 }
    );
  }
}

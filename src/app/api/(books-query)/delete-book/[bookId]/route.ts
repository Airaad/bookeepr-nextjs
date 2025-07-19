import { authOptions } from "@/app/api/(authentication-route)/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function DELETE(
  req: Request,
  { params }: { params: { bookId: string } }
) {
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
    await prisma.book.delete({ where: { id: bookId, userId: userId } });
    return NextResponse.json(
      { message: "Deleted successfully", success: true },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

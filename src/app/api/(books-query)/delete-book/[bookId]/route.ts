import { authOptions } from "@/app/api/(authentication-route)/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function DELETE({ params }: { params: { bookId: string } }) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const bookId = params.bookId;
  try {
    await prisma.book.delete({ where: { id: bookId } });
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

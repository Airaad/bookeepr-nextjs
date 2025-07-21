import { authOptions } from "@/app/api/(authentication-route)/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function DELETE(
  req: NextRequest,
  {
    params,
  }: {
    params: Promise<{ bookId: string }>;
  }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  try {
    const { bookId } = await params;
    const existingUserId = session.user.id;

    const validUser = await prisma.user.findUnique({
      where: { id: existingUserId },
      select: { id: true },
    });
    if (!validUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    const deletedBook = await prisma.book.delete({
      where: { id: bookId, userId: validUser.id },
    });
    if (!deletedBook) {
      return NextResponse.json(
        { message: "Invalid book Id", success: false },
        { status: 403 }
      );
    }
    return NextResponse.json(
      { message: "Deleted successfully", success: true },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

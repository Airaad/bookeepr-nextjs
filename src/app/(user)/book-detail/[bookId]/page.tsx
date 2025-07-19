import BookDetail from "@/components/BookDetail";
import React from "react";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/(authentication-route)/auth/[...nextauth]/options";
import { redirect } from "next/navigation";

async function fetchBookDetails(bookId: string, userId: string) {
  try {
    const result = await prisma.book.findUnique({
      where: { id: bookId, userId: userId },
    });
    if (!result) {
      console.log("No book found for the given user");
      return;
    }
    return result;
  } catch (error) {
    console.log(error);
  }
}

export async function AboutBook({ params }: { params: { bookId: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/signin");
  }
  const { bookId } = await params;
  const book = await fetchBookDetails(bookId, session.user.id);

  if (!book) {
    return (
      <div className="pt-20 bg-[#FAF7F0] min-h-screen">
        <h1 className="text-center text-red-600">Invalid book ID.</h1>
      </div>
    );
  }

  return (
    <div className="pt-20 bg-[#FAF7F0] min-h-screen">
      {/* @ts-ignore */}
      <BookDetail books={book} />
    </div>
  );
}

export default AboutBook;

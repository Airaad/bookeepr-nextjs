import { authOptions } from "@/app/api/(authentication-route)/auth/[...nextauth]/options";
import BookForm from "@/components/BookForm";
import UpdateForm from "@/components/UpdateForm";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

async function fetchBookDetails(bookId: string, userId: string) {
  try {
    const result = await prisma.book.findUnique({
      where: { id: bookId, userId: userId },
    });
    if (!result) {
      console.log("No book found");
      return;
    }
    return result;
  } catch (error) {
    console.log(error);
  }
}

async function UpdateBook({ params }: { params: Promise<{ bookId: string }> }) {
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
      <UpdateForm book={book} />
    </div>
  );
}

export default UpdateBook;

import { authOptions } from "@/app/api/(authentication-route)/auth/[...nextauth]/options";
import MyLibrary from "@/components/MyLibrary";
import UserBooksGrid from "@/components/UserBooksGrid";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

async function fetchBooks(id: string) {
  const userId = id;
  try {
    const books = await prisma.book.findMany({
      where: { userId },
      orderBy: {
        createdAt: "desc",
      },
    });
    return books;
  } catch (error) {
    console.log("something went wrong");
    return [];
  }
}

export default async function MyBooksPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/signin");
  }
  const books = await fetchBooks(session?.user.id);

  return (
    <div className="bg-[#faf7f0] min-h-screen py-20">
      <MyLibrary books={books} />
    </div>
  );
}

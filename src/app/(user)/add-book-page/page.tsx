import { authOptions } from "@/app/api/(authentication-route)/auth/[...nextauth]/options";
import BookSearch from "@/components/BookSearch";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

async function AddBookPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/signin");
  }
  return (
    <div className="py-20 bg-[#FAF7F0] min-h-screen">
      <BookSearch />;
    </div>
  );
}

export default AddBookPage;

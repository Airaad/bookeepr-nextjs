import React from "react";
import BookSearch from "./BookSearch";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/(authentication-route)/auth/[...nextauth]/options";
import { redirect } from "next/navigation";

async function AddBookComponent() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/signin");
  }
  return <BookSearch session={session} />;
}

export default AddBookComponent;

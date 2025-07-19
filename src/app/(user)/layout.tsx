import Navbar from "@/components/Navbar";
import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../api/(authentication-route)/auth/[...nextauth]/options";

async function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  return (
    <>
      <Navbar session={session} />
      {children}
    </>
  );
}

export default UserLayout;

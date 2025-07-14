import SignOutButton from "@/components/SignOutButton";
import { authOptions } from "./api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import React from "react";

async function page() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <div>No user is logged in</div>;
  }
  return (
  <div>
    {JSON.stringify(session)}
    <SignOutButton/>
  </div>);
}

export default page;

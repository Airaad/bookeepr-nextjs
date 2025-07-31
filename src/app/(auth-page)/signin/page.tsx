import { authOptions } from "@/app/api/(authentication-route)/auth/[...nextauth]/options";
import AuthPage from "@/components/AuthPage";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

async function Signin() {
  const session = await getServerSession(authOptions);
  if (session && session.user.id) {
    redirect("/my-books-page");
  }

  return <AuthPage isSignUp={false} redirectedUrl="/" />;
}

export default Signin;

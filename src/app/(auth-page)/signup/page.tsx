import AuthPage from "@/components/AuthPage";
import React from "react";

function page() {
  return <AuthPage isSignUp={true} redirectedUrl="/signin" />;
}

export default page;

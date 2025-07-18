import Navbar from "@/components/Navbar";
import React from "react";

function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}

export default UserLayout;

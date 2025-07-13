import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { passwordHash } from "@/lib/hash";
import { redirect } from "next/navigation";

export async function POST(req: NextRequest) {
  const { email, password, name } = await req.json();

  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (existingUser) {
    return NextResponse.json(
      { error: "User with this email already exists" },
      { status: 400 }
    );
  }

  const hashedPassword = await passwordHash(password);
  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });
  redirect("/signin");
}

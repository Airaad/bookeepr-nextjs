import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import type { NextAuthOptions } from "next-auth";
import { compareHash } from "@/lib/hash";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Email",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Enter your valid email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your password",
        },
      },

      async authorize(credentials) {
        const email = credentials?.email;
        const password = credentials?.password;

        try {
          const user = await prisma.user.findUnique({ where: { email } });
          //@ts-ignore
          if (!user || !(await compareHash(password, user.password))) {
            return null;
          }
          return {
            id: user.id.toString(),
            name: user.name,
            email: user.email,
          };
        } catch (error) {
          console.error("Something went wrong", error);
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/signin",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
};

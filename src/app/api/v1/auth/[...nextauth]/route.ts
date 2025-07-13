import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "email",
      credentials: {
        email: {
          label: "email",
          type: "email",
          placeholder: "Enter your valid email",
        },
        password: {
          label: "password",
          type: "password",
          placeholder: "Enter your password",
        },
      },
      async authorize(credentials) {
        return {
          id: "user1",
        };
      },
    }),
  ],
});

export { handler as GET, handler as POST };

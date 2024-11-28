import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { db } from "./db";
import Credentials from "next-auth/providers/credentials";
import { compareSync } from "bcrypt";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub,
    Google,
    Credentials({
      credentials: {
        email: { label: "User" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials;
        if (!email || !password) return null;
        const existingUser = await db.user.findUnique({
          where: {
            email: email as string,
          },
        });
        if (!existingUser || !existingUser.password) return null;
        // TODO: dont allow user in if not verified
        // if (!existingUser.emailVerified) return

        const passwordsMatch = compareSync(
          password as string,
          existingUser.password
        );

        if (!passwordsMatch) return null;

        return existingUser;
      },
    }),
  ],
  pages:{
    signIn:"/auth/sign-in"
  },
  adapter: PrismaAdapter(db),
});

import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { getUserByEmail } from "./db/user";
import { compareSync } from "bcryptjs";

export const authConfig = {
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
        const existingUser = await getUserByEmail(email as string);
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
} satisfies NextAuthConfig;

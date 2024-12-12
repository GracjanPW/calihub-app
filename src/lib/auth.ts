import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth from 'next-auth';
import { db } from './db';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { getUserByEmail } from './db/user';
import { compareSync } from 'bcryptjs';

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: '/auth/sign-in',
  },
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.sub as string;
      return session;
    },
    async jwt({ token }) {
      return token;
    },
  },
  session: {
    strategy: 'jwt',
  },
  adapter: PrismaAdapter(db),
  ...authConfig,
  providers:[
    ...authConfig.providers,
    Credentials({
      credentials: {
        email: { label: 'User' },
        password: { label: 'Password', type: 'password' },
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
  ]
});

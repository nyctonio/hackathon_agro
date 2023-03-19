import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import type { NextAuthOptions } from 'next-auth';
import prisma from '@/lib/prisma';
import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET as string;
const useSecureCookies = !!process.env.VERCEL_URL;

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 7 * 24 * 60 * 60, // 7 days,
  },
  jwt: {
    async encode({ secret, token }: any) {
      return jwt.sign(token, secret);
    },
    async decode({ secret, token }) {
      // @ts-ignore
      return jwt.verify(token, secret);
    },
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      return true;
    },
    async redirect({ url, baseUrl }) {
      return url;
    },
    async session({ session, user, token }) {
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      return token;
    },
  },
  pages: {},
  events: {},
  secret: process.env.JWT_SECRET,
});

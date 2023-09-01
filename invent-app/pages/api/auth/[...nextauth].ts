import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { prisma } from "@/config/prisma";
import { redirect } from "next/dist/server/api-utils";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,

  session: {
    strategy: "database",
    maxAge: 60 * 60 * 24 * 30, //30 days
    updateAge: 60 * 60 * 24, //30 days
  },

  useSecureCookies: process.env.NODE_ENV === "production", // no https in dev environment

  pages: {
    signIn: "/auth/signin",
  },

  callbacks: {
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
    async session({ session, token, user }) {
      if (session?.user) session.user.id = user.id;
      return session;
    },
  },

  events: {},

  debug: false,
};

export default NextAuth(authOptions);

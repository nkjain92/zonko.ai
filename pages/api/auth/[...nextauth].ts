// pages/api/auth/[...nextauth].ts
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET!,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ account, profile }) {
      if (!profile?.email) {
        return false; // Email is required for sign in
      }

      // Check if the user exists in the database
      const existingUser = await prisma.user.findUnique({
        where: { email: profile.email },
      });

      if (existingUser) {
        return true; // User already exists, sign-in allowed
      } else {
        // User doesn't exist yet, create a new user entry in the database
        await prisma.user.create({
          data: {
            email: profile.email,
            name: profile.name ?? null, // Use null as the fallback for optional fields
            image: profile.image ?? null, // Use null for the optional field `image`
          },
        });
        return true;
      }
    },
    async session({ session, token }) {
      if (!token.sub) {
        return session; // Handle 'sub' possibly being 'undefined'
      }

      // Fetch additional user details and include them in the session
      const user = await prisma.user.findUnique({
        where: { id: token.sub },
        select: {
          name: true,
          email: true,
          image: true,
        },
      });

      if (user) {
        session.user = {
          name: user.name ?? null,
          email: user.email ?? null,
          image: user.image ?? null,
        };
      }

      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    error: "/auth/error",
    verifyRequest: "/auth/verify-request",
  },
});

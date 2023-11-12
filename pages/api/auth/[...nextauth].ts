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
    async signIn({ user, account, profile, email, credentials }) {
      // Check if the user exists in the database
      const existingUser = await prisma.user.findUnique({
        where: {
          email: user.email,
        },
      });

      if (existingUser) {
        // User already exists, sign-in allowed
        return true;
      } else {
        // User doesn't exist yet, create a new user entry in the database
        await prisma.user.create({
          data: {
            email: user.email,
            name: user.name,
            image: user.image,
            // Other user fields if necessary
          },
        });
        return true;
      }
    },
    async session({ session, token }) {
      // Fetch additional user details and include them in the session
      const user = await prisma.user.findUnique({
        where: {
          id: token.sub, // `sub` is the user ID that is used in NextAuth.js JWT
        },
      });

      if (user) {
        session.user = {
          ...session.user,
          id: user.id,
          name: user.name,
          email: user.email,
        };
      }

      return session;
    },
    // ... other callbacks
  },
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    error: "/auth/error",
    verifyRequest: "/auth/verify-request",
    // ... other custom pages
  },
});

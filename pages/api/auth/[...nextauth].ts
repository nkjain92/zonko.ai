// pages/api/auth/[...nextauth].ts
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
// import { PrismaAdapter } from "@next-auth/prisma-adapter";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    // ...add more providers here
  ],
  // Specify the adapter to use for database operations.
  // The default is TypeORM, but we'll use the Prisma Adapter here.
  // adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET!,
  // callbacks: {
  //   signIn: async ({ user, account, profile }) => {
  //     // Here you can handle sign-in events and create or update user records
  //     if (account && profile) {
  //       // You may want to store additional information from the profile like avatar, email etc.
  //       try {
  //         // Check if the user exists in your database
  //         let existingUser = await prisma.user.findUnique({
  //           where: { email: profile.email },
  //         });

  //         if (!existingUser) {
  //           // Create a new user with the profile info
  //           existingUser = await prisma.user.create({
  //             data: {
  //               // name: profile.name!,
  //               email: profile.email ?? "default@email.com",
  //               // image: profile.image!,
  //             },
  //           });
  //         }

  //         // You can perform additional actions here if needed

  //         return true; // Sign-in successful
  //       } catch (error) {
  //         console.error("Error during signIn", error);
  //         return false; // Sign-in failed
  //       }
  //     }

  //     // For other providers, you'd have similar logic
  //     return true; // If we don't have additional checks, just return true
  //   },
  //   // jwt: async ({ token, user, account, profile, isNewUser }) => {
  //   //   // This is called whenever a JWT is created (i.e., at sign in)
  //   //   if (user) {
  //   //     token.uid = user.id;
  //   //   }
  //   //   return token;
  //   // },
  // },
  // // Enable debug messages in the console if you're having problems
  // debug: true,
  // Configure other custom settings if necessary
});

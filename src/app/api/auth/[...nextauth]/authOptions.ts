import { AuthOptions, ISODateString } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/database/prisma.config";
import { JWT } from "next-auth/jwt";

// * Custom Types
export interface CustomSession {
  user?: CustomUser;
  expires: ISODateString;
}
export interface CustomUser {
  id?: string | null;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

export const authOptions: AuthOptions = {
  pages: {
    signIn: "/login",
  },

  providers: [
    CredentialsProvider({
      name: "Sign in to DevUI",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const user = await prisma.user.findUnique({
          where: {
            email: credentials?.email,
          },
          select: {
            id: true,
            name: true,
            email: true,
          },
        });

        if (user) {
          return {
            id: user.id.toString(),
            name: user.name,
            email: user.email,
          };
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }: { session: CustomSession; token: JWT }) {
      session.user = token.user as CustomUser;
      return session;
    },
  },
};

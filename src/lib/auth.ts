import { AuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import client from "@/config/db";
import { ApiError } from "./error";
import bcrypt from "bcrypt";

export const AUTH_OPTIONS: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }
        const { email, password } = credentials;
        const exist = await client.user.findUnique({
          where: { email: email },
        });
        if (!exist || !exist.password) {
          throw new ApiError("User does not exist", 404);
        }
        const match = bcrypt.compareSync(password, exist.password);
        if (!match) {
          throw new ApiError("Incorrect password", 400);
        }
        return {
          id: exist.id,
          name: exist.name,
          email: exist.email,
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.NEXTAUTH_GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.NEXTAUTH_GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: { signIn: "/auth/signin" },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "google") {
        return true;
      }
      if (!user.name || !user.email) {
        return false;
      }
      const exist = await client.user.findUnique({
        where: { email: user.email },
      });
      if (!exist) {
        await client.user.create({
          data: {
            id: user.id,
            name: user.name,
            email: user.email,
            avatar: user.image,
            provider: "google",
          },
        });
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
};

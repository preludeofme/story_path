import NextAuth, { NextAuthOptions, Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "../../../../../prisma/prismaClient";

const GOOGLE_AUTHORIZATION_URL =
  "https://accounts.google.com/o/oauth2/v2/auth?" +
  new URLSearchParams({
    prompt: "consent",
    access_type: "offline",
    response_type: "code",
  });
async function refreshAccessToken(token: any) {
  try {
    const url =
      "https://oauth2.googleapis.com/token?" +
      new URLSearchParams({
        client_id: process.env.GOOGLE_ID!.toString(),
        client_secret: process.env.GOOGLE_SECRET!.toString(),
        grant_type: "refresh_token",
        refresh_token: token.refreshToken,
      });

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: "POST",
    });

    const refreshedTokens = await response.json();

    if (!response.ok) {
      throw refreshedTokens;
    }

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_at * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token
    };
  } catch (error) {
    console.error("Oups", error);

    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
      authorization: GOOGLE_AUTHORIZATION_URL,
    }),
  ],
  session: { strategy: "jwt" },
  theme: {
    colorScheme: "auto", // "auto" | "dark" | "light"
    brandColor: "#1976d2", // Hex color code
    logo: "/logo.png", // Absolute URL to image
  },
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    async jwt({ token, account, user }) {
      // Initial sign in
      if (account && user) {
        return {
          access_token: account.access_token,
          accessTokenExpires: Date.now() + account!.expires_at! * 1000,
          refreshToken: account.refresh_token,
          user,
        };
      }

      // Return previous token if the access token has not expired yet
      if (typeof token.accessTokenExpires === "number" && Date.now() < token.accessTokenExpires) {
        return token;
      }

      // Access token has expired, try to update it
      return refreshAccessToken(token);
    },

    async session({ session, token }: { session: Session; token: any }) {
      session.accessToken = token.access_token;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

// my-project/types/next-auth.d.ts

import NextAuth from "next-auth";
import { JWT, getToken } from "next-auth/jwt";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    accessToken?: string;
  }
}
declare module "next-auth/jwt" {
  interface JWT {
    access_token?: string;
  }
}

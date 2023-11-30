import { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { User } from "next-auth";
import { PrismaClient } from "@prisma/client";
import { getUserFromToken } from "./checkToken";

export async function authenticateAndAuthorize(req: NextRequest, prisma: PrismaClient, allowNewUser: boolean = false) {
  // Authentication
  const token = await getToken({ req });
  //console.log("token:", token);
  if (!token || !token.access_token) {
    return { status: 401, message: "Not Authenticated" };
  }
  //console.log("authenticate1:", token);
  const user: User | null = getUserFromToken(token);
  if (!user) {
    return { status: 400, message: "Invalid user data" };
  }
  //console.log("user:", user);
  // Authorization
  const userAcct = await findUserAccountById(user.id, prisma);
  //console.log("userAcct:", userAcct);
  if (!userAcct) {
    if (allowNewUser) {
      return { status: 200, userAcct: null, user: user }; // Return null for new users if allowed
    } else {
      return { status: 404, message: "User Account not found" };
    }
  }

  return { status: 200, userAcct };
}
function findUserAccountById(
  id: string,
  prisma: PrismaClient<import(".prisma/client").Prisma.PrismaClientOptions, never, import("@prisma/client/runtime/library").DefaultArgs>
) {
  console.log("test");
  return {};
}

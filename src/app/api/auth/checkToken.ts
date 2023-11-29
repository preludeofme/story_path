import { User } from "@prisma/client";
import prisma from "../../../../prisma/prismaClient";

export const findAccountByAccessToken = (accessToken: string) => {
  return prisma.account.findFirst({
    where: { access_token: accessToken },
    include: { user: true },
  });
};

export const getUserFromToken = (token: any): User | null => {
  if (token && typeof token.user === "object" && token.user !== null && "id" in token.user) {
    return token.user as User;
  }
  return null;
};

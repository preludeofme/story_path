import { NextResponse } from "next/server";
import prisma from "../../../../prisma/prismaClient";

export async function GET(req: Request) {
  const data = await req.json();
  const page: number = parseInt(data.page as string) || 0;
  const limit: number = 2; // Number of posts per page

  try {
    const posts = await prisma.post.findMany({
      skip: page * limit,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(
      {
        posts,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "There was an issue with saving the useraccount",
        error: error,
      },
      { status: 500 }
    );
  }
}

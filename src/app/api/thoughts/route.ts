import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/prismaClient";

export async function GET(req: Request) {
  const data = await req.json();
  const page: number = parseInt(data.page as string) || 0;
  const limit: number = 2; // Number of posts per page

  try {
    const posts = await prisma.thoughts.findMany({
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
export async function POST(req: NextRequest) {
  try {
    const { title, content } = await req.json();

    // Validate input
    if (!title || !content) {
      return NextResponse.json({ message: "Missing Fields" }, { status: 400 });
    }

    try {
      const newThought = await prisma.thoughts.create({
        data: {
          title,
          content,
        },
      });
      return NextResponse.json({ message: "Success", newThought }, { status: 404 });
    } catch (error) {
      console.log(error);
      return NextResponse.json({ message: "Server Error with uploading thought" }, { status: 500 });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Server Error with uploading thought" }, { status: 500 });
  }
}

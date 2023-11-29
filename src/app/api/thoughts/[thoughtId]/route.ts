// pages/api/conversations/[conversationId]/messages.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/prismaClient";

export async function GET(req: NextRequest, { params }: { params: { thoughtId: number } }) {
  try {
    const post = await prisma.post.findUnique({
      where: { id: Number(params.thoughtId) },
      include: {
        images: true, // Assuming you want to include related images
      },
    });

    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.json({ message: "Unable to fetch messages", error }, { status: 500 });
  }
}

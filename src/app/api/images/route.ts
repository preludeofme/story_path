import { put } from "@vercel/blob";
import { PageConfig } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);
    const filename = searchParams.get("filename") ?? "image.png";
    if (request.body && filename) {
      const blob = await put(filename, request.body, {
        access: "public",
      });
      return NextResponse.json(blob);
    }
    return NextResponse.json({ message: "nothing there" }, { status: 404 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Server Error with uploading Image" }, { status: 500 });
  }
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  const url: string | null = request.nextUrl.searchParams.get("url");

  if (!url) {
    return NextResponse.json({ message: "No url" }, { status: 500 });
  }

  try {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64Image = buffer.toString("base64");

    return new NextResponse(`data:${response.headers.get("content-type")};base64,${base64Image}`, { status: 200 });
  } catch (error) {
    console.log("IMG Error:", error);
    return NextResponse.json({ message: "Error processing the image request", error: error }, { status: 500 });
  }
}

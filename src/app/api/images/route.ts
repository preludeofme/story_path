import { put } from "@vercel/blob";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get("filename") ?? "image.png";

  if (request.body) {
    try {
      const blob = await put(filename, request.body, {
        access: "public",
      });
      return NextResponse.json(blob);
    } catch (error) {
      return NextResponse.json(
        {
          message: "There was an issue with saving the image",
          error: error,
        },
        { status: 500 }
      );
    }
  } else {
    return NextResponse.json(
      {
        message: "No image was included in request",
      },
      { status: 500 }
    );
  }
}
export async function GET(request: NextRequest): Promise<NextResponse> {
  const url: string | null = request.nextUrl.searchParams.get("url");

  if (!url) {
    return NextResponse.json({ message: "No url" }, { status: 500 });
  }

  try {
    const response = await fetch(url);
    const textResponse = await response.text();

    const base64Image = extractAndBase64EncodeImage(textResponse);
    if (base64Image) {
      return new NextResponse(`data:image/png;base64,${base64Image}`, { status: 200 });
    } else {
      return NextResponse.json({ message: "Could not process image" }, { status: 500 });
    }
  } catch (error) {
    console.log("IMG Error:", error);
    return NextResponse.json({ message: "Error processing the image request", error: error }, { status: 500 });
  }
}

function extractAndBase64EncodeImage(multipartString: string): string | null {
  const startIndicator = "Content-Type: image/png\r\n\r\n";
  const startIndex = multipartString.indexOf(startIndicator) + startIndicator.length;

  if (startIndex === -1 || startIndex < startIndicator.length) return null;

  // Assume the end of the image data is the end of the string
  const imageData = multipartString.substring(startIndex);
  const buffer = Buffer.from(imageData, "binary");
  return buffer.toString("base64");
}

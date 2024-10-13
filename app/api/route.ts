import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { image } = await req.json();
  console.log(image);
  if (image.length) {
    return NextResponse.json({ response: "Image Received" });
  } else {
    return NextResponse.json({ response: "Image  not Received" });
  }
}

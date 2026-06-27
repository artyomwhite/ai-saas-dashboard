import { NextRequest, NextResponse } from "next/server";
import { getDefaultUser, processChatMessage } from "@/lib/data";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as {
      chatId?: string | null;
      message?: string;
    };

    const message = body.message?.trim();
    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const user = await getDefaultUser();
    const result = await processChatMessage(user.id, body.chatId ?? null, message);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

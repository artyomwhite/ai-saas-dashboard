import { NextRequest, NextResponse } from "next/server";
import { getChatWithMessages, getDefaultUser } from "@/lib/data";

type RouteParams = { params: Promise<{ id: string }> };

export async function GET(_request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const user = await getDefaultUser();
    const chat = await getChatWithMessages(user.id, id);

    if (!chat) {
      return NextResponse.json({ error: "Chat not found" }, { status: 404 });
    }

    return NextResponse.json({
      chat: {
        id: chat.id,
        createdAt: chat.createdAt.toISOString(),
        messages: chat.messages.map((message) => ({
          id: message.id,
          role: message.role,
          content: message.content,
          createdAt: message.createdAt.toISOString(),
        })),
      },
    });
  } catch (error) {
    console.error("Chat detail API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

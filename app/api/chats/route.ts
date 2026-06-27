import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getDefaultUser } from "@/lib/user";

export async function GET() {
  try {
    const user = await getDefaultUser();

    const chats = await prisma.chat.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
      include: {
        messages: {
          orderBy: { createdAt: "asc" },
          take: 1,
        },
        _count: { select: { messages: true } },
      },
    });

    return NextResponse.json({
      chats: chats.map((chat) => ({
        id: chat.id,
        createdAt: chat.createdAt.toISOString(),
        messageCount: chat._count.messages,
        preview: chat.messages[0]?.content ?? "New conversation",
      })),
    });
  } catch (error) {
    console.error("Chats API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

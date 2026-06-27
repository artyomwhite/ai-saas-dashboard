import { NextRequest, NextResponse } from "next/server";
import { generateAIResponse } from "@/lib/ai";
import { prisma } from "@/lib/prisma";
import { getDefaultUser } from "@/lib/user";

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
    let chatId = body.chatId ?? null;

    if (chatId) {
      const existing = await prisma.chat.findFirst({
        where: { id: chatId, userId: user.id },
      });
      if (!existing) chatId = null;
    }

    if (!chatId) {
      const chat = await prisma.chat.create({
        data: { userId: user.id },
      });
      chatId = chat.id;
    }

    const history = await prisma.message.findMany({
      where: { chatId },
      orderBy: { createdAt: "asc" },
      take: 20,
    });

    await prisma.message.create({
      data: { chatId, role: "user", content: message },
    });

    const aiContent = await generateAIResponse(
      message,
      history.map((m) => ({
        role: m.role as "user" | "assistant",
        content: m.content,
      }))
    );

    await prisma.message.create({
      data: { chatId, role: "assistant", content: aiContent },
    });

    const messages = await prisma.message.findMany({
      where: { chatId },
      orderBy: { createdAt: "asc" },
    });

    return NextResponse.json({
      chatId,
      messages: messages.map((m) => ({
        id: m.id,
        role: m.role as "user" | "assistant",
        content: m.content,
      })),
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

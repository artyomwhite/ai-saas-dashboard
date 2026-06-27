import { generateAIResponse } from "@/lib/ai";
import {
  appendMockChatMessage,
  getMockChatById,
  getMockChatHistory,
  getMockChatHistoryForAi,
  getMockChatsApiPayload,
  getMockDashboardData,
  getMockUser,
} from "@/lib/mock-store";
import { getPrisma } from "@/lib/prisma";
import { isVercel } from "@/lib/runtime";

export type AppUser = {
  id: string;
  name: string;
  email: string;
};

export type ChatMessageRecord = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

export async function getDefaultUser(): Promise<AppUser> {
  if (isVercel()) {
    return getMockUser();
  }

  const prisma = getPrisma();
  return prisma.user.upsert({
    where: { email: "alex@example.com" },
    update: {},
    create: {
      name: "Alex Morgan",
      email: "alex@example.com",
    },
  });
}

export async function getDashboardData(userId: string) {
  if (isVercel()) {
    return getMockDashboardData();
  }

  const prisma = getPrisma();

  const [chatCount, messageCount, recentChats] = await Promise.all([
    prisma.chat.count({ where: { userId } }),
    prisma.message.count({ where: { chat: { userId } } }),
    prisma.chat.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: 5,
      include: {
        messages: { orderBy: { createdAt: "desc" }, take: 1 },
      },
    }),
  ]);

  return { chatCount, messageCount, recentChats };
}

export async function getChatHistory(userId: string) {
  if (isVercel()) {
    return getMockChatHistory();
  }

  const prisma = getPrisma();

  return prisma.chat.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    include: {
      messages: { orderBy: { createdAt: "asc" }, take: 1 },
      _count: { select: { messages: true } },
    },
  });
}

export async function getChatWithMessages(userId: string, chatId: string) {
  if (isVercel()) {
    return getMockChatById(chatId);
  }

  const prisma = getPrisma();

  const chat = await prisma.chat.findFirst({
    where: { id: chatId, userId },
    include: { messages: { orderBy: { createdAt: "asc" } } },
  });

  if (!chat) return null;

  return {
    id: chat.id,
    createdAt: chat.createdAt,
    messages: chat.messages.map((message) => ({
      id: message.id,
      role: message.role as "user" | "assistant",
      content: message.content,
      createdAt: message.createdAt,
    })),
  };
}

export async function listChatsForApi(userId: string) {
  if (isVercel()) {
    return getMockChatsApiPayload();
  }

  const prisma = getPrisma();
  const chats = await prisma.chat.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    include: {
      messages: { orderBy: { createdAt: "asc" }, take: 1 },
      _count: { select: { messages: true } },
    },
  });

  return chats.map((chat) => ({
    id: chat.id,
    createdAt: chat.createdAt.toISOString(),
    messageCount: chat._count.messages,
    preview: chat.messages[0]?.content ?? "New conversation",
  }));
}

export async function processChatMessage(
  userId: string,
  chatId: string | null,
  message: string
) {
  if (isVercel()) {
    const history = chatId
      ? getMockChatHistoryForAi(chatId).map((item) => ({
          role: item.role as "user" | "assistant",
          content: item.content,
        }))
      : [];

    const aiContent = await generateAIResponse(message, history);
    return appendMockChatMessage(chatId, message, aiContent);
  }

  const prisma = getPrisma();
  let activeChatId = chatId;

  if (activeChatId) {
    const existing = await prisma.chat.findFirst({
      where: { id: activeChatId, userId },
    });
    if (!existing) activeChatId = null;
  }

  if (!activeChatId) {
    const chat = await prisma.chat.create({ data: { userId } });
    activeChatId = chat.id;
  }

  const history = await prisma.message.findMany({
    where: { chatId: activeChatId },
    orderBy: { createdAt: "asc" },
    take: 20,
  });

  await prisma.message.create({
    data: { chatId: activeChatId, role: "user", content: message },
  });

  const aiContent = await generateAIResponse(
    message,
    history.map((item) => ({
      role: item.role as "user" | "assistant",
      content: item.content,
    }))
  );

  await prisma.message.create({
    data: { chatId: activeChatId, role: "assistant", content: aiContent },
  });

  const messages = await prisma.message.findMany({
    where: { chatId: activeChatId },
    orderBy: { createdAt: "asc" },
  });

  return {
    chatId: activeChatId,
    messages: messages.map((item) => ({
      id: item.id,
      role: item.role as "user" | "assistant",
      content: item.content,
    })),
  };
}

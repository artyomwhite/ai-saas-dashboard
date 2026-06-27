import Topbar from "@/components/Topbar";
import ChatWindow from "@/components/ChatWindow";
import { prisma } from "@/lib/prisma";
import { getDefaultUser } from "@/lib/user";

export const dynamic = "force-dynamic";

type ChatPageProps = {
  searchParams: Promise<{ id?: string }>;
};

export default async function ChatPage({ searchParams }: ChatPageProps) {
  const { id } = await searchParams;
  const user = await getDefaultUser();

  let initialMessages: { id: string; role: "user" | "assistant"; content: string }[] = [];
  let chatId: string | null = null;

  if (id) {
    const chat = await prisma.chat.findFirst({
      where: { id, userId: user.id },
      include: { messages: { orderBy: { createdAt: "asc" } } },
    });

    if (chat) {
      chatId = chat.id;
      initialMessages = chat.messages.map((m) => ({
        id: m.id,
        role: m.role as "user" | "assistant",
        content: m.content,
      }));
    }
  }

  return (
    <>
      <Topbar title="AI Chat" subtitle="Powered by Nexus AI" />
      <div className="flex-1 overflow-hidden">
        <ChatWindow chatId={chatId} initialMessages={initialMessages} />
      </div>
    </>
  );
}

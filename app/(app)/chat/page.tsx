import Topbar from "@/components/Topbar";
import ChatWindow from "@/components/ChatWindow";
import { getChatWithMessages, getDefaultUser } from "@/lib/data";

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
    const chat = await getChatWithMessages(user.id, id);

    if (chat) {
      chatId = chat.id;
      initialMessages = chat.messages.map((message) => ({
        id: message.id,
        role: message.role,
        content: message.content,
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

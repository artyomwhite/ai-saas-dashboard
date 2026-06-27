import Link from "next/link";
import Topbar from "@/components/Topbar";
import Button from "@/components/Button";
import { prisma } from "@/lib/prisma";
import { getDefaultUser } from "@/lib/user";

export const dynamic = "force-dynamic";

export default async function HistoryPage() {
  const user = await getDefaultUser();

  const chats = await prisma.chat.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
    include: {
      messages: { orderBy: { createdAt: "asc" }, take: 1 },
      _count: { select: { messages: true } },
    },
  });

  return (
    <>
      <Topbar title="Chat History" subtitle={`${chats.length} conversations`} />
      <main className="flex-1 overflow-y-auto p-6">
        {chats.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-zinc-800/80 bg-zinc-900/50">
              <svg className="h-8 w-8 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold tracking-tight text-zinc-100">
              No chat history yet
            </h3>
            <p className="mt-2 text-[13px] text-zinc-500">
              Start a conversation to see it here.
            </p>
            <Button href="/chat" className="mt-6">
              Start Chatting
            </Button>
          </div>
        ) : (
          <div className="mx-auto max-w-3xl space-y-2">
            {chats.map((chat) => (
              <Link
                key={chat.id}
                href={`/chat?id=${chat.id}`}
                className="group block rounded-xl border border-zinc-800/80 bg-zinc-900/30 p-5 shadow-sm transition-all duration-150 hover:border-zinc-700/80 hover:bg-zinc-900/50 hover:shadow-md hover:shadow-black/20"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[14px] font-medium text-zinc-100 group-hover:text-white">
                      {chat.messages[0]?.content ?? "New conversation"}
                    </p>
                    <div className="mt-2 flex items-center gap-2.5 text-[11px] text-zinc-500">
                      <span>{new Date(chat.createdAt).toLocaleString()}</span>
                      <span className="text-zinc-700">·</span>
                      <span>{chat._count.messages} messages</span>
                    </div>
                  </div>
                  <svg
                    className="mt-0.5 h-4 w-4 shrink-0 text-zinc-600 transition-colors group-hover:text-zinc-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </>
  );
}

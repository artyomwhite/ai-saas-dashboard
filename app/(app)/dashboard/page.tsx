import Topbar from "@/components/Topbar";
import Card from "@/components/Card";
import Button from "@/components/Button";
import { getDashboardData, getDefaultUser } from "@/lib/data";

export const dynamic = "force-dynamic";

const statIcons = [
  "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",
  "M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z",
  "M13 10V3L4 14h7v7l9-11h-7z",
  "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
];

export default async function DashboardPage() {
  const user = await getDefaultUser();
  const { chatCount, messageCount, recentChats } = await getDashboardData(user.id);

  const stats = [
    { label: "Total Chats", value: chatCount.toString(), change: "+12%", positive: true },
    { label: "Messages Sent", value: messageCount.toString(), change: "+8%", positive: true },
    { label: "Avg Response", value: "1.2s", change: "-15%", positive: true },
    { label: "Active Sessions", value: "3", change: "+2", positive: true },
  ];

  return (
    <>
      <Topbar title="Dashboard" subtitle="Welcome back, Alex" />
      <main className="flex-1 overflow-y-auto p-6">
        <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat, i) => (
            <Card key={stat.label} hover>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[13px] font-medium text-zinc-500">{stat.label}</p>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-3xl font-bold tracking-tight text-zinc-50">
                      {stat.value}
                    </span>
                    <span className="text-xs font-medium text-emerald-400">
                      {stat.change}
                    </span>
                  </div>
                </div>
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-500/10">
                  <svg className="h-4 w-4 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={statIcons[i]} />
                  </svg>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card title="Quick Actions">
            <div className="flex flex-wrap gap-2.5">
              <Button href="/chat">New Chat</Button>
              <Button href="/history" variant="secondary">
                View History
              </Button>
              <Button href="/pricing" variant="ghost">
                Upgrade Plan
              </Button>
            </div>
          </Card>

          <Card title="Recent Activity">
            {recentChats.length === 0 ? (
              <p className="text-[13px] text-zinc-500">
                No chats yet. Start your first conversation!
              </p>
            ) : (
              <ul className="space-y-2">
                {recentChats.map((chat) => (
                  <li
                    key={chat.id}
                    className="flex items-center justify-between rounded-lg border border-zinc-800/60 bg-zinc-900/40 px-4 py-3 transition-colors hover:border-zinc-700/60 hover:bg-zinc-900/60"
                  >
                    <div className="min-w-0 flex-1 pr-4">
                      <p className="truncate text-[13px] font-medium text-zinc-200">
                        {chat.messages[0]?.content ?? "New conversation"}
                      </p>
                      <p className="mt-0.5 text-[11px] text-zinc-500">
                        {new Date(chat.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <Button href={`/chat?id=${chat.id}`} variant="ghost" size="sm">
                      Open
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </div>
      </main>
    </>
  );
}

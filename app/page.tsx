import Link from "next/link";
import Button from "@/components/Button";

const features = [
  {
    title: "AI-powered chat",
    description: "Intelligent assistant with persistent conversation history.",
  },
  {
    title: "Analytics dashboard",
    description: "Track chats, messages, and response metrics at a glance.",
  },
  {
    title: "Chat history",
    description: "Every conversation saved and searchable in one place.",
  },
  {
    title: "SaaS-ready UI",
    description: "Production-grade interface built for real product demos.",
  },
];

export default function LandingPage() {
  return (
    <div className="bg-glow relative min-h-screen overflow-hidden bg-zinc-950 text-zinc-100">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-40" />

      <nav className="relative mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 shadow-lg shadow-violet-600/25">
            <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span className="text-[15px] font-semibold tracking-tight">Nexus AI</span>
        </div>
        <div className="flex items-center gap-5">
          <Link
            href="/pricing"
            className="text-[13px] text-zinc-400 transition-colors hover:text-zinc-100"
          >
            Pricing
          </Link>
          <Button href="/dashboard" size="sm">
            Go to Dashboard
          </Button>
        </div>
      </nav>

      <main className="relative mx-auto max-w-6xl px-6 pb-28 pt-20">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-1.5 text-[13px] text-violet-300">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-violet-500" />
            </span>
            Now in public beta
          </div>

          <h1 className="text-5xl font-bold tracking-tight sm:text-6xl sm:leading-[1.08]">
            The AI dashboard for{" "}
            <span className="bg-gradient-to-r from-violet-400 via-violet-300 to-indigo-400 bg-clip-text text-transparent">
              modern SaaS teams
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400">
            Ship faster with an intelligent assistant, clean analytics, and a
            production-ready dashboard — built for founders and product teams.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="/dashboard" size="lg">
              Go to Dashboard
            </Button>
            <Button href="/chat" variant="secondary" size="lg">
              Try AI Chat
            </Button>
          </div>
        </div>

        <div className="mt-28 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-xl border border-zinc-800/80 bg-zinc-900/30 p-6 shadow-sm transition-all duration-200 hover:border-zinc-700/80 hover:bg-zinc-900/50 hover:shadow-md hover:shadow-black/20"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-violet-500/10 transition-colors group-hover:bg-violet-500/15">
                <svg className="h-5 w-5 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="font-medium text-zinc-100">{feature.title}</p>
              <p className="mt-1.5 text-[13px] leading-relaxed text-zinc-500">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-28 overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-900/20 shadow-2xl shadow-black/40">
          <div className="border-b border-zinc-800/80 px-5 py-3.5">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-red-500/70" />
              <div className="h-3 w-3 rounded-full bg-yellow-500/70" />
              <div className="h-3 w-3 rounded-full bg-green-500/70" />
            </div>
          </div>
          <div className="grid gap-px bg-zinc-800/50 sm:grid-cols-3">
            {[
              { label: "Active Chats", value: "128" },
              { label: "Response Time", value: "1.2s" },
              { label: "Satisfaction", value: "98%" },
            ].map((metric) => (
              <div key={metric.label} className="bg-zinc-950/80 px-8 py-10 text-center">
                <p className="text-[13px] font-medium text-zinc-500">{metric.label}</p>
                <p className="mt-2 text-3xl font-bold tracking-tight text-zinc-50">
                  {metric.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer className="relative border-t border-zinc-800/80 py-8 text-center text-[13px] text-zinc-500">
        Nexus AI · Portfolio SaaS MVP · Next.js · Prisma · Tailwind CSS
      </footer>
    </div>
  );
}

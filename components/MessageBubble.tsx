type MessageBubbleProps = {
  role: "user" | "assistant";
  content: string;
};

export default function MessageBubble({ role, content }: MessageBubbleProps) {
  const isUser = role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[75%] rounded-2xl px-4 py-3 shadow-sm ${
          isUser
            ? "bg-gradient-to-br from-violet-600 to-violet-700 text-white shadow-violet-600/20"
            : "border border-zinc-800/80 bg-zinc-900/80 text-zinc-100 shadow-black/20"
        }`}
      >
        {!isUser && (
          <div className="mb-1.5 flex items-center gap-1.5">
            <div className="flex h-5 w-5 items-center justify-center rounded-md bg-violet-500/15">
              <svg className="h-3 w-3 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="text-[11px] font-medium tracking-wide text-violet-400 uppercase">
              Nexus AI
            </span>
          </div>
        )}
        <p className="whitespace-pre-wrap text-[13px] leading-relaxed">{content}</p>
      </div>
    </div>
  );
}

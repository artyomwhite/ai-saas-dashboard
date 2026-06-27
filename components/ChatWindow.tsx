"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import MessageBubble from "./MessageBubble";
import Button from "./Button";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

type ChatWindowProps = {
  chatId?: string | null;
  initialMessages?: Message[];
};

export default function ChatWindow({
  chatId: initialChatId = null,
  initialMessages = [],
}: ChatWindowProps) {
  const [chatId, setChatId] = useState<string | null>(initialChatId);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setChatId(initialChatId);
    setMessages(initialMessages);
  }, [initialChatId, initialMessages]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    const userMessage: Message = {
      id: `temp-${Date.now()}`,
      role: "user",
      content: trimmed,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chatId, message: trimmed }),
      });

      if (!res.ok) throw new Error("Failed to send message");

      const data = (await res.json()) as {
        chatId: string;
        messages: Message[];
      };

      setChatId(data.chatId);
      setMessages(data.messages);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `error-${Date.now()}`,
          role: "assistant",
          content: "Something went wrong. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 space-y-5 overflow-y-auto px-6 py-6">
        {messages.length === 0 && !loading && (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-violet-500/20 bg-violet-500/10 shadow-lg shadow-violet-500/5">
              <svg className="h-8 w-8 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold tracking-tight text-zinc-100">
              Start a conversation
            </h3>
            <p className="mt-2 max-w-sm text-[13px] leading-relaxed text-zinc-500">
              Ask about SaaS strategy, product ideas, or anything else. Your chat is saved automatically.
            </p>
          </div>
        )}

        {messages.map((msg) => (
          <MessageBubble key={msg.id} role={msg.role} content={msg.content} />
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/80 px-5 py-3.5 shadow-sm">
              <div className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-violet-400 [animation-delay:-0.3s]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-violet-400 [animation-delay:-0.15s]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-violet-400" />
              </div>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      <form
        onSubmit={handleSubmit}
        className="border-t border-zinc-800/80 bg-zinc-950/80 p-4 backdrop-blur-xl"
      >
        <div className="mx-auto flex max-w-3xl items-end gap-3 rounded-xl border border-zinc-800/80 bg-zinc-900/60 p-2 shadow-sm">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
            placeholder="Ask anything about your SaaS..."
            rows={1}
            className="flex-1 resize-none bg-transparent px-3 py-2.5 text-[13px] text-zinc-100 placeholder:text-zinc-500 focus:outline-none"
          />
          <Button type="submit" disabled={loading || !input.trim()} size="sm">
            Send
          </Button>
        </div>
      </form>
    </div>
  );
}

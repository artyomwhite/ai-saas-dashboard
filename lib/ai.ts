type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

function mockResponse(message: string): string {
  const lower = message.toLowerCase().trim();

  if (/^(hi|hello|hey|howdy)/.test(lower)) {
    return "Hi! I'm your AI assistant. How can I help you build your SaaS today?";
  }

  if (lower.includes("pricing") || lower.includes("plan")) {
    return "We offer Free, Pro ($29/mo), and Enterprise (custom) plans. Pro unlocks unlimited chats, priority AI, and analytics. Want a feature comparison?";
  }

  if (lower.includes("dashboard") || lower.includes("analytics")) {
    return "Your dashboard shows key metrics: active chats, response time, and usage trends. Head to /dashboard for the full overview.";
  }

  if (lower.includes("deploy") || lower.includes("vercel")) {
    return "This stack deploys cleanly to Vercel: push to GitHub, connect the repo, set DATABASE_URL (or switch to Postgres for production), and you're live.";
  }

  if (lower.includes("help") || lower.includes("what can you")) {
    return "I can help with product ideas, SaaS architecture, copy, pricing strategy, and technical questions. Ask me anything about building or scaling your product.";
  }

  if (lower.includes("thank")) {
    return "You're welcome! Let me know if you need anything else for your SaaS project.";
  }

  return `Great question about "${message.slice(0, 80)}${message.length > 80 ? "…" : ""}". For a portfolio SaaS, I'd focus on a clear value prop, one killer feature, and polish on the core UX. Want me to go deeper on architecture, marketing, or UI?`;
}

export async function generateAIResponse(
  message: string,
  history: ChatMessage[] = []
): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY;

  if (apiKey) {
    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content:
                "You are a helpful AI assistant for a SaaS dashboard product. Be concise, professional, and actionable.",
            },
            ...history.map((m) => ({ role: m.role, content: m.content })),
            { role: "user", content: message },
          ],
          max_tokens: 500,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status}`);
      }

      const data = (await response.json()) as {
        choices?: { message?: { content?: string } }[];
      };

      const content = data.choices?.[0]?.message?.content;
      if (content) return content.trim();
    } catch (error) {
      console.error("OpenAI request failed, falling back to mock:", error);
    }
  }

  return mockResponse(message);
}

export type StoredMessage = {
  id: string;
  chatId: string;
  role: "user" | "assistant";
  content: string;
  createdAt: Date;
};

export type StoredChat = {
  id: string;
  userId: string;
  createdAt: Date;
  messages: StoredMessage[];
};

export const MOCK_USER = {
  id: "demo-user-1",
  name: "Alex Morgan",
  email: "alex@example.com",
};

function createId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function seedChats(): StoredChat[] {
  const base = Date.now();

  return [
    {
      id: "demo-chat-1",
      userId: MOCK_USER.id,
      createdAt: new Date(base - 1000 * 60 * 60 * 24 * 2),
      messages: [
        {
          id: "demo-msg-1",
          chatId: "demo-chat-1",
          role: "user",
          content: "How do I ship my SaaS MVP faster?",
          createdAt: new Date(base - 1000 * 60 * 60 * 24 * 2),
        },
        {
          id: "demo-msg-2",
          chatId: "demo-chat-1",
          role: "assistant",
          content:
            "Focus on one killer feature, polish the core UX, and deploy early. Validate with real users before adding complexity.",
          createdAt: new Date(base - 1000 * 60 * 60 * 24 * 2 + 1000),
        },
      ],
    },
    {
      id: "demo-chat-2",
      userId: MOCK_USER.id,
      createdAt: new Date(base - 1000 * 60 * 60 * 8),
      messages: [
        {
          id: "demo-msg-3",
          chatId: "demo-chat-2",
          role: "user",
          content: "What pricing model should I use?",
          createdAt: new Date(base - 1000 * 60 * 60 * 8),
        },
        {
          id: "demo-msg-4",
          chatId: "demo-chat-2",
          role: "assistant",
          content:
            "We offer Free, Pro ($29/mo), and Enterprise (custom) plans. Pro unlocks unlimited chats, priority AI, and analytics.",
          createdAt: new Date(base - 1000 * 60 * 60 * 8 + 1000),
        },
      ],
    },
    {
      id: "demo-chat-3",
      userId: MOCK_USER.id,
      createdAt: new Date(base - 1000 * 60 * 30),
      messages: [
        {
          id: "demo-msg-5",
          chatId: "demo-chat-3",
          role: "user",
          content: "Hello",
          createdAt: new Date(base - 1000 * 60 * 30),
        },
        {
          id: "demo-msg-6",
          chatId: "demo-chat-3",
          role: "assistant",
          content: "Hi! I'm your AI assistant. How can I help you build your SaaS today?",
          createdAt: new Date(base - 1000 * 60 * 30 + 1000),
        },
      ],
    },
  ];
}

type MockStore = {
  chats: StoredChat[];
};

const globalStore = globalThis as typeof globalThis & {
  __nexusMockStore?: MockStore;
};

function getStore(): MockStore {
  if (!globalStore.__nexusMockStore) {
    globalStore.__nexusMockStore = { chats: seedChats() };
  }
  return globalStore.__nexusMockStore;
}

export function getMockUser() {
  return MOCK_USER;
}

export function getMockDashboardData() {
  const { chats } = getStore();
  const messageCount = chats.reduce((sum, chat) => sum + chat.messages.length, 0);

  return {
    chatCount: chats.length,
    messageCount,
    recentChats: [...chats]
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, 5)
      .map((chat) => ({
        id: chat.id,
        createdAt: chat.createdAt,
        messages: chat.messages.slice(-1).map((message) => ({
          content: message.content,
        })),
      })),
  };
}

export function getMockChatHistory() {
  const { chats } = getStore();

  return [...chats]
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .map((chat) => ({
      id: chat.id,
      createdAt: chat.createdAt,
      messages: chat.messages.slice(0, 1).map((message) => ({
        content: message.content,
      })),
      _count: { messages: chat.messages.length },
    }));
}

export function getMockChatById(chatId: string) {
  const chat = getStore().chats.find((item) => item.id === chatId);
  if (!chat) return null;

  return {
    id: chat.id,
    createdAt: chat.createdAt,
    messages: chat.messages.map((message) => ({
      id: message.id,
      role: message.role,
      content: message.content,
      createdAt: message.createdAt,
    })),
  };
}

export function appendMockChatMessage(chatId: string | null, message: string, aiContent: string) {
  const store = getStore();
  let chat = chatId ? store.chats.find((item) => item.id === chatId) : undefined;

  if (!chat) {
    chat = {
      id: createId("chat"),
      userId: MOCK_USER.id,
      createdAt: new Date(),
      messages: [],
    };
    store.chats.unshift(chat);
  }

  const now = Date.now();

  chat.messages.push({
    id: createId("msg"),
    chatId: chat.id,
    role: "user",
    content: message,
    createdAt: new Date(now),
  });

  chat.messages.push({
    id: createId("msg"),
    chatId: chat.id,
    role: "assistant",
    content: aiContent,
    createdAt: new Date(now + 1),
  });

  return {
    chatId: chat.id,
    messages: chat.messages.map((item) => ({
      id: item.id,
      role: item.role,
      content: item.content,
    })),
  };
}

export function getMockChatHistoryForAi(chatId: string) {
  const chat = getStore().chats.find((item) => item.id === chatId);
  if (!chat) return [];

  return chat.messages.slice(-20).map((message) => ({
    role: message.role,
    content: message.content,
  }));
}

export function getMockChatsApiPayload() {
  return getMockChatHistory().map((chat) => ({
    id: chat.id,
    createdAt: chat.createdAt.toISOString(),
    messageCount: chat._count.messages,
    preview: chat.messages[0]?.content ?? "New conversation",
  }));
}

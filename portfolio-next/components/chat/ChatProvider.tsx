"use client";

import * as React from "react";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  sources?: string[];
  createdAt: number;
  isError?: boolean;
}

interface ChatContextValue {
  isOpen: boolean;
  openChat: () => void;
  closeChat: () => void;
  toggleChat: () => void;
  messages: ChatMessage[];
  isLoading: boolean;
  error: string | null;
  sendMessage: (text: string) => Promise<void>;
  clearChat: () => void;
}

const STORAGE_KEY = "ja_chat_v1";
const MAX_STORED_MESSAGES = 20;
const MAX_HISTORY_TURNS = 8;

function loadSavedMessages(): ChatMessage[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed.slice(-MAX_STORED_MESSAGES);
    }
  } catch {
    // If storage is blocked, private browsing restrictions, or invalid JSON
  }
  return [];
}

function saveMessages(msgs: ChatMessage[]) {
  if (typeof window === "undefined") return;
  try {
    const toSave = msgs.slice(-MAX_STORED_MESSAGES);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  } catch {
    // Storage quota exceeded or blocked
  }
}

// External chat store adhering to React 19 useSyncExternalStore
class ChatStore {
  private messages: ChatMessage[] = [];
  private readonly serverMessages: ChatMessage[] = [];
  private listeners = new Set<() => void>();
  private initialized = false;

  getSnapshot = (): ChatMessage[] => {
    if (!this.initialized && typeof window !== "undefined") {
      this.messages = loadSavedMessages();
      this.initialized = true;
    }
    return this.messages;
  };

  getServerSnapshot = (): ChatMessage[] => {
    return this.serverMessages;
  };

  subscribe = (listener: () => void): (() => void) => {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  };

  update = (
    updater: ChatMessage[] | ((prev: ChatMessage[]) => ChatMessage[])
  ) => {
    const next =
      typeof updater === "function" ? updater(this.messages) : updater;
    this.messages = next;
    saveMessages(next);
    for (const listener of this.listeners) {
      listener();
    }
  };

  clear = () => {
    this.messages = [];
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    for (const listener of this.listeners) {
      listener();
    }
  };
}

const chatStoreInstance = new ChatStore();

const ChatContext = React.createContext<ChatContextValue | null>(null);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const messages = React.useSyncExternalStore(
    chatStoreInstance.subscribe,
    chatStoreInstance.getSnapshot,
    chatStoreInstance.getServerSnapshot
  );

  const openChat = React.useCallback(() => {
    setIsOpen(true);
    setError(null);
  }, []);

  const closeChat = React.useCallback(() => {
    setIsOpen(false);
  }, []);

  const toggleChat = React.useCallback(() => {
    setIsOpen((prev) => !prev);
    setError(null);
  }, []);

  // Global keyboard shortcut: Ctrl+K or Cmd+K to toggle, Esc to close
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === "k" || e.key === "K")) {
        e.preventDefault();
        toggleChat();
      } else if (e.key === "Escape" && isOpen) {
        e.preventDefault();
        closeChat();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, toggleChat, closeChat]);

  const clearChat = React.useCallback(() => {
    chatStoreInstance.clear();
    setError(null);
  }, []);

  const sendMessage = React.useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isLoading) return;

      // Offline check
      if (typeof navigator !== "undefined" && !navigator.onLine) {
        setError(
          "You appear to be offline. Please check your internet connection or email Jawad at jawadahmad5618@gmail.com."
        );
        return;
      }

      setError(null);

      const userMsg: ChatMessage = {
        id: `user-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        role: "user",
        content: trimmed,
        createdAt: Date.now(),
      };

      const assistantMsgId = `assistant-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
      const assistantPlaceholder: ChatMessage = {
        id: assistantMsgId,
        role: "assistant",
        content: "",
        sources: [],
        createdAt: Date.now(),
      };

      // Prepare conversation history (last 8 turns max)
      const currentHistory = messages
        .filter((m) => !m.isError && m.content.trim().length > 0)
        .slice(-MAX_HISTORY_TURNS * 2)
        .map((m) => ({
          role: m.role,
          content: m.content,
        }));

      chatStoreInstance.update((prev) => [...prev, userMsg, assistantPlaceholder]);
      setIsLoading(true);

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: trimmed,
            history: currentHistory,
          }),
        });

        if (response.status === 429) {
          throw new Error(
            "You've sent quite a few messages. Please wait a few minutes before asking another question, or email Jawad at jawadahmad5618@gmail.com."
          );
        }

        if (!response.ok) {
          const errData = await response.json().catch(() => null);
          const fallbackText =
            errData?.error ||
            "The assistant could not reply just now. You can email Jawad at jawadahmad5618@gmail.com.";
          throw new Error(fallbackText);
        }

        const contentType = response.headers.get("content-type") || "";

        // If response is static JSON (e.g. fallback response when index is empty or question is out of scope)
        if (contentType.includes("application/json")) {
          const data = (await response.json()) as {
            message?: string;
            sources?: string[];
          };
          const replyText =
            data.message ||
            "I don't have that information. You can email Jawad at jawadahmad5618@gmail.com.";
          const replySources = data.sources || [];

          chatStoreInstance.update((prev) =>
            prev.map((msg) =>
              msg.id === assistantMsgId
                ? { ...msg, content: replyText, sources: replySources }
                : msg
            )
          );
          setIsLoading(false);
          return;
        }

        // If response is streaming SSE (text/event-stream)
        const headerSources = response.headers.get("X-Sources");
        let parsedSources: string[] = [];
        if (headerSources) {
          try {
            parsedSources = JSON.parse(headerSources);
          } catch {
            // ignore
          }
        }

        if (!response.body) {
          throw new Error("The assistant reply was empty. Please try again.");
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let accumulatedContent = "";
        let streamBuffer = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          streamBuffer += decoder.decode(value, { stream: true });
          const lines = streamBuffer.split("\n");
          streamBuffer = lines.pop() ?? "";

          let currentEvent = "message";

          for (const line of lines) {
            const trimmedLine = line.trim();
            if (!trimmedLine) {
              currentEvent = "message";
              continue;
            }

            if (trimmedLine.startsWith("event:")) {
              currentEvent = trimmedLine.slice(6).trim();
              continue;
            }

            if (trimmedLine.startsWith("data:")) {
              const dataStr = trimmedLine.slice(5).trim();
              if (!dataStr || dataStr === "[DONE]") continue;

              try {
                const parsed = JSON.parse(dataStr);
                if (currentEvent === "sources" && parsed.sources) {
                  parsedSources = parsed.sources;
                } else if (currentEvent === "error" && parsed.error) {
                  throw new Error(parsed.error);
                } else if (parsed.token) {
                  accumulatedContent += parsed.token;
                  chatStoreInstance.update((prev) =>
                    prev.map((msg) =>
                      msg.id === assistantMsgId
                        ? {
                            ...msg,
                            content: accumulatedContent,
                            sources: parsedSources,
                          }
                        : msg
                    )
                  );
                }
              } catch (parseErr) {
                // Ignore parse errors on partial lines
                if (
                  parseErr instanceof Error &&
                  parseErr.message.includes("assistant")
                ) {
                  throw parseErr;
                }
              }
            }
          }
        }

        // Ensure final state has content and sources
        chatStoreInstance.update((prev) =>
          prev.map((msg) =>
            msg.id === assistantMsgId
              ? {
                  ...msg,
                  content:
                    accumulatedContent ||
                    "I don't have that information. You can email Jawad at jawadahmad5618@gmail.com.",
                  sources: parsedSources,
                }
              : msg
          )
        );
      } catch (err) {
        const errorMsg =
          err instanceof Error
            ? err.message
            : "Something went wrong while connecting to the assistant. Please try again or email Jawad directly.";

        setError(errorMsg);
        chatStoreInstance.update((prev) =>
          prev.map((msg) =>
            msg.id === assistantMsgId
              ? {
                  ...msg,
                  content: errorMsg,
                  isError: true,
                }
              : msg
          )
        );
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, messages]
  );

  const value = React.useMemo<ChatContextValue>(
    () => ({
      isOpen,
      openChat,
      closeChat,
      toggleChat,
      messages,
      isLoading,
      error,
      sendMessage,
      clearChat,
    }),
    [
      isOpen,
      openChat,
      closeChat,
      toggleChat,
      messages,
      isLoading,
      error,
      sendMessage,
      clearChat,
    ]
  );

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

export function useChat(): ChatContextValue {
  const context = React.useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
}

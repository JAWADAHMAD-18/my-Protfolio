"use client";

import * as React from "react";
import { Sparkles, X, Send, Trash2, ArrowUpRight } from "lucide-react";
import { useChat } from "./ChatProvider";

const SUGGESTION_CHIPS = [
  "Tell me about TripFusion",
  "What's Jawad's stack?",
  "Has he built mobile apps?",
  "How can I contact him?",
];

const MAX_INPUT_CHARS = 500;

export function ChatModal() {
  const {
    isOpen,
    closeChat,
    messages,
    isLoading,
    error,
    sendMessage,
    clearChat,
  } = useChat();

  const [input, setInput] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  const modalRef = React.useRef<HTMLDivElement>(null);

  // Focus input when opened
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = "";
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  // Scroll to bottom on new messages
  React.useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading, isOpen]);

  // Trap focus within modal
  React.useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab" || !modalRef.current) return;

      const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    const msg = input.trim();
    setInput("");
    sendMessage(msg);
  };

  const handleChipClick = (suggestion: string) => {
    if (isLoading) return;
    sendMessage(suggestion);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs transition-opacity duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeChat();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="chat-dialog-title"
    >
      {/* Modal / Bottom-Sheet Container */}
      <div
        ref={modalRef}
        className="w-full sm:max-w-2xl max-h-[88vh] sm:max-h-[80vh] flex flex-col bg-surface border border-border rounded-t-[20px] sm:rounded-[20px] shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border bg-surface-2/40">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-[10px] bg-accent/15 flex items-center justify-center text-accent-text dark:text-accent">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2
                id="chat-dialog-title"
                className="text-sm font-semibold text-text flex items-center gap-2"
              >
                <span>Jawad&apos;s AI Assistant</span>
                <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-surface-2 border border-border text-muted">
                  Knowledge Base Grounded
                </span>
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {messages.length > 0 && (
              <button
                type="button"
                onClick={clearChat}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-[8px] border border-border bg-surface text-xs font-mono text-muted hover:text-text hover:border-accent transition-colors cursor-pointer"
                aria-label="Clear chat history"
                title="Clear chat history"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Clear</span>
              </button>
            )}

            <button
              type="button"
              onClick={closeChat}
              className="w-8 h-8 rounded-[8px] border border-border bg-surface text-muted hover:text-text hover:border-accent flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close dialog (Esc)"
              title="Close (Esc)"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Message Area */}
        <div className="flex-1 overflow-y-auto px-5 py-5 space-y-4 min-h-[220px]">
          {messages.length === 0 ? (
            <div className="py-6 sm:py-8 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-surface-2 border border-border mx-auto flex items-center justify-center text-accent-text dark:text-accent">
                <Sparkles className="w-6 h-6" />
              </div>
              <div className="max-w-md mx-auto space-y-1.5">
                <p className="text-base font-semibold text-text">
                  Ask me anything about Jawad&apos;s work.
                </p>
                <p className="text-xs text-muted leading-relaxed">
                  I can answer questions about TripFusion, Hisab Kitab, AI voice agents, technical stack, and how to get in touch.
                </p>
              </div>

              {/* 4 Suggestion Chips */}
              <div className="pt-2">
                <p className="font-mono text-[11px] uppercase tracking-wider text-muted mb-2.5 font-semibold">
                  Suggested Questions
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-lg mx-auto text-left">
                  {SUGGESTION_CHIPS.map((chip) => (
                    <button
                      key={chip}
                      type="button"
                      onClick={() => handleChipClick(chip)}
                      className="px-3.5 py-2.5 rounded-[12px] border border-border bg-surface-2/60 hover:bg-surface-2 hover:border-accent text-xs font-medium text-text transition-colors text-left flex items-center justify-between group cursor-pointer"
                    >
                      <span>{chip}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-muted group-hover:text-accent-text dark:group-hover:text-accent shrink-0 ml-2 transition-colors" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <>
              {messages.map((msg) => {
                const isUser = msg.role === "user";
                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-[16px] px-4 py-3 text-sm leading-relaxed ${
                        isUser
                          ? "bg-accent text-on-accent font-medium rounded-br-xs"
                          : msg.isError
                          ? "bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 rounded-bl-xs"
                          : "bg-surface-2 border border-border/70 text-text rounded-bl-xs"
                      }`}
                    >
                      {msg.content || (
                        <span className="inline-flex items-center gap-1.5 text-muted">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse [animation-delay:200ms]" />
                          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse [animation-delay:400ms]" />
                        </span>
                      )}
                    </div>

                    {/* Sources Chips for Assistant Messages */}
                    {!isUser && msg.sources && msg.sources.length > 0 && (
                      <div className="flex flex-wrap items-center gap-1.5 mt-2 pl-1">
                        <span className="font-mono text-[10px] uppercase tracking-wider text-muted font-semibold">
                          Sources:
                        </span>
                        {msg.sources.map((source) => (
                          <span
                            key={source}
                            className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-surface-2 border border-border/80 text-muted"
                          >
                            {source}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}

              {/* In-flight Typing indicator when waiting for initial response */}
              {isLoading && messages[messages.length - 1]?.role === "user" && (
                <div className="flex items-start">
                  <div className="rounded-[16px] px-4 py-3 bg-surface-2 border border-border/70 rounded-bl-xs">
                    <span className="inline-flex items-center gap-1.5 text-muted">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                      <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse [animation-delay:200ms]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse [animation-delay:400ms]" />
                    </span>
                  </div>
                </div>
              )}

              {/* Error banner if general error occurred */}
              {error && !messages.some((m) => m.content === error) && (
                <div className="p-3 rounded-[12px] bg-red-500/10 border border-red-500/30 text-xs text-red-600 dark:text-red-400">
                  {error}
                </div>
              )}

              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-border bg-surface">
          <form onSubmit={handleSubmit} className="relative flex items-center">
            <input
              ref={inputRef}
              type="text"
              value={input}
              maxLength={MAX_INPUT_CHARS}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about projects, stack, or experience..."
              disabled={isLoading}
              className="w-full px-4 py-3 pr-24 rounded-[12px] border border-border bg-surface-2 text-text text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:opacity-60"
            />

            <div className="absolute right-2 flex items-center gap-1.5">
              {input.length > 400 && (
                <span className="font-mono text-[10px] text-muted">
                  {input.length}/{MAX_INPUT_CHARS}
                </span>
              )}
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="w-8 h-8 rounded-[8px] bg-accent text-on-accent hover:bg-accent-2 flex items-center justify-center transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-2xs"
                aria-label="Send message"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>

          {/* Disclaimer Line per DESIGN.md section 7 */}
          <div className="mt-2.5 text-center">
            <p className="text-[11px] text-muted leading-relaxed">
              AI can make mistakes. For anything important,{" "}
              <a
                href="mailto:jawadahmad5618@gmail.com"
                className="text-accent-text dark:text-accent underline font-medium"
              >
                email Jawad
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { useChat } from "@/components/chat/ChatProvider";

const ChatModal = dynamic(
  () => import("@/components/chat/ChatModal").then((mod) => mod.ChatModal),
  { ssr: false }
);

export function LazyChatModal() {
  const { isOpen } = useChat();
  const [hasOpened, setHasOpened] = React.useState(false);

  React.useEffect(() => {
    if (isOpen) setHasOpened(true);
  }, [isOpen]);

  if (!hasOpened) return null;
  return <ChatModal />;
}

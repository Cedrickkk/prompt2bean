import { ChatInput } from "@/components/chat/chat-input";
import { ChatMessageBubble } from "@/components/chat/chat-message";
import { ModeSelect } from "@/components/chat/mode-select";
import { useChatStore } from "@/store/chat-store";
import { useEffect, useRef } from "react";

export function ChatWindow() {
  const messages = useChatStore((state) => state.messages);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  return (
    <div className="mx-auto flex h-svh w-full max-w-3xl flex-col">
      <header className="flex items-center justify-between border-b border-gray-200 px-4 py-3 dark:border-gray-800">
        <h1 className="text-base font-semibold text-gray-900 dark:text-gray-100">
          prompt2bean
        </h1>
        <ModeSelect />
      </header>

      <div className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
        {messages.length === 0 && (
          <p className="mt-10 text-center text-sm text-gray-400">
            Pick a mode above and describe what you want.
          </p>
        )}
        {messages.map((message) => (
          <ChatMessageBubble key={message.id} message={message} />
        ))}
        <div ref={bottomRef} />
      </div>

      <ChatInput />
    </div>
  );
}

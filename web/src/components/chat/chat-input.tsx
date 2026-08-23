import { useChatStore } from "@/store/chat-store";
import { useState } from "react";

export function ChatInput() {
  const [text, setText] = useState("");
  const sendPrompt = useChatStore((state) => state.sendPrompt);
  const isSending = useChatStore((state) =>
    state.messages.some((message) => message.pending),
  );

  const submit = () => {
    const trimmed = text.trim();
    if (!trimmed || isSending) return;
    setText("");
    void sendPrompt(trimmed);
  };

  return (
    <div className="border-t border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-950">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          submit();
        }}
        className="flex items-end gap-2 rounded-3xl border border-gray-200 bg-gray-50 p-2 shadow-sm transition focus-within:border-gray-400 focus-within:shadow-md dark:border-gray-700 dark:bg-gray-900 dark:focus-within:border-gray-500"
      >
        <textarea
          value={text}
          onChange={(event) => setText(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              submit();
            }
          }}
          placeholder="Describe what you want…"
          rows={3}
          disabled={isSending}
          className="max-h-48 flex-1 resize-none bg-transparent px-3 py-2.5 text-[15px] leading-relaxed text-gray-900 placeholder:text-gray-400 focus:outline-none disabled:opacity-50 dark:text-gray-100 dark:placeholder:text-gray-500"
        />
        <button
          type="submit"
          disabled={isSending || !text.trim()}
          aria-label="Send"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-900 text-white transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-30 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-white"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="h-5 w-5"
            aria-hidden="true"
          >
            <path
              d="M12 19V5M12 5l-6 6M12 5l6 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </form>
      <p className="mt-2 px-1 text-xs text-gray-400 dark:text-gray-500">
        Press Enter to send, Shift+Enter for a new line.
      </p>
    </div>
  );
}

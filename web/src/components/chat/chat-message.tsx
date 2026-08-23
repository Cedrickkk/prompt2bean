import type { ChatMessage, JsonRecord } from "@/api/types";
import { ResponseView } from "@/components/chat/response-view";

export function ChatMessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-3 ${
          isUser
            ? "bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900"
            : "w-full bg-gray-100 text-gray-900 sm:w-auto dark:bg-gray-800 dark:text-gray-100"
        }`}
      >
        {isUser ? (
          <p className="whitespace-pre-wrap text-sm">
            {message.content as string}
          </p>
        ) : message.pending ? (
          message.content ? (
            <pre className="max-w-full overflow-x-auto whitespace-pre-wrap font-mono text-xs leading-relaxed text-gray-600 dark:text-gray-300">
              {message.content as string}
            </pre>
          ) : (
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <svg
                className="h-4 w-4 animate-spin text-gray-400 dark:text-gray-500"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              <span>Thinking…</span>
            </div>
          )
        ) : message.error ? (
          <p className="text-sm text-red-600 dark:text-red-400">
            {message.error}
          </p>
        ) : (
          <ResponseView
            data={message.content as JsonRecord}
            mode={message.mode}
          />
        )}
      </div>
    </div>
  );
}

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
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Thinking…
            </p>
          )
        ) : message.error ? (
          <p className="text-sm text-red-600 dark:text-red-400">
            {message.error}
          </p>
        ) : (
          <ResponseView data={message.content as JsonRecord} />
        )}
      </div>
    </div>
  );
}

import { PROMPT_MODES, PROMPT_MODE_LABELS, type PromptMode } from "@/api/types";
import { useChatStore } from "@/store/chat-store";

export function ModeSelect() {
  const mode = useChatStore((state) => state.mode);
  const setMode = useChatStore((state) => state.setMode);

  return (
    <div className="relative">
      <select
        value={mode}
        onChange={(event) => setMode(event.target.value as PromptMode)}
        className="appearance-none rounded-full border border-gray-200 bg-gray-50 py-1.5 pl-3.5 pr-9 text-sm font-medium text-gray-700 shadow-sm transition hover:border-gray-300 hover:bg-white focus:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800 dark:focus:ring-gray-700"
      >
        {PROMPT_MODES.map((option) => (
          <option key={option} value={option}>
            {PROMPT_MODE_LABELS[option]}
          </option>
        ))}
      </select>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-gray-400 dark:text-gray-500"
        aria-hidden="true"
      >
        <path
          d="M6 9l6 6 6-6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

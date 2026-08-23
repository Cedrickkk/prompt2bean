import { askPrompt } from "@/api/prompt-api";
import type { ChatMessage, PromptMode } from "@/api/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ChatState {
  mode: PromptMode;
  messages: ChatMessage[];
  setMode: (mode: PromptMode) => void;
  sendPrompt: (text: string) => Promise<void>;
}

function createId(): string {
  return crypto.randomUUID();
}

export const useChatStore = create<ChatState>()(
  persist(
    (set, get) => ({
      mode: "recipe",
      messages: [],

      setMode: (mode) => set({ mode }),

      sendPrompt: async (text) => {
        const mode = get().mode;
        const userMessage: ChatMessage = {
          id: createId(),
          role: "user",
          mode,
          content: text,
          createdAt: Date.now(),
        };
        const assistantMessageId = createId();
        const assistantMessage: ChatMessage = {
          id: assistantMessageId,
          role: "assistant",
          mode,
          content: "",
          pending: true,
          createdAt: Date.now(),
        };

        set((state) => ({
          messages: [...state.messages, userMessage, assistantMessage],
        }));

        try {
          const result = await askPrompt(mode, text);
          set((state) => ({
            messages: state.messages.map((message) =>
              message.id === assistantMessageId
                ? { ...message, content: result, pending: false }
                : message,
            ),
          }));
        } catch (error) {
          const errorText =
            error instanceof Error ? error.message : "Something went wrong.";
          set((state) => ({
            messages: state.messages.map((message) =>
              message.id === assistantMessageId
                ? { ...message, pending: false, error: errorText }
                : message,
            ),
          }));
        }
      },
    }),
    { name: "prompt2bean-chat" },
  ),
);

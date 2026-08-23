import { streamPrompt } from "@/api/prompt-api";
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

        const updateAssistant = (patch: Partial<ChatMessage>) =>
          set((state) => ({
            messages: state.messages.map((message) =>
              message.id === assistantMessageId
                ? { ...message, ...patch }
                : message,
            ),
          }));

        try {
          const result = await streamPrompt(mode, text, (partialText) =>
            updateAssistant({ content: partialText }),
          );
          updateAssistant({ content: result, pending: false });
        } catch (error) {
          const errorText =
            error instanceof Error ? error.message : "Something went wrong.";
          updateAssistant({ pending: false, error: errorText });
        }
      },
    }),
    { name: "prompt2bean-chat" },
  ),
);

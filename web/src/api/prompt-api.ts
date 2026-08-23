import type { JsonRecord, PromptMode } from "./types";

const ENDPOINTS: Record<PromptMode, string> = {
  recipe: "/recipes/ask",
  trip: "/trips/ask",
  "product-spec": "/product-specs/ask",
};

export async function streamPrompt(
  mode: PromptMode,
  prompt: string,
  onChunk: (text: string) => void,
): Promise<JsonRecord> {
  const response = await fetch(`/api${ENDPOINTS[mode]}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
  });

  if (!response.ok || !response.body) {
    throw new Error(`Request failed with status code ${response.status}`);
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let full = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    full += decoder.decode(value, { stream: true });
    onChunk(full);
  }

  try {
    return JSON.parse(full) as JsonRecord;
  } catch {
    throw new Error("Received malformed JSON from the model.");
  }
}

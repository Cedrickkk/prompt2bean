import { httpClient } from "@/api/http-client";
import type { JsonRecord, PromptMode } from "./types";

const ENDPOINTS: Record<PromptMode, string> = {
  recipe: "/recipes/ask",
  trip: "/trips/ask",
  "product-spec": "/product-specs/ask",
};

export async function askPrompt(
  mode: PromptMode,
  prompt: string,
): Promise<JsonRecord> {
  const { data } = await httpClient.post<JsonRecord>(ENDPOINTS[mode], {
    prompt,
  });
  return data;
}

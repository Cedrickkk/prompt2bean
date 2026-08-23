export const PROMPT_MODES = ["recipe", "trip", "product-spec"] as const;

export type PromptMode = (typeof PROMPT_MODES)[number];

export const PROMPT_MODE_LABELS: Record<PromptMode, string> = {
  recipe: "Recipe",
  trip: "Trip",
  "product-spec": "Product Spec",
};

export type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | { [key: string]: JsonValue };

export type JsonRecord = Record<string, JsonValue>;

export interface RecipeIngredient {
  name: string;
  quantity: string;
  unit: string;
}

export interface Recipe {
  title: string;
  description: string;
  servings: number;
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  ingredients: RecipeIngredient[];
  steps: string[];
  tags: string[];
}

export const FIELD_ORDER: Partial<Record<PromptMode, string[]>> = {
  recipe: [
    "title",
    "description",
    "servings",
    "prepTimeMinutes",
    "cookTimeMinutes",
    "ingredients",
    "steps",
    "tags",
  ],
};

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  mode: PromptMode;
  content: string | JsonRecord;
  pending?: boolean;
  error?: string;
  createdAt: number;
}

import { FIELD_ORDER, type JsonRecord, type PromptMode } from "@/api/types";
import { JsonTable } from "@/components/chat/json-table";
import { JsonView } from "@/components/chat/json-view";
import { useState } from "react";

const VIEW_OPTIONS = ["table", "json"] as const;
type ViewOption = (typeof VIEW_OPTIONS)[number];

export function ResponseView({
  data,
  mode,
}: {
  data: JsonRecord;
  mode: PromptMode;
}) {
  const [view, setView] = useState<ViewOption>("table");

  return (
    <div className="w-full">
      <div className="mb-2 flex gap-1">
        {VIEW_OPTIONS.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => setView(option)}
            className={`rounded-md px-2 py-1 text-xs font-medium capitalize ${
              view === option
                ? "bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
      {view === "table" ? (
        <JsonTable data={data} order={FIELD_ORDER[mode]} />
      ) : (
        <JsonView data={data} />
      )}
    </div>
  );
}

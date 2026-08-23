import type { JsonRecord } from "@/api/types";

export function JsonView({ data }: { data: JsonRecord }) {
  return (
    <pre className="overflow-x-auto rounded-lg bg-gray-50 p-3 text-xs leading-relaxed dark:bg-gray-900">
      {JSON.stringify(data, null, 2)}
    </pre>
  );
}

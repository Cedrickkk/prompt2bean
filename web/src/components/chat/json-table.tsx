import type { JsonRecord, JsonValue } from "@/api/types";

function humanizeKey(key: string): string {
  const spaced = key.replace(/([a-z0-9])([A-Z])/g, "$1 $2");
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

function isPlainObject(value: JsonValue): value is JsonRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function ValueCell({ value }: { value: JsonValue }) {
  if (value === null) {
    return <span className="italic text-gray-400">—</span>;
  }

  if (Array.isArray(value)) {
    if (value.length === 0) {
      return <span className="italic text-gray-400">—</span>;
    }
    if (value.every((item) => !isPlainObject(item) && !Array.isArray(item))) {
      return (
        <ul className="list-disc space-y-0.5 pl-4">
          {value.map((item, index) => (
            <li key={index}>{String(item)}</li>
          ))}
        </ul>
      );
    }
    return (
      <div className="space-y-2">
        {value.map((item, index) => (
          <div
            key={index}
            className="rounded-lg border border-gray-200 p-2 dark:border-gray-700"
          >
            {isPlainObject(item) ? (
              <JsonTable data={item} />
            ) : (
              <ValueCell value={item} />
            )}
          </div>
        ))}
      </div>
    );
  }

  if (isPlainObject(value)) {
    return <JsonTable data={value} />;
  }

  return <span>{String(value)}</span>;
}

export function JsonTable({ data }: { data: JsonRecord }) {
  return (
    <table className="w-full border-collapse text-sm">
      <tbody>
        {Object.entries(data).map(([key, value]) => (
          <tr
            key={key}
            className="border-t border-gray-200 align-top first:border-t-0 dark:border-gray-700"
          >
            <th className="w-1/3 whitespace-nowrap py-1.5 pr-3 text-left font-medium text-gray-500 dark:text-gray-400">
              {humanizeKey(key)}
            </th>
            <td className="py-1.5">
              <ValueCell value={value} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

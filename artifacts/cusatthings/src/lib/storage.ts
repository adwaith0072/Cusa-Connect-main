import { useCallback, useEffect, useRef, useState } from 'react';

const PREFIX = 'cusathings:v1:';

function read<T>(key: string, initial: T, sanitize?: (value: unknown) => T): T {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return initial;
    const raw = window.localStorage.getItem(PREFIX + key);
    if (raw === null) return initial;
    const parsed: unknown = JSON.parse(raw);
    return sanitize ? sanitize(parsed) : (parsed as T);
  } catch {
    return initial;
  }
}

/**
 * useState backed by localStorage. Storage can be blocked or full (private mode),
 * so every access is guarded and the app keeps working in memory.
 * `sanitize` must return a safe value for any parsed input, since storage is user-editable.
 */
export function useStoredState<T>(
  key: string,
  initial: T,
  sanitize?: (value: unknown) => T,
) {
  const [value, setValue] = useState<T>(() => read(key, initial, sanitize));
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    try {
      window.localStorage.setItem(PREFIX + key, JSON.stringify(value));
    } catch {
      /* storage unavailable: keep in-memory state */
    }
  }, [key, value]);

  const update = useCallback((next: T | ((current: T) => T)) => setValue(next), []);
  return [value, update] as const;
}

export const stringList = (value: unknown): string[] =>
  Array.isArray(value) ? value.filter((v): v is string => typeof v === 'string').slice(0, 500) : [];

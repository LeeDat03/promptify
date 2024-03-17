import { useEffect, useState } from "react";

export function useDebounce(value: string | undefined) {
  const [debounceValue, setDebounceValue] = useState<string | undefined>("");

  useEffect(() => {
    const timer = setTimeout(() => setDebounceValue(value), 500);
    return () => {
      clearTimeout(timer);
    };
  }, [value]);
  return debounceValue;
}

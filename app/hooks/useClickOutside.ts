import {RefObject, useEffect} from "react";

export function useClickOutside<T extends HTMLElement>(
  ref: RefObject<T | null>,
  onOutside: () => void,
  enabled: boolean,
) {
  useEffect(() => {
    if (!enabled) return;
    const onClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) onOutside();
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [ref, onOutside, enabled]);
}

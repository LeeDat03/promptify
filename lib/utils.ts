import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTag(tag: string) {
  return tag
    .replaceAll(",", "")
    .replaceAll("#", "")
    .split(" ")
    .map((t) => `#${t}`);
}

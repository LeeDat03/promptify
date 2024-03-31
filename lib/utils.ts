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

export function formatDate(date: Date) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

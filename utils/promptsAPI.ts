import { PromptProps } from "./types";

export const fetchPromptById = (userId?: string): Promise<PromptProps[]> => {
  if (!userId) return new Promise(() => console.log("No userId"));

  return fetch(`/api/users/${userId}/post`).then((res) => res.json());
};

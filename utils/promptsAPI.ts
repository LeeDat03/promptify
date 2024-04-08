import { z } from "zod";
import { PromptProps } from "./types";
import { FormSchema } from "@/models/form";

export const getPrompts = (searchValue?: string): Promise<PromptProps[]> => {
  return fetch(`/api/prompt?search=${searchValue}`).then((res) => res.json());
};

export const getPromptsByUserId = (userId?: string): Promise<PromptProps[]> => {
  if (!userId) return new Promise(() => console.log("No userId"));

  return fetch(`/api/users/${userId}/post`).then((res) => res.json());
};

export const getPromptById = (id: string): Promise<PromptProps> => {
  return fetch(`/api/prompt/${id}`).then((res) => res.json());
};

export const createPrompt = (
  data: z.infer<typeof FormSchema>,
  userId: string
) => {
  return fetch("/api/prompt/new", {
    method: "POST",
    body: JSON.stringify({
      prompt: data.prompt,
      tag: data.tag,
      userId: userId,
    }),
  }).then((res) => res.json());
};

export const updatePromptById = (
  data: z.infer<typeof FormSchema>,
  promptId: string
) => {
  return fetch(`/api/prompt/${promptId}`, {
    method: "PATCH",
    body: JSON.stringify({
      prompt: data.prompt,
      tag: data.tag,
    }),
  }).then((res) => res.json());
};

export const deletePromptById = (id: string) => {
  return fetch(`/api/prompt/${id}`, {
    method: "DELETE",
  });
};

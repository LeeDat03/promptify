import { z } from "zod";

export const FormSchema = z.object({
  prompt: z.string().min(20, {
    message: "Prompt needs at least 20 characters",
  }),
  tag: z.string(),
});

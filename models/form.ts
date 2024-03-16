import { z } from "zod";

export const FormSchema = z.object({
  _id: z.string().optional(),
  prompt: z.string().min(20, {
    message: "Prompt needs at least 20 characters",
  }),
  tag: z.string(),
});

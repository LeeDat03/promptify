"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { DefaultSessionId } from "@/utils/types";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

const FormSchema = z.object({
  prompt: z.string().min(20, {
    message: "Prompt needs at least 20 characters",
  }),
  tag: z.string(),
});

const FormPrompt = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      const respone = await fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          prompt: data.prompt,
          tag: data.tag,
          userId: (session as DefaultSessionId)?.user?.id,
        }),
      });

      console.log(respone);
      if (respone.ok) {
        router.push("/");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="prompt"
          render={({ field }) => {
            return (
              <FormItem className="mb-8">
                <FormLabel>Your AI Prompt</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Write your prompt here..."
                    className="h-[200px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        <FormField
          control={form.control}
          name="tag"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel className="text-slate-500">
                  Tag (#product, #web)
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Your tag help people find your prompt..."
                    className="h-22"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        <div className="mt-10 text-end sm:space-x-4">
          <Button variant="outline" size="md">
            Cancel
          </Button>
          <Button type="submit" variant="primary" size="md">
            Create
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default FormPrompt;

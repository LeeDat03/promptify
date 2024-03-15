"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FormSchema } from "@/models/form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

interface FormPropmptProps {
  type: "Create" | "Edit";
  submitting: boolean | undefined;
  onSubmit: (data: z.infer<typeof FormSchema>) => void;
}

const FormPrompt = ({ submitting, onSubmit, type }: FormPropmptProps) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  return (
    <div className="mt-14 self-start">
      <div className="mb-8">
        <h2 className="blue_gradient md:text-6xl text-4xl font-satoshi font-extrabold text-destructive-foreground">
          {type} Prompt
        </h2>
        <p className="desc">
          {type} and share amazing prompts with the world, and let your
          imagination run wild with any AI-powered platform.
        </p>
      </div>

      {/* FORM */}
      <div className="rounded-xl border border-gray-200 bg-white/20 backdrop-blur md:p-6 p-4 mb-10">
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
                        disabled={submitting}
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
                        disabled={submitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <div className="mt-10 text-end sm:space-x-4">
              <Button
                type="button"
                variant="outline"
                size="md"
                disabled={submitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                size="md"
                disabled={submitting}
              >
                {type}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default FormPrompt;

"use client";

import { z } from "zod";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import FormPrompt from "@/components/form-prompt";
import { FormSchema } from "@/models/form";
import { DefaultSessionId } from "@/utils/types";
import { toast } from "@/components/ui/use-toast";
import { useMutation } from "@tanstack/react-query";

const CreatePrompt = () => {
  const { data: session } = useSession();

  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async (data: z.infer<typeof FormSchema>) => {
      const response = await fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          prompt: data.prompt,
          tag: data.tag,
          userId: (session as DefaultSessionId)?.user?.id,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create prompt");
      }

      return response.json();
    },
    onError: (error: any) => {
      console.error(error);
      toast({
        description: "Failed to create prompt",
      });
    },
    onSuccess: () => {
      toast({
        description: "Prompt created successfully!",
        variant: "success",
      });
      router.push("/");
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      await mutation.mutateAsync(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <FormPrompt
      submitting={mutation.isPending}
      onSubmit={onSubmit}
      type="Create"
    />
  );
};

export default CreatePrompt;

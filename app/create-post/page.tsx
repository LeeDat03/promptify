"use client";

import { z } from "zod";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import FormPrompt from "@/components/form-prompt";
import { FormSchema } from "@/models/form";
import { DefaultSessionId } from "@/utils/types";
import { toast } from "@/components/ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import { createPrompt } from "@/utils/promptsAPI";

const CreatePrompt = () => {
  const { data: session } = useSession();

  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async ({
      data,
      userId,
    }: {
      data: z.infer<typeof FormSchema>;
      userId?: string;
    }) => createPrompt(data, userId as string),
    onError: (error: any) => {
      console.error(error);
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
      await mutation.mutateAsync({
        data,
        userId: (session as DefaultSessionId)?.user.id,
      });
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

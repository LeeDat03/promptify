"use client";

import { z } from "zod";
import { useRouter, useSearchParams } from "next/navigation";

import FormPrompt from "@/components/form-prompt";
import { FormSchema } from "@/models/form";
import { toast } from "@/components/ui/use-toast";
import Spinner from "@/components/loading/spinner";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getPromptById, updatePromptById } from "@/utils/promptsAPI";

const EditPrompt = () => {
  const promptId = useSearchParams().get("id");

  const router = useRouter();

  const {
    data: curPrompt,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["prompt", promptId],
    queryFn: () => getPromptById(promptId as string),
  });

  const mutation = useMutation({
    mutationFn: async ({
      data,
      promptId,
    }: {
      data: z.infer<typeof FormSchema>;
      promptId?: string;
    }) => updatePromptById(data, promptId as string),
    onError: (error: any) => {
      console.log(error);
    },
    onSuccess: () => {
      toast({
        description: "Prompt created successfully!",
        variant: "success",
      });
      router.push("/profile");
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      await mutation.mutateAsync({ data, promptId: promptId as string });
    } catch (err) {
      console.log(err);
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <p>Can not find prompt</p>;
  }

  return (
    <FormPrompt
      submitting={mutation.isPending}
      onSubmit={onSubmit}
      type="Edit"
      curValue={curPrompt}
    />
  );
};

export default EditPrompt;

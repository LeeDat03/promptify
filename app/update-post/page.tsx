"use client";

import { z } from "zod";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

import FormPrompt from "@/components/form-prompt";
import { FormSchema } from "@/models/form";
import { toast } from "@/components/ui/use-toast";

const EditPrompt = () => {
  const promptId = useSearchParams().get("id");

  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean | undefined>(false);
  const [curPrompt, setCurPrompt] = useState<z.infer<typeof FormSchema>>({
    prompt: "",
    tag: "",
  });

  useEffect(() => {
    const fetchPromptById = async () => {
      setIsLoading(true);
      const res = await fetch(`/api/prompt/${promptId}`);
      const data = await res.json();
      setCurPrompt(data);
      setIsLoading(false);
    };

    if (promptId) {
      fetchPromptById();
    }
  }, [promptId]);

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setSubmitting(true);
    try {
      const respone = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: data.prompt,
          tag: data.tag,
        }),
      });

      if (respone.ok) {
        toast({
          description: "Prompt edited successfully!",
          variant: "success",
        });
        router.push("/");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  // TODO:
  if (isLoading) {
    return <p>Loading....</p>;
  }

  return (
    <FormPrompt
      submitting={submitting}
      onSubmit={onSubmit}
      type="Edit"
      curValue={curPrompt}
    />
  );
};

export default EditPrompt;

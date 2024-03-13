"use client";

import { z } from "zod";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import FormPrompt from "@/components/form-prompt";
import { FormSchema } from "@/models/form";
import { DefaultSessionId } from "@/utils/types";
import { toast } from "@/components/ui/use-toast";

const CreatePrompt = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [submitting, setSubmitting] = useState<boolean | undefined>(false);

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setSubmitting(true);
    try {
      const respone = await fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          prompt: data.prompt,
          tag: data.tag,
          userId: (session as DefaultSessionId)?.user?.id,
        }),
      });

      if (respone.ok) {
        toast({
          description: "Prompt created successfully!",
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

  return (
    <FormPrompt submitting={submitting} onSubmit={onSubmit} type="Create" />
  );
};

export default CreatePrompt;

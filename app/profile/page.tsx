"use client";

import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { DefaultSessionId } from "@/utils/types";
import Profile from "@/components/profile";
import { toast } from "@/components/ui/use-toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import { deletePromptById, getPromptsByUserId } from "@/utils/promptsAPI";

const MyProfile = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const {
    data: prompts,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["user", (session as DefaultSessionId)?.user.id],
    queryFn: () => getPromptsByUserId((session as DefaultSessionId)?.user.id),
  });

  const mutation = useMutation({
    mutationFn: async (id: string) => deletePromptById(id),
    onError: (error: any) => {
      console.error(error);
    },
    onSuccess: async () => {
      await refetch();
      router.push("/profile");
      toast({
        description: "Prompt deleted!",
        variant: "success",
      });
    },
  });

  useEffect(() => {
    if (!session) {
      router.push("/");
    }
  }, [session, router]);

  const handleCardEdit = (id: string) => {
    router.push(`/update-post?id=${id}`);
  };

  const handleCardDelete = async (id: string) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );

    if (!hasConfirmed) return;

    try {
      await mutation.mutateAsync(id);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Profile
      name={`Hello, ${(session as DefaultSessionId)?.user.name}`}
      desc="Welcome back to your personalized profile page!"
      prompts={prompts || []}
      isLoading={isLoading}
      onCardEdit={handleCardEdit}
      onCardDelete={handleCardDelete}
    />
  );
};

export default MyProfile;

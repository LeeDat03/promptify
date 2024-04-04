"use client";

import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { DefaultSessionId } from "@/utils/types";
import Profile from "@/components/profile";
import { toast } from "@/components/ui/use-toast";
import { useQuery } from "@tanstack/react-query";
import { fetchPromptById } from "@/utils/promptsAPI";

const MyProfile = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const { data: prompts, isLoading } = useQuery({
    queryKey: ["prompt", (session as DefaultSessionId)?.user.id],
    queryFn: () => fetchPromptById((session as DefaultSessionId)?.user.id),
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
      await fetch(`/api/prompt/${id}`, {
        method: "DELETE",
      });
      toast({
        description: "Prompt deleted!",
        variant: "success",
      });
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

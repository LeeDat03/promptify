"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { DefaultSessionId, PromptProps } from "@/utils/types";
import Profile from "@/components/profile";
import { toast } from "@/components/ui/use-toast";

const MyProfile = () => {
  const [prompts, setPrompts] = useState<PromptProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (!session) {
      router.push("/");
    }
  }, [session, router]);

  useEffect(() => {
    let isMounted = true; // Flag to track component mount status

    const fetchPromptById = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(
          `/api/users/${(session as DefaultSessionId)?.user.id}/post`
        );
        const data = await res.json();
        if (isMounted) {
          setPrompts(data);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    if (session?.user && prompts.length === 0) {
      fetchPromptById();
    }

    return () => {
      isMounted = false;
    };
  }, [session, prompts]);

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
      const filterPrompt = prompts.filter((prompt) => prompt._id !== id);
      setPrompts(filterPrompt);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Profile
      name={`Hello, ${(session as DefaultSessionId)?.user.name}`}
      desc="Welcome back to your personalized profile page!"
      prompts={prompts}
      isLoading={isLoading}
      onCardEdit={handleCardEdit}
      onCardDelete={handleCardDelete}
    />
  );
};

export default MyProfile;

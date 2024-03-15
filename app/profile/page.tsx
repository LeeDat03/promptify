"use client";

import Profile from "@/components/profile";
import { DefaultSessionId, PromptProps } from "@/utils/types";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

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
    const fetchPromptById = async () => {
      const res = await fetch(
        `/api/users/${(session as DefaultSessionId)?.user.id}/post`
      );
      const data = await res.json();
      setPrompts(data);
    };

    if (session?.user) {
      setIsLoading(true);
      fetchPromptById();
      setIsLoading(false);
    }
  }, [session]);

  return (
    <Profile
      name={`Hello, ${(session as DefaultSessionId)?.user.name}`}
      desc="Welcome back to your personalized profile page!"
      prompts={prompts}
      isLoading={isLoading}
    />
  );
};

export default MyProfile;

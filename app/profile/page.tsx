"use client";

import Profile from "@/components/profile";
import { DefaultSessionId, PromptProps } from "@/utils/types";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

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

  // useEffect(() => {
  //   const fetchPromptById = async () => {
  //     setIsLoading(true);
  //     const res = await fetch(
  //       `/api/users/${(session as DefaultSessionId)?.user.id}/post`
  //     );
  //     const data = await res.json();
  //     setPrompts(data);
  //     setIsLoading(false);
  //   };

  //   if (session?.user) {
  //     fetchPromptById();
  //   }
  // }, [session]);

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

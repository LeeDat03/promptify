"use client";

import Profile from "@/components/profile";
import { PromptProps } from "@/utils/types";
import { usePathname, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const UserProfile = () => {
  const [prompts, setPrompts] = useState<PromptProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const pathname = usePathname();
  const userName = useSearchParams().get("name");

  const userId = pathname.split("/")[2];

  useEffect(() => {
    const fetchPromptById = async () => {
      setIsLoading(true);
      const res = await fetch(`/api/users/${userId}/post`);
      const data = await res.json();
      setPrompts(data);
      setIsLoading(false);
    };

    if (userId) {
      fetchPromptById();
    }
  }, [userId]);

  return (
    <Profile
      name={userName}
      desc={`Welcome to ${userName}'s personalized profile page. Explore ${userName}'s exceptional prompts and be inspired by the power of their imagination.`}
      prompts={prompts}
      isLoading={isLoading}
    />
  );
};

export default UserProfile;

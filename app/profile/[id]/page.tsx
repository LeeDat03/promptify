"use client";

import { usePathname, useSearchParams } from "next/navigation";
import React from "react";

import Profile from "@/components/profile";
import { useQuery } from "@tanstack/react-query";
import { getPromptsByUserId } from "@/utils/promptsAPI";

const UserProfile = () => {
  const pathname = usePathname();
  const userName = useSearchParams().get("name");

  const userId = pathname.split("/")[2];

  const { data: prompts, isLoading } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => getPromptsByUserId(userId),
  });

  return (
    <Profile
      name={userName}
      desc={`Welcome to ${userName}'s personalized profile page. Explore ${userName}'s exceptional prompts and be inspired by the power of their imagination.`}
      prompts={prompts || []}
      isLoading={isLoading}
    />
  );
};

export default UserProfile;

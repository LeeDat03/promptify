"use client";
import { useEffect, useState } from "react";

import PromptCard from "./prompt-card";
import SkeletonCard from "./loading/skeleton-card-prompt";

export interface User {
  username: string;
  email: string;
  image: string;
}

export interface PromptProps {
  creator: User;
  prompt: string;
  tag: string;
}

const PromptCardList = () => {
  const [prompts, setPrompts] = useState<PromptProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean | undefined>(true);

  useEffect(() => {
    setIsLoading(true);
    const fetchPosts = async () => {
      const res = await fetch("/api/prompt");
      const data = await res.json();

      setPrompts(data);
    };
    fetchPosts();
    setIsLoading(false);
  }, []);

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 sm:grid-cols-2 gap-6 mb-40">
      {isLoading ? (
        <>
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </>
      ) : (
        prompts.map((prompt: PromptProps, index: number) => {
          return <PromptCard key={index} promptContent={prompt} />;
        })
      )}
    </div>
  );
};

export default PromptCardList;

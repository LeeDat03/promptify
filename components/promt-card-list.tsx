"use client";
import { useEffect, useState } from "react";

import PromptCard from "./prompt-card";
import SkeletonCardList from "./loading/skeleton-card-list";

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
  const [isLoading, setIsLoading] = useState<boolean | undefined>(false);

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
    <div className="xl:columns-3 sm:columns-2 mb-40 space-y-6 md:gap-6 ">
      {isLoading ? (
        <SkeletonCardList />
      ) : (
        prompts.map((prompt: PromptProps, index: number) => {
          return <PromptCard key={index} promptContent={prompt} />;
        })
      )}
    </div>
  );
};

export default PromptCardList;

"use client";

import PromptCard from "./prompt-card";
import SkeletonCardList from "./loading/skeleton-card-list";
import { PromptProps } from "@/utils/types";

interface PromptCardListProps {
  prompts: PromptProps[];
  isLoading: boolean;
}

const PromptCardList = ({ prompts, isLoading }: PromptCardListProps) => {
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

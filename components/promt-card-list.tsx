import { PromptProps } from "@/utils/types";
import PromptCard from "./prompt-card";
import SkeletonCardList from "./loading/skeleton-card-list";

interface PromptCardListProps {
  prompts: PromptProps[];
  isLoading: boolean;
  onCardEdit: (id: string) => void;
  onCardDelete: (id: string) => void;
}

const PromptCardList = ({
  prompts,
  isLoading,
  onCardEdit,
  onCardDelete,
}: PromptCardListProps) => {
  return (
    <div className="xl:columns-3 sm:columns-2 mb-40 space-y-6 md:gap-6 ">
      {isLoading ? (
        <SkeletonCardList />
      ) : (
        prompts.map((prompt: PromptProps, index: number) => {
          return (
            <PromptCard
              key={index}
              promptContent={prompt}
              onCardEdit={onCardEdit}
              onCardDelete={onCardDelete}
            />
          );
        })
      )}
    </div>
  );
};

export default PromptCardList;

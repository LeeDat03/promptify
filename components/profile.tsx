import React from "react";
import PromptCardList from "./promt-card-list";
import { PromptProps } from "@/utils/types";

interface ProfileProps {
  name: string | null;
  desc: string;
  prompts: PromptProps[];
  isLoading: boolean;
}

const Profile: React.FC<ProfileProps> = ({
  name,
  desc,
  isLoading,
  prompts,
}) => {
  return (
    <div className="mt-14 self-start">
      <div className="mb-14">
        <h2 className="blue_gradient md:text-6xl text-4xl font-extrabold py-2 ">
          {name}
        </h2>
        <p className="desc">{desc}</p>
      </div>

      <PromptCardList prompts={prompts} isLoading={isLoading} />
    </div>
  );
};

export default Profile;

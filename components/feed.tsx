"use client";

import { PromptProps } from "@/utils/types";
import PromptCardList from "./promt-card-list";

import { useEffect, useState } from "react";

const Feed = () => {
  const [prompts, setPrompts] = useState<PromptProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

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
    <section className="flex flex-col justify-center items-center md:gap-20 gap-12">
      <form className="flex justify-center items-center w-full md:w-3/5 mx-auto ">
        <input
          type="text"
          placeholder="Search for a tag or some keywords..."
          required
          className="block w-full rounded-xl py-2.5 pl-5 pr-12 font-satoshi text-sm shadow-lg text-gray-700 font-normal border border-gray-300 bg-white focus:outline-none focus:ring-1 focus:ring-gray-500"
        />
      </form>

      <PromptCardList prompts={prompts} isLoading={isLoading} />
    </section>
  );
};

export default Feed;

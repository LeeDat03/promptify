"use client";

import qs from "query-string";
import { useEffect, useState } from "react";

import { useDebounce } from "@/hooks/useDebounce";
import { useRouter, useSearchParams } from "next/navigation";

import PromptCardList from "./promt-card-list";
import { PromptProps } from "@/utils/types";

const Feed = () => {
  const [searchText, setSearchText] = useState<string>("");
  let deboucedValue = useDebounce(searchText);

  const searchValue = useSearchParams().get("search");

  const router = useRouter();

  const [prompts, setPrompts] = useState<PromptProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // CHANGE URL
  useEffect(() => {
    const url = qs.stringifyUrl(
      { url: "/", query: { search: deboucedValue } },
      {
        skipEmptyString: true,
        skipNull: true,
      }
    );
    router.push(url);
  }, [deboucedValue, router]);

  // FETCH PROMPTS
  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);

      let res;
      if (!searchValue) {
        res = await fetch("/api/prompt");
      } else {
        res = await fetch(`/api/prompt?search=${searchValue}`);
      }

      const data = await res.json();

      setPrompts(data);
      setIsLoading(false);
    };

    fetchPosts();
  }, [searchValue]);

  const handleSearchText = (value: string) => {
    setSearchText(value);
  };

  return (
    <section className="flex flex-col justify-center items-center md:gap-20 gap-12">
      <form className="flex justify-center items-center w-full md:w-3/5 mx-auto">
        <input
          type="text"
          placeholder="Search for a tag or some keywords..."
          required
          className="block w-full rounded-xl py-2.5 pl-5 pr-12 font-satoshi text-sm shadow-lg text-gray-700 font-normal border border-gray-300 bg-white focus:outline-none focus:ring-1 focus:ring-gray-500"
          value={searchText}
          onChange={(e) => handleSearchText(e.target.value)}
        />
      </form>

      <PromptCardList
        prompts={prompts}
        isLoading={isLoading}
        onChangeSearchText={handleSearchText}
      />
    </section>
  );
};

export default Feed;

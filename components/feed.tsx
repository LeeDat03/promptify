"use client";

import qs from "query-string";
import { FormEvent, useEffect, useState } from "react";

import { useDebounce } from "@/hooks/useDebounce";
import { useRouter, useSearchParams } from "next/navigation";

import PromptCardList from "./promt-card-list";
import { PromptProps } from "@/utils/types";
import SkeletonCardList from "./loading/skeleton-card-list";
import { useQuery } from "@tanstack/react-query";

const fetchPrompts = (searchValue?: string): Promise<PromptProps[]> => {
  if (!searchValue) {
    return fetch("/api/prompt").then((res) => res.json());
  }

  return fetch(`/api/prompt?search=${searchValue}`).then((res) => res.json());
};

const Feed = () => {
  const [searchText, setSearchText] = useState<string>("");
  let deboucedValue = useDebounce(searchText);

  const searchValue = useSearchParams().get("search");

  const router = useRouter();

  const { data: prompts, isLoading } = useQuery({
    queryKey: ["prompt", searchValue],
    queryFn: () => fetchPrompts(searchValue || ""),
    refetchInterval: 60000,
  });

  // CHANGE URL
  useEffect(() => {
    const url = qs.stringifyUrl(
      { url: "/", query: { search: deboucedValue } },
      {
        skipEmptyString: true,
        skipNull: true,
      }
    );
    router.push(url, { scroll: false });
  }, [deboucedValue, router]);

  const handleSearchText = (value: string) => {
    setSearchText(value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  if (isLoading) {
    <SkeletonCardList />;
  }

  return (
    <section className="flex flex-col justify-center items-center md:gap-20 gap-12">
      <form
        className="flex justify-center items-center w-full md:w-3/5 mx-auto"
        onSubmit={handleSubmit}
      >
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
        prompts={prompts || []}
        isLoading={isLoading}
        onChangeSearchText={handleSearchText}
      />
    </section>
  );
};

export default Feed;

import React from "react";
import PromptCard from "./prompt-card";

// @apply mt-16 mx-auto w-full max-w-xl flex justify-center items-center flex-col gap-2;

const Feed = () => {
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

      <div className="space-y-6 py-8 xl:columns-3 sm:columns-2 sm:gap-6 mb-40">
        <PromptCard />
        <PromptCard />
        <PromptCard />
        <PromptCard />
        <PromptCard />
        <PromptCard />
        <PromptCard />
        <PromptCard />
        <PromptCard />
      </div>
    </section>
  );
};

export default Feed;

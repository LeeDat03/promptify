import Feed from "@/components/feed";
import SkeletonCardList from "@/components/loading/skeleton-card-list";
import { Suspense } from "react";

const page = () => {
  return (
    <section className="w-full">
      <div className="flex flex-col items-center md:my-14 my-8">
        <h1 className="head_text text-center">
          Discover & Share <br className="hidden md:block" />
          <span className="orange_gradient">AI-Powered Prompts</span>
        </h1>
        <p className="desc text-center">
          Propmtopia is an open-source AI prompting tool for modern wold to
          discover, create and share creative prompts.
        </p>
      </div>

      <Suspense fallback={<SkeletonCardList />}>
        <Feed />
      </Suspense>
    </section>
  );
};

export default page;

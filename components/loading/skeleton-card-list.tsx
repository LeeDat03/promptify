import React from "react";
import SkeletonCard from "./skeleton-card-prompt";

const SkeletonCardList = () => {
  return (
    <>
      <SkeletonCard height={250} />
      <SkeletonCard height={125} />
      <SkeletonCard height={400} />
      <SkeletonCard height={350} />
      <SkeletonCard height={250} />
      <SkeletonCard height={250} />
    </>
  );
};

export default SkeletonCardList;

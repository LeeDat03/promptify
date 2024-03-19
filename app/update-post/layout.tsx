import Spinner from "@/components/loading/spinner";
import React, { Suspense } from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return <Suspense fallback={<Spinner />}>{children}</Suspense>;
};

export default layout;

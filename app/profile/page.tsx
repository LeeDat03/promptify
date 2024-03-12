"use client";

import { useSession } from "next-auth/react";
import React, { ReactNode } from "react";

const MyProfile = () => {
  const { data: session } = useSession();

  return <div>{JSON.stringify(session)}</div>;
};

export default MyProfile;

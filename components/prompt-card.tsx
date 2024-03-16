"use client";

import React, { useState } from "react";
import { FaRegCopy } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa6";
import Image from "next/image";
import { useSession } from "next-auth/react";

import { formatTag } from "@/lib/utils";
import { DefaultSessionId, PromptProps } from "@/utils/types";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "./ui/button";

interface PromptCardProps {
  key?: number;
  promptContent: PromptProps;
}

const PromptCard: React.FC<PromptCardProps> = ({ promptContent }) => {
  const {
    creator: { username, email, image, _id: creatorId },
    prompt,
    tag,
    _id: promptId,
  } = promptContent;
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  // TODO:
  const [coppied, setCoppied] = useState<string | undefined>("");

  const handleCopy = () => {
    setCoppied(prompt);
    navigator.clipboard.writeText(prompt);

    setTimeout(() => {
      setCoppied("");
    }, 3000);
  };

  const handleCardClick = () => {
    const userId = (session as DefaultSessionId)?.user?.id;
    const profilePath =
      userId === creatorId
        ? "/profile"
        : `/profile/${creatorId}?name=${username}`;

    router.push(profilePath);
  };

  const handleCardEdit = () => {
    router.push(`/update-post?id=${promptId}`);
  };

  return (
    <div className="prompt_card">
      <div className="flex justify-between">
        <div
          className="flex relative items-center gap-2 md:gap-4  cursor-pointer"
          onClick={handleCardClick}
        >
          <Image
            src={image}
            width={30}
            height={30}
            alt="User Logo"
            className="rounded-full w-[30px] h-[30px] object-cover"
            loading="lazy"
          />

          <div>
            <h3 className="font-satoshi font-bold text-xl tracking-normal">
              {username}
            </h3>
            <p className="text-sm text-gray-400 font-semibold ">{email}</p>
          </div>
        </div>

        <span
          className="cursor-pointer bg-slate-100 w-7 h-7 rounded-full flex items-center justify-center text-primary-orange text-sm"
          onClick={handleCopy}
        >
          {coppied ? <FaCheck /> : <FaRegCopy />}
        </span>
      </div>

      <p className="my-6 text-base font-inter">{prompt}</p>

      <div>
        {/* <p className="text-sm text-slate-400">Mar 9, 2024</p> */}
        <p className="blue_gradient inline-block text-sm cursor-pointer">
          {formatTag(tag)}
        </p>
      </div>

      {(session as DefaultSessionId)?.user.id === creatorId &&
        pathname === "/profile" && (
          <div className="text-end space-x-4 mt-3 border-t-2 border-t-slate-500 pt-2">
            <Button
              size="sm"
              className="bg-green-400 text-white rounded-lg hover:bg-green-500 "
              onClick={handleCardEdit}
            >
              Edit
            </Button>
            <Button
              size="sm"
              className="bg-red-400 text-white rounded-lg hover:bg-red-500 "
            >
              Delete
            </Button>
          </div>
        )}
    </div>
  );
};

export default PromptCard;

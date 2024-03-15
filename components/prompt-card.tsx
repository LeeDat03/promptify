"use client";

import React, { useState } from "react";
import { FaRegCopy } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa6";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";

import { formatTag } from "@/lib/utils";
import { DefaultSessionId, PromptProps } from "@/utils/types";
import { useRouter } from "next/navigation";

interface PromptCardProps {
  key?: number;
  promptContent: PromptProps;
}

const PromptCard: React.FC<PromptCardProps> = ({ promptContent }) => {
  const {
    creator: { username, email, image, _id: creatorId },
    prompt,
    tag,
  } = promptContent;
  const { data: session } = useSession();
  const router = useRouter();

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

  return (
    <div className="prompt_card">
      <div className="flex justify-between">
        <div
          className="flex relative items-center gap-4 cursor-pointer"
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
    </div>
  );
};

export default PromptCard;

"use client";

import React, { useState } from "react";
import { FaRegCopy } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa6";
import Image from "next/image";
import Link from "next/link";

import { PromptProps } from "./promt-card-list";
import { formatTag } from "@/lib/utils";

interface PromptCardProps {
  key?: number;
  promptContent: PromptProps;
}

const PromptCard: React.FC<PromptCardProps> = ({ promptContent }) => {
  const {
    creator: { username, email, image },
    prompt,
    tag,
  } = promptContent;

  // TODO:
  const [coppied, setCoppied] = useState(false);

  return (
    <div className="prompt_card">
      <div className="flex justify-between">
        <Link href="/profile" className="flex relative items-center gap-4">
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
        </Link>

        <span
          className="cursor-pointer bg-slate-100 w-7 h-7 rounded-full flex items-center justify-center text-primary-orange text-sm"
          onClick={() => {
            setCoppied((prev) => !prev);
          }}
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

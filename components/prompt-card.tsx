"use client";
import { FaCheck } from "react-icons/fa6";
import { FaRegCopy } from "react-icons/fa6";

import React, { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { formatTag } from "@/lib/utils";
import { DefaultSessionId, PromptProps } from "@/utils/types";
import { Button } from "./ui/button";

interface PromptCardProps {
  key?: number;
  promptContent: PromptProps;
  onCardEdit?: (id: string) => void;
  onCardDelete?: (id: string) => void;
  onChangeSearchText?: (id: string) => void;
}

const PromptCard: React.FC<PromptCardProps> = ({
  promptContent,
  onCardEdit,
  onCardDelete,
  onChangeSearchText,
}) => {
  const {
    creator: { username, email, image, _id: creatorId },
    prompt,
    tag,
    _id: promptId,
  } = promptContent;

  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();

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

  const handleTagClick = (value: string) => {
    const valueFormat = value.slice(1);

    if (onChangeSearchText) {
      onChangeSearchText(valueFormat);
    }
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
          className="cursor-pointer bg-slate-100 dark:bg-[#303030] w-8 h-8 rounded-full flex items-center justify-center text-primary-orange text-sm"
          onClick={handleCopy}
        >
          {coppied ? <FaCheck /> : <FaRegCopy />}
        </span>
      </div>

      <p className="my-6 text-base font-inter">{prompt}</p>

      <div>
        {/* <p className="text-sm text-slate-400">Mar 9, 2024</p> */}
        <p className="dark:text-sky-400 text-sky-600 inline-block text-sm cursor-pointer">
          {formatTag(tag).map((t, index) => {
            return (
              <span
                key={index}
                onClick={(e) =>
                  handleTagClick(e.currentTarget.textContent as string)
                }
              >
                {t}{" "}
              </span>
            );
          })}
        </p>
      </div>

      {(session as DefaultSessionId)?.user.id === creatorId &&
        pathname === "/profile" && (
          <div className="text-end space-x-4 mt-3 border-t-2 border-t-slate-500 pt-2">
            <Button
              size="sm"
              className="bg-green-400 text-white rounded-lg hover:bg-green-500 "
              onClick={() => onCardEdit && onCardEdit(promptId)}
            >
              Edit
            </Button>
            <Button
              size="sm"
              className="bg-red-400 text-white rounded-lg hover:bg-red-500 "
              onClick={() => onCardDelete && onCardDelete(promptId)}
            >
              Delete
            </Button>
          </div>
        )}
    </div>
  );
};

export default PromptCard;

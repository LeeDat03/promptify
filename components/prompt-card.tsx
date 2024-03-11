"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { FaRegCopy } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa6";

const PromptCard = () => {
  const [coppied, setCoppied] = useState(false);

  return (
    <div className="prompt_card">
      <div className="flex justify-between">
        <Link href="/profile" className="flex relative items-center gap-4">
          <Image
            src="/logo.png"
            width={30}
            height={30}
            alt="User Logo"
            className="rounded-full w-[30px] h-[30px] object-cover"
          />

          <div>
            <h3 className="font-satoshi font-bold text-xl tracking-normal">
              Le Thanh Dat B21DCVT115
            </h3>
            <p className="text-sm text-gray-400 font-semibold ">
              leedat104517@gmail.com
            </p>
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

      <p className="my-6 text-base font-inter">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
        pellentesque, odio vel ullamcorper tincidunt, nunc odio scelerisque
        libero, et luctus odio odio sit amet libero. Nulla pellentesque, odio
        vel ullamcorper tincidunt, nunc odio scelerisque libero, et luctus odio
        odio sit amet libero.
      </p>

      <div>
        <p className="text-sm text-slate-400">Mar 9, 2024</p>
        <p className="blue_gradient text-sm cursor-pointer">#dev</p>
      </div>
    </div>
  );
};

export default PromptCard;

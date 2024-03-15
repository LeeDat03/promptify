"use client";

import Link from "next/link";
import Image from "next/image";
import { Session } from "next-auth";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

import { signOut } from "next-auth/react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";

type ImageSrc = string | StaticImport;

interface UserDropDownProps {
  session: Session | null;
}

const UserDropDown = ({ session }: UserDropDownProps) => {
  const handlerSignout = () => signOut();

  return (
    <div className="flex justify-center items-center gap-6">
      <div className="hidden md:flex justify-center items-center gap-6">
        <Button variant="primary" size="md" asChild>
          <Link href="/create-post">Create Post</Link>
        </Button>
        <Button size="md" variant="outline" onClick={handlerSignout}>
          Sign out
        </Button>
      </div>

      {/* DESKTOP */}
      <Link href="/profile" className="hidden md:block">
        <Image
          src={session?.user.image as ImageSrc}
          alt="User avatar"
          width={40}
          height={40}
          className="rounded-full"
          loading="lazy"
        />
      </Link>

      {/* MOBILE */}
      <div className="block md:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Image
              src={session?.user?.image as ImageSrc}
              width={40}
              height={40}
              className="rounded-full cursor-pointer"
              alt="User Logo"
              loading="lazy"
            />
          </DropdownMenuTrigger>

          <DropdownMenuContent>
            <DropdownMenuItem>
              <Link href="/profile">My profile</Link>
            </DropdownMenuItem>

            <DropdownMenuItem>
              <Link href="/create-post">Create Post</Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator />
            <Button variant="primary" size="sm" onClick={handlerSignout}>
              Sign out
            </Button>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default UserDropDown;

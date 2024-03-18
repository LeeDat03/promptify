"use client";

import Image from "next/image";
import Link from "next/link";

import { Button } from "./ui/button";
import UserDropDown from "./user-dropdown";
import { signIn, useSession } from "next-auth/react";
import { ModeToggle } from "./mode-toggle";

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <nav className="flex justify-between w-full my-3 items-center">
      <div className="flex md:space-x-6 space-x-4 items-center">
        <Link href="/">
          <div className="flex items-center space-x-2">
            <Image
              src="/logo.png"
              alt="Logo"
              width={40}
              height={40}
              loading="lazy"
              className="md:w-10 md:h-10 w-8 h-8"
            />
            <p className="font-semibold md:text-xl text-md">Promptify</p>
          </div>
        </Link>
        <ModeToggle />
      </div>

      {session?.user ? (
        <UserDropDown session={session} />
      ) : (
        <Button variant="primary" size="md" onClick={() => signIn()}>
          Sign in
        </Button>
      )}
    </nav>
  );
};

export default Navbar;

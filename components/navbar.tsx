"use client";

import Image from "next/image";
import Link from "next/link";

import { Button } from "./ui/button";
import UserDropDown from "./user-dropdown";
import { signIn, useSession } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <nav className="flex justify-between w-full my-3 items-center">
      <Link href="/">
        <div className="flex items-center space-x-4">
          <Image
            src="/logo.png"
            alt="Logo"
            width={40}
            height={40}
            loading="lazy"
          />
          <p className="font-semibold text-xl">Promptify</p>
        </div>
      </Link>

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

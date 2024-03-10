"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "./ui/button";
import UserDropDown from "./user-dropdown";

const Navbar = () => {
  const [loggedIn, setLoggedIn] = useState(true);

  return (
    <nav className="flex justify-between w-full my-3 items-center">
      <Link href="/">
        <div className="flex items-center space-x-4">
          <Image src="/logo.png" alt="Logo" width={40} height={40} />
          <p className="font-semibold text-xl">Promptify</p>
        </div>
      </Link>

      {loggedIn ? (
        <UserDropDown />
      ) : (
        <Button variant="primary" size="md">
          Sign in
        </Button>
      )}
    </nav>
  );
};

export default Navbar;

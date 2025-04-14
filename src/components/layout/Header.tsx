"use client";

import React from "react";
import Logo from "../common/Logo";
import { ModeToggle } from "../common/ModeToggel";
import { Button } from "../ui/button";
import Link from "next/link";
import { UserToggle } from "../common/UserToggle";

const Header = () => {
  const session = null;

  return (
    <div className="container mx-auto flex items-center justify-between p-5 sm:py-10">
      <Logo />
      <div className="flex items-center gap-3">
        {session ? (
          <>
            <UserToggle email={session?.user?.email as string} />
          </>
        ) : (
          <Link href="/login">
            <Button className="font-bold px-5">Login</Button>
          </Link>
        )}
        <ModeToggle />
      </div>
    </div>
  );
};

export default Header;

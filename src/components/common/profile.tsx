"use client";

import Link from "next/link";
import Image from "next/image";

import { useSession } from "next-auth/react";

import { type Session } from "next-auth";
import { Button } from "../ui/button";
import LogoutButton from "./logout-button";

export default function Profile() {
  const { data: session } = useSession();

  return (
    <div className="flex w-full items-center justify-between">
      {session ? (
        <>
          <Avatar session={session} />
          <LogoutButton />
        </>
      ) : (
        <div className="mx-auto my-2 flex text-center">
          <Link href="/login">
            <Button>Login</Button>
          </Link>
        </div>
      )}
    </div>
  );
}

function Avatar({ session }: { session: Session }) {
  return (
    <div className="flex w-full flex-1 items-center space-x-3 rounded-lg px-2 py-1.5 transition-all duration-150 ease-in-out">
      <Image
        src={session.user.image!}
        width={40}
        height={40}
        alt={session.user.name ?? "User avatar"}
        className="h-6 w-6 rounded-full"
      />
      <span className="truncate text-sm font-medium">{session.user.name}</span>
    </div>
  );
}

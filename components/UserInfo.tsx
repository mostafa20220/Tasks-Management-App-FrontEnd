"use client";

import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { SubmitButton } from "./SubmitBtn";

export default function UserInfo() {
  const { data: session } = useSession();

  if (!session)
    return (
      <Link
        href={"/auth/signin"}
        className="btn btn-outline border-none bg-green-700"
      >
        Sign In
      </Link>
    );

  return (
    <div className="items-center flex gap-4 px-1 ">
      {session.user.avatar && (
        <div className="flex items-center content-center gap-4">
          <p className="text-lg capitalize hidden sm:block">
            {session.user.name}
          </p>
          <Image
            className="chat-image rounded-lg"
            alt={`${session.user.email}`}
            src={`${session.user.avatar || ""}`}
            width={40}
            height={40}
          />
        </div>
      )}
      <form action={signOut}>
        <SubmitButton className="bg-red-500 rounded-xl btn btn-outline border-none  text-gray-200 font-bold px-4 py-3 min-h-0 h-fit">
          Log Out
        </SubmitButton>
      </form>
    </div>
  );
}

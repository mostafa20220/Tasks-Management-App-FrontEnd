"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export const useRefreshToken = () => {
  const { data: session, update } = useSession();

  const refreshToken = async () => {
    let res = await fetch("http://localhost:3030/auth/refresh", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session?.tokens?.refreshToken}`,
      },
    });

    res = await res.json();

    if (session && res.tokens ) {
      update({
        ...session,
        tokens: {
          accessToken: res.tokens.accessToken,
          refreshToken: res.tokens.refreshToken,
        },
        isUpdated: true,
      });

      return res.tokens;
    } else {
      console.error("Failed to refresh tokens");
      signOut();
      redirect("/auth/signin");
    }
  };
  return refreshToken;
};

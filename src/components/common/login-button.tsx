"use client";

import { useState } from "react";
import { BsGithub, BsGoogle } from "react-icons/bs";
import { signIn } from "next-auth/react";

import LoadingSpinner from "./loading-spinner";
import { Button } from "@chakra-ui/react";

export default function LoginButton() {
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <div className="mt-2 flex flex-col space-y-2">
      {/* github login */}
      <Button
        disabled={loading}
        onClick={() => {
          setLoading(true);
          void signIn("github", { callbackUrl: "/" });
        }}
        variant={"outline"}
        className="w-full"
      >
        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            <BsGithub className="mr-2" />
            GitHub
          </>
        )}
      </Button>
      {/* google login */}
      <Button
        disabled={loading}
        onClick={() => {
          setLoading(true);
          void signIn("google", { callbackUrl: "/" });
        }}
        variant={"outline"}
        className="w-full"
      >
        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            <BsGoogle className="mr-2" />
            Google
          </>
        )}
      </Button>
    </div>
  );
}

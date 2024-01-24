"use client";

import { useSession } from "next-auth/react";
import { unstable_noStore as noStore } from "next/cache";

export default function Home() {
  const { data: session } = useSession();
  noStore();
  const makeApiCall = async () => {
    await fetch("/api/test", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: "test" }),
    }).then(async (res) => {
      const data = (await res.json()) as string;
      console.log(data);
    });
  };
  return <main className="">main page</main>;
}

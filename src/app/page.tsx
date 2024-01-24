"use client";
import { useSession } from "next-auth/react";
import LoginCard from "~/components/common/login-card";

export default function Home() {
  const { data: session } = useSession();
  // const session = getServerAuthSession();
  // const makeApiCall = async () => {
  //   await fetch("/api/test", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ data: "test" }),
  //   }).then(async (res) => {
  //     const data = (await res.json()) as string;
  //     console.log(data);
  //   });
  // };
  if (!session) {
    return <LoginCard />;
  }

  return (
    <main className="">
      <h1>hello</h1>
    </main>
  );
}

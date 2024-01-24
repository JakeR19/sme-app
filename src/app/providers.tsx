"use client";

import { SessionProvider } from "next-auth/react";

// providers need to be on client side so we make separate file here
export default function Providers({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}

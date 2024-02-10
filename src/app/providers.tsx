"use client";

import { SessionProvider } from "next-auth/react";
import { ChakraProvider } from "@chakra-ui/react";
import { Toaster } from "sonner";

// providers need to be on client side so we make separate file here
export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider>
      <SessionProvider>
        {children}
        <Toaster />
      </SessionProvider>
    </ChakraProvider>
  );
}

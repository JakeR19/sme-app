"use client";

import { cn } from "~/lib/utils";
import NavigationBar from "./navigation-bar";
import Profile from "./profile";
import { useSession } from "next-auth/react";

interface LayoutProps {
  children: React.ReactNode;
  customWidth?: string;
}

export default function PageLayout({
  children,
  customWidth = "1000",
}: LayoutProps) {
  const { data: session } = useSession();
  if (!session) {
    return children;
  }

  return (
    <div className="flex flex-col lg:flex-row">
      <div className="sticky top-0 z-20">
        <aside className="sticky top-0 hidden h-screen lg:block">
          <NavigationBar>
            <Profile />
          </NavigationBar>
        </aside>
      </div>

      <main className="mx-auto flex h-full w-full flex-col items-center gap-6 px-4 py-8 sm:px-6 sm:pt-12 lg:px-8">
        <div
          style={{ maxWidth: customWidth + "px" }}
          className={cn("w-[90vw] lg:w-[60vw]", "flex flex-col gap-8")}
        >
          {children}
        </div>
      </main>
    </div>
  );
}

export function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-lg border-[1px] border-gray-200 bg-white p-5">
      <div className="w-[100%] pb-5">{children}</div>
    </div>
  );
}

"use client";

import { Bot, Grid, MessageCircleQuestion } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "~/lib/utils";

export default function NavigationBar({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const navigationMap = [
    {
      icon: <Grid size={18} />,
      name: "Dashboard",
      href: "/",
    },
    {
      icon: <MessageCircleQuestion size={18} />,
      name: "Questionnaire",
      href: "/questionnaire",
    },
    {
      icon: <Bot size={18} />,
      name: "AI Chat",
      href: "/chat",
    },
  ];

  return (
    <div className="flex h-screen min-h-0 w-56 flex-1 flex-col border-r border-gray-200 bg-white">
      <div className="flex flex-1 flex-col overflow-y-auto pb-4 pt-5">
        <div className="flex border-b border-slate-200 px-4 pb-4">
          <Link href="/" className="flex gap-2">
            <h2 className="my-auto font-bold text-black">SME</h2>
          </Link>
        </div>
        <nav className="mt-5 flex-1 space-y-1 bg-white px-2">
          <div className="grid gap-2">
            {navigationMap.map(({ name, href, icon }) => (
              <Link
                key={name}
                href={href}
                className={cn(
                  // if current url equals to pathname in nav map make it apparant
                  pathname === href ? "border bg-gray-100 shadow-sm" : "",
                  `flex items-center space-x-3 rounded-lg px-2`,
                  `py-1.5 transition-all duration-150 ease-in-out`,
                  `hover:bg-gray-100 active:bg-slate-200`,
                )}
              >
                <div>{icon}</div>
                <span className="text-sm font-medium">{name}</span>
              </Link>
            ))}
          </div>
        </nav>
      </div>
      <div>
        <div className="mt-2 border-t border-slate-200" />
        <div className="p-3">{children}</div>
      </div>
    </div>
  );
}

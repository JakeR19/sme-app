"use client";

import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <button
      onClick={() => void signOut({ callbackUrl: "/" })}
      className="rounded-lg p-1.5 text-stone-700 transition-all duration-150 ease-in-out
       hover:bg-slate-100 active:bg-slate-200"
    >
      <LogOut width={18} />
    </button>
  );
}

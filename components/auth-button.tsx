"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export function SignOutButton({ email }: { email: string }) {
  const router = useRouter();

  const handleSignOut = async () => {
    await fetch("/auth/signout", {
      method: "POST",
    });
    router.refresh();
  };

  return (
    <div className="flex items-center space-x-3">
      <span className="text-sm text-muted hidden md:inline">{email}</span>
      <button
        onClick={handleSignOut}
        className="btn-skeu px-4 py-2 rounded-lg text-white font-semibold flex items-center space-x-2"
      >
        <LogOut className="w-4 h-4" />
        <span>로그아웃</span>
      </button>
    </div>
  );
}

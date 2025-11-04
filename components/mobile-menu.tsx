"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import type { User } from "@supabase/supabase-js";
import { SignOutButton } from "./auth-button";

interface MobileMenuProps {
  user: User | null;
}

export function MobileMenu({ user }: MobileMenuProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="md:hidden p-2 rounded-lg hover:bg-surface transition-all"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="메뉴"
      >
        {isMobileMenuOpen ? (
          <X className="w-6 h-6 text-foreground" />
        ) : (
          <Menu className="w-6 h-6 text-foreground" />
        )}
      </button>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 border-t border-gray-200 bg-white shadow-lg">
          <div className="px-4 py-4 space-y-2">
            {user ? (
              <div className="w-full">
                <SignOutButton email={user.email || ""} />
              </div>
            ) : (
              <Link
                href="/login"
                className="w-full btn-skeu px-4 py-3 rounded-lg text-white font-semibold block text-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                로그인
              </Link>
            )}
          </div>
        </div>
      )}
    </>
  );
}

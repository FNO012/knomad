import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { MobileMenu } from "./mobile-menu";
import { SignOutButton } from "./auth-button";

export async function Navigation() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="card-skeu px-3 py-2 hover:scale-105 transition-transform">
              <span className="text-xl font-bold text-primary">🏠 한국노마드</span>
            </div>
          </Link>

          {/* Right Section */}
          <div className="hidden md:flex items-center space-x-3">
            {user ? (
              <SignOutButton email={user.email || ""} />
            ) : (
              <Link href="/login" className="btn-skeu px-6 py-2 rounded-lg text-white font-semibold">
                로그인
              </Link>
            )}
          </div>

          {/* Mobile Menu */}
          <MobileMenu user={user} />
        </div>
      </div>
    </nav>
  );
}

"use client";

import { Menu, Search, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { label: "🏙️ 도시탐색", href: "/cities" },
    { label: "📊 랭킹", href: "/ranking" },
    { label: "🗺️ 지도", href: "/map" },
    { label: "👥 커뮤니티", href: "/community" },
  ];

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

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-4 py-2 rounded-lg text-muted hover:text-primary hover:bg-surface transition-all font-medium"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right Section */}
          <div className="hidden md:flex items-center space-x-3">
            <button className="p-2 rounded-lg hover:bg-surface transition-all" aria-label="검색">
              <Search className="w-5 h-5 text-muted" />
            </button>
            <button className="btn-skeu px-6 py-2 rounded-lg text-white font-semibold">
              로그인
            </button>
          </div>

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
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="px-4 py-4 space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-4 py-3 rounded-lg text-muted hover:text-primary hover:bg-surface transition-all font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-gray-200 space-y-2">
              <button className="w-full px-4 py-3 rounded-lg text-muted hover:bg-surface transition-all flex items-center space-x-2">
                <Search className="w-5 h-5" />
                <span>검색</span>
              </button>
              <button className="w-full btn-skeu px-4 py-3 rounded-lg text-white font-semibold">
                로그인
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

import Link from "next/link";

export function Footer() {
  const footerSections = [
    {
      title: "서비스",
      links: [
        { label: "도시 탐색", href: "/cities" },
        { label: "랭킹", href: "/ranking" },
        { label: "지도", href: "/map" },
        { label: "리뷰", href: "/reviews" },
      ],
    },
    {
      title: "커뮤니티",
      links: [
        { label: "밋업", href: "/meetups" },
        { label: "채팅", href: "/chat" },
        { label: "이벤트", href: "/events" },
        { label: "호스트", href: "/hosts" },
      ],
    },
    {
      title: "리소스",
      links: [
        { label: "노마드 가이드", href: "/guide" },
        { label: "블로그", href: "/blog" },
        { label: "FAQ", href: "/faq" },
        { label: "고객센터", href: "/support" },
      ],
    },
    {
      title: "소셜",
      links: [
        { label: "Instagram", href: "https://instagram.com", external: true },
        { label: "Twitter", href: "https://twitter.com", external: true },
        { label: "Facebook", href: "https://facebook.com", external: true },
        { label: "YouTube", href: "https://youtube.com", external: true },
      ],
    },
  ];

  return (
    <footer className="bg-surface border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Logo and Slogan */}
          <div className="lg:col-span-1 space-y-4">
            <Link href="/" className="inline-block">
              <div className="card-skeu px-3 py-2 inline-block">
                <span className="text-lg font-bold text-primary">🏠 한국노마드</span>
              </div>
            </Link>
            <p className="text-sm text-muted leading-relaxed">
              대한민국 디지털 노마드를 위한
              <br />
              최고의 도시 정보 플랫폼
            </p>
          </div>

          {/* Link Sections */}
          {footerSections.map((section) => (
            <div key={section.title} className="space-y-4">
              <h3 className="font-bold text-foreground">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-muted hover:text-primary transition-colors"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm text-muted hover:text-primary transition-colors"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-300 my-8"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Legal Links */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-muted">
            <Link href="/terms" className="hover:text-primary transition-colors">
              이용약관
            </Link>
            <span>|</span>
            <Link
              href="/privacy"
              className="hover:text-primary transition-colors font-semibold"
            >
              개인정보처리방침
            </Link>
            <span>|</span>
            <Link href="/partnership" className="hover:text-primary transition-colors">
              제휴문의
            </Link>
            <span>|</span>
            <Link href="/support" className="hover:text-primary transition-colors">
              고객센터
            </Link>
          </div>

          {/* Copyright */}
          <div className="text-sm text-muted text-center md:text-right">
            <p>Made with ❤️ for Korean Digital Nomads</p>
            <p className="mt-1">© 2024 한국노마드. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

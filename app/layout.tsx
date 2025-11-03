import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "한국 노마드 - 대한민국 디지털 노마드를 위한 최고의 도시 찾기",
  description:
    "서울, 부산, 제주 등 127개 도시의 생활비, 카페, 인터넷 속도를 비교하고 나에게 맞는 도시를 찾아보세요. 3,482개의 실제 리뷰와 월 25회 밋업.",
  keywords: [
    "디지털 노마드",
    "한국",
    "서울",
    "제주",
    "부산",
    "원격근무",
    "프리랜서",
    "코워킹",
  ],
  openGraph: {
    title: "한국 노마드 - 디지털 노마드를 위한 도시 가이드",
    description: "127개 도시, 3,482개 리뷰로 나에게 맞는 도시 찾기",
    url: "https://koreanomad.com",
    siteName: "한국 노마드",
    locale: "ko_KR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">{children}</body>
    </html>
  );
}

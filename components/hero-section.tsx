import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 py-16 md:py-24 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-64 h-64 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-secondary rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center space-y-8">
          {/* Main Headline */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              🌏 대한민국 디지털 노마드를 위한
              <br />
              <span className="text-primary">최고의 도시 찾기</span>
            </h1>
          </div>

          {/* Statistics */}
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 text-muted text-base md:text-lg font-medium">
            <div className="flex items-center gap-2 card-skeu px-4 py-2 rounded-lg">
              <span className="text-primary font-bold">127개</span>
              <span>도시</span>
            </div>
            <div className="hidden md:block w-px h-6 bg-gray-300"></div>
            <div className="flex items-center gap-2 card-skeu px-4 py-2 rounded-lg">
              <span className="text-secondary font-bold">3,482개</span>
              <span>리뷰</span>
            </div>
            <div className="hidden md:block w-px h-6 bg-gray-300"></div>
            <div className="flex items-center gap-2 card-skeu px-4 py-2 rounded-lg">
              <span className="text-accent font-bold">월 25회</span>
              <span>밋업</span>
            </div>
          </div>

          {/* CTA Button */}
          <div className="pt-4">
            <Link href="/quiz">
              <button className="btn-skeu px-8 py-4 rounded-xl text-white font-bold text-lg inline-flex items-center gap-2 hover:scale-105 transition-transform">
                나에게 맞는 도시 찾기
                <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
          </div>

          {/* Sub Text */}
          <p className="text-muted text-sm md:text-base max-w-2xl mx-auto">
            생활비, 카페, 인터넷 속도를 비교하고 실제 사용자 리뷰로
            <br className="hidden md:block" />
            나에게 딱 맞는 도시를 찾아보세요
          </p>
        </div>
      </div>
    </section>
  );
}

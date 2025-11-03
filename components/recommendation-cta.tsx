import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function RecommendationCTA() {
  return (
    <section className="py-16 md:py-20 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="card-skeu p-8 md:p-12 text-center space-y-6">
          {/* Icon and Title */}
          <div className="space-y-3">
            <div className="text-5xl md:text-6xl">🎯</div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              나에게 맞는 도시 찾기
            </h2>
            <p className="text-lg text-muted max-w-2xl mx-auto">
              간단한 질문으로 당신에게 딱 맞는 도시를 추천해드립니다!
            </p>
          </div>

          {/* Process Steps */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 py-6">
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center text-2xl">
                💰
              </div>
              <span className="text-sm font-semibold text-foreground">예산</span>
            </div>

            <div className="hidden md:block text-2xl text-muted">→</div>
            <div className="md:hidden text-2xl text-muted rotate-90">→</div>

            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-secondary/20 to-secondary/10 flex items-center justify-center text-2xl">
                🎨
              </div>
              <span className="text-sm font-semibold text-foreground">분위기</span>
            </div>

            <div className="hidden md:block text-2xl text-muted">→</div>
            <div className="md:hidden text-2xl text-muted rotate-90">→</div>

            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center text-2xl">
                🏙️
              </div>
              <span className="text-sm font-semibold text-foreground">환경</span>
            </div>

            <div className="hidden md:block text-2xl text-muted">→</div>
            <div className="md:hidden text-2xl text-muted rotate-90">→</div>

            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-success/20 to-success/10 flex items-center justify-center text-2xl">
                🎁
              </div>
              <span className="text-sm font-semibold text-foreground">맞춤 추천</span>
            </div>
          </div>

          {/* CTA Button */}
          <div className="pt-4">
            <Link href="/quiz">
              <button className="btn-skeu px-10 py-4 rounded-xl text-white font-bold text-lg inline-flex items-center gap-2 hover:scale-105 transition-transform">
                3분 테스트 시작하기
                <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
          </div>

          {/* Additional Info */}
          <p className="text-sm text-muted">
            📊 지금까지 <span className="font-bold text-primary">12,847명</span>이
            테스트를 완료했어요
          </p>
        </div>
      </div>
    </section>
  );
}

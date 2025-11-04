import { City } from "@/lib/types";
import { Wallet, Home, Coffee } from "lucide-react";

interface CityCostDetailsProps {
  city: City;
}

export function CityCostDetails({ city }: CityCostDetailsProps) {
  return (
    <section className="bg-white py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-foreground mb-8">💰 생활비 상세</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Monthly Cost */}
          <div className="card-skeu p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Wallet className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted">월 평균 생활비</p>
                <p className="text-2xl font-bold text-primary">
                  {(city.monthlyCost / 10000).toFixed(0)}만원
                </p>
              </div>
            </div>
            <p className="text-sm text-muted">
              식비, 교통비, 통신비 등을 포함한 1인 기준 월 평균 생활비입니다.
            </p>
          </div>

          {/* Rent Cost */}
          <div className="card-skeu p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
                <Home className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <p className="text-sm text-muted">월 평균 월세</p>
                <p className="text-2xl font-bold text-secondary">
                  {(city.rentCost / 10000).toFixed(0)}만원
                </p>
              </div>
            </div>
            <p className="text-sm text-muted">
              원룸/오피스텔 기준 월세입니다. 관리비는 별도입니다.
            </p>
          </div>

          {/* Cafe Cost */}
          <div className="card-skeu p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                <Coffee className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted">카페 아메리카노</p>
                <p className="text-2xl font-bold text-accent">
                  {city.cafeCost.toLocaleString()}원
                </p>
              </div>
            </div>
            <p className="text-sm text-muted">
              일반 카페 기준 아메리카노(HOT) 가격입니다.
            </p>
          </div>
        </div>

        {/* Cost Rating Bar */}
        <div className="mt-8 card-skeu p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-lg font-semibold text-foreground">
              생활비 평가
            </span>
            <span className="text-2xl font-bold text-primary">
              {city.costRating.toFixed(1)} / 5.0
            </span>
          </div>
          <div className="progress-bar-skeu h-4 relative">
            <div
              className={`progress-fill-skeu h-full absolute left-0 top-0 ${
                city.costRating >= 4
                  ? "bg-success"
                  : city.costRating >= 3
                  ? "bg-accent"
                  : "bg-error"
              }`}
              style={{ width: `${(city.costRating / 5) * 100}%` }}
            ></div>
          </div>
          <p className="text-sm text-muted mt-3">
            {city.costRating >= 4
              ? "✅ 생활비가 저렴한 편입니다"
              : city.costRating >= 3
              ? "⚠️ 생활비가 보통 수준입니다"
              : "❌ 생활비가 비싼 편입니다"}
          </p>
        </div>
      </div>
    </section>
  );
}

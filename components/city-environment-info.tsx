import { City } from "@/lib/types";
import { Coffee, Wifi, Home } from "lucide-react";

interface CityEnvironmentInfoProps {
  city: City;
}

export function CityEnvironmentInfo({ city }: CityEnvironmentInfoProps) {
  const getProgressWidth = (rating: number) => `${(rating / 5) * 100}%`;

  const getRatingColor = (rating: number) => {
    if (rating >= 4) return "bg-success";
    if (rating >= 3) return "bg-accent";
    return "bg-error";
  };

  const ratings = [
    {
      label: "카페 환경",
      icon: Coffee,
      rating: city.cafeRating,
      description: "코워킹 가능한 카페의 수와 분위기",
    },
    {
      label: "인터넷 속도",
      icon: Wifi,
      rating: city.internetRating,
      description: "평균 인터넷 다운로드/업로드 속도",
    },
    {
      label: "주거 환경",
      icon: Home,
      rating: city.housingRating,
      description: "주거 공간의 질과 가격 대비 만족도",
    },
  ];

  return (
    <section className="bg-white py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-foreground mb-8">🏡 노마드 환경 평가</h2>

        <div className="space-y-6">
          {ratings.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="card-skeu p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-foreground">
                        {item.label}
                      </h3>
                      <span className="text-2xl font-bold text-foreground">
                        {item.rating.toFixed(1)}
                      </span>
                    </div>
                    <p className="text-sm text-muted mb-3">{item.description}</p>
                    <div className="progress-bar-skeu h-3 relative">
                      <div
                        className={`progress-fill-skeu h-full absolute left-0 top-0 ${getRatingColor(
                          item.rating
                        )}`}
                        style={{ width: getProgressWidth(item.rating) }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Overall Summary */}
        <div className="mt-8 card-skeu p-6 bg-gradient-to-br from-primary/5 to-secondary/5">
          <h3 className="text-xl font-semibold text-foreground mb-4">
            종합 평가
          </h3>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-5xl font-bold text-primary">
              {city.overallRating.toFixed(1)}
            </span>
            <div className="flex-1">
              <p className="text-lg font-semibold text-foreground mb-1">
                {city.overallRating >= 4.5
                  ? "✨ 최고의 노마드 도시"
                  : city.overallRating >= 4.0
                  ? "🎯 추천하는 노마드 도시"
                  : city.overallRating >= 3.5
                  ? "👍 괜찮은 노마드 도시"
                  : "🤔 고려해볼 만한 도시"}
              </p>
              <p className="text-sm text-muted">
                {city.reviewCount.toLocaleString()}명의 노마드가 평가했습니다
              </p>
            </div>
          </div>
          <div className="progress-bar-skeu h-4 relative">
            <div
              className={`progress-fill-skeu h-full absolute left-0 top-0 ${getRatingColor(
                city.overallRating
              )}`}
              style={{ width: getProgressWidth(city.overallRating) }}
            ></div>
          </div>
        </div>
      </div>
    </section>
  );
}

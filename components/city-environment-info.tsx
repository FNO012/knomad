import { City } from "@/lib/types";
import { Coffee, Trees, Building2, Wifi } from "lucide-react";

interface CityEnvironmentInfoProps {
  city: City;
}

export function CityEnvironmentInfo({ city }: CityEnvironmentInfoProps) {
  // Calculate overall rating based on likes/dislikes
  const totalVotes = city.likes + city.dislikes;
  const likeRatio = totalVotes > 0 ? city.likes / totalVotes : 0;
  const overallRating = likeRatio * 5;

  const getEnvironmentIcon = (env: string) => {
    switch (env) {
      case "자연친화":
        return Trees;
      case "도시선호":
        return Building2;
      case "카페작업":
        return Coffee;
      case "코워킹 필수":
        return Wifi;
      default:
        return Coffee;
    }
  };

  return (
    <section className="bg-white py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-foreground mb-8">🏡 노마드 환경 정보</h2>

        {/* Environment Types */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {city.environment.map((env) => {
            const Icon = getEnvironmentIcon(env);
            return (
              <div key={env} className="card-skeu p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground">
                      {env}
                    </h3>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Overall Summary */}
        <div className="card-skeu p-6 bg-gradient-to-br from-primary/5 to-secondary/5">
          <h3 className="text-xl font-semibold text-foreground mb-4">
            종합 평가
          </h3>
          <div className="flex items-center gap-4">
            <span className="text-5xl font-bold text-primary">
              {overallRating.toFixed(1)}
            </span>
            <div className="flex-1">
              <p className="text-lg font-semibold text-foreground mb-1">
                {overallRating >= 4.5
                  ? "✨ 최고의 노마드 도시"
                  : overallRating >= 4.0
                  ? "🎯 추천하는 노마드 도시"
                  : overallRating >= 3.5
                  ? "👍 괜찮은 노마드 도시"
                  : "🤔 고려해볼 만한 도시"}
              </p>
              <p className="text-sm text-muted">
                {totalVotes.toLocaleString()}명이 평가했습니다 (👍 {city.likes.toLocaleString()} / 👎 {city.dislikes.toLocaleString()})
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

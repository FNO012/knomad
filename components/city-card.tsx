import { City } from "@/lib/types";
import { Cloud, MapPin, Star, Wind } from "lucide-react";
import Link from "next/link";

interface CityCardProps {
  city: City;
}

export function CityCard({ city }: CityCardProps) {
  // Calculate rating stars
  const fullStars = Math.floor(city.overallRating);
  const hasHalfStar = city.overallRating % 1 >= 0.5;

  // Calculate progress bar width (out of 5)
  const getProgressWidth = (rating: number) => `${(rating / 5) * 100}%`;

  // Color for rating bars
  const getRatingColor = (rating: number) => {
    if (rating >= 4) return "bg-success";
    if (rating >= 3) return "bg-accent";
    return "bg-error";
  };

  return (
    <div className="card-skeu overflow-hidden group">
      {/* City Image */}
      <div className="relative w-full h-48 bg-gradient-to-br from-primary/20 to-secondary/20 overflow-hidden">
        {/* Placeholder for image */}
        <div className="absolute inset-0 flex items-center justify-center text-6xl">
          🏙️
        </div>
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all"></div>
      </div>

      {/* Card Content */}
      <div className="p-5 space-y-4">
        {/* City Name and Rating */}
        <div className="space-y-2">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 text-muted text-sm mb-1">
                <MapPin className="w-4 h-4" />
                <span>{city.region}</span>
              </div>
              <h3 className="text-xl font-bold text-foreground">{city.name}</h3>
            </div>
          </div>

          {/* Stars and Reviews */}
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              {[...Array(fullStars)].map((_, i) => (
                <Star
                  key={i}
                  className="w-4 h-4 fill-accent text-accent"
                />
              ))}
              {hasHalfStar && (
                <Star className="w-4 h-4 fill-accent/50 text-accent" />
              )}
              {[...Array(5 - fullStars - (hasHalfStar ? 1 : 0))].map((_, i) => (
                <Star
                  key={`empty-${i}`}
                  className="w-4 h-4 text-gray-300"
                />
              ))}
            </div>
            <span className="text-sm font-semibold text-foreground">
              {city.overallRating.toFixed(1)}
            </span>
            <span className="text-sm text-muted">({city.reviewCount})</span>
          </div>
        </div>

        {/* Rating Bars */}
        <div className="space-y-2">
          {[
            { label: "☕ 카페", rating: city.cafeRating },
            { label: "💰 생활비", rating: city.costRating },
            { label: "📶 인터넷", rating: city.internetRating },
            { label: "🏠 주거비", rating: city.housingRating },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-3">
              <span className="text-sm text-muted w-16 flex-shrink-0">
                {item.label}
              </span>
              <div className="flex-1 progress-bar-skeu h-2 relative">
                <div
                  className={`progress-fill-skeu h-full absolute left-0 top-0 ${getRatingColor(item.rating)}`}
                  style={{ width: getProgressWidth(item.rating) }}
                ></div>
              </div>
              <span className="text-xs font-semibold text-foreground w-8 text-right">
                {item.rating.toFixed(1)}
              </span>
            </div>
          ))}
        </div>

        {/* Monthly Cost */}
        <div className="pt-2 space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted">💵 월 평균 생활비</span>
            <span className="text-lg font-bold text-primary">
              {(city.monthlyCost / 10000).toFixed(0)}만원
            </span>
          </div>
        </div>

        {/* Weather and Air Quality */}
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1 text-muted">
            <Cloud className="w-4 h-4" />
            <span>{city.currentTemp}°C</span>
            <span>{city.currentWeather}</span>
          </div>
          <div className="flex items-center gap-1 text-muted">
            <Wind className="w-4 h-4" />
            <span>AQI: {city.currentAQI}</span>
            <span className="text-success">(좋음)</span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {city.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="tag-skeu text-xs"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <Link href={`/cities/${city.slug}`} className="flex-1">
            <button className="w-full input-skeu px-4 py-2 rounded-lg text-sm font-semibold text-foreground hover:shadow-lg transition-all">
              상세보기
            </button>
          </Link>
          <button className="flex-1 btn-skeu px-4 py-2 rounded-lg text-sm font-semibold text-white">
            평가하기
          </button>
        </div>
      </div>
    </div>
  );
}

import { City } from "@/lib/types";
import { Cloud, MapPin, Wind, Wallet, Leaf, Building2, Coffee, Users, Sun, Wind as WindIcon, Snowflake } from "lucide-react";
import { LikeDislikeButton } from "./like-dislike-button";

interface CityCardProps {
  city: City;
}

// Helper function to get environment icon
function getEnvironmentIcon(env: string) {
  switch (env) {
    case "자연친화":
      return <Leaf className="w-4 h-4" />;
    case "도시선호":
      return <Building2 className="w-4 h-4" />;
    case "카페작업":
      return <Coffee className="w-4 h-4" />;
    case "코워킹 필수":
      return <Users className="w-4 h-4" />;
    default:
      return null;
  }
}

// Helper function to get season icon
function getSeasonIcon(season: string) {
  switch (season) {
    case "봄":
      return <Sun className="w-4 h-4" />;
    case "여름":
      return <Sun className="w-4 h-4 text-yellow-500" />;
    case "가을":
      return <WindIcon className="w-4 h-4 text-orange-500" />;
    case "겨울":
      return <Snowflake className="w-4 h-4 text-blue-500" />;
    default:
      return <Sun className="w-4 h-4" />;
  }
}

export function CityCard({ city }: CityCardProps) {
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
        {/* City Name and Like/Dislike Buttons */}
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-xl font-bold text-foreground flex-1">{city.name}</h3>
            <LikeDislikeButton
              cityId={city.id}
              initialLikes={city.likes}
              initialDislikes={city.dislikes}
              compact
            />
          </div>
          {/* Region */}
          <div className="flex items-center gap-2 text-muted text-sm">
            <MapPin className="w-4 h-4" />
            <span>{city.region}</span>
          </div>
        </div>

        {/* Filter Information Section */}
        <div className="space-y-3 pt-2 border-t border-border">
          {/* Budget */}
          <div className="flex items-center gap-2">
            <Wallet className="w-4 h-4 text-muted" />
            <span className="text-sm text-muted">예산:</span>
            <span className="text-sm font-semibold text-foreground">{city.budget}</span>
          </div>

          {/* Region (already shown above, can skip or show differently) */}

          {/* Environment Tags */}
          <div className="flex items-start gap-2">
            <div className="flex items-center gap-1 text-muted mt-0.5">
              <Building2 className="w-4 h-4" />
              <span className="text-sm">환경:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {city.environment.map((env) => (
                <span
                  key={env}
                  className="tag-skeu text-xs flex items-center gap-1"
                >
                  {getEnvironmentIcon(env)}
                  {env}
                </span>
              ))}
            </div>
          </div>

          {/* Best Season */}
          <div className="flex items-center gap-2">
            {getSeasonIcon(city.bestSeason)}
            <span className="text-sm text-muted">최고계절:</span>
            <span className="text-sm font-semibold text-foreground">{city.bestSeason}</span>
          </div>
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
      </div>
    </div>
  );
}

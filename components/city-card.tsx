import { City } from "@/lib/types";
import { MapPin, Leaf, Building2, Coffee, Users, Sun, Wind as WindIcon, Snowflake } from "lucide-react";
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
        {/* City Name, Region, and Like/Dislike Buttons */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 text-muted text-sm mb-1">
              <MapPin className="w-4 h-4" />
              <span>{city.region}</span>
            </div>
            <h3 className="text-xl font-bold text-foreground">{city.name}</h3>
          </div>
          <div className="flex-shrink-0">
            <LikeDislikeButton
              cityId={city.id}
              initialLikes={city.likes}
              initialDislikes={city.dislikes}
            />
          </div>
        </div>

        {/* Filter Information Section */}
        <div className="space-y-3 pt-2 border-t border-border">
          {/* Budget */}
          <div className="flex items-center gap-2">
            <span className="text-muted">💰</span>
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
      </div>
    </div>
  );
}

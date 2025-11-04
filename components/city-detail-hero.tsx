import { City } from "@/lib/types";
import { MapPin, Star, Heart, MessageSquare } from "lucide-react";

interface CityDetailHeroProps {
  city: City;
}

export function CityDetailHero({ city }: CityDetailHeroProps) {
  // Calculate rating stars
  const fullStars = Math.floor(city.overallRating);
  const hasHalfStar = city.overallRating % 1 >= 0.5;

  return (
    <section className="relative bg-white">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Image */}
        <div className="relative w-full h-96 card-skeu overflow-hidden mb-8">
          {/* Placeholder for image */}
          <div className="absolute inset-0 flex items-center justify-center text-9xl bg-gradient-to-br from-primary/20 to-secondary/20">
            🏙️
          </div>
        </div>

        {/* City Info */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Title and Description */}
          <div className="lg:col-span-2 space-y-4">
            {/* Region */}
            <div className="flex items-center gap-2 text-muted">
              <MapPin className="w-5 h-5" />
              <span className="text-lg">{city.region}</span>
            </div>

            {/* City Name */}
            <h1 className="text-5xl font-bold text-foreground">{city.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-3">
              <div className="flex items-center">
                {[...Array(fullStars)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-6 h-6 fill-accent text-accent"
                  />
                ))}
                {hasHalfStar && (
                  <Star className="w-6 h-6 fill-accent/50 text-accent" />
                )}
                {[...Array(5 - fullStars - (hasHalfStar ? 1 : 0))].map((_, i) => (
                  <Star
                    key={`empty-${i}`}
                    className="w-6 h-6 text-gray-300"
                  />
                ))}
              </div>
              <span className="text-2xl font-semibold text-foreground">
                {city.overallRating.toFixed(1)}
              </span>
            </div>

            {/* Description */}
            <p className="text-lg text-muted leading-relaxed">
              {city.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 pt-2">
              {city.tags.map((tag) => (
                <span
                  key={tag}
                  className="tag-skeu text-sm px-4 py-2"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Right: Stats */}
          <div className="space-y-4">
            {/* Reviews Count */}
            <div className="card-skeu p-6 space-y-2">
              <div className="flex items-center gap-3">
                <MessageSquare className="w-6 h-6 text-primary" />
                <div>
                  <p className="text-sm text-muted">리뷰</p>
                  <p className="text-2xl font-bold text-foreground">
                    {city.reviewCount.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Likes Count */}
            <div className="card-skeu p-6 space-y-2">
              <div className="flex items-center gap-3">
                <Heart className="w-6 h-6 text-error" />
                <div>
                  <p className="text-sm text-muted">좋아요</p>
                  <p className="text-2xl font-bold text-foreground">
                    {city.likeCount.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Monthly Cost */}
            <div className="card-skeu p-6 space-y-2">
              <div>
                <p className="text-sm text-muted mb-1">월 평균 생활비</p>
                <p className="text-3xl font-bold text-primary">
                  {(city.monthlyCost / 10000).toFixed(0)}만원
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

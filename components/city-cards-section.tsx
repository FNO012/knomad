import { City } from "@/lib/types";
import { CityCard } from "./city-card";

interface CityCardsSectionProps {
  cities: City[];
  title?: string;
  subtitle?: string;
}

export function CityCardsSection({
  cities,
  title = "인기 도시",
  subtitle,
}: CityCardsSectionProps) {
  return (
    <section className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-8 text-center space-y-2">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            {title}
          </h2>
          {subtitle && (
            <p className="text-muted text-lg">{subtitle}</p>
          )}
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {cities.map((city) => (
            <CityCard key={city.id} city={city} />
          ))}
        </div>

        {/* Load More Button */}
        <div className="mt-12 text-center">
          <button className="input-skeu px-8 py-3 rounded-lg text-foreground font-semibold hover:shadow-lg transition-all">
            더 많은 도시 보기 →
          </button>
        </div>
      </div>
    </section>
  );
}

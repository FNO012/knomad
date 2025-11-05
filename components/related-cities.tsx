import { getRelatedCities } from "@/lib/supabase/queries";
import { CityCard } from "@/components/city-card";

interface RelatedCitiesProps {
  currentCityId: string;
}

export async function RelatedCities({ currentCityId }: RelatedCitiesProps) {
  const relatedCities = await getRelatedCities(currentCityId, 3);

  if (relatedCities.length === 0) {
    return null;
  }

  return (
    <section className="bg-surface py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            🎯 이런 도시는 어떠세요?
          </h2>
          <p className="text-muted">
            비슷한 지역 또는 유사한 특성을 가진 추천 도시입니다
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedCities.map((city) => (
            <CityCard key={city.id} city={city} />
          ))}
        </div>
      </div>
    </section>
  );
}

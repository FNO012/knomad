"use client";

import { useState, useMemo } from "react";
import { CityCardsSection } from "./city-cards-section";
import { FilterBar, FilterState } from "./filter-bar";
import type { City } from "@/lib/types";

interface CityListWithFiltersProps {
  cities: City[];
}

export function CityListWithFilters({ cities }: CityListWithFiltersProps) {
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    budget: "전체",
    region: "전체",
    environment: [],
    season: "전체",
  });

  // Filter and sort cities
  const filteredCities = useMemo(() => {
    let result = [...cities];

    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter((city) =>
        city.name.toLowerCase().includes(searchLower) ||
        city.description.toLowerCase().includes(searchLower) ||
        city.tags.some((tag) => tag.toLowerCase().includes(searchLower))
      );
    }

    // Apply budget filter
    if (filters.budget !== "전체") {
      result = result.filter((city) => city.budget === filters.budget);
    }

    // Apply region filter
    if (filters.region !== "전체") {
      result = result.filter((city) => city.region === filters.region);
    }

    // Apply environment filter (any match)
    if (filters.environment.length > 0) {
      result = result.filter((city) =>
        filters.environment.some((env) => city.environment.includes(env))
      );
    }

    // Apply season filter
    if (filters.season !== "전체") {
      result = result.filter((city) => city.bestSeason === filters.season);
    }

    // Sort by likes (descending)
    result.sort((a, b) => b.likes - a.likes);

    return result;
  }, [filters, cities]);

  return (
    <>
      {/* Filter Bar */}
      <div className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FilterBar onFilterChange={setFilters} />
        </div>
      </div>

      {/* Cities Section */}
      <CityCardsSection
        cities={filteredCities}
        title="도시 리스트"
        subtitle={`총 ${filteredCities.length}개의 도시`}
      />
    </>
  );
}

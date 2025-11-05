"use server";

import { getCities, getCityBySlug, getCitiesFiltered, getTopCities } from "@/lib/supabase/queries";
import type { City } from "@/lib/types";

/**
 * Get all cities (Server Action)
 */
export async function fetchCities(orderBy: "created_at" | "likes" = "created_at"): Promise<City[]> {
  return await getCities(orderBy);
}

/**
 * Get a single city by slug (Server Action)
 */
export async function fetchCityBySlug(slug: string): Promise<City | null> {
  return await getCityBySlug(slug);
}

/**
 * Get filtered cities (Server Action)
 */
export async function fetchCitiesFiltered(filters: {
  budget?: string;
  region?: string;
  environment?: string;
  bestSeason?: string;
  search?: string;
}): Promise<City[]> {
  return await getCitiesFiltered(filters);
}

/**
 * Get top cities by likes (Server Action)
 */
export async function fetchTopCities(limit: number = 3): Promise<City[]> {
  return await getTopCities(limit);
}

import { createClient } from "@/utils/supabase/server";
import type { Database } from "@/lib/database.types";
import type { City, Review } from "@/lib/types";

type DBCity = Database["public"]["Tables"]["cities"]["Row"];
type DBReview = Database["public"]["Tables"]["reviews"]["Row"];

/**
 * Transform database city to application City type
 */
function transformCity(dbCity: DBCity): City {
  return {
    id: dbCity.id,
    name: dbCity.name,
    slug: dbCity.slug,
    imageUrl: dbCity.image_url || "",
    description: dbCity.description || "",
    likes: dbCity.likes,
    dislikes: dbCity.dislikes,
    budget: dbCity.budget as City["budget"],
    region: dbCity.region as City["region"],
    environment: dbCity.environment as City["environment"],
    bestSeason: dbCity.best_season as City["bestSeason"],
    monthlyCost: dbCity.monthly_cost,
    rentCost: dbCity.rent_cost,
    cafeCost: dbCity.cafe_cost,
    currentTemp: dbCity.current_temp || 0,
    currentWeather: dbCity.current_weather || "",
    currentAQI: dbCity.current_aqi || 0,
    tags: dbCity.tags || [],
    createdAt: new Date(dbCity.created_at),
    updatedAt: new Date(dbCity.updated_at),
  };
}

/**
 * Get all cities, optionally ordered by a field
 */
export async function getCities(orderBy: "created_at" | "likes" = "created_at"): Promise<City[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("cities")
    .select("*")
    .order(orderBy, { ascending: false });

  if (error) {
    console.error("Error fetching cities:", error);
    return [];
  }

  return data.map(transformCity);
}

/**
 * Get a single city by slug
 */
export async function getCityBySlug(slug: string): Promise<City | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("cities")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error("Error fetching city by slug:", error);
    return null;
  }

  return transformCity(data);
}

/**
 * Get cities with filters
 */
export async function getCitiesFiltered(filters: {
  budget?: string;
  region?: string;
  environment?: string;
  bestSeason?: string;
  search?: string;
}): Promise<City[]> {
  const supabase = await createClient();

  let query = supabase.from("cities").select("*");

  if (filters.budget) {
    query = query.eq("budget", filters.budget);
  }
  if (filters.region) {
    query = query.eq("region", filters.region);
  }
  if (filters.environment) {
    query = query.contains("environment", [filters.environment]);
  }
  if (filters.bestSeason) {
    query = query.eq("best_season", filters.bestSeason);
  }
  if (filters.search) {
    query = query.or(`name.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
  }

  const { data, error } = await query.order("likes", { ascending: false });

  if (error) {
    console.error("Error fetching filtered cities:", error);
    return [];
  }

  return data.map(transformCity);
}

/**
 * Get reviews for a city
 */
export async function getReviewsByCity(cityId: string): Promise<Review[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("reviews")
    .select(`
      *,
      users (name),
      cities (name)
    `)
    .eq("city_id", cityId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching reviews:", error);
    return [];
  }

  return data.map((review: any) => ({
    id: review.id,
    cityId: review.city_id,
    userId: review.user_id,
    userName: review.users?.name || "익명",
    cityName: review.cities?.name || "",
    rating: review.rating,
    content: review.content,
    tags: review.tags || [],
    createdAt: new Date(review.created_at),
    updatedAt: new Date(review.updated_at),
  }));
}

/**
 * Get all reviews (for homepage)
 */
export async function getReviews(limit: number = 10): Promise<Review[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("reviews")
    .select(`
      *,
      users (name),
      cities (name)
    `)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Error fetching reviews:", error);
    return [];
  }

  return data.map((review: any) => ({
    id: review.id,
    cityId: review.city_id,
    userId: review.user_id,
    userName: review.users?.name || "익명",
    cityName: review.cities?.name || "",
    rating: review.rating,
    content: review.content,
    tags: review.tags || [],
    createdAt: new Date(review.created_at),
    updatedAt: new Date(review.updated_at),
  }));
}

/**
 * Get user's like/dislike status for a city
 */
export async function getUserCityLike(
  cityId: string,
  userId: string
): Promise<{ is_like: boolean } | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("city_likes")
    .select("is_like")
    .eq("city_id", cityId)
    .eq("user_id", userId)
    .single();

  if (error) {
    return null;
  }

  return data;
}

/**
 * Get top cities by likes (for homepage)
 */
export async function getTopCities(limit: number = 3): Promise<City[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("cities")
    .select("*")
    .order("likes", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Error fetching top cities:", error);
    return [];
  }

  return data.map(transformCity);
}

/**
 * Get related cities based on region or environment
 */
export async function getRelatedCities(cityId: string, limit: number = 3): Promise<City[]> {
  const supabase = await createClient();

  // First, get the current city
  const { data: currentCity, error: cityError } = await supabase
    .from("cities")
    .select("*")
    .eq("id", cityId)
    .single();

  if (cityError || !currentCity) {
    console.error("Error fetching current city:", cityError);
    return [];
  }

  // Get cities from the same region, excluding the current city
  const { data, error } = await supabase
    .from("cities")
    .select("*")
    .eq("region", currentCity.region)
    .neq("id", cityId)
    .order("likes", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Error fetching related cities:", error);
    return [];
  }

  // If we don't have enough cities from the same region, get random cities
  if (data.length < limit) {
    const { data: moreCities, error: moreError } = await supabase
      .from("cities")
      .select("*")
      .neq("id", cityId)
      .neq("region", currentCity.region)
      .order("likes", { ascending: false })
      .limit(limit - data.length);

    if (!moreError && moreCities) {
      data.push(...moreCities);
    }
  }

  return data.map(transformCity);
}

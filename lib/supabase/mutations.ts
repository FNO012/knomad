import { createClient } from "@/utils/supabase/server";
import type { Database } from "@/lib/database.types";

type ReviewInsert = Database["public"]["Tables"]["reviews"]["Insert"];
type CityLikeInsert = Database["public"]["Tables"]["city_likes"]["Insert"];

/**
 * Create a new review for a city
 */
export async function createReview(
  cityId: string,
  userId: string,
  rating: number,
  content: string,
  tags: string[]
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();

  const reviewData: ReviewInsert = {
    city_id: cityId,
    user_id: userId,
    rating,
    content,
    tags,
  };

  const { error } = await supabase.from("reviews").insert(reviewData);

  if (error) {
    console.error("Error creating review:", error);
    return { success: false, error: error.message };
  }

  return { success: true };
}

/**
 * Update a review
 */
export async function updateReview(
  reviewId: string,
  userId: string,
  updates: {
    rating?: number;
    content?: string;
    tags?: string[];
  }
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();

  const { error } = await supabase
    .from("reviews")
    .update(updates)
    .eq("id", reviewId)
    .eq("user_id", userId); // RLS ensures only owner can update

  if (error) {
    console.error("Error updating review:", error);
    return { success: false, error: error.message };
  }

  return { success: true };
}

/**
 * Delete a review
 */
export async function deleteReview(
  reviewId: string,
  userId: string
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();

  const { error } = await supabase
    .from("reviews")
    .delete()
    .eq("id", reviewId)
    .eq("user_id", userId); // RLS ensures only owner can delete

  if (error) {
    console.error("Error deleting review:", error);
    return { success: false, error: error.message };
  }

  return { success: true };
}

/**
 * Toggle like/dislike for a city
 * If user has already voted, update the vote
 * If user hasn't voted, create new vote
 * If clicking the same button again, remove the vote
 */
export async function toggleCityLike(
  cityId: string,
  userId: string,
  isLike: boolean
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();

  // Check if user has already voted
  const { data: existing, error: fetchError } = await supabase
    .from("city_likes")
    .select("*")
    .eq("city_id", cityId)
    .eq("user_id", userId)
    .single();

  if (fetchError && fetchError.code !== "PGRST116") {
    // PGRST116 is "not found" error
    console.error("Error fetching existing like:", fetchError);
    return { success: false, error: fetchError.message };
  }

  if (existing) {
    // If clicking the same button, remove the vote
    if (existing.is_like === isLike) {
      const { error: deleteError } = await supabase
        .from("city_likes")
        .delete()
        .eq("city_id", cityId)
        .eq("user_id", userId);

      if (deleteError) {
        console.error("Error deleting like:", deleteError);
        return { success: false, error: deleteError.message };
      }
    } else {
      // Otherwise, update the vote
      const { error: updateError } = await supabase
        .from("city_likes")
        .update({ is_like: isLike })
        .eq("city_id", cityId)
        .eq("user_id", userId);

      if (updateError) {
        console.error("Error updating like:", updateError);
        return { success: false, error: updateError.message };
      }
    }
  } else {
    // No existing vote, create new one
    const likeData: CityLikeInsert = {
      city_id: cityId,
      user_id: userId,
      is_like: isLike,
    };

    const { error: insertError } = await supabase.from("city_likes").insert(likeData);

    if (insertError) {
      console.error("Error creating like:", insertError);
      return { success: false, error: insertError.message };
    }
  }

  return { success: true };
}

/**
 * Create or update user profile
 */
export async function upsertUserProfile(
  userId: string,
  name: string,
  avatarUrl?: string
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();

  const { error } = await supabase
    .from("users")
    .upsert({
      id: userId,
      name,
      avatar_url: avatarUrl,
    })
    .eq("id", userId);

  if (error) {
    console.error("Error upserting user profile:", error);
    return { success: false, error: error.message };
  }

  return { success: true };
}

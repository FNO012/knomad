"use server";

import { getReviewsByCity, getReviews } from "@/lib/supabase/queries";
import { createReview, updateReview, deleteReview } from "@/lib/supabase/mutations";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import type { Review } from "@/lib/types";

/**
 * Get reviews for a city (Server Action)
 */
export async function fetchReviewsByCity(cityId: string): Promise<Review[]> {
  return await getReviewsByCity(cityId);
}

/**
 * Get all reviews (Server Action)
 */
export async function fetchReviews(limit: number = 10): Promise<Review[]> {
  return await getReviews(limit);
}

/**
 * Submit a new review (Server Action)
 */
export async function submitReview(
  cityId: string,
  rating: number,
  content: string,
  tags: string[]
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();

  // Get current user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "로그인이 필요합니다." };
  }

  const result = await createReview(cityId, user.id, rating, content, tags);

  if (result.success) {
    // Revalidate pages that show reviews
    revalidatePath("/");
    revalidatePath(`/cities/${cityId}`);
  }

  return result;
}

/**
 * Update a review (Server Action)
 */
export async function editReview(
  reviewId: string,
  updates: {
    rating?: number;
    content?: string;
    tags?: string[];
  }
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();

  // Get current user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "로그인이 필요합니다." };
  }

  const result = await updateReview(reviewId, user.id, updates);

  if (result.success) {
    revalidatePath("/");
  }

  return result;
}

/**
 * Delete a review (Server Action)
 */
export async function removeReview(reviewId: string): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();

  // Get current user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "로그인이 필요합니다." };
  }

  const result = await deleteReview(reviewId, user.id);

  if (result.success) {
    revalidatePath("/");
  }

  return result;
}

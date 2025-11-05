"use server";

import { toggleCityLike } from "@/lib/supabase/mutations";
import { getUserCityLike } from "@/lib/supabase/queries";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

/**
 * Toggle like for a city (Server Action)
 */
export async function likeCity(cityId: string): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "로그인이 필요합니다." };
  }

  const result = await toggleCityLike(cityId, user.id, true);

  if (result.success) {
    revalidatePath("/");
    revalidatePath(`/cities/${cityId}`);
  }

  return result;
}

/**
 * Toggle dislike for a city (Server Action)
 */
export async function dislikeCity(cityId: string): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "로그인이 필요합니다." };
  }

  const result = await toggleCityLike(cityId, user.id, false);

  if (result.success) {
    revalidatePath("/");
    revalidatePath(`/cities/${cityId}`);
  }

  return result;
}

/**
 * Get user's like status for a city (Server Action)
 */
export async function fetchUserCityLike(
  cityId: string
): Promise<{ is_like: boolean } | null> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  return await getUserCityLike(cityId, user.id);
}

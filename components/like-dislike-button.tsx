"use client";

import { ThumbsUp, ThumbsDown } from "lucide-react";
import { useState, useTransition } from "react";
import { likeCity, dislikeCity } from "@/app/actions/likes";
import { useRouter } from "next/navigation";

interface LikeDislikeButtonProps {
  cityId: string;
  initialLikes: number;
  initialDislikes: number;
  userLikeStatus?: { is_like: boolean } | null;
}

export function LikeDislikeButton({
  cityId,
  initialLikes,
  initialDislikes,
  userLikeStatus,
}: LikeDislikeButtonProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [dislikes, setDislikes] = useState(initialDislikes);
  const [userAction, setUserAction] = useState<null | "like" | "dislike">(
    userLikeStatus ? (userLikeStatus.is_like ? "like" : "dislike") : null
  );
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleLike = async () => {
    // Optimistic UI update
    const previousLikes = likes;
    const previousDislikes = dislikes;
    const previousAction = userAction;

    if (userAction === "like") {
      // Cancel like
      setLikes(likes - 1);
      setUserAction(null);
    } else if (userAction === "dislike") {
      // Switch from dislike to like
      setLikes(likes + 1);
      setDislikes(dislikes - 1);
      setUserAction("like");
    } else {
      // Activate like
      setLikes(likes + 1);
      setUserAction("like");
    }

    // Call server action
    startTransition(async () => {
      const result = await likeCity(cityId);

      if (!result.success) {
        // Revert optimistic update on error
        setLikes(previousLikes);
        setDislikes(previousDislikes);
        setUserAction(previousAction);

        if (result.error === "로그인이 필요합니다.") {
          alert("로그인이 필요한 기능입니다.");
          router.push("/login");
        } else {
          alert("오류가 발생했습니다. 다시 시도해주세요.");
        }
      } else {
        // Refresh to get updated counts from server
        router.refresh();
      }
    });
  };

  const handleDislike = async () => {
    // Optimistic UI update
    const previousLikes = likes;
    const previousDislikes = dislikes;
    const previousAction = userAction;

    if (userAction === "dislike") {
      // Cancel dislike
      setDislikes(dislikes - 1);
      setUserAction(null);
    } else if (userAction === "like") {
      // Switch from like to dislike
      setDislikes(dislikes + 1);
      setLikes(likes - 1);
      setUserAction("dislike");
    } else {
      // Activate dislike
      setDislikes(dislikes + 1);
      setUserAction("dislike");
    }

    // Call server action
    startTransition(async () => {
      const result = await dislikeCity(cityId);

      if (!result.success) {
        // Revert optimistic update on error
        setLikes(previousLikes);
        setDislikes(previousDislikes);
        setUserAction(previousAction);

        if (result.error === "로그인이 필요합니다.") {
          alert("로그인이 필요한 기능입니다.");
          router.push("/login");
        } else {
          alert("오류가 발생했습니다. 다시 시도해주세요.");
        }
      } else {
        // Refresh to get updated counts from server
        router.refresh();
      }
    });
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleLike}
        disabled={isPending}
        className={`flex items-center gap-1 px-2 py-1 rounded transition-all ${
          userAction === "like"
            ? "btn-skeu text-primary"
            : "hover:bg-surface text-muted"
        } ${isPending ? "opacity-50 cursor-not-allowed" : ""}`}
        aria-label="좋아요"
      >
        <ThumbsUp className="w-4 h-4" />
        <span className="text-sm font-semibold">{likes}</span>
      </button>

      <button
        onClick={handleDislike}
        disabled={isPending}
        className={`flex items-center gap-1 px-2 py-1 rounded transition-all ${
          userAction === "dislike"
            ? "btn-skeu text-error"
            : "hover:bg-surface text-muted"
        } ${isPending ? "opacity-50 cursor-not-allowed" : ""}`}
        aria-label="싫어요"
      >
        <ThumbsDown className="w-4 h-4" />
        <span className="text-sm font-semibold">{dislikes}</span>
      </button>
    </div>
  );
}

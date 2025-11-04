"use client";

import { ThumbsUp, ThumbsDown } from "lucide-react";
import { useState, useEffect } from "react";

interface LikeDislikeButtonProps {
  cityId: string;
  initialLikes: number;
  initialDislikes: number;
  compact?: boolean;
}

export function LikeDislikeButton({
  cityId,
  initialLikes,
  initialDislikes,
  compact = false,
}: LikeDislikeButtonProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [dislikes, setDislikes] = useState(initialDislikes);
  const [userAction, setUserAction] = useState<null | "like" | "dislike">(null);

  // Load user action from localStorage on mount
  useEffect(() => {
    const storageKey = `like-dislike-${cityId}`;
    const savedAction = localStorage.getItem(storageKey);
    if (savedAction === "like" || savedAction === "dislike") {
      setUserAction(savedAction);
    }
  }, [cityId]);

  const handleLike = () => {
    const storageKey = `like-dislike-${cityId}`;

    if (userAction === "like") {
      // Cancel like
      setLikes(likes - 1);
      setUserAction(null);
      localStorage.removeItem(storageKey);
    } else if (userAction === "dislike") {
      // Switch from dislike to like
      setLikes(likes + 1);
      setDislikes(dislikes - 1);
      setUserAction("like");
      localStorage.setItem(storageKey, "like");
    } else {
      // Activate like
      setLikes(likes + 1);
      setUserAction("like");
      localStorage.setItem(storageKey, "like");
    }
  };

  const handleDislike = () => {
    const storageKey = `like-dislike-${cityId}`;

    if (userAction === "dislike") {
      // Cancel dislike
      setDislikes(dislikes - 1);
      setUserAction(null);
      localStorage.removeItem(storageKey);
    } else if (userAction === "like") {
      // Switch from like to dislike
      setDislikes(dislikes + 1);
      setLikes(likes - 1);
      setUserAction("dislike");
      localStorage.setItem(storageKey, "dislike");
    } else {
      // Activate dislike
      setDislikes(dislikes + 1);
      setUserAction("dislike");
      localStorage.setItem(storageKey, "dislike");
    }
  };

  return (
    <div className={`flex items-center ${compact ? "gap-2" : "gap-4 mt-4"}`}>
      <button
        onClick={handleLike}
        className={`flex items-center gap-1 ${
          compact ? "px-2 py-1" : "px-4 py-2"
        } rounded-lg transition-all ${
          userAction === "like"
            ? "btn-skeu text-primary"
            : "hover:bg-surface text-muted"
        }`}
        aria-label="좋아요"
      >
        <ThumbsUp className={compact ? "w-4 h-4" : "w-5 h-5"} />
        <span className={`font-semibold ${compact ? "text-sm" : ""}`}>{likes}</span>
      </button>

      <button
        onClick={handleDislike}
        className={`flex items-center gap-1 ${
          compact ? "px-2 py-1" : "px-4 py-2"
        } rounded-lg transition-all ${
          userAction === "dislike"
            ? "btn-skeu text-error"
            : "hover:bg-surface text-muted"
        }`}
        aria-label="싫어요"
      >
        <ThumbsDown className={compact ? "w-4 h-4" : "w-5 h-5"} />
        <span className={`font-semibold ${compact ? "text-sm" : ""}`}>{dislikes}</span>
      </button>
    </div>
  );
}

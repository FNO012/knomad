import { Review } from "@/lib/types";
import { MapPin, Star, User } from "lucide-react";
import Link from "next/link";

interface ReviewsSectionProps {
  reviews: Review[];
}

function ReviewCard({ review }: { review: Review }) {
  // Format relative time
  const getRelativeTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (hours < 1) return "방금 전";
    if (hours < 24) return `${hours}시간 전`;
    if (days < 7) return `${days}일 전`;
    return date.toLocaleDateString("ko-KR");
  };

  return (
    <div className="card-skeu p-5 space-y-3">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center">
            <User className="w-5 h-5 text-primary" />
          </div>
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-foreground">
                {review.userName}
              </span>
              <span className="text-muted text-sm">|</span>
              <div className="flex items-center gap-1 text-sm text-muted">
                <MapPin className="w-3 h-3" />
                <span>{review.cityName}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 ${
                      i < review.rating
                        ? "fill-accent text-accent"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs font-semibold text-foreground">
                {review.rating.toFixed(1)}
              </span>
            </div>
          </div>
        </div>
        <span className="text-xs text-muted">
          {getRelativeTime(review.createdAt)}
        </span>
      </div>

      {/* Content */}
      <p className="text-muted text-sm leading-relaxed line-clamp-2">
        &quot;{review.content}&quot;
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {review.tags.map((tag) => (
          <span key={tag} className="tag-skeu text-xs">
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export function ReviewsSection({ reviews }: ReviewsSectionProps) {
  return (
    <section className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-8 text-center space-y-2">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            💬 최근 리뷰
          </h2>
          <p className="text-muted text-lg">
            실제 노마드들의 생생한 경험담
          </p>
        </div>

        {/* Review Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-8 text-center">
          <Link href="/reviews">
            <button className="input-skeu px-8 py-3 rounded-lg text-foreground font-semibold hover:shadow-lg transition-all">
              모든 리뷰 보기 →
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}

import { Meetup } from "@/lib/types";
import { Calendar, CheckCircle, Clock, MapPin, MessageCircle, User } from "lucide-react";
import Link from "next/link";

interface MeetupSectionProps {
  meetups: Meetup[];
}

function MeetupCard({ meetup }: { meetup: Meetup }) {
  // Format date
  const formatDate = (date: Date) => {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const dayOfWeek = ["일", "월", "화", "수", "목", "금", "토"][date.getDay()];
    return `${month}월 ${day}일 (${dayOfWeek})`;
  };

  const formatTime = (date: Date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours}:${minutes.toString().padStart(2, "0")}`;
  };

  return (
    <div className="card-skeu p-5 space-y-4">
      {/* Header */}
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-sm text-muted">
          <MapPin className="w-4 h-4" />
          <span className="font-semibold">{meetup.cityName}</span>
        </div>
        <div className="flex items-center gap-2">
          {meetup.status === "confirmed" ? (
            <span className="flex items-center gap-1 text-success text-sm font-semibold">
              <CheckCircle className="w-4 h-4" />
              확정됨
            </span>
          ) : (
            <span className="flex items-center gap-1 text-accent text-sm font-semibold">
              <Clock className="w-4 h-4" />
              대기중
            </span>
          )}
          <span className="text-muted text-sm">
            ({meetup.rsvpCount}명 참석)
          </span>
        </div>
      </div>

      {/* Date and Location */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-foreground">
          <Calendar className="w-4 h-4 text-primary" />
          <span className="font-semibold">
            {formatDate(meetup.dateTime)} {formatTime(meetup.dateTime)}
          </span>
        </div>
        <div className="flex items-start gap-2 text-muted text-sm">
          <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <span>@ {meetup.location}</span>
        </div>
      </div>

      {/* Description */}
      <div className="flex items-start gap-2 text-muted text-sm">
        <MessageCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
        <p className="line-clamp-2">&quot;{meetup.description}&quot;</p>
      </div>

      {/* Attendees */}
      <div className="flex items-center gap-2">
        <div className="flex -space-x-2">
          {meetup.rsvpUserImages.slice(0, 3).map((_, index) => (
            <div
              key={index}
              className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 border-2 border-white flex items-center justify-center"
            >
              <User className="w-4 h-4 text-primary" />
            </div>
          ))}
        </div>
        {meetup.rsvpCount > 3 && (
          <span className="text-sm text-muted font-medium">
            +{meetup.rsvpCount - 3}명 더 참석
          </span>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 pt-2">
        <Link href={`/meetups/${meetup.id}`} className="flex-1">
          <button className="w-full input-skeu px-4 py-2 rounded-lg text-sm font-semibold text-foreground hover:shadow-lg transition-all">
            상세보기
          </button>
        </Link>
        <button className="flex-1 btn-skeu px-4 py-2 rounded-lg text-sm font-semibold text-white">
          참석하기
        </button>
      </div>
    </div>
  );
}

export function MeetupSection({ meetups }: MeetupSectionProps) {
  return (
    <section className="py-12 md:py-16 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-8 text-center space-y-2">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            🍻 다가오는 밋업
          </h2>
          <p className="text-muted text-lg">
            같은 도시의 노마드들과 함께 네트워킹하세요
          </p>
        </div>

        {/* Meetup Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {meetups.map((meetup) => (
            <MeetupCard key={meetup.id} meetup={meetup} />
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-8 text-center">
          <Link href="/meetups">
            <button className="input-skeu px-8 py-3 rounded-lg text-foreground font-semibold hover:shadow-lg transition-all">
              모든 밋업 보기 →
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}

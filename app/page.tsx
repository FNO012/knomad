import { CityCardsSection } from "@/components/city-cards-section";
import { Footer } from "@/components/footer";
import { HeroSection } from "@/components/hero-section";
import { MeetupSection } from "@/components/meetup-section";
import { Navigation } from "@/components/navigation";
import { RecommendationCTA } from "@/components/recommendation-cta";
import { ReviewsSection } from "@/components/reviews-section";
import { SearchFilterBar } from "@/components/search-filter-bar";
import { mockCities, mockMeetups, mockReviews } from "@/lib/mock-data";

export default function Home() {
  // Get top 3 cities for featured section
  const topCities = mockCities.slice(0, 3);
  // Get remaining cities
  const moreCities = mockCities.slice(3);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <HeroSection />

      {/* Search & Filter Bar */}
      <SearchFilterBar />

      {/* Top Cities Section */}
      <CityCardsSection
        cities={topCities}
        title="인기 도시 (상위 3개)"
        subtitle="가장 많은 노마드들이 선택한 도시"
      />

      {/* Recommended Cities Section */}
      {moreCities.length > 0 && (
        <div className="bg-surface">
          <CityCardsSection
            cities={moreCities}
            title="추천 도시"
            subtitle="당신에게 딱 맞는 도시를 찾아보세요"
          />
        </div>
      )}

      {/* Meetup Section */}
      <MeetupSection meetups={mockMeetups} />

      {/* Reviews Section */}
      <ReviewsSection reviews={mockReviews} />

      {/* Recommendation CTA */}
      <RecommendationCTA />

      {/* Footer */}
      <Footer />
    </div>
  );
}

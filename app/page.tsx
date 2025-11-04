import { Footer } from "@/components/footer";
import { HeroSection } from "@/components/hero-section";
import { Navigation } from "@/components/navigation";
import { CityListWithFilters } from "@/components/city-list-with-filters";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <HeroSection />

      {/* City List with Filters */}
      <CityListWithFilters />

      {/* Footer */}
      <Footer />
    </div>
  );
}

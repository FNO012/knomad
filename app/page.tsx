import { Footer } from "@/components/footer";
import { HeroSection } from "@/components/hero-section";
import { Navigation } from "@/components/navigation";
import { CityListWithFilters } from "@/components/city-list-with-filters";
import { getCities } from "@/lib/supabase/queries";

export default async function Home() {
  // Fetch cities from Supabase
  const cities = await getCities("likes"); // Sort by likes

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <HeroSection />

      {/* City List with Filters */}
      <CityListWithFilters cities={cities} />

      {/* Footer */}
      <Footer />
    </div>
  );
}

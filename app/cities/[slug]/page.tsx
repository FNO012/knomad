import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { BackButton } from "@/components/back-button";
import { CityDetailHero } from "@/components/city-detail-hero";
import { CityCostDetails } from "@/components/city-cost-details";
import { CityWeatherInfo } from "@/components/city-weather-info";
import { CityEnvironmentInfo } from "@/components/city-environment-info";
import { RelatedCities } from "@/components/related-cities";
import { mockCities } from "@/lib/mock-data";
import { notFound } from "next/navigation";

// Generate static paths for all cities
export async function generateStaticParams() {
  return mockCities.map((city) => ({
    slug: city.slug,
  }));
}

// City detail page
export default async function CityDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // Await params in Next.js 15
  const { slug } = await params;

  // Find city by slug
  const city = mockCities.find((c) => c.slug === slug);

  // If city not found, show 404
  if (!city) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <Navigation />

      {/* Back Button */}
      <div className="container mx-auto px-4 py-6">
        <BackButton />
      </div>

      {/* Hero Section */}
      <CityDetailHero city={city} />

      {/* Cost Details Section */}
      <CityCostDetails city={city} />

      {/* Weather & Air Quality Section */}
      <CityWeatherInfo city={city} />

      {/* Environment Ratings Section */}
      <CityEnvironmentInfo city={city} />

      {/* Related Cities Section */}
      <RelatedCities currentCityId={city.id} />

      {/* Footer */}
      <Footer />
    </div>
  );
}

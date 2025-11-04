import { City } from "@/lib/types";
import { Cloud, Wind, Thermometer } from "lucide-react";

interface CityWeatherInfoProps {
  city: City;
}

export function CityWeatherInfo({ city }: CityWeatherInfoProps) {
  // Get AQI status
  const getAQIStatus = (aqi: number) => {
    if (aqi <= 50) return { text: "좋음", color: "text-success", bg: "bg-success/10" };
    if (aqi <= 100) return { text: "보통", color: "text-accent", bg: "bg-accent/10" };
    if (aqi <= 150) return { text: "나쁨", color: "text-error", bg: "bg-error/10" };
    return { text: "매우 나쁨", color: "text-error", bg: "bg-error/20" };
  };

  const aqiStatus = getAQIStatus(city.currentAQI);

  return (
    <section className="bg-surface py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-foreground mb-8">🌤️ 실시간 날씨 및 대기질</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Temperature */}
          <div className="card-skeu p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Thermometer className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted">현재 온도</p>
                <p className="text-3xl font-bold text-foreground">
                  {city.currentTemp}°C
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 pt-2">
              <Cloud className="w-5 h-5 text-muted" />
              <span className="text-muted">{city.currentWeather}</span>
            </div>
          </div>

          {/* Air Quality */}
          <div className="card-skeu p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-full ${aqiStatus.bg} flex items-center justify-center`}>
                <Wind className={`w-6 h-6 ${aqiStatus.color}`} />
              </div>
              <div>
                <p className="text-sm text-muted">대기질 지수</p>
                <p className="text-3xl font-bold text-foreground">
                  {city.currentAQI}
                </p>
              </div>
            </div>
            <div className={`inline-flex px-3 py-1 rounded-full ${aqiStatus.bg}`}>
              <span className={`text-sm font-semibold ${aqiStatus.color}`}>
                {aqiStatus.text}
              </span>
            </div>
          </div>

          {/* Info Card */}
          <div className="card-skeu p-6 space-y-4 bg-gradient-to-br from-primary/5 to-secondary/5">
            <h3 className="text-lg font-semibold text-foreground">
              날씨 정보
            </h3>
            <ul className="space-y-2 text-sm text-muted">
              <li>• 데이터는 실시간으로 업데이트됩니다</li>
              <li>• AQI 50 이하: 야외활동 좋음</li>
              <li>• AQI 100 이하: 보통 수준</li>
              <li>• AQI 150 이상: 실외활동 자제 권장</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

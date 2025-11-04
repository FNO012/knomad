// Filter Types
export type BudgetFilter = "100만원 이하" | "100~200만원" | "200만원 이상";
export type RegionFilter = "수도권" | "경상도" | "전라도" | "강원도" | "제주도" | "충청도";
export type EnvironmentFilter = "자연친화" | "도시선호" | "카페작업" | "코워킹 필수";
export type SeasonFilter = "봄" | "여름" | "가을" | "겨울";

// City (도시)
export interface City {
  id: string;
  name: string; // "서울 성수동"
  slug: string; // "seoul-seongsu"
  imageUrl: string;
  description: string;

  // 좋아요/싫어요
  likes: number;
  dislikes: number;

  // 필터 정보
  budget: BudgetFilter;
  region: RegionFilter;
  environment: EnvironmentFilter[];
  bestSeason: SeasonFilter;

  // 생활비
  monthlyCost: number; // 1850000 (원)
  rentCost: number; // 월세
  cafeCost: number; // 카페 아메리카노

  // 실시간 데이터
  currentTemp: number;
  currentWeather: string; // "흐림"
  currentAQI: number;

  // 태그
  tags: string[]; // ["트렌디", "카페많음", "창업가"]

  // 메타
  createdAt: Date;
  updatedAt: Date;
}

// Review (리뷰)
export interface Review {
  id: string;
  cityId: string;
  userId: string;
  userName: string;
  cityName: string;
  rating: number;
  content: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

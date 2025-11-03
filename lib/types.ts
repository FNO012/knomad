// City (도시)
export interface City {
  id: string;
  name: string; // "서울 성수동"
  region: string; // "서울/경기"
  slug: string; // "seoul-seongsu"
  imageUrl: string;
  description: string;

  // 점수
  overallRating: number; // 4.8
  cafeRating: number; // 5.0
  costRating: number; // 2.5
  internetRating: number; // 5.0
  housingRating: number; // 2.8

  // 통계
  reviewCount: number; // 327
  likeCount: number;

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

  rating: number; // 1-5
  content: string; // 리뷰 내용
  tags: string[];

  // 메타
  createdAt: Date;
  updatedAt: Date;
}

// Meetup (밋업)
export interface Meetup {
  id: string;
  cityId: string;
  cityName: string;
  hostId: string;

  title: string;
  description: string;
  location: string; // "@ 대림창고"
  address: string;

  dateTime: Date;
  status: "confirmed" | "pending";

  // 참석자
  rsvpCount: number;
  rsvpUsers: string[]; // userId[]
  rsvpUserImages: string[]; // user profile images

  // 메타
  createdAt: Date;
  updatedAt: Date;
}

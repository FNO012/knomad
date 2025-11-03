# 한국 노마드 (Korean Nomad)

대한민국 디지털 노마드를 위한 최고의 도시 찾기 플랫폼

## 프로젝트 개요

한국에서 디지털 노마드로 생활하고 싶은 사람들이 어느 도시에서 살지 결정하기 위해 필요한 정보를 한 곳에서 쉽게 찾을 수 있는 플랫폼입니다.

## 기술 스택

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Custom components with Skeuomorphic design
- **Icons**: Lucide React
- **State Management**: React Hooks

## 주요 기능 (UI)

### P0 필수 섹션

- ✅ **Navigation Bar**: 상단 고정 네비게이션, 모바일 햄버거 메뉴
- ✅ **Hero Section**: 메인 헤드라인, 통계, CTA 버튼
- ✅ **Search & Filter Bar**: 검색, 예산 슬라이더, 정렬, 태그 필터
- ✅ **City Cards**: 도시 카드 리스트 (평점, 생활비, 날씨 등)
- ✅ **Meetup Section**: 다가오는 밋업 4개 표시
- ✅ **Recent Reviews**: 최근 리뷰 3개 표시
- ✅ **City Recommendation CTA**: 도시 추천 테스트 홍보
- ✅ **Footer**: 사이트 정보 및 링크

## 디자인 시스템

### 색상 팔레트

```typescript
Primary: #3B82F6 (파란색)
Secondary: #10B981 (초록색)
Accent: #F59E0B (주황색)
Background: #FFFFFF
Surface: #F3F4F6
Text Primary: #111827
Text Secondary: #6B7280
```

### 스큐어모피즘 디자인

- 입체감 있는 그림자 효과
- 3D 버튼 및 카드
- 실제 물체와 유사한 질감

## 시작하기

### 사전 요구사항

- Node.js 18+
- npm 또는 yarn 또는 pnpm

### 설치

```bash
# 의존성 설치 (autoprefixer 포함)
npm install

# 개발 서버 실행
npm run dev

# 빌드
npm run build

# 프로덕션 서버 실행
npm start
```

### 문제 해결

**CSS 컴파일 오류 발생 시:**
- `autoprefixer` 패키지가 설치되어 있는지 확인: `npm install -D autoprefixer`

**Pretendard 폰트가 필요한 경우:**
1. [Pretendard 폰트](https://github.com/orioncactus/pretendard)를 다운로드
2. `/public/fonts/` 디렉토리에 woff2 파일 복사
3. `app/globals.css`에서 폰트 관련 주석 해제

### 개발 서버

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 을 열어서 결과를 확인하세요.

## 프로젝트 구조

```text
knomad/
├── app/
│   ├── globals.css           # 글로벌 스타일 및 스큐어모피즘 유틸리티
│   ├── layout.tsx            # 루트 레이아웃
│   └── page.tsx              # 메인 페이지
├── components/
│   ├── navigation.tsx        # 네비게이션 바
│   ├── hero-section.tsx      # 히어로 섹션
│   ├── search-filter-bar.tsx # 검색 및 필터 바
│   ├── city-card.tsx         # 도시 카드 컴포넌트
│   ├── city-cards-section.tsx # 도시 카드 섹션
│   ├── meetup-section.tsx    # 밋업 섹션
│   ├── reviews-section.tsx   # 리뷰 섹션
│   ├── recommendation-cta.tsx # 추천 CTA
│   └── footer.tsx            # 푸터
├── lib/
│   ├── types.ts              # TypeScript 타입 정의
│   ├── mock-data.ts          # 목 데이터
│   └── utils.ts              # 유틸리티 함수
├── docs/
│   └── prd.md                # 제품 요구사항 문서
└── public/                   # 정적 파일
```

## 목 데이터

현재 프로젝트는 UI 구현에 집중하며, 다음 목 데이터를 사용합니다:

- **도시**: 5개 (서울 성수동, 제주 제주시, 부산 해운대, 강릉, 전주)
- **밋업**: 4개
- **리뷰**: 3개

## 반응형 디자인

- **모바일**: < 768px (1열 그리드)
- **태블릿**: 768px - 1024px (2열 그리드)
- **데스크톱**: > 1024px (3열 그리드)

## 다음 단계

- [ ] 실시간 통계 섹션 (P1)
- [ ] 지역별 인기 도시 섹션 (P1)
- [ ] 뉴스레터 구독 (P1)
- [ ] 애니메이션 효과 추가
- [ ] 실제 API 연동
- [ ] 데이터베이스 연결

## 라이선스

Made with ❤️ for Korean Digital Nomads

## 참고

PRD(Product Requirements Document)는 `docs/prd.md` 파일에서 확인할 수 있습니다.

# TODO: 도시 상세 페이지 구현

> **작업 목표**: 도시 카드를 클릭했을 때 이동할 상세 페이지 제작

**작업 상태**: 🟡 진행 예정
**생성일**: 2025-11-04
**마지막 업데이트**: 2025-11-04

---

## 📋 작업 개요

사용자가 메인 페이지의 도시 카드를 클릭하면, 해당 도시의 상세 정보를 보여주는 페이지로 이동하도록 구현합니다.

### 주요 기능
- 동적 라우팅 (`/cities/[slug]`)
- 도시별 상세 정보 표시
- 반응형 디자인
- 404 처리
- 관련 도시 추천

### 기술 스택
- Next.js 15 App Router
- TypeScript
- Skeuomorphic Design System
- Server Components (기본)
- Client Components (필요시)

---

## 🎯 Phase 1: 라우팅 및 기본 페이지 구조 생성

### ✅ 완료 기준
- [ ] TypeScript 컴파일 에러 없음
- [ ] 동적 라우트가 정상 작동
- [ ] 기본 페이지 레이아웃이 표시됨

### 작업 목록

#### 1.1 동적 라우트 파일 생성
- **파일**: `app/cities/[slug]/page.tsx`
- **목표**: Next.js 동적 라우팅 설정
- **작업 내용**:
  - `app/cities/[slug]/` 디렉토리 생성
  - `page.tsx` 파일 생성
  - `params.slug`로 URL 파라미터 받기
  - generateStaticParams 구현 (SSG 최적화)
- **예상 시간**: ⚡ 10분

#### 1.2 slug로 도시 데이터 조회 헬퍼 함수 구현
- **파일**: `lib/mock-data.ts`
- **목표**: slug 기반 도시 데이터 조회 함수 추가
- **작업 내용**:
  ```typescript
  export function getCityBySlug(slug: string): City | undefined {
    return mockCities.find(city => city.slug === slug);
  }

  export function getAllCitySlugs(): string[] {
    return mockCities.map(city => city.slug);
  }
  ```
- **예상 시간**: ⚡ 5분

#### 1.3 기본 페이지 레이아웃 구성
- **파일**: `app/cities/[slug]/page.tsx`
- **목표**: Navigation, Footer 포함한 기본 레이아웃 구성
- **작업 내용**:
  - Navigation 컴포넌트 import 및 추가
  - Footer 컴포넌트 import 및 추가
  - 기본 페이지 구조 설정
  - 존재하지 않는 slug에 대한 notFound() 처리
- **예상 시간**: 🔨 15분

#### 1.4 초기 테스트
- **목표**: 라우팅이 정상 작동하는지 확인
- **작업 내용**:
  - 개발 서버 실행
  - `/cities/seoul-seongsu` 접근 테스트
  - `/cities/invalid-slug` 404 확인
- **예상 시간**: ⚡ 5분

---

## 🎨 Phase 2: 도시 상세 정보 섹션 컴포넌트 구현

### ✅ 완료 기준
- [ ] 모든 도시 정보가 표시됨
- [ ] Skeuomorphic 디자인 시스템 적용
- [ ] 컴포넌트 재사용성 확보

### 작업 목록

#### 2.1 도시 히어로 섹션 컴포넌트
- **파일**: `components/city-detail-hero.tsx`
- **목표**: 도시 대표 이미지, 이름, 설명 표시
- **작업 내용**:
  - 도시 이름, 지역 표시
  - 대표 이미지 (placeholder)
  - 짧은 설명
  - 태그 표시
  - 좋아요/싫어요 버튼 통합
  - `.card-skeu` 디자인 적용
- **예상 시간**: 🔨 20분

#### 2.2 생활비 상세 정보 섹션
- **파일**: `components/city-cost-details.tsx`
- **목표**: 월 평균 생활비, 월세, 카페비용 등 상세 표시
- **작업 내용**:
  - 월 평균 생활비 (`monthlyCost`)
  - 월세 (`rentCost`)
  - 카페 아메리카노 가격 (`cafeCost`)
  - 예산 필터 정보 (`budget`)
  - 시각적 구분을 위한 아이콘 추가 (Wallet, Home, Coffee)
  - `.card-skeu` 디자인 적용
- **예상 시간**: 🔨 20분

#### 2.3 실시간 날씨/대기질 정보 섹션
- **파일**: `components/city-weather-info.tsx`
- **목표**: 현재 날씨 및 대기질 정보 표시
- **작업 내용**:
  - 현재 기온 (`currentTemp`)
  - 날씨 상태 (`currentWeather`)
  - 대기질 지수 (`currentAQI`)
  - 날씨 아이콘 (Cloud, Sun, Wind 등)
  - AQI 상태별 색상 표시 (좋음/보통/나쁨)
  - `.card-skeu` 디자인 적용
- **예상 시간**: 🔨 20분

#### 2.4 환경 및 필터 정보 섹션
- **파일**: `components/city-environment-info.tsx`
- **목표**: 환경 정보, 최적 계절 등 표시
- **작업 내용**:
  - 환경 타입 (`environment`: 자연친화, 도시선호 등)
  - 최적 계절 (`bestSeason`)
  - 지역 정보 (`region`)
  - 각 환경별 아이콘 (Leaf, Building2, Coffee, Users)
  - 계절별 아이콘 (Sun, Wind, Snowflake)
  - `.tag-skeu` 디자인 적용
- **예상 시간**: 🔨 20분

---

## 🔗 Phase 3: CityCard에 상세페이지 링크 추가

### ✅ 완료 기준
- [ ] 모든 도시 카드가 클릭 가능
- [ ] 호버 효과가 자연스러움
- [ ] 접근성 확보 (키보드 네비게이션)

### 작업 목록

#### 3.1 CityCard를 Link로 감싸기
- **파일**: `components/city-card.tsx`
- **목표**: 카드 전체를 클릭 가능하게 만들기
- **작업 내용**:
  - `next/link` import
  - `<Link href={`/cities/${city.slug}`}>` 로 카드 감싸기
  - 기존 구조 유지하면서 링크 통합
  - 접근성 속성 추가 (aria-label)
- **예상 시간**: ⚡ 10분

#### 3.2 카드 호버 효과 개선
- **파일**: `components/city-card.tsx`
- **목표**: 클릭 가능하다는 시각적 피드백 제공
- **작업 내용**:
  - `cursor-pointer` 클래스 추가
  - `hover:scale-105 transition-transform` 효과
  - 카드 그림자 증가 효과 (호버 시)
  - 기존 `.card-skeu` 디자인과 조화
- **예상 시간**: ⚡ 10분

---

## 🧪 Phase 4: 통합 테스트 및 반응형 디자인 검증

### ✅ 완료 기준
- [ ] 모든 도시 상세페이지 정상 작동
- [ ] 반응형 디자인 완벽 구현
- [ ] TypeScript/ESLint 에러 없음
- [ ] 빌드 성공

### 작업 목록

#### 4.1 개발 서버 전체 테스트
- **목표**: 모든 도시 상세페이지 접근 확인
- **작업 내용**:
  - `npm run dev` 실행
  - 11개 도시 모두 접근 테스트
  - 링크 클릭 → 상세페이지 이동 확인
  - 뒤로가기 버튼 동작 확인
  - 콘솔 에러 확인
- **예상 시간**: 🔨 15분

#### 4.2 반응형 디자인 검증
- **목표**: 모바일/태블릿/데스크톱 모두 확인
- **작업 내용**:
  - 모바일 (< 768px): 1열 레이아웃
  - 태블릿 (768px - 1024px): 2열 레이아웃
  - 데스크톱 (> 1024px): 적절한 최대 너비
  - 브라우저 개발자 도구로 다양한 화면 크기 테스트
  - 터치 영역 크기 확인 (모바일)
- **예상 시간**: 🔨 15분

#### 4.3 TypeScript 및 ESLint 검사
- **목표**: 코드 품질 확보
- **작업 내용**:
  - `npx tsc --noEmit` 실행 (타입 체크)
  - `npm run lint` 실행
  - 모든 에러/경고 해결
  - `npm run build` 실행 및 성공 확인
- **예상 시간**: 🔨 15분

---

## ✨ Phase 5: 추가 기능 및 사용자 경험 개선

### ✅ 완료 기준
- [ ] 뒤로가기 버튼 추가 완료
- [ ] 404 페이지 구현
- [ ] 관련 도시 추천 기능 작동

### 작업 목록

#### 5.1 뒤로가기 버튼 추가
- **파일**: `components/back-button.tsx` (Client Component)
- **목표**: 상세페이지 → 홈으로 쉽게 이동
- **작업 내용**:
  - `"use client"` 지시자 추가
  - `useRouter` 사용
  - ArrowLeft 아이콘과 "목록으로" 텍스트
  - `.btn-skeu` 디자인 적용
  - 도시 상세페이지 상단에 배치
- **예상 시간**: 🔨 15분

#### 5.2 404 페이지 처리
- **파일**: `app/cities/[slug]/not-found.tsx`
- **목표**: 존재하지 않는 slug 접근 시 안내
- **작업 내용**:
  - 사용자 친화적인 404 메시지
  - 홈으로 돌아가는 링크
  - 전체 도시 목록 링크
  - Skeuomorphic 디자인 적용
- **예상 시간**: 🔨 15분

#### 5.3 관련 도시 추천 섹션
- **파일**: `components/related-cities.tsx`
- **목표**: 비슷한 도시 추천 기능
- **작업 내용**:
  - 같은 지역의 다른 도시 (region 기준)
  - 비슷한 예산의 도시 (budget 기준)
  - 최대 3개 추천
  - CityCard 재사용
  - 도시 상세페이지 하단에 배치
- **예상 시간**: 🏗️ 25분

---

## 📁 생성/수정될 파일 목록

### 새로 생성되는 파일
```text
app/cities/[slug]/page.tsx
app/cities/[slug]/not-found.tsx
components/city-detail-hero.tsx
components/city-cost-details.tsx
components/city-weather-info.tsx
components/city-environment-info.tsx
components/back-button.tsx
components/related-cities.tsx
```

### 수정되는 파일
```text
lib/mock-data.ts (헬퍼 함수 추가)
components/city-card.tsx (Link 추가, 호버 효과)
```

---

## 🔍 검증 체크리스트

### 기능 테스트
- [ ] 홈페이지에서 도시 카드 클릭 → 상세페이지 이동
- [ ] 11개 모든 도시 상세페이지 정상 표시
- [ ] 뒤로가기 버튼 작동
- [ ] 관련 도시 추천 정상 작동
- [ ] 존재하지 않는 slug 접근 시 404 페이지 표시

### UI/UX 테스트
- [ ] 모든 섹션이 Skeuomorphic 디자인 적용
- [ ] 모바일에서 정상 표시
- [ ] 태블릿에서 정상 표시
- [ ] 데스크톱에서 정상 표시
- [ ] 호버 효과가 자연스러움
- [ ] 로딩 속도가 빠름

### 코드 품질
- [ ] TypeScript 컴파일 에러 없음 (`npx tsc --noEmit`)
- [ ] ESLint 경고 없음 (`npm run lint`)
- [ ] 빌드 성공 (`npm run build`)
- [ ] 사용하지 않는 import 제거
- [ ] 컴포넌트 재사용성 확보

### 문서화
- [ ] CLAUDE.md 업데이트 (라우팅 구조 추가)
- [ ] 필요시 README.md 업데이트

---

## 📊 진행 상황

| Phase | 상태 | 진행률 | 완료 작업 | 전체 작업 |
|-------|------|--------|-----------|-----------|
| Phase 1 | 🟡 대기 | 0% | 0 | 4 |
| Phase 2 | 🟡 대기 | 0% | 0 | 4 |
| Phase 3 | 🟡 대기 | 0% | 0 | 2 |
| Phase 4 | 🟡 대기 | 0% | 0 | 3 |
| Phase 5 | 🟡 대기 | 0% | 0 | 3 |
| **전체** | **🟡 대기** | **0%** | **0** | **16** |

---

## 💡 참고사항

### 디자인 시스템 클래스
- `.card-skeu` - 3D 카드 효과
- `.btn-skeu` - 3D 버튼 효과
- `.tag-skeu` - 3D 태그 효과
- `.input-skeu` - 3D 입력창 효과

### 색상 시스템 (Tailwind 클래스)
- `text-foreground` - 주요 텍스트
- `text-muted` - 보조 텍스트
- `bg-surface` - 배경 (연한 회색)
- `bg-primary` - 주요 색상
- `bg-accent` - 강조 색상

### 아이콘 라이브러리
- `lucide-react` 사용
- 주요 아이콘: MapPin, Wallet, Cloud, Wind, Leaf, Building2, Coffee, Users, Sun, Snowflake 등

### Next.js 15 주요 기능
- App Router 사용
- Server Components 기본
- `generateStaticParams`로 SSG 최적화
- `notFound()` 함수로 404 처리

---

## 🚀 시작하기

Phase 1부터 순차적으로 진행합니다:

```bash
# 1. 동적 라우트 디렉토리 생성
mkdir -p app/cities/[slug]

# 2. 개발 서버 실행 (작업 중 계속 실행)
npm run dev

# 3. Phase 1 작업 시작
# - page.tsx 파일 생성
# - 헬퍼 함수 추가
# - 기본 레이아웃 구성
```

각 Phase 완료 후 체크리스트를 확인하고 다음 Phase로 진행합니다.

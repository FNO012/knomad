# Supabase Auth 설정 가이드

이 프로젝트는 Supabase를 사용하여 이메일 기반 인증을 구현했습니다. SSR(Server-Side Rendering)을 완벽하게 지원합니다.

## 1. 사전 준비

### Supabase 프로젝트 생성
1. [Supabase](https://supabase.com)에 가입하고 새 프로젝트 생성
2. 프로젝트 대시보드에서 다음 정보 확인:
   - Project URL
   - Anon (public) key

## 2. 환경 변수 설정

`.env.local` 파일을 프로젝트 루트에 생성하고 다음 내용을 추가하세요:

```bash
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

**참고**: `.env.local.example` 파일을 복사하여 사용할 수 있습니다.

## 3. 패키지 설치

```bash
pnpm install
```

이미 `package.json`에 다음 패키지가 추가되어 있습니다:
- `@supabase/supabase-js` - Supabase 클라이언트 라이브러리
- `@supabase/ssr` - SSR 지원을 위한 패키지

## 4. Supabase 이메일 설정

### 4.1 이메일 템플릿 설정
Supabase 대시보드에서:
1. **Authentication** → **Email Templates** 이동
2. **Confirm signup** 템플릿 수정
3. 확인 링크를 다음과 같이 설정:

```text
{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=email
```

### 4.2 Redirect URLs 설정
1. **Authentication** → **URL Configuration** 이동
2. **Redirect URLs**에 다음 추가:
   - `http://localhost:3000/**` (개발용)
   - `https://yourdomain.com/**` (프로덕션용)

### 4.3 이메일 제공자 설정 (선택사항)
기본적으로 Supabase는 하루 3-4개의 이메일만 전송할 수 있습니다. 프로덕션 환경에서는 SMTP 설정이 필요합니다:

1. **Project Settings** → **Auth** → **SMTP Settings**
2. 이메일 제공자 정보 입력 (Gmail, SendGrid 등)

## 5. 구현된 기능

### 5.1 인증 페이지
- **로그인**: `/login`
- **회원가입**: `/register`
- **이메일 확인**: `/auth/confirm` (자동 리디렉트)

### 5.2 보호된 라우트
middleware가 자동으로 인증되지 않은 사용자를 `/login`으로 리디렉트합니다.

제외되는 경로:
- `/login`, `/register`
- `/auth/*` (이메일 확인 등)
- 정적 파일 (`_next/static`, 이미지 등)

### 5.3 Server Actions
`app/actions/auth.ts`에 다음 액션이 구현되어 있습니다:
- `login(formData)` - 로그인
- `signup(formData)` - 회원가입
- `signout()` - 로그아웃

## 6. 사용 방법

### 6.1 서버 컴포넌트에서 사용자 정보 가져오기

```typescript
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function ProtectedPage() {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/login");
  }

  return <div>환영합니다, {user.email}!</div>;
}
```

### 6.2 클라이언트 컴포넌트에서 사용

```typescript
"use client";

import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

export function UserProfile() {
  const [user, setUser] = useState(null);
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });
  }, []);

  return <div>{user?.email}</div>;
}
```

## 7. 아키텍처

### 7.1 Supabase 클라이언트
- **Server Client** (`utils/supabase/server.ts`): Server Components, Server Actions, Route Handlers용
- **Client Client** (`utils/supabase/client.ts`): Client Components용
- **Middleware Client** (`utils/supabase/middleware.ts`): 세션 관리 및 자동 갱신

### 7.2 쿠키 기반 세션
- 모든 인증 상태는 HTTP-only 쿠키에 저장
- Middleware가 모든 요청에서 자동으로 토큰 갱신
- SSR 완벽 지원

### 7.3 보안
- `getUser()`를 사용하여 서버에서 토큰 재검증
- `getSession()`은 사용하지 않음 (보안 취약)
- CSRF 보호를 위한 쿠키 설정

## 8. 테스트

1. 개발 서버 실행:
```bash
pnpm dev
```

2. 회원가입 테스트:
   - http://localhost:3000/register 접속
   - 이메일과 비밀번호 입력
   - 이메일 확인 링크 클릭

3. 로그인 테스트:
   - http://localhost:3000/login 접속
   - 인증 정보 입력

4. 로그아웃 테스트:
   - Navigation에서 로그아웃 버튼 클릭

## 9. 트러블슈팅

### "Invalid login credentials" 오류
- Supabase 대시보드에서 이메일 확인이 완료되었는지 확인
- 비밀번호가 올바른지 확인

### 이메일이 오지 않음
- 스팸 폴더 확인
- Supabase 대시보드의 **Authentication** → **Logs**에서 이메일 전송 로그 확인
- SMTP 설정 확인 (프로덕션 환경)

### 세션이 유지되지 않음
- 쿠키가 제대로 설정되었는지 확인
- middleware.ts가 올바르게 설정되었는지 확인
- 브라우저 쿠키 차단 설정 확인

### TypeScript 오류
- `@supabase/supabase-js` 패키지가 설치되었는지 확인
- `pnpm install` 재실행

## 10. 다음 단계

- [ ] 비밀번호 재설정 기능 추가
- [ ] 프로필 페이지 구현
- [ ] Row Level Security (RLS) 정책 설정
- [ ] 소셜 로그인 추가 (선택사항)
- [ ] 이메일 템플릿 커스터마이징

## 참고 자료

- [Supabase 공식 문서](https://supabase.com/docs)
- [Next.js App Router + Supabase](https://supabase.com/docs/guides/auth/server-side/nextjs)
- [Supabase SSR 패키지](https://supabase.com/docs/guides/auth/server-side/creating-a-client)

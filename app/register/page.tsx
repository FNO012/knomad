import Link from "next/link";
import { Mail, Lock, User, ArrowLeft, AlertCircle } from "lucide-react";
import { signup } from "@/app/actions/auth";

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;
  return (
    <div className="min-h-screen bg-gradient-to-br from-surface via-white to-surface flex items-center justify-center p-4 py-12">
      <div className="w-full max-w-md">
        {/* Back to Home Link */}
        <Link
          href="/"
          className="inline-flex items-center space-x-2 text-muted hover:text-primary mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>홈으로 돌아가기</span>
        </Link>

        {/* Register Card */}
        <div className="card-skeu p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-block card-skeu px-4 py-2 mb-4">
              <span className="text-2xl font-bold text-primary">🏠 한국노마드</span>
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">회원가입</h1>
            <p className="text-muted">노마드 커뮤니티에 합류하세요</p>
          </div>

          {/* Error Message */}
          {params.error && (
            <div className="mb-6 p-4 bg-error/10 border border-error/20 rounded-lg flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-error flex-shrink-0 mt-0.5" />
              <p className="text-sm text-error">{params.error}</p>
            </div>
          )}

          {/* Register Form */}
          <form action={signup} className="space-y-5">
            {/* Name Input */}
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-foreground mb-2">
                이름
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="w-5 h-5 text-muted" />
                </div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="input-skeu w-full pl-12 pr-4 py-3 rounded-lg text-foreground"
                  placeholder="홍길동"
                  required
                />
              </div>
            </div>

            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-foreground mb-2">
                이메일
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="w-5 h-5 text-muted" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="input-skeu w-full pl-12 pr-4 py-3 rounded-lg text-foreground"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-foreground mb-2">
                비밀번호
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="w-5 h-5 text-muted" />
                </div>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="input-skeu w-full pl-12 pr-4 py-3 rounded-lg text-foreground"
                  placeholder="최소 8자 이상"
                  required
                  minLength={8}
                />
              </div>
              <p className="text-xs text-muted mt-2">최소 8자 이상 입력해주세요</p>
            </div>

            {/* Terms and Conditions */}
            <div className="card-skeu p-4 bg-surface/50">
              <p className="text-xs text-muted leading-relaxed">
                회원가입을 진행하면{" "}
                <Link href="#" className="text-primary hover:underline">
                  서비스 약관
                </Link>
                과{" "}
                <Link href="#" className="text-primary hover:underline">
                  개인정보 처리방침
                </Link>
                에 동의하는 것으로 간주됩니다.
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn-skeu w-full py-3 rounded-lg text-white font-semibold text-lg"
            >
              회원가입
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-muted">또는</span>
            </div>
          </div>

          {/* Login Link */}
          <div className="text-center">
            <p className="text-muted">
              이미 계정이 있으신가요?{" "}
              <Link href="/login" className="text-primary font-semibold hover:underline">
                로그인
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

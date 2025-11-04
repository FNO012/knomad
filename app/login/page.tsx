import Link from "next/link";
import { Mail, Lock, ArrowLeft, AlertCircle } from "lucide-react";
import { login } from "@/app/actions/auth";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; message?: string }>;
}) {
  const params = await searchParams;
  return (
    <div className="min-h-screen bg-gradient-to-br from-surface via-white to-surface flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back to Home Link */}
        <Link
          href="/"
          className="inline-flex items-center space-x-2 text-muted hover:text-primary mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>홈으로 돌아가기</span>
        </Link>

        {/* Login Card */}
        <div className="card-skeu p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-block card-skeu px-4 py-2 mb-4">
              <span className="text-2xl font-bold text-primary">🏠 한국노마드</span>
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">로그인</h1>
            <p className="text-muted">계정에 로그인하여 더 많은 정보를 확인하세요</p>
          </div>

          {/* Error Message */}
          {params.error && (
            <div className="mb-6 p-4 bg-error/10 border border-error/20 rounded-lg flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-error flex-shrink-0 mt-0.5" />
              <p className="text-sm text-error">{params.error}</p>
            </div>
          )}

          {/* Success Message */}
          {params.message && (
            <div className="mb-6 p-4 bg-success/10 border border-success/20 rounded-lg flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
              <p className="text-sm text-success">{params.message}</p>
            </div>
          )}

          {/* Login Form */}
          <form action={login} className="space-y-6">
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
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {/* Forgot Password Link */}
            <div className="flex justify-end">
              <Link href="#" className="text-sm text-primary hover:underline">
                비밀번호를 잊으셨나요?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn-skeu w-full py-3 rounded-lg text-white font-semibold text-lg"
            >
              로그인
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

          {/* Sign Up Link */}
          <div className="text-center">
            <p className="text-muted">
              계정이 없으신가요?{" "}
              <Link href="/register" className="text-primary font-semibold hover:underline">
                회원가입
              </Link>
            </p>
          </div>
        </div>

        {/* Footer Note */}
        <p className="text-center text-sm text-muted mt-8">
          로그인하면{" "}
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
    </div>
  );
}

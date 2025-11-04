import Link from "next/link";
import { ArrowLeft, MapPin } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Icon */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 card-skeu rounded-full">
            <MapPin className="w-12 h-12 text-muted" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-foreground mb-4">
          도시를 찾을 수 없습니다
        </h1>

        {/* Description */}
        <p className="text-muted text-lg mb-8">
          요청하신 도시가 존재하지 않거나 삭제되었습니다.
          <br />
          다른 도시를 찾아보시겠어요?
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <button className="btn-skeu px-6 py-3 rounded-lg text-white font-semibold flex items-center justify-center gap-2 w-full sm:w-auto">
              <ArrowLeft className="w-5 h-5" />
              홈으로 돌아가기
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

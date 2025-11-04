"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export function BackButton() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <button
      onClick={handleBack}
      className="input-skeu px-4 py-2 rounded-lg text-foreground font-semibold flex items-center gap-2 hover:shadow-lg transition-all"
    >
      <ArrowLeft className="w-5 h-5" />
      뒤로가기
    </button>
  );
}

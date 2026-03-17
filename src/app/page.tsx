import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-full p-8 text-center space-y-8 animate-in fade-in zoom-in duration-500">
      <div className="space-y-4">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
          나에게 어울리는<br />
          <span className="text-blue-600">한국 이름</span>은?
        </h1>
        <p className="text-lg text-gray-600 max-w-sm mx-auto break-keep">
          12가지 질문을 통해 당신의 성향을 분석하고,
          가장 잘 어울리는 한국 이름과 의미를 찾아드립니다.
        </p>
      </div>

      <Link href="/quiz">
        <Button className="w-full max-w-xs text-lg py-6 rounded-full shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
          테스트 시작하기
        </Button>
      </Link>
      
      <div className="absolute bottom-8 text-xs text-gray-400">
        © 2026 K-Soul Name. All rights reserved.
      </div>
    </div>
  );
}

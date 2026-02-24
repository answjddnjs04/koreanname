import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      {/* 60% Background: body/main (Primary) */}
      
      <div className="max-w-md w-full space-y-8 text-center">
        {/* 30% Secondary: Card structure */}
        <div className="card-container space-y-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-extrabold tracking-tight text-white">
              K-Soul Name
            </h1>
            <p className="text-slate-400">
              당신의 성향과 영혼을 담은 <br />
              단 하나의 한국 이름을 찾아드립니다.
            </p>
          </div>

          <div className="py-4 border-y border-slate-700/50">
            <p className="text-sm text-slate-300">
              12가지 질문 | 이미지 없이 텍스트 중심 | AI 기반 분석
            </p>
          </div>

          {/* 10% Accent: Call to Action button */}
          <div className="pt-2">
            <Link href="/quiz" className="btn-accent inline-flex items-center gap-2">
              이름 찾기 시작
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>

        <p className="text-xs text-slate-500">
          © 2026 K-Soul Name. All rights reserved.
        </p>
      </div>
    </main>
  );
}

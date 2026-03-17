"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuizStore } from "@/store/useQuizStore";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

interface NameResult {
  koreanName: string;
  hanja: string;
  meaning: string;
  personality: string;
}

export default function ResultPage() {
  const router = useRouter();
  const { answers, resetQuiz, isFinished } = useQuizStore();
  const [result, setResult] = useState<NameResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isFinished || answers.length === 0) {
      router.replace("/");
      return;
    }

    const fetchResult = async () => {
      try {
        const res = await fetch("/api/generate-name", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ answers }),
        });
        
        if (!res.ok) throw new Error("Failed to generate name");
        
        const data = await res.json();
        setResult(data);
      } catch (err) {
        setError("이름을 생성하는 중 오류가 발생했습니다. 다시 시도해주세요.");
      } finally {
        setLoading(false);
      }
    };

    fetchResult();
  }, [answers, isFinished, router]);

  const handleRetry = () => {
    resetQuiz();
    router.replace("/quiz");
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-full space-y-4">
        <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
        <p className="text-gray-500 font-medium">당신의 운명을 분석하고 있습니다...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-4 text-center">
        <p className="text-red-500 mb-4">{error}</p>
        <Button onClick={handleRetry}>다시 시도하기</Button>
      </div>
    );
  }

  if (!result) return null;

  return (
    <div className="flex flex-col h-full overflow-y-auto p-6 animate-in fade-in duration-700">
      <div className="flex-1 flex flex-col items-center justify-center space-y-8">
        <div className="text-center space-y-2">
          <p className="text-sm text-gray-500 tracking-widest uppercase">Your Korean Name</p>
          <h1 className="text-5xl font-black text-gray-900 tracking-tight leading-none">
            {result.koreanName}
          </h1>
          <p className="text-xl text-gray-400 font-serif">{result.hanja}</p>
        </div>

        <Card className="w-full max-w-sm bg-white/50 backdrop-blur-sm border-blue-100 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg text-blue-800">이름의 의미</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 leading-relaxed text-sm sm:text-base break-keep">
              {result.meaning}
            </p>
          </CardContent>
        </Card>

        <Card className="w-full max-w-sm bg-white/50 backdrop-blur-sm border-gray-100 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg text-gray-800">성향 분석</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base break-keep">
              {result.personality}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="pt-8 pb-4 w-full">
        <Button 
          onClick={handleRetry} 
          className="w-full py-6 text-lg rounded-xl shadow-md bg-gray-900 hover:bg-black text-white transition-all hover:scale-[1.02]"
        >
          다시 하기
        </Button>
      </div>
    </div>
  );
}

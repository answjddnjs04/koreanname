"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuizStore } from "@/store/useQuizStore";
import { questions } from "@/lib/questions";
import { QuizCard } from "@/components/QuizCard";
import { ProgressBar } from "@/components/ProgressBar";

export default function QuizPage() {
  const router = useRouter();
  const { currentQuestionIndex, setAnswer, nextQuestion, isFinished, answers } = useQuizStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isFinished) {
      router.push("/result");
    }
  }, [isFinished, router]);

  // Prevent hydration mismatch
  if (!mounted) return null;

  if (isFinished) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-xl font-medium animate-pulse">결과 분석 중...</p>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex) / questions.length) * 100;

  const handleSelect = (optionIndex: number) => {
    setAnswer(currentQuestionIndex, optionIndex);
    nextQuestion();
  };

  return (
    <div className="flex flex-col h-full max-h-screen">
      {/* Header / Progress */}
      <div className="px-6 py-4 border-b bg-white sticky top-0 z-10">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-semibold text-blue-600">
            Step {currentQuestionIndex + 1}
          </span>
          <span className="text-xs text-gray-400">
            {currentQuestionIndex + 1} / {questions.length}
          </span>
        </div>
        <ProgressBar current={currentQuestionIndex + 1} total={questions.length} />
      </div>

      {/* Question Card */}
      <div className="flex-1 overflow-y-auto p-4 flex items-center justify-center bg-gray-50/50">
        <div className="w-full max-w-sm animate-in fade-in slide-in-from-right-4 duration-300" key={currentQuestionIndex}>
          <QuizCard question={currentQuestion} onSelect={handleSelect} />
        </div>
      </div>
    </div>
  );
}

"use client";

import { Question } from "@/lib/questions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface QuizCardProps {
  question: Question;
  onSelect: (optionIndex: number) => void;
}

export function QuizCard({ question, onSelect }: QuizCardProps) {
  return (
    <Card className="w-full shadow-none border-0 sm:border sm:shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl sm:text-2xl text-center break-keep leading-snug">
          Q{question.id}. {question.text}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {question.options.map((option, index) => (
          <Button
            key={index}
            variant="outline"
            className="w-full text-left justify-start h-auto py-4 text-base hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 transition-all"
            onClick={() => onSelect(index)}
          >
            {option}
          </Button>
        ))}
      </CardContent>
    </Card>
  );
}

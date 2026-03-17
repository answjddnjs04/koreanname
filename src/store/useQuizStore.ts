import { create } from "zustand";

interface QuizState {
  currentQuestionIndex: number;
  answers: number[]; // Index of selected option for each question
  setAnswer: (questionIndex: number, optionIndex: number) => void;
  nextQuestion: () => void;
  resetQuiz: () => void;
  isFinished: boolean;
}

export const useQuizStore = create<QuizState>((set) => ({
  currentQuestionIndex: 0,
  answers: [],
  isFinished: false,
  setAnswer: (questionIndex, optionIndex) =>
    set((state) => {
      const newAnswers = [...state.answers];
      newAnswers[questionIndex] = optionIndex;
      return { answers: newAnswers };
    }),
  nextQuestion: () =>
    set((state) => ({
      currentQuestionIndex: state.currentQuestionIndex + 1,
      isFinished: state.currentQuestionIndex >= 11, // 0-11 index (12 questions)
    })),
  resetQuiz: () =>
    set({
      currentQuestionIndex: 0,
      answers: [],
      isFinished: false,
    }),
}));

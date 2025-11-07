import { useState } from "react";
import { toast } from "react-toastify";

interface UseOptionSelectionProps {
  correctOptionId: string;
  questionChecked: number;
  setQuestionChecked: (val: number) => void;
  setTotalScore: (val: number) => void;
  setShowResult: (val: boolean) => void;
  attempt: number;
  setAttempt: React.Dispatch<React.SetStateAction<number>>;
  stopTimer: () => void;
  maxQuestions?: number; // default: 15
  scorePerQuestion?: number; // default: 6.67
}

export function useOptionSelection({
  correctOptionId,
  questionChecked,
  setQuestionChecked,
  setTotalScore,
  setShowResult,
  setAttempt,
  stopTimer,
  maxQuestions = 15,
  scorePerQuestion = 6.67,
}: UseOptionSelectionProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [wrongAttempt, setWrongAttempt] = useState<boolean>(false);

  function handleOptionClick(id: string) {
    setSelectedOption(id);
    stopTimer();

    if (id === correctOptionId) {
      setIsCorrect(true);
      setWrongAttempt(false);
      toast.success("Correct answer! Great job!", {
        position: "top-center",
        autoClose: 3000,
      });

      // Do NOT decrement attempt for correct answer

      const nextChecked = questionChecked + 1;
      setQuestionChecked(nextChecked);
      let score = nextChecked * scorePerQuestion;
      setTotalScore(score);

      if (nextChecked === maxQuestions) {
        setShowResult(true);
      }
    } else {
      setIsCorrect(false);
      setWrongAttempt(true);
      toast.error("Incorrect answer. Try again!", {
        position: "top-center",
        autoClose: 3000,
      });

      // Decrement attempt for wrong answer and check if attempts are now zero
      setAttempt((prev) => {
        const updated = prev - 1;
        if (updated === 0) {
          setShowResult(true);
        }
        return updated;
      });
    }
  }

  function retry() {
    setSelectedOption(null);
    setIsCorrect(null);
    setWrongAttempt(false);
  }

  function skip() {
    setSelectedOption(null);
    setIsCorrect(null);
    setWrongAttempt(false);
    setShowResult(false); // Only if you want to hide result modal
    setQuestionChecked(questionChecked + 1);
    // Optionally reset attempts here if needed
  }

  return {
    selectedOption,
    isCorrect,
    wrongAttempt,
    handleOptionClick,
    retry,
    skip,
    resetSelection: retry,
  };
}

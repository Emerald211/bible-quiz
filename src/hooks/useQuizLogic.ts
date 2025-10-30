import { useEffect, useRef, useState } from "react";
import axios from "axios";
import useTimer from "./useTimerHook";
import { OptionType, QuizContextType } from "../types";
import { generateOptions } from "../utils/quizUtils";
import { useCallback } from "react";

type Difficulty = "basic" | "intermediate" | "advanced";

const useQuizLogic = (): QuizContextType => {
  const [verse, setVerse] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any[]>([]);
  const [options, setOptions] = useState<OptionType[]>([]);
  const [user, setUser] = useState("");
  const [questionChecked, setQuestionChecked] = useState(0);
  const [questionNo, setQuestionNo] = useState(1);
  const [totalScore, setTotalScore] = useState(0);
  const [attempt, setAttempt] = useState(3);
  const [showResult, setShowResult] = useState(false);

  const [currentDifficulty, setCurrentDifficulty] =
    useState<Difficulty>("basic");
  const [showDifficultyModal, setShowDifficultyModal] = useState(false);

  // 🔁 Track previous difficulty level to detect transitions
  const prevDifficultyRef = useRef<Difficulty>("basic");

  const {
    minuteDisplay,
    secondDisplay,
    timerRunning,
    startTimer,
    stopTimer,
    resetTimer,
    resumeTimer,
    setMinuteDisplay,
    setSecondDisplay,
  } = useTimer(() => {
    setTotalScore(Math.round(questionChecked * 6.67));
    setShowResult(true);
  });

  const getDifficultyLevel = (): Difficulty => {
    if (questionChecked >= 10) return "advanced";
    if (questionChecked >= 5) return "intermediate";
    return "basic";
  };

  // 🔄 Watch for difficulty changes and trigger modal
  useEffect(() => {
    const newDifficulty = getDifficultyLevel();
    if (newDifficulty !== prevDifficultyRef.current) {
      setCurrentDifficulty(newDifficulty);
      setShowDifficultyModal(true); // ✅ Trigger modal
      prevDifficultyRef.current = newDifficulty;
    }
  }, [questionChecked]);

  const getRandomVerse = useCallback(() => {
    const difficulty = getDifficultyLevel();
    setLoading(true);

    axios
      .get("https://labs.bible.org/api/?passage=random&type=json")
      .then((response) => {
        const result = response.data;
        setResult(result);
        setVerse(
          `<strong>${result[0].verse.substring(2)}</strong> ${result[0].text}`,
        );
        const shuffledOptions = generateOptions(result, difficulty);
        setOptions(shuffledOptions);
        resetTimer();
        startTimer();
      })
      .catch((error) => {
        console.error("Error fetching verse", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [
    getDifficultyLevel,
    setLoading,
    setResult,
    setVerse,
    generateOptions,
    setOptions,
    resetTimer,
    startTimer,
    resumeTimer,
  ]);

  // Option generation logic moved to utils/quizUtils.ts

  return {
    verse,
    minuteDisplay,
    secondDisplay,
    getRandomVerse,
    loading,
    result,
    options,
    user,
    questionChecked,
    questionNo,
    totalScore,
    attempt,
    showResult,
    timerRunning,
    setUser,
    setQuestionChecked,
    setQuestionNo,
    setTotalScore,
    setAttempt,
    setShowResult,
    startTimer,
    stopTimer,
    resetTimer,
    resumeTimer,
    setMinuteDisplay,
    setSecondDisplay,
    currentDifficulty,
    showDifficultyModal, // ✅ return modal state
    setShowDifficultyModal, // ✅ allow UI to dismiss modal
  };
};

export default useQuizLogic;

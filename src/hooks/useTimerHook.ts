import { useState, useRef } from "react";

const useTimer = (onTimeEnd: () => void, initialSeconds = 60) => {
  const [minuteDisplay, setMinuteDisplay] = useState("01");
  const [secondDisplay, setSecondDisplay] = useState("00");
  const [timerRunning, setTimerRunning] = useState(false);
  const intervalRef = useRef<number | null>(null);
  const totalSecondsRef = useRef<number>(initialSeconds);

  const updateDisplay = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    setMinuteDisplay(minutes < 10 ? `0${minutes}` : `${minutes}`);
    setSecondDisplay(seconds < 10 ? `0${seconds}` : `${seconds}`);
  };

  const startTimer = () => {
    let totalSeconds = initialSeconds;
    totalSecondsRef.current = totalSeconds;
    updateDisplay(totalSeconds);
    setTimerRunning(true);

    if (intervalRef.current !== null) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      totalSecondsRef.current--;
      if (totalSecondsRef.current >= 0) {
        updateDisplay(totalSecondsRef.current);
        if (totalSecondsRef.current === 0) {
          stopTimer();
          onTimeEnd();
        }
      } else {
        stopTimer();
      }
    }, 1000);
  };

  const resumeTimer = () => {
    setTimerRunning(true);

    if (intervalRef.current !== null) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      totalSecondsRef.current--;
      if (totalSecondsRef.current >= 0) {
        updateDisplay(totalSecondsRef.current);
        if (totalSecondsRef.current === 0) {
          stopTimer();
          onTimeEnd();
        }
      } else {
        stopTimer();
      }
    }, 1000);
  };

  const stopTimer = () => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      setTimerRunning(false);
    }
  };

  const resetTimer = () => {
    if (intervalRef.current !== null) clearInterval(intervalRef.current);
    totalSecondsRef.current = initialSeconds;
    updateDisplay(initialSeconds);
    setTimerRunning(false);
  };

  return {
    minuteDisplay,
    secondDisplay,
    timerRunning,
    startTimer,
    stopTimer,
    resetTimer,
    resumeTimer,
    setMinuteDisplay,
    setSecondDisplay,
  };
};

export default useTimer;

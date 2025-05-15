export interface OptionType {
    bookname: string;
    chapter: number;
    verse: number;
    id: string;
    text?: string;
  }
  
  export interface QuizContextType {
    verse: string;
    minuteDisplay: string;
    secondDisplay: string;
    getRandomVerse: () => void;
    loading: boolean;
    result: any[];
    options: OptionType[];
    user: string;
    timerRunning: boolean;
    questionNo: number;
    questionChecked: number;
    totalScore: number;
    attempt: number;
    currentDifficulty: string;
    startTimer: () => void;
    stopTimer: () => void;
    resetTimer: () => void;
    setUser: React.Dispatch<React.SetStateAction<string>>;
    setQuestionChecked: React.Dispatch<React.SetStateAction<number>>;
    setQuestionNo: React.Dispatch<React.SetStateAction<number>>;
    setTotalScore: React.Dispatch<React.SetStateAction<number>>;
    setAttempt: React.Dispatch<React.SetStateAction<number>>;
    showResult: boolean;
    setShowResult: React.Dispatch<React.SetStateAction<boolean>>;
    setMinuteDisplay: React.Dispatch<React.SetStateAction<string>>;
    setSecondDisplay: React.Dispatch<React.SetStateAction<string>>;
  }
  
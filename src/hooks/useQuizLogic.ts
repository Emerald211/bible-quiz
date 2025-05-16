import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import useTimer from './useTimerHook';
import { OptionType, QuizContextType } from '../types';

type Difficulty = 'basic' | 'intermediate' | 'advanced';

const useQuizLogic = (): QuizContextType => {
  const [verse, setVerse] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any[]>([]);
  const [options, setOptions] = useState<OptionType[]>([]);
  const [user, setUser] = useState('');
  const [questionChecked, setQuestionChecked] = useState(0);
  const [questionNo, setQuestionNo] = useState(1);
  const [totalScore, setTotalScore] = useState(0);
  const [attempt, setAttempt] = useState(2);
  const [showResult, setShowResult] = useState(false);

  const [currentDifficulty, setCurrentDifficulty] = useState<Difficulty>('basic');
  const [showDifficultyModal, setShowDifficultyModal] = useState(false);

  // 🔁 Track previous difficulty level to detect transitions
  const prevDifficultyRef = useRef<Difficulty>('basic');

  const {
    minuteDisplay,
    secondDisplay,
    timerRunning,
    startTimer,
    stopTimer,
    resetTimer,
    setMinuteDisplay,
    setSecondDisplay,
  } = useTimer(() => {
    setTotalScore(Math.round(questionChecked * 6.67));
    setShowResult(true);
  });

  const getDifficultyLevel = (): Difficulty => {
    if (questionChecked >= 10) return 'advanced';
    if (questionChecked >= 5) return 'intermediate';
    return 'basic';
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

  const getRandomVerse = () => {
    const difficulty = getDifficultyLevel();
    setLoading(true);

    axios
      .get('https://labs.bible.org/api/?passage=random&type=json')
      .then((response) => {
        const result = response.data;
        setResult(result);
        setVerse(`<strong>${result[0].verse.substring(2)}</strong> ${result[0].text}`);
        const shuffledOptions = shuffleArray(generateOptions(result, difficulty));
        setOptions(shuffledOptions);
        setLoading(false);
        resetTimer();
        startTimer();
      })
      .catch((error) => {
        console.error('Error fetching verse', error);
        setLoading(false);
      });
  };

  const shuffleArray = (array: any[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const generateOptions = (result: any, difficulty: Difficulty): OptionType[] => {
    const books = [
      'Genesis', 'Exodus', 'Leviticus', 'Numbers', 'Deuteronomy',
      'Joshua', 'Judges', 'Ruth', '1 Samuel', '2 Samuel',
      '1 Kings', '2 Kings', '1 Chronicles', '2 Chronicles',
      'Ezra', 'Nehemiah', 'Esther', 'Job', 'Psalms', 'Proverbs',
      'Ecclesiastes', 'Song of Solomon', 'Isaiah', 'Jeremiah',
      'Lamentations', 'Ezekiel', 'Daniel', 'Hosea', 'Joel', 'Amos',
      'Obadiah', 'Jonah', 'Micah', 'Nahum', 'Habakkuk', 'Zephaniah',
      'Haggai', 'Zechariah', 'Malachi', 'Matthew', 'Mark', 'Luke',
      'John', 'Acts', 'Romans', '1 Corinthians', '2 Corinthians',
      'Galatians', 'Ephesians', 'Philippians', 'Colossians', '1 Thessalonians',
      '2 Thessalonians', '1 Timothy', '2 Timothy', 'Titus', 'Philemon',
      'Hebrews', 'James', '1 Peter', '2 Peter', '1 John', '2 John',
      '3 John', 'Jude', 'Revelation'
    ];

    const correctOption = result[0];
    const correctBookIndex = books.indexOf(correctOption.bookname);
    const distractors: OptionType[] = [];

    if (difficulty === 'basic') {
      while (distractors.length < 3) {
        const randomBook = books[Math.floor(Math.random() * books.length)];
        if (
          randomBook !== correctOption.bookname &&
          !distractors.find(d => d.bookname === randomBook)
        ) {
          distractors.push({
            bookname: randomBook,
            chapter: Math.floor(Math.random() * 15) + 1,
            verse: Math.floor(Math.random() * 30) + 1,
            id: crypto.randomUUID(),
            text: '',
          });
        }
      }
    } else if (difficulty === 'intermediate') {
      const nearbyIndices = [-3, -2, -1, 1, 2, 3]
        .map(offset => correctBookIndex + offset)
        .filter(i => i >= 0 && i < books.length);

      shuffleArray(nearbyIndices);

      nearbyIndices.slice(0, 3).forEach(i => {
        distractors.push({
          bookname: books[i],
          chapter: Math.floor(Math.random() *15) + 1,
          verse: Math.floor(Math.random() * 30) + 1,
          id: crypto.randomUUID(),
          text: '',
        });
      });
    } else if (difficulty === 'advanced') {
      while (distractors.length < 3) {
        const chapter = Math.floor(Math.random() * 15) + 1;
        const verseNum = Math.floor(Math.random() * 30) + 1;
        if (chapter !== correctOption.chapter || verseNum !== correctOption.verse) {
          distractors.push({
            bookname: correctOption.bookname,
            chapter,
            verse: verseNum,
            id: crypto.randomUUID(),
            text: '',
          });
        }
      }
    }

    return [
      { ...correctOption, id: '1' },
      ...distractors
    ];
  };

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
    setMinuteDisplay,
    setSecondDisplay,
    currentDifficulty,
    showDifficultyModal,      // ✅ return modal state
    setShowDifficultyModal,   // ✅ allow UI to dismiss modal
  };
};

export default useQuizLogic;

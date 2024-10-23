import React, { useState, createContext, ReactNode } from 'react';
import axios from 'axios';

interface QuizContextType {
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

// Define option type
interface OptionType {
	bookname: string;
	chapter: number;
	verse: number;
	id: string;
	text?: string;
}

// Create context with default values
const QuizContext = createContext<QuizContextType>({
	verse: '',
	minuteDisplay: '',
	secondDisplay: '',
	getRandomVerse: () => {},
	loading: false,
	result: [],
	options: [],
	user: '',
	timerRunning: false,
	questionNo: 1,
	questionChecked: 1,
	totalScore: 0,
	attempt: 2,
	startTimer: () => {},
	stopTimer: () => {},
	resetTimer: () => {},
	setUser: () => {},
	setQuestionChecked: () => {},
	setQuestionNo: () => {},
	setTotalScore: () => {},
	setAttempt: () => {},
	showResult: false,
	setShowResult: () => {},
	setMinuteDisplay: () => {},
	setSecondDisplay: () => {},
});

interface QuizProviderProps {
	children: ReactNode;
}

const QuizProvider = ({ children }: QuizProviderProps) => {
	const [verse, setVerse] = useState<string>('');
	const [minuteDisplay, setMinuteDisplay] = useState<string>('00');
	const [secondDisplay, setSecondDisplay] = useState<string>('00');
	const [timerInterval, setTimerInterval] = useState(0);
	const [loading, setLoading] = useState<boolean>(false);
	const [result, setResult] = useState<any[]>([]);
	const [options, setOptions] = useState<OptionType[]>([]);
	const [user, setUser] = useState<string>('');
	const [questionChecked, setQuestionChecked] = useState<number>(1);
	const [questionNo, setQuestionNo] = useState<number>(1);
	const [totalScore, setTotalScore] = useState<number>(0);
	const [attempt, setAttempt] = useState<number>(2);
	const [showResult, setShowResult] = useState<boolean>(false);
	const [timerRunning, setTimerRunning] = useState<boolean>(false);

	// Function to fetch random verse
	const getRandomVerse = () => {
		setLoading(true);
		axios
			.get('https://labs.bible.org/api/?passage=random&type=json')
			.then((response) => {
				const result = response.data;
				setResult(result);
				setVerse(
					`<strong>${result[0].verse.substring(2)}</strong> ${result[0].text}`
				);

				// Shuffle and set options
				const shuffledOptions = shuffleArray(generateOptions(result));
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

	// Timer countdown logic
	const startTimer = () => {
		let totalSeconds = 60;
		setMinuteDisplay('01');
		setSecondDisplay('00');
		setTimerRunning(true);

		const intervalId = setInterval(() => {
			totalSeconds--;
			if (totalSeconds >= 0) {
				const minutes = Math.floor(totalSeconds / 60);
				const seconds = totalSeconds % 60;

				setMinuteDisplay(minutes < 10 ? `0${minutes}` : `${minutes}`);
				setSecondDisplay(seconds < 10 ? `0${seconds}` : `${seconds}`);

				if (totalSeconds === 0) {
					stopTimer();
					let score = questionChecked * 5;
					setTotalScore(score);
					setShowResult(true);
				}
			} else {
				stopTimer();
			}
		}, 1000);

		setTimerInterval(intervalId);
	};

	const stopTimer = () => {
		if (timerInterval) {
			clearInterval(timerInterval);
			setTimerRunning(false);
		}
	};

	const resetTimer = () => {
		setMinuteDisplay('01');
		setSecondDisplay('00');
		if (timerInterval) {
			clearInterval(timerInterval);
		}
	};

	// Shuffle array helper function
	const shuffleArray = (array: any[]) => {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}
		return array;
	};

	// Generate options for the quiz
	const generateOptions = (result: any): OptionType[] => {
		const oldTestamentBooks = [
			'Genesis',
			'Exodus',
			'Leviticus',
			'Numbers',
			'Deuteronomy',
			'Joshua',
			'Judges',
			'Ruth',
			'1 Samuel',
			'2 Samuel',
			'1 Kings',
			'2 Kings',
			'1 Chronicles',
			'2 Chronicles',
			'Ezra',
			'Nehemiah',
			'Esther',
			'Job',
			'Psalms',
			'Proverbs',
			'Ecclesiastes',
			'Song of Solomon',
			'Isaiah',
			'Jeremiah',
			'Lamentations',
			'Ezekiel',
			'Daniel',
			'Hosea',
			'Joel',
			'Amos',
			'Obadiah',
			'Jonah',
			'Micah',
			'Nahum',
			'Habakkuk',
			'Zephaniah',
			'Haggai',
			'Zechariah',
			'Malachi',
		];

		const newTestamentBooks = [
			'Matthew',
			'Mark',
			'Luke',
			'John',
			'Acts',
			'Romans',
			'1 Corinthians',
			'2 Corinthians',
			'Galatians',
			'Ephesians',
			'Philippians',
			'Colossians',
			'1 Thessalonians',
			'2 Thessalonians',
			'1 Timothy',
			'2 Timothy',
			'Titus',
			'Philemon',
			'Hebrews',
			'James',
			'1 Peter',
			'2 Peter',
			'1 John',
			'2 John',
			'3 John',
			'Jude',
			'Revelation',
		];

		const isOldTestament = Math.random() < 0.5;
		const books = isOldTestament ? oldTestamentBooks : newTestamentBooks;
		const correctOption = result[0];
		const randomId = 1;

		return [
			{ ...correctOption, id: String(randomId) },
			{
				bookname: books[Math.floor(Math.random() * books.length)],
				chapter: Math.floor(Math.random() * 12) + 1,
				text: '',
				verse: Math.floor(Math.random() * 30) + 1,
				id: crypto.randomUUID(),
			},
			{
				bookname: books[Math.floor(Math.random() * books.length)],
				chapter: Math.floor(Math.random() * 6) + 1,
				text: '',
				verse: Math.floor(Math.random() * 30) + 1,
				id: crypto.randomUUID(),
			},
			{
				bookname: books[Math.floor(Math.random() * books.length)],
				chapter: Math.floor(Math.random() * 18) + 1,
				text: '',
				verse: Math.floor(Math.random() * 30) + 1,
				id: crypto.randomUUID(),
			},
		];
	};

	// Provide context values
	const contextValue = {
		verse,
		minuteDisplay,
		secondDisplay,
		loading,
		getRandomVerse,
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
	};

	return (
		<QuizContext.Provider value={contextValue}>{children}</QuizContext.Provider>
	);
};

export { QuizContext, QuizProvider };

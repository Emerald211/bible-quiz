import React, { useState, useEffect, useContext, createContext } from 'react';
import axios from 'axios';

const QuizContext = createContext({
	verse: '',
	minuteDisplay: '',
	secondDisplay: '',
	getRandomVerse: () => {},
	loading: false,
	result: [],
	options: [],
	user: '',

	setQuestionNo: () => {},
	setTotalScore: () => {},

	questionNo: 1,
	questionChecked: 1,
	totalScore: 0,
	attempt: 2,
});

const QuizProvider = ({ children }) => {
	const [verse, setVerse] = useState('');
	const [minuteDisplay, setMinuteDisplay] = useState('00');
	const [secondDisplay, setSecondDisplay] = useState('00');
	const [timerInterval, setTimerInterval] = useState(0);
	const [loading, setLoading] = useState(false);
	const [result, setResult] = useState([]);
	const [options, setOptions] = useState<never[]>([]);
	const [user, setUser] = useState('');
	const [questionChecked, setQuestionChecked] = useState(1);
	const [questionNo, setQuestionNo] = useState(1);
	const [totalScore, setTotalScore] = useState(0);
	const [attempt, setAttempt] = useState(2);
	const [showResult, setShowResult] = useState(false);

	const getRandomVerse = () => {
		setLoading(true);
		axios
			.get('https://labs.bible.org/api/?passage=random&type=json')
			.then((response) => {
				const result = response.data;
				console.log(result);

				setResult(response.data);
				setVerse(
					`<strong>${result[0].verse.substring(2)}</strong> ${result[0].text}`
				);

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

				const isOldTestament = Math.random() < 0.5; // Randomly select Old or New Testament
				const books = isOldTestament ? oldTestamentBooks : newTestamentBooks;

				const correctOption = result[0];

				const randomId = 1;

				const option = [
					{ ...correctOption, id: randomId },
					{
						bookname: books[Math.floor(Math.random() * books.length)],
						chapter: Math.floor(Math.random() * 50) + 1,
						text: '',
						verse: Math.floor(Math.random() * 30) + 1,
						id: crypto.randomUUID(),
					},
					{
						bookname: books[Math.floor(Math.random() * books.length)],
						chapter: Math.floor(Math.random() * 50) + 1,
						text: '',
						verse: Math.floor(Math.random() * 30) + 1,
						id: crypto.randomUUID(),
					},
					{
						bookname: books[Math.floor(Math.random() * books.length)],
						chapter: Math.floor(Math.random() * 50) + 1,
						text: '',
						verse: Math.floor(Math.random() * 30) + 1,
						id: crypto.randomUUID(),
					},
				];

				const shuffleArray = (array) => {
					for (let i = array.length - 1; i > 0; i--) {
						const j = Math.floor(Math.random() * (i + 1));
						[array[i], array[j]] = [array[j], array[i]];
					}
					return array;
				};

				const shuffledArray = shuffleArray(option);

				setOptions(shuffledArray as never[]);
				setLoading(false);
				if (timerInterval) {
					clearInterval(timerInterval);
				}
				countDownTimer();
			})
			.catch((error) => {
				console.error('Error fetching verse', error);
				setLoading(false);
			});
	};

	const countDownTimer = () => {
		let totalSeconds = 60;
		setMinuteDisplay('01');
		setSecondDisplay('00');

		const intervalId = setInterval(() => {
			totalSeconds--;
			if (totalSeconds >= 0) {
				const minutes = Math.floor(totalSeconds / 60);
				const seconds = totalSeconds % 60;

				const minutesDisplay = minutes < 10 ? `0${minutes}` : `${minutes}`;
				const secondsDisplay = seconds < 10 ? `0${seconds}` : `${seconds}`;

				setMinuteDisplay(minutesDisplay);
				setSecondDisplay(secondsDisplay);

				if (seconds === 1) {
					let Score = questionChecked * 5;
					setTotalScore(Score);
					setShowResult(true);
				}
			} else {
				clearInterval(intervalId);
			}
		}, 1000);
		setTimerInterval(intervalId);
	};

	const contextValue = {
		verse,
		result,
		minuteDisplay,
		secondDisplay,
		loading,
		getRandomVerse,
		options,
		user,
		totalScore,
		questionChecked,
		questionNo,
		setUser,
		setQuestionChecked,
		setQuestionNo,
		setTotalScore,
		attempt,
		setAttempt,
		showResult,
		setShowResult,
	};

	return (
		<QuizContext.Provider value={contextValue}>{children}</QuizContext.Provider>
	);
};

export { QuizContext, QuizProvider };

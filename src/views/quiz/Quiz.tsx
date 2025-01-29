import { useContext, useState } from 'react';
import './quiz.css';
import Call from '../../assets/images/Group 17.png';
import Chance from '../../assets/images/Group 18.png';
import Shield from '../../assets/images/Group 21.png';
import Logo from '../../assets/images/Approved logo watchtower black 2.png';
import { QuizContext } from '../../context/Context';
import { Scoreboard } from '../scoreboard/scoreboard';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../../components/loader/Loader';

type Option = {
	bookname: string;
	chapter: number;
	verse: number;
	id: string;
};

const Quiz = () => {
	const {
		verse,
		minuteDisplay,
		secondDisplay,
		getRandomVerse,
		options,
		questionNo,
		questionChecked,
		setQuestionNo,
		setQuestionChecked,
		attempt,
		setAttempt,
		setTotalScore,
		showResult,
		setShowResult,
		setMinuteDisplay,
		setSecondDisplay,
		stopTimer,
		startTimer,
		resetTimer,
	} = useContext(QuizContext);
	const [selectedOption, setSelectedOption] = useState<string | null>(null);
	const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
	const [callAlumni, setCallAlumi] = useState(false);
	const [showCall, setShowcall] = useState(false);

	const handleOptionClick = (id: string) => {
		setSelectedOption(id);

		/***
		 *
		 */

		if (id === '1') {
			// Assuming '1' is the correct option id
			stopTimer();

			if (questionChecked === 9) {
				setIsCorrect(true);
				setShowResult(true);
				setQuestionChecked(questionChecked + 1);
				let score = (questionChecked + 1) * 10;
				setTotalScore(score);

				toast.success('Correct, 10/10', {
					position: 'top-right',
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: 'colored',
					transition: Bounce,
				});
			} else {
				setIsCorrect(true);
				setCallAlumi(false);
				setQuestionChecked(questionChecked + 1);
				toast.success('Correct, Move to the Next Question', {
					position: 'top-right',
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: 'colored',
					transition: Bounce,
				});
				stopTimer();
				setMinuteDisplay('00');
				setSecondDisplay('00');
			}
		} else {
			// Handle incorrect answer
			setIsCorrect(false);
			setAttempt(attempt - 1);

			toast.error(`You have ${attempt} more attempt(s)`, {
				position: 'top-right',
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: 'colored',
				transition: Bounce,
			});

			if (attempt === 0 && questionChecked === 0) {
				setQuestionChecked(0);
				let finalScore = questionChecked * 10;
				setTotalScore(finalScore);
				setShowResult(true);
			} else if (attempt === 0) {
				let finalScore = questionChecked * 10;
				setTotalScore(finalScore);
				setShowResult(true);
			}
		}
	};

	const nextQuestionHandler = () => {
		setSelectedOption(null);
		console.log({ questionChecked });

		getRandomVerse();
		setQuestionNo(questionNo + 1);
		setIsCorrect(null);
	};

	return (
		<div className='relative'>
			<div className='relative bg-img w-screen h-screen font-serrat flex flex-col justify-center items-center'>
				{showResult && <Scoreboard />}
				<ToastContainer
					position='top-right'
					autoClose={5000}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover
					theme='light'
					transition={Bounce}
				/>
				<div className='absolute flex left-5 top-4'>
					<img src={Logo} alt='Logo' />
				</div>
				<div className='absolute right-7 top-4'>
					<div className='flex main-container px-2 py-2 font-bold rounded text-white'>
						<h1>{minuteDisplay} :</h1>
						<h1>{secondDisplay}</h1>
					</div>
				</div>

				<div className='absolute right-5 top-20 flex gap-5'>
					{showCall ? (
						<h1></h1>
					) : (
						<img
							onClick={() => {
								setCallAlumi(true);
								resetTimer();
								startTimer();
								setShowcall(true);
							}}
							className='w-12 h-12'
							src={Call}
							alt='Call'
						/>
					)}
					<img className='w-12 h-12' src={Chance} alt='Chance' />
					<img className='w-12 h-12' src={Shield} alt='Shield' />
				</div>
				<div className='relative px-12 py-12 md:w-[90%] lg:w-[60%] h-[80dvh] flex flex-col items-center justify-center'>
					{verse ? (
						<div className='qa-container border-main px-5 py-6'>
							<h1
								dangerouslySetInnerHTML={{ __html: verse }}
								className='font-serrat text-black text-sm md:text-xl text-center font-bold'></h1>
						</div>
					) : (
						<Loader />
					)}

					

					<div className='md:mt-14 mt-4 grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-12'>
						{options.map((eachItem: Option) => {
							const isSelected = selectedOption === eachItem.id;
							const bgColor = isSelected
								? isCorrect
									? 'bg-green-500'
									: 'bg-red-500'
								: 'bg-transparent';

							return (
								<div
									onClick={() => handleOptionClick(eachItem.id)}
									className={`flex w-[265px] items-center justify-center text-sm md:text-lg text-center text-black border gap-1 border-main md:px-4 lg:px-8 py-3 rounded-r-xl hover:bg-core hover:text-white font-bold ${bgColor}`}
									key={eachItem.id}>
									<span>{eachItem.bookname} </span>
									<span>{eachItem.chapter} :</span>
									<span>{eachItem.verse}</span>
								</div>
							);
						})}
					</div>
				</div>

				{callAlumni && (
					<div>
						<div className='flex main-container px-28 py-2 font-bold rounded-2xl text-white'>
							<h1>Calling an Alunmi.... </h1>
							<h1 className=' ml-2'> {minuteDisplay} :</h1>
							<h1>{secondDisplay}</h1>
						</div>
					</div>
				)}

				<div className=' mt-6 flex px-12 md:px-0 items-center gap-4 md:gap-14'>
					<div className='text-black font-bold'>
						{questionNo} out of 10 questions
					</div>
					<button
						className='main-container text-white px-12 py-3 rounded'
						onClick={nextQuestionHandler}
						disabled={selectedOption === null ? true : false}>
						Next Question
					</button>
				</div>
			</div>
		</div>
	);
};

export default Quiz;

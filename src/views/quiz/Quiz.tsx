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
	} = useContext(QuizContext);
	const [selectedOption, setSelectedOption] = useState(null);
	const [isCorrect, setIsCorrect] = useState(null);

	const handleOptionClick = (id) => {
		setSelectedOption(id);
		if (id === 1) {
			if (questionChecked === 10) {
				setIsCorrect(true);
				setShowResult(true);

				setQuestionChecked(questionChecked + 1);

				let score = questionChecked * 5;
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
			}
		} else {
			setIsCorrect(false);

			setAttempt(attempt - 1);

			toast.error(`You have ${attempt} more attempt`, {
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
				toast.error(`You have ${attempt} attempts`, {
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

				setQuestionChecked(0);
				let finalScore = questionChecked * 5;
				setTotalScore(finalScore);
				setShowResult(true);
			}
		}
	};

	const nextQuestionHandler = () => {
		setIsCorrect(null);
		setSelectedOption(null);
		getRandomVerse();
		setQuestionChecked(questionChecked + 1);

		setQuestionNo(questionNo + 1);

		console.log(questionChecked);
	};

	return (
		<div className=' relative'>
			<div className='relative bg-main w-screen h-screen font-serrat flex flex-col justify-center items-center'>
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
				<div className=' absolute left-5 top-4'>
					<img src={Logo} alt='Logo' />
				</div>
				<div className='absolute right-7 top-4'>
					<div className='flex main-container px-2 py-2 font-bold rounded-2xl text-white'>
						<h1>{minuteDisplay} : </h1>
						<h1>{secondDisplay}</h1>
					</div>
				</div>

				<div className=' absolute right-5 top-20 flex gap-5'>
					<img className='w-12 h-12' src={Call} alt='Call' />
					<img className='w-12 h-12' src={Chance} alt='Chance' />
					<img className='w-12 h-12' src={Shield} alt='Shield' />
				</div>
				<div className=' relative px-12 py-12 md:w-[90%] lg:w-[60%] h-[80dvh]  flex flex-col items-center justify-center'>
					<div className='qa-container border-purple-500 px-5 py-6'>
						<h1
							dangerouslySetInnerHTML={{ __html: verse }}
							className='font-serrat text-white text-sm md:text-xl text-center font-bold'></h1>
					</div>

					<div className='md:mt-14 mt-4 grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-12'>
						{options.map((eachItem) => {
							const isSelected = selectedOption === eachItem.id;
							const bgColor = isSelected
								? isCorrect
									? 'bg-green-500'
									: 'bg-red-500'
								: 'bg-transparent';

							return (
								<div
									onClick={() => handleOptionClick(eachItem.id)}
									className={`flex w-[265px] items-center justify-center text-sm md:text-lg text-center text-white border gap-1 border-core md:px-4 lg:px-8 py-3 rounded-r-xl hover:bg-core font-bold ${bgColor}`}
									key={eachItem.id}>
									<span>{eachItem.bookname} </span>
									<span>{eachItem.chapter} :</span>
									<span>{eachItem.verse}</span>
								</div>
							);
						})}
					</div>
				</div>

				<div className=' flex px-12 md:px-0 items-center gap-4 md:gap-14 '>
					<div className=' text-white font-bold'>
						{questionNo} out of 10 questions
					</div>
					<button
						className=' main-container text-white px-12 py-3 rounded-2xl'
						onClick={nextQuestionHandler}>
						Next Question
					</button>
				</div>
			</div>
		</div>
	);
};

export default Quiz;

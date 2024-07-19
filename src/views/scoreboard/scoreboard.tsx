import { useContext } from 'react';
import { QuizContext } from '../../context/Context';
import './scoreboard.css';
import Evict from '../../assets/images/Stamp.png';
import { useNavigate } from 'react-router-dom';

export const Scoreboard = () => {
	const { user, totalScore, questionChecked, setUser, setQuestionChecked, setQuestionNo, setTotalScore, setAttempt, setShowResult } = useContext(QuizContext);

	const navigate = useNavigate()

	const handleSubmit = () => {
		navigate('/')

		setUser('')
		setQuestionChecked(0)
		setQuestionNo(1)
		setTotalScore(0)
		setAttempt(2)
		setShowResult(false)


		
	}
	return (
		<div className=' score-card z-40 gap-4 flex flex-col justify-center justify-center items-center w-screen h-screen absolute  font-serrat text-white'>
			{questionChecked < 4 ? (
				<div className=' flex flex-col items-center justify-center'>
					<img src={Evict} />
					<h1 className=' text-white text-xl'>Oops...{user}</h1>
				</div>
			) : (
				<h1 className=' text-white text-xl'>Congratulations {user}</h1>
			)}

			<h1 className=' font-bold text-4xl'>You have {totalScore} Points</h1>

			<button onClick={handleSubmit}  className=' w-[265px] main-container px-6 py-4 rounded-2xl text-white text-center font-bold'>
				Next Tribe
			</button>
			<h1></h1>
		</div>
	);
};

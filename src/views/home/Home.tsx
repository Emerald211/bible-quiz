import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/images/Approved logo watchtower black 2.png';
import Hilltop from '../../assets/images/Hilltop-removebg-preview.png'
import { useForm, SubmitHandler } from 'react-hook-form';
import { useContext } from 'react';
import { QuizContext } from '../../context/Context';

interface FormValues {
	tribe: string;
}

const Home = () => {
	const navigate = useNavigate();

	const { getRandomVerse, setUser } = useContext(QuizContext);

	const { register, handleSubmit } = useForm<FormValues>();

	const onSubmitForm: SubmitHandler<FormValues> = (data) => {
		const { tribe } = data;

		console.log(tribe);

		navigate('/quiz');

		getRandomVerse();

		setUser(tribe);
	};

	return (
		<div className=' bg-main  flex flex-col justify-center items-center font-serrat  bg-cover w-screen h-screen'>
			<div className=' flex items-center'>
				<img src={Hilltop} className='w-36 h-36' />
				<img src={Logo} alt='' />
			</div>
			<h1 className=' main-text font-serrat text-5xl font-bold'>
				ScripturePedia
			</h1>
			<h3 className=' mt-3 text-center text-lg italic font-bold text-gray-500'>
			Test your Bible knowledge with our exciting quizzes, <br /> Lets dive into the Scripture together
			</h3>

			<form
				onSubmit={handleSubmit(onSubmitForm)}
				className=' flex flex-col mt-4 items-center'
				action=''>
				<input
					{...register('tribe')}
					required
					className=' qa-container w-[265px] md:w-[350px] rounded px-6 py-3 text-white font-bold'
					placeholder='Input Your Tribe Name'
					type='text'
				/>
				<button
					type='submit'
					className=' mt-3 hover:bg-core border w-[265px] main-container border-core px-16 py-3 text-white rounded'>
					Start Now
				</button>
			</form>
		</div>
	);
};

export default Home;

import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/images/Approved logo watchtower black 2.png';
import { useForm } from 'react-hook-form';
import { useContext } from 'react';
import { QuizContext } from '../../context/Context';

const Home = () => {
	const navigate = useNavigate();

	const { getRandomVerse, setUser } = useContext(QuizContext);

	const { register, handleSubmit } = useForm();

	const onSubmitForm = (data: { tribe: string }) => {
		const { tribe } = data;

		console.log(tribe);

		navigate('/quiz');

		getRandomVerse();

		setUser(tribe)
	};

	return (
		<div className=' bg-main  flex flex-col justify-center items-center font-serrat  bg-cover w-screen h-screen'>
			<img src={Logo} alt='' />
			<h1 className=' main-text font-serrat text-5xl font-bold'>
				ScripturePedia
			</h1>
			<h3 className=' mt-3 text-lg italic font-bold text-white'>
				Lets dive into the Scripture together
			</h3>

			<form
				onSubmit={handleSubmit(onSubmitForm)}
				className=' flex flex-col mt-4'
				action=''>
				<input
					{...register('tribe')}
					required
					className=' qa-container w-[265px] px-6 py-3 text-white font-bold'
					placeholder='Tribe Name'
					type='text'
				/>
				<button
					type='submit'
					className=' mt-3 hover:bg-core border main-container border-core px-16 py-3 text-white rounded-3xl'>
					Start Now
				</button>
			</form>
		</div>
	);
};

export default Home;

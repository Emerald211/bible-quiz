import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './views/home/Home';
import Quiz from './views/quiz/Quiz';

function App() {
	return (
		<>
			<Routes>
				<Route path='/' element={<Home />}></Route>
				<Route path='/quiz' element={<Quiz />} />
			</Routes>
		</>
	);
}

export default App;

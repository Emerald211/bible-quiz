import { lazy, Suspense } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Loader from './components/loader/Loader';
const Home = lazy(() => import('./views/home/Home'));
const Quiz = lazy(() => import('./views/quiz/Quiz'));

function App() {
	return (
		<>
			<Routes>
				<Route
					path='/'
					element={
						<Suspense
							fallback={
								<div className=' bg-img w-screen h-screen flex items-center justify-center'>
									<Loader />
								</div>
							}>
							<Home />
						</Suspense>
					}></Route>
				<Route
					path='/quiz'
					element={
						<Suspense
							fallback={
								<div className=' bg-img w-screen h-screen flex items-center justify-center'>
									<Loader />
								</div>
							}>
							<Quiz />
						</Suspense>
					}
				/>
			</Routes>
		</>
	);
}

export default App;

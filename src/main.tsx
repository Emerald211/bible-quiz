import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { QuizProvider } from './context/Context.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<BrowserRouter>
			<QuizProvider>
				<App />
			</QuizProvider>
		</BrowserRouter>
	</React.StrictMode>
);

import { createContext } from 'react';
import { QuizContextType } from '../types';

const QuizContext = createContext<QuizContextType>({} as QuizContextType);
export default QuizContext;

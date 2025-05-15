import { ReactNode } from 'react';
import QuizContext from './QuizContext';
import useQuizLogic from '../hooks/useQuizLogic';

interface QuizProviderProps {
  children: ReactNode;
}

const QuizProvider = ({ children }: QuizProviderProps) => {
  const contextValue = useQuizLogic();
  return <QuizContext.Provider value={contextValue}>{children}</QuizContext.Provider>;
};

export default QuizProvider;

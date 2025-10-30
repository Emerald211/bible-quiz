import React from 'react';

interface DifficultyModalProps {
  show: boolean;
  difficulty: string;
  onContinue: () => void;
}

const DifficultyModal: React.FC<DifficultyModalProps> = ({
  show,
  difficulty,
  onContinue,
}) => {
  if (!show) return null;

  return (
    <div className='fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center'>
      <div className='bg-white rounded-lg p-6 max-w-sm text-center shadow-lg'>
        <h2 className='text-xl font-bold text-main mb-2'>Level Up!</h2>
        <p className='text-gray-700 mb-4'>
          You've reached{' '}
          <strong>{difficulty.toUpperCase()}</strong> level!
        </p>
        <button
          onClick={onContinue}
          className='bg-main text-white py-2 px-5 rounded hover:bg-core transition'
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default DifficultyModal;

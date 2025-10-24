import React from "react";

type Option = {
  bookname: string;
  chapter: number;
  verse: number;
  id: string;
};

interface QuestionPanelProps {
  verse: string;
  options: Option[];
  selectedOption: string | null;
  isCorrect: boolean | null;
  fiftyUsedOptions: string[];
  loading: boolean;
  onOptionClick: (id: string) => void;
  wrongAttempt?: boolean;
}

const QuestionPanel: React.FC<QuestionPanelProps> = ({
  verse,
  options,
  selectedOption,
  isCorrect,
  fiftyUsedOptions,
  loading,
  onOptionClick,
  wrongAttempt = false,
}) => (
  <div className="relative px-12 py-12 md:w-[90%] lg:w-[60%] h-[80dvh] flex flex-col items-center justify-center">
    {verse ? (
      <div className="qa-container border-main px-5 py-6">
        <h1
          dangerouslySetInnerHTML={{ __html: verse }}
          className="font-serrat text-black text-sm md:text-xl text-center font-bold"
        ></h1>
      </div>
    ) : (
      <div className="flex items-center justify-center w-full h-full">
        <span>Loading verse...</span>
      </div>
    )}

    <div className="md:mt-14 mt-4 grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-12">
      {options.map((eachItem: Option) => {
        const isSelected = selectedOption === eachItem.id;
        const isFiftyWrong = fiftyUsedOptions.includes(eachItem.id);
        const bgColor = isSelected
          ? isCorrect
            ? "bg-green-500"
            : "bg-red-500"
          : isFiftyWrong
            ? "bg-red-500 text-white"
            : "bg-transparent";
        const isHidden = wrongAttempt && selectedOption !== eachItem.id;

        return (
          <div
            onClick={() => onOptionClick(eachItem.id)}
            key={eachItem.id}
            className={`flex w-[265px] items-center justify-between text-sm md:text-lg text-black border border-main px-4 py-3 rounded-xl hover:bg-core hover:text-white font-bold ${bgColor} cursor-pointer`}
            aria-selected={isSelected}
            role="button"
            tabIndex={0}
            style={isHidden ? { visibility: "hidden" } : {}}
          >
            <span className="truncate max-w-[70%]">{eachItem.bookname}</span>
            <span>
              {eachItem.chapter} : {eachItem.verse}
            </span>
          </div>
        );
      })}
    </div>
  </div>
);

export default QuestionPanel;

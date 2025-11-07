import { useContext, useState } from "react";
import "./quiz.css";
import Logo from "../../assets/images/Approved logo watchtower black 2.png";
import QuizContext from "../../context/QuizContext";
import { Scoreboard } from "../scoreboard/scoreboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LifelinePanel from "./LifelinePanel";
import DifficultyModal from "./DifficultyModal";
import TimerDisplay from "./TimerDisplay";
import QuestionPanel from "./QuestionPanel";
import { shuffleArray } from "../../utils/helpers";
import { useOptionSelection } from "../../hooks/useOptionSelection";

const Quiz = () => {
  const {
    verse,
    minuteDisplay,
    secondDisplay,
    getRandomVerse,
    options,
    questionNo,
    questionChecked,
    setQuestionNo,
    setQuestionChecked,
    attempt,
    setAttempt,
    setTotalScore,
    loading,
    showResult,
    setShowResult,
    stopTimer,
    startTimer,
    resetTimer,
    resumeTimer,
    currentDifficulty,
    showDifficultyModal,
    setShowDifficultyModal,
  } = useContext(QuizContext);

  const [callAlumni, setCallAlumi] = useState(false);
  const [showCall, setShowcall] = useState(false);
  const [askTribe, setAskTribe] = useState(false);
  const [showCallTribe, setShowcallTribe] = useState(false);
  const [useFiftyUsed, setUseFiftyUsed] = useState(false);
  const [fiftyUsedOptions, setFiftyUsedOptions] = useState<string[]>([]);

  // Integrate useOptionSelection hook
  const {
    selectedOption,
    isCorrect,
    wrongAttempt,
    handleOptionClick,
    retry,
    skip,
    resetSelection,
  } = useOptionSelection({
    correctOptionId: "1",
    questionChecked,
    setQuestionChecked,
    setTotalScore,
    setShowResult,
    attempt,
    setAttempt,
    stopTimer,
    maxQuestions: 15,
    scorePerQuestion: 6.67,
  });

  const handleFiftyFifty = () => {
    if (useFiftyUsed || !options.length) return;

    const incorrectOptions = options.filter((opt) => opt.id !== "1");
    shuffleArray(incorrectOptions);

    const selectedTwo = incorrectOptions.slice(0, 2).map((opt) => opt.id);
    setFiftyUsedOptions(selectedTwo);
    setUseFiftyUsed(true);
  };

  // handleOptionClick logic is now handled by useOptionSelection hook

  const nextQuestionHandler = () => {
    resetSelection();
    getRandomVerse();
    setQuestionNo(questionNo + 1);
    setFiftyUsedOptions([]); // Reset 50/50 highlights

    if (showCallTribe === true) setAskTribe(false);
    if (showCall === true) setCallAlumi(false);
  };

  return (
    <div className="relative">
      <div className="relative bg-img w-screen h-screen font-serrat flex flex-col justify-center items-center">
        {showResult && <Scoreboard />}
        <ToastContainer />

        <DifficultyModal
          show={showDifficultyModal}
          difficulty={currentDifficulty}
          onContinue={() => {
            setShowDifficultyModal(false);
            // nextQuestionHandler();
          }}
        />

        <div className="absolute flex left-5 top-4">
          <img src={Logo} alt="Logo" />
        </div>

        <div className="absolute right-7 top-4">
          <TimerDisplay
            minute={minuteDisplay}
            second={secondDisplay}
            current={questionNo}
            total={16}
          />
        </div>
        <div className="absolute right-5 top-20 gap-5">
          <LifelinePanel
            showCall={showCall}
            showCallTribe={showCallTribe}
            useFiftyUsed={useFiftyUsed}
            setCallAlumi={setCallAlumi}
            setShowcall={setShowcall}
            setShowcallTribe={setShowcallTribe}
            setAskTribe={setAskTribe}
            handleFiftyFifty={handleFiftyFifty}
            resetTimer={resetTimer}
            startTimer={startTimer}
            trialsLeft={attempt}
          />

          <div className="mt-3 text-center">
            <p>
              Level:{" "}
              <strong className="text-main">
                {currentDifficulty.toUpperCase()}
              </strong>
            </p>
          </div>
        </div>

        <QuestionPanel
          verse={verse}
          options={options}
          selectedOption={selectedOption}
          isCorrect={isCorrect}
          fiftyUsedOptions={fiftyUsedOptions}
          loading={loading}
          onOptionClick={handleOptionClick}
          wrongAttempt={wrongAttempt}
        />

        {callAlumni && (
          <div>
            <div className="flex main-container px-28 py-2 font-bold rounded-2xl text-white">
              <h1>Calling an Alunmi.... </h1>
              <h1 className="ml-2"> {minuteDisplay} :</h1>
              <h1>{secondDisplay}</h1>
            </div>
          </div>
        )}

        {askTribe && (
          <div>
            <div className="flex main-container px-28 py-2 font-bold rounded-2xl text-white">
              <h1>Asking the Audience.... </h1>
              <h1 className="ml-2"> {minuteDisplay} :</h1>
              <h1>{secondDisplay}</h1>
            </div>
          </div>
        )}

        <div className="mt-6 flex px-12 md:px-0 items-center gap-4 md:gap-14">
          <div className="text-black font-bold">
            {questionNo} out of 15 questions
          </div>
          {wrongAttempt ? (
            <div className="flex gap-2">
              <button
                className="main-container text-white px-8 py-3 rounded"
                onClick={() => {
                  retry();
                  resumeTimer();
                }}
              >
                Retry
              </button>
              <button
                className="main-container text-white px-8 py-3 rounded"
                onClick={() => {
                  skip();
                  nextQuestionHandler();
                }}
              >
                Next Question
              </button>
            </div>
          ) : (
            <button
              className="main-container text-white px-12 py-3 rounded"
              onClick={nextQuestionHandler}
              disabled={selectedOption === null || loading}
            >
              {loading ? "Loading..." : "Next Question"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;

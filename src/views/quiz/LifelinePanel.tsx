import React from "react";
import Call from "../../assets/images/Group 17.png";
import Chance from "../../assets/images/Group 18.png";
import Shield from "../../assets/images/Group 21.png";

interface LifelinePanelProps {
  showCall: boolean;
  showCallTribe: boolean;
  useFiftyUsed: boolean;
  setCallAlumi: (val: boolean) => void;
  setShowcall: (val: boolean) => void;
  setShowcallTribe: (val: boolean) => void;
  setAskTribe: (val: boolean) => void;
  handleFiftyFifty: () => void;
  resetTimer: () => void;
  startTimer: () => void;
  trialsLeft: number;
}

const LifelinePanel: React.FC<LifelinePanelProps> = ({
  showCall,
  showCallTribe,
  useFiftyUsed,
  setCallAlumi,
  setShowcall,
  setShowcallTribe,
  setAskTribe,
  handleFiftyFifty,
  resetTimer,
  startTimer,
  trialsLeft,
}) => (
  <div>
    <div className="flex gap-5 items-center">
      <img
        onClick={() => {
          if (!showCall) {
            setCallAlumi(true);
            resetTimer();
            startTimer();
            setShowcall(true);
          }
        }}
        className={`w-12 h-12 cursor-pointer ${showCall ? "opacity-30 pointer-events-none" : ""}`}
        src={Call}
        alt="Call"
        title={showCall ? "Call an Alumni (Used)" : "Call an Alumni"}
      />
      <img
        onClick={() => {
          if (!showCallTribe) {
            setShowcallTribe(true);
            resetTimer();
            startTimer();
            setAskTribe(true);
          }
        }}
        className={`w-12 h-12 cursor-pointer ${showCallTribe ? "opacity-30 pointer-events-none" : ""}`}
        src={Chance}
        alt="Ask the Audience"
        title={showCallTribe ? "Ask the Audience (Used)" : "Ask the Audience"}
      />
      <img
        onClick={handleFiftyFifty}
        className={`w-12 h-12 cursor-pointer ${useFiftyUsed ? "opacity-30 pointer-events-none" : ""}`}
        src={Shield}
        alt="50/50"
        title={
          useFiftyUsed ? "Use 50/50 Lifeline (Used)" : "Use 50/50 Lifeline"
        }
      />
    </div>
    <div className="ml-5 text-center mt-4">
      <p className="text-sm font-semibold">Trials Left:</p>
      <p className="text-lg font-bold">{trialsLeft}</p>
    </div>
  </div>
);

export default LifelinePanel;

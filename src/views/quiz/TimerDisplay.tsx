import React from "react";
import ProgressCircle from "./ProgressCircle";

interface TimerDisplayProps {
  minute: string;
  second: string;
  current: number;
  total: number;
}

const TimerDisplay: React.FC<TimerDisplayProps> = ({
  minute,
  second,
  current,
  total,
}) => (
  <div className="flex items-center gap-4">
    <ProgressCircle current={current} total={total} />
    <div className="flex items-center main-container px-2 py-2 font-bold rounded text-white">
      <h1>{minute} :</h1>
      <h1>{second}</h1>
    </div>
  </div>
);

export default TimerDisplay;

import React from "react";

interface ProgressCircleProps {
  current: number;
  total: number;
}

const ProgressCircle: React.FC<ProgressCircleProps> = ({ current, total }) => {
  const radius = 18;
  const stroke = 4;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const progress = current / total;
  const strokeDashoffset = circumference - progress * circumference;

  return (
    <svg height={radius * 2} width={radius * 2} style={{ marginRight: 8 }}>
      <circle
        stroke="#e5e7eb"
        fill="transparent"
        strokeWidth={stroke}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      <circle
        stroke="#10b981"
        fill="transparent"
        strokeWidth={stroke}
        strokeDasharray={circumference + " " + circumference}
        style={{ strokeDashoffset, transition: "stroke-dashoffset 0.5s" }}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      <text
        x={radius}
        y={radius}
        textAnchor="middle"
        dy="0.3em"
        fontSize="1rem"
        fill="#111827"
        fontWeight="bold"
      >
        {total - current}
      </text>
    </svg>
  );
};

export default ProgressCircle;

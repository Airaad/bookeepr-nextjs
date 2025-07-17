import React from "react";

function LoadingSpinner() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 200"
      width={30}
      height={30}
      role="img"
      aria-label="Loading"
    >
      <defs>
        <radialGradient
          id="a12"
          cx=".66"
          fx=".66"
          cy=".3125"
          fy=".3125"
          gradientTransform="scale(1.5)"
        >
          <stop offset="0" stopColor="#007bff" />
          <stop offset=".3" stopColor="#007bff" stopOpacity=".9" />
          <stop offset=".6" stopColor="#007bff" stopOpacity=".6" />
          <stop offset=".8" stopColor="#007bff" stopOpacity=".3" />
          <stop offset="1" stopColor="#007bff" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle
        fill="none"
        stroke="url(#a12)"
        strokeWidth="15"
        strokeLinecap="round"
        strokeDasharray="200 1000"
        strokeDashoffset="0"
        cx="100"
        cy="100"
        r="70"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          dur="2s"
          values="0 100 100;360 100 100"
          repeatCount="indefinite"
          calcMode="spline"
          keyTimes="0;1"
          keySplines="0 0 1 1"
        />
      </circle>

      <circle
        fill="none"
        opacity=".2"
        stroke="#008236"
        strokeWidth="15"
        strokeLinecap="round"
        cx="100"
        cy="100"
        r="70"
      />
    </svg>
  );
}

export default LoadingSpinner;

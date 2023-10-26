import React from "react";

const LoadingIcon = () => {
  return (
    <div
      className="h-full fixed top-0 w-full justify-center flex flex-col bg-indigo-200 opacity-50 left-0"
      style={{zIndex: 1200}}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        className="animate-spin w-16 text-indigo-500 mx-auto"
      >
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
          className="opacity-25"
        ></circle>{" "}
        <path
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          className="opacity-75"
        ></path>
      </svg>
    </div>
  );
};

export default LoadingIcon;

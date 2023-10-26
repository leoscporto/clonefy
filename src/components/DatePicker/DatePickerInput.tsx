import LoadingIcon from "@components/LoadingIcon/LoadingIcon";
import React from "react";
import { processDateRange } from "@utils/dateProcessing";
import DownArrow from "@components/Icons/DownArrow";

const DatePickerInput = React.forwardRef<
  HTMLButtonElement,
  {
    value?: string;
    onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    loadingData: boolean;
  }
>(({ value, onClick, loadingData }, ref) => {
  return (
    <button
      ref={ref}
      onClick={onClick}
      className="flex flex-row justify-between py-2 px-4 lg:w-72 w-full text-sm bg-white items-center rounded-lg border border-gray-300 focus:ring ring-blue-100 transition-all duration-150"
    >
      <div className="flex flex-row items-center gap-1">
        {value ? processDateRange(value) : ""}
        {loadingData && <LoadingIcon />}
      </div>

      <DownArrow />
    </button>
  );
});

DatePickerInput.displayName = "DatePickerInputComponent";

export default DatePickerInput;

"use client";
import React, { useEffect, useState } from "react";
import DatePicker, { ReactDatePickerCustomHeaderProps } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./DatePickerCustomStyles.css";

import DatePickerHeader from "./DatePickerHeader";
import DatePickerInput from "./DatePickerInput";
import { isAfter } from "date-fns";
import { DatePickerContainer } from "./DatePickerContainer";

interface DateRangePickerProps {
  selectedDate: Date;
  onChange: (date: [Date | null, Date | null]) => void;
  isDataLoading: boolean;
  dateStart: Date;
  dateEnd: Date | null;
}

export enum SelectionMode {
  SelectDate,
  SelectMonth,
  SelectYear,
}

const CustomDatePicker: React.FC<DateRangePickerProps> = ({
  selectedDate,
  onChange,
  isDataLoading,
  dateStart,
  dateEnd,
}) => {
  const [startDate, setStartDate] = useState<Date>(dateStart);
  const [endDate, setEndDate] = useState<Date | null>(dateEnd);
  const [isOpen, setIsOpen] = useState(false);
  const [selectionMode, setSelectionMode] = useState<SelectionMode>(
    SelectionMode.SelectDate
  );

  useEffect(() => {
    setStartDate(dateStart);
    setEndDate(dateEnd);
  }, [dateEnd, dateStart]);

  const onDateChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    let st: Date = new Date();
    let en: Date | null = new Date();

    if (start !== null) {
      if (end !== null) {
        if (isAfter(end, start)) {
          st = start;
          en = end;
        } else {
          en = start;
          st = end;
        }
      } else {
        st = start;
        en = null;
      }
    }

    setStartDate(st);
    setEndDate(en);
    onChange([st, en]);
  };

  const changeSelectionMode = (selection: SelectionMode) => {
    setSelectionMode(selection);
  };

  return (
    <div>
      <DatePicker
        className="w-full"
        open={isOpen}
        onInputClick={() => setIsOpen(true)}
        onClickOutside={() => setIsOpen(false)}
        calendarStartDay={1}
        selected={selectedDate}
        onChange={(date) => onDateChange(date)}
        startDate={startDate}
        endDate={endDate}
        selectsRange
        openToDate={startDate}
        onSelect={(date, event) => {
          if (date < startDate && endDate === null) {
            onDateChange([date, startDate]);
          }
        }}
        renderCustomHeader={(params: ReactDatePickerCustomHeaderProps) => {
          return DatePickerHeader(params, onDateChange, changeSelectionMode);
        }}
        customInput={
          <DatePickerInput
            loadingData={isDataLoading}
            value={""}
            onClick={function (
              event: React.MouseEvent<HTMLButtonElement, MouseEvent>
            ): void {
              throw new Error("Function not implemented.");
            }}
          />
        }
        calendarContainer={(props) =>
          DatePickerContainer(
            props,
            selectionMode === SelectionMode.SelectYear,
            selectionMode === SelectionMode.SelectMonth,
            changeSelectionMode
          )
        }
        locale="pt-BR"
      />
    </div>
  );
};

export default CustomDatePicker;

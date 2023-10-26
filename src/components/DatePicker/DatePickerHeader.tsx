import { BsArrowRight, BsArrowLeft } from "react-icons/bs";
import DatePickerButton from "./DatePickerButton";
import ptBR from "date-fns/locale/pt-BR";
import {
  ReactDatePickerCustomHeaderProps,
  registerLocale,
} from "react-datepicker";
import { format } from "date-fns";
import {
  getLastSevenDaysInterval,
  getLastThirtyDaysInterval,
} from "@utils/dateProcessing";
import { SelectionMode } from "./CustomDatePicker";

registerLocale("pt-BR", ptBR);

const DatePickerHeader = (
  params: ReactDatePickerCustomHeaderProps,
  onDateChange: (dates: [Date | null, Date | null]) => void,
  changeSelectionMode: (selection: SelectionMode) => void
) => {
  const monthName = format(params.date, "MMMM", { locale: ptBR }).replace(
    /^\w/,
    (c) => c.toUpperCase()
  );

  return (
    <div className="flex flex-col items-start gap-2 bg-white">
      <DatePickerButton
        onButtonClicked={() => {
          onDateChange([new Date(), new Date()]);
        }}
        className="w-full text-gray-600 pl-3"
      >
        Hoje
      </DatePickerButton>
      <DatePickerButton
        onButtonClicked={() => {
          onDateChange(getLastSevenDaysInterval());
        }}
        className="w-full text-gray-600 pl-3"
      >
        Últimos 7 dias
      </DatePickerButton>
      <DatePickerButton
        onButtonClicked={() => {
          onDateChange(getLastThirtyDaysInterval());
        }}
        className="w-full text-gray-600 pl-3"
      >
        Últimos 30 dias
      </DatePickerButton>
      <DatePickerButton
        onButtonClicked={() => {
          onDateChange([new Date(2023, 0, 3), new Date()]);
        }}
        className="w-full text-gray-600 pl-3"
      >
        Tempo todo
      </DatePickerButton>
      <div className="flex flex-row justify-between w-full px-2 border-t pt-3 border-gray-100">
        <DatePickerButton onButtonClicked={params.decreaseMonth} className="text-black">
          <BsArrowLeft size={15}/>
        </DatePickerButton>
        <DatePickerButton
          onButtonClicked={() => changeSelectionMode(SelectionMode.SelectMonth)}
          className="text-gray-700 text-[16px] font-light"
        >

          {monthName}
        </DatePickerButton>
        <DatePickerButton
          onButtonClicked={() => changeSelectionMode(SelectionMode.SelectYear)}
          className="text-gray-700 text-[15px] font-light"
        >
          {params.date.getFullYear()}
        </DatePickerButton>
        <DatePickerButton onButtonClicked={params.increaseMonth}  className="text-black">
          <BsArrowRight size={15} />
        </DatePickerButton>
      </div>
    </div>
  );
};

export default DatePickerHeader;

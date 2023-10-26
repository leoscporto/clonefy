import Show from "@components/UI/Show";
import { CalendarContainer, CalendarContainerProps } from "react-datepicker";
import { SelectionMode } from "./CustomDatePicker";

export const DatePickerContainer = (
  props: CalendarContainerProps,
  selectYear: boolean,
  selectMonth: boolean,
  changeSelection: (selection: SelectionMode) => void
) => {
  return (
    <div className={`${props.className} flex flex-col pb-2`}>
      <CalendarContainer>
        <Show when={!selectYear && !selectMonth}>
          <div className="relative">{props.children}</div>
        </Show>
        <Show when={selectYear}>
          <YearGrid
            onQuit={() => changeSelection(SelectionMode.SelectDate)}
            onValueChange={() => {}}
          />
        </Show>
        <Show when={selectMonth}>
          <MonthsGrid
            onQuit={() => changeSelection(SelectionMode.SelectDate)}
            onValueChange={() => {}}
          />
        </Show>
      </CalendarContainer>
    </div>
  );
};

interface GridProps {
  onQuit: () => void;
  onValueChange: (value: any) => void;
}

function MonthsGrid({ onQuit, onValueChange }: GridProps) {
  return (
    <div className="grid grid-cols-4 gap-4 p-3">
      <div className="col-span-3"></div>

      <ContainerButton
        text="X"
        onClick={() => {
          onQuit();
        }}
      />
      <ContainerButton text="Jan" onClick={() => {}} />
      <ContainerButton text="Fev" onClick={() => {}} />
      <ContainerButton text="Mar" onClick={() => {}} />
      <ContainerButton text="Abr" onClick={() => {}} />
      <ContainerButton text="Mai" onClick={() => {}} />
      <ContainerButton text="Jun" onClick={() => {}} />
      <ContainerButton text="Jul" onClick={() => {}} />
      <ContainerButton text="Ago" onClick={() => {}} />
      <ContainerButton text="Set" onClick={() => {}} />
      <ContainerButton text="Out" onClick={() => {}} />
      <ContainerButton text="Nov" onClick={() => {}} />
      <ContainerButton text="Dez" onClick={() => {}} />
    </div>
  );
}

function YearGrid({ onQuit, onValueChange }: GridProps) {
  const years: number[] = [];
  for (let i = 2016; i <= 2030; i++) years.push(i);

  return (
    <div className="grid grid-cols-3 gap-4 p-3">
      <div className="col-span-2"></div>

      <ContainerButton text="X" onClick={() => onQuit()} />
      {years.map((value, index) => (
        <ContainerButton
          key={index}
          text={value.toString()}
          onClick={() => onValueChange(value)}
        />
      ))}
    </div>
  );
}

interface ContainerButtonProps {
  text: string;
  className?: string;
  onClick: () => void;
}

export function ContainerButton({
  text,
  className,
  onClick,
}: ContainerButtonProps) {
  return (
    <button
      onClick={() => onClick()}
      className={`col-span-1 border p-2 rounded flex items-center justify-center hover:bg-gray-300 ${className}`}
    >
      {text}
    </button>
  );
}

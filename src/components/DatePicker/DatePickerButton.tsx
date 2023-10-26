interface DatePickerButtonInterface {
  children: React.ReactNode;
  className?: string;
  onButtonClicked?: any;
}

function DatePickerButton({
  children,
  className,
  onButtonClicked,
}: DatePickerButtonInterface) {
  return (
    <button
      onClick={onButtonClicked}
      className={`hover:bg-gray-200 text-start py-1 px-2 ${className}`}
    >
      {children}
    </button>
  );
}

export default DatePickerButton;

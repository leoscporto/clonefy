"use client";
import CustomDatePicker from "@components/DatePicker/CustomDatePicker";
import ProductDropdownSearch from "@components/Dropdown/ProductDropdownSearch";

interface DashboardHeaderInterface {
	onDateChange: (date: [Date | null, Date | null]) => void;
	onProductChange: (product: string) => void;
	isDataLoading: boolean;
	dateInterval: [Date, Date | null];
}

export default function DashboardHeader({
	onDateChange,
	isDataLoading,
	onProductChange,
	dateInterval,
}: DashboardHeaderInterface) {
	return (
		<div className="flex flex-col xl:flex-row sm:gap-5 mb-8 w-full flex-wrap">
			<h1 style={{
				fontSize: "1.5rem",
				lineHeight: "1.5rem",
				fontWeight: 700,
				color: "#161e2e",
			}} className="flex items-center">
				Dashboard
			</h1>
			<div className="flex lg:flex-row flex-col flex-1 gap-3 lg:gap-2 rounded-lg xl:justify-end sm:w-full">
				<CustomDatePicker
					dateStart={dateInterval[0]}
					dateEnd={dateInterval[1]}
					isDataLoading={isDataLoading}
					selectedDate={new Date()}
					onChange={(dates: [Date | null, Date | null]) => {
						onDateChange(dates);
					}}
				/>
				
				<ProductDropdownSearch onValueSelected={onProductChange}/>
			</div>
		</div>
	);
}

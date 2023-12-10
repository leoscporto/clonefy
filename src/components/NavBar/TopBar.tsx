"use client";
import ProfileButton from "@components/Button/IconButton/ProfileButton";
import { HiMenuAlt2 } from "react-icons/hi";
import { useEffect, useState } from "react";
import Image from "next/image";
import PocketBase from "pocketbase";
import { databaseIP } from "@data/database";
import { formatNumber, simplifyNumber } from "@utils/numberProcessing";

const pb = new PocketBase(databaseIP);


function EmeraldMoneyBarFill() {
	const [width, setWidth] = useState(0);
	const [maxValue, setMaxValue] = useState('');
	const [sells, setSells] = useState(0)
	
	const getRecords = async () => {
		try {
			const records = await pb
			.collection("vendasTotaisCloneFy")
			.getList();
			
			let sellCalc = records.items.reduce(
				(accumulator, currentValue) => accumulator + currentValue.vendas,
				0,
			);
			
			sellCalc = sellCalc * 98.7
			const formattedNumberString = formatNumber(sellCalc, false);
			const formattedNumberNumber = parseInt(formattedNumberString, 10);
			
			setWidth((sellCalc / formattedNumberNumber) * 100);
			setSells(sellCalc);
			setMaxValue(formatNumber(sellCalc));
		} catch (e) {
			console.log(e);
		}
	}
	
	useEffect(() => {
		getRecords()
	}, []);
	
	useEffect(() => {
		(async () => {
			await pb.collection("vendasTotaisCloneFy").subscribe("*", () => getRecords());
		})()
	}, []);
	
	return (
		<button
			className="level w-56 md:w-64 h-12 p-1 inline-flex flex-col justify-end items-center rounded-md focus:outline-none px-2  cursor-pointer transition duration-200 hover:bg-green-500/30">
			<h1 className="text-white text-sm font-bold leading-none w-full text-right">
				{`R$ ${simplifyNumber(sells)} / R$ ${maxValue}`}
			</h1>
			<div className="flex items-center w-full">
				<Image src="/image/gemstone.svg" className="w-6 mr-2" width={24} height={24} alt="gems"/>
				<div className="overflow-hidden h-2 text-xs flex rounded bg-white w-full mt-1">
					<div
						style={{ width: `${width}%` }}
						className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-800"
					></div>
				</div>
			</div>
		</button>
	);
}

interface TopBarProps {
	onClick: Function;
}

export default function TopBar({ onClick }: TopBarProps) {
	return (
		<div className="flex items-center justify-between md:justify-end bg-primary w-full h-16 shadow">
			<button
				className="md:hidden flex items-start h-full pt-5 pl-4"
				onClick={() => {
					onClick();
				}}
			>
				<HiMenuAlt2 className="fill-white" size={24}/>
			</button>
			<div className="flex items-center justify-end w-full m">
				<EmeraldMoneyBarFill/>
				<div className="flex items-center">
					<ProfileButton/>
				</div>
			</div>
		</div>
	);
}

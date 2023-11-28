"use client";
import ProfileButton from "@components/Button/IconButton/ProfileButton";
import {HiMenuAlt2} from "react-icons/hi";
import {useEffect, useState} from "react";
import Image from "next/image";
import PocketBase from "pocketbase";
import {databaseIP} from "@data/database";
import {formatNumber, simplifyNumber} from "@utils/numberProcessing";

const pb = new PocketBase(databaseIP);

interface TopBarProps {
	onClick: Function;
}

export default function TopBar({onClick}: TopBarProps) {
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
			<div className="flex flex-row items-center">
				<EmeraldMoneyBarFill/>
				<div className="rounded-full bg-gray-100 mx-4 w-8 h-8 flex items-center justify-center">
					<ProfileButton/>
				</div>
			</div>
		</div>
	);
}

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
		<button className="flex flex-col justify-center transition-colors duration-150 hover:bg-emerald-600 p-2 rounded">
			<h1 className="text-white text-sm font-bold leading-none w-full text-right">
				{`R$ ${simplifyNumber(sells)} / R$ ${maxValue}`}
			</h1>
			<div className="flex flex-row items-center justify-center">
				<Image src="/image/gemstone.svg" width={24} height={24} alt="gems"/>
				<div className="ml-2 w-48 h-2 bg-white rounded-full">
					<div
						style={{width: `${width}%`}}
						className={`h-2 bg-emerald-800 rounded`}
					></div>
				</div>
			</div>
		</button>
	);
}

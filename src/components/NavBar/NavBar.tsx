"use client";
import SideBar from "@components/SideBar/SideBar";
import { ReactNode, useState } from "react";
import { BsChatRight } from "react-icons/bs";
import TopBar from "./TopBar";
import CrossIcon from "@components/Icons/CrossIcon";

interface NavBarProps {
	children: ReactNode;
}

export default function NavBar(props: NavBarProps) {
	const [expandSideBar, setExpandSidebar] = useState(false);
	
	return (
		<div className="flex bg-gray-100">
			{expandSideBar && (
				<div className="md:hidden">
					<div
						className={`fixed h-screen w-screen bg-slate-900 z-10 md:hidden opacity-50`}
					>
					</div>
					<button
						className="fixed top-6 left-2/3 transform -translate-x-3/4 -translate-y-1/2 z-50"
						onClick={() => {
							setExpandSidebar(false);
						}}
					>
						<CrossIcon/>
					</button>
				</div>
			)}
			
			<div
				className="fixed rounded-full bg-teal-500 md:bottom-4 md:right-6 sm:right-2 sm:bottom-10 md:w-16 md:h-16 sm:w-12 sm:h-12 z-50 flex justify-center items-center cursor-pointer">
				<BsChatRight size="30" className="fill-white pt-1 sm:w-5 sm:h-5"/>
			</div>
			<SideBar expanded={expandSideBar}/>
			<div className="flex flex-col w-full">
				<TopBar
					onClick={() => {
						setExpandSidebar((previous) => !previous);
					}}
				/>
				
				{props.children}
			</div>
		</div>
	);
}

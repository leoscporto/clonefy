"use client";
import React from "react";
import QuitButton from "@components/Icons/QuitButton";
import { useEffect, useRef, useState } from "react";
import { BiPlus } from "react-icons/bi";
import { BsFillPersonFill } from "react-icons/bs";
import Person from "../../../../public/image/Person";

interface IconButtonOptionProps {
	icon: React.ReactNode;
	label: string;
}

function IconButtonOption({ icon, label }: IconButtonOptionProps) {
	return (
		<div className="flex items-center px-4 py-2 hover:bg-gray-200 w-full">
			<span className="w-5 h-5 mr-2 text-gray-600">{icon}</span>
			
			<button className="focus:outline-none text-start text-gray-700">
				{label}
			</button>
		</div>
	);
}

interface ProfileButtonInterface {
	className?: string;
}

const ProfileButton: React.FC<ProfileButtonInterface> = ({ className }) => {
	const [isOpen, setIsOpen] = useState(false);
	
	const handleButtonClick = () => {
		setIsOpen((prevIsOpen) => !prevIsOpen);
	};
	
	const ref = useRef<HTMLDivElement>(null!);
	
	const handleClickOutside = (event: MouseEvent) => {
		if (ref.current && !ref.current.contains(event.target as Node)) {
			setIsOpen(false);
		}
	};
	
	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);
	
	return (
		<div className={`relative inline-block`} ref={ref}>
			<div className="flex items-center md:mr-6">
				<div>
					<div>
						<div className="relative inline-block">
							<div slot="reference">
								<span className="rounded-md block shadow-sm relative dropdown-trigger">
								<button
									id="options-menu" className="focus:outline-none"
								>
								<div
									className="inline-flex justify-end items-center w-full text0-m rounded-md focus:outline-none px-2 py-2 text-white leading-5 transition ease-in-out duration-150">
									<span
										className="inline-block h-10 w-10 rounded-full overflow-hidden bg-gray-100">
									<svg
										fill="currentColor"
										viewBox="0 0 24 24"
										className="h-full w-full text-gray-300"
									>
										<path
											d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z">
										</path>
									</svg>
									<img
										className="object-cover h-12 w-12" style={{ display: "none" }} alt="test"/>
									</span>
								</div>
								</button>
							</span>
							</div>
						</div>
					</div>
				</div>
			</div>
			{isOpen && (
				<div
					className="absolute right-2 z-10 w-48 mt-2 bg-white rounded-lg border-gray-300 border shadow-xl flex flex-col pt-3 pb-1">
					<div className="px-5 pb-2">
						<h1>LCP NEGOCIOS DI...</h1>
					</div>
					<div className="border-t-2 border-gray-50 pt-1"></div>
					<IconButtonOption
						icon={<BiPlus size={18} className="fill-gray-500/75"/>}
						label="Criar conta de produtor"
					/>
					<IconButtonOption
						icon={<BsFillPersonFill size={18} className="fill-gray-500/75"/>}
						label="Meu perfil"
					/>
					<IconButtonOption icon={<QuitButton/>} label="Sair"/>
				</div>
			)}
		</div>
	);
};

export default ProfileButton;

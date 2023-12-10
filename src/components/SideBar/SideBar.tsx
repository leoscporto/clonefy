import SideBarItem from "./SideBarItem";
import { HiHome, HiTag, HiCreditCard, HiUserGroup } from "react-icons/hi";
import { BsFillPersonFill } from "react-icons/bs";
import AccountDropdown from "../Dropdown/AccountDropdown";
import AppIcon from "@components/Icons/AppIcon";
import GraduationCapIcon from "@components/Icons/GraduationCapIcon";
import MarktplaceIcon from "@components/Icons/MarktplaceIcon";
import StockUpIcon from "@components/Icons/StockUpIcon";
import CircleArrow from "@components/Icons/CircleArrow";
import ReportChartIcon from "@components/Icons/ReportChartIcon";
import IndicateIcon from "@components/Icons/IndicateIcon";
import HelpIcon from "@components/Icons/HelpIcon";

interface SideBarInterface {
	expanded: boolean;
}

export default function SideBar({ expanded }: Readonly<SideBarInterface>) {
	return (
		<div
			className={`flex sticky sm:fixed flex-col top-0 z-50 w-64 h-screen ${
				expanded ? "sm:w-7/12" : "sm:w-0 sm:hidden"
			}`}
		>
			<div
				className="md:h-16 bg-primary flex flex-row justify-start sm:justify-center items-center px-2 sm:w-11/12 sm:h-20">
				<AccountDropdown/>
			</div>
			
			<div className="left-0 h-full w-64 sm:w-11/12 flex flex-col bg-secondary text-white shadow gap-1 px-2 pt-2">
				<SideBarItem text="Dashboard" icon={<HiHome size={24}/>} goto="/"/>
				<SideBarItem
					text="Produtos"
					icon={<HiTag size={24}/>}
					goto="/produtos"
				/>
				<SideBarItem
					text="Área de Membros"
					icon={<GraduationCapIcon/>}
					goto="/membros"
				/>
				<SideBarItem
					text="Marketplace"
					icon={<MarktplaceIcon/>}
					goto="/marktplace"
				/>
				<SideBarItem
					text="Meus Afiliados"
					icon={
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
							fill="currentColor"
							width="24px"
							height="24px"
							className="h-6 w-6 text-gray-400 group-hover:text-gray-300 group-focus:text-gray-300 transition ease-in-out duration-150"
						>
							<path
								fillRule="evenodd"
								d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
								clipRule="evenodd"
							>
							
							</path>
						</svg>}
					goto="/afiliados"
				/>
				<SideBarItem text="Vendas" icon={<StockUpIcon/>} goto="/vendas"/>
				<SideBarItem
					text="Assinaturas"
					icon={<CircleArrow/>}
					goto="/assinaturas"
				/>
				<SideBarItem
					text="Financeiro"
					icon={<HiCreditCard size={24}/>}
					goto="/financeiro"
				/>
				<SideBarItem
					text="Relatórios"
					icon={<ReportChartIcon/>}
					goto="/relatorios"
				/>
				<SideBarItem
					text="Colaboradores"
					icon={<HiUserGroup size={24}/>}
					goto="/colaboradores"
				/>
				<SideBarItem text="Apps" icon={<AppIcon/>} goto="/aplicacoes"/>
				<SideBarItem
					text="Indique & Ganha 1.5%"
					icon={<IndicateIcon/>}
					goto="/indicacao"
				/>
				<SideBarItem text="Ajuda" icon={<HelpIcon/>} goto="/ajuda"/>
				<div className="flex-shrink-0 flex border-t border-gray-500 mt-4 p-4"></div>
			</div>
		</div>
	);
}

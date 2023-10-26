import SideBarItem from "./SideBarItem";
import { HiHome, HiTag, HiCreditCard, HiUserGroup } from "react-icons/hi";
import { HiTrophy } from "react-icons/hi2";
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

export default function SideBar({ expanded }: SideBarInterface) {
  return (
    <div
      className={`flex sticky sm:fixed flex-col top-0 z-50 w-64 h-screen ${
        expanded ? "sm:w-7/12" : "sm:w-0 sm:hidden"
      }`}
    >
      <div className="md:h-16 bg-primary flex flex-row justify-start sm:justify-center items-center px-2 sm:w-11/12 sm:h-20">
        <AccountDropdown />
      </div>

      <div className="left-0 h-full w-64 sm:w-11/12 flex flex-col bg-secondary text-white shadow gap-1 px-2 pt-2">
        <SideBarItem text="Dashboard" icon={<HiHome size={24} />} goto="/" />
        <SideBarItem
          text="Produtos"
          icon={<HiTag size={24} />}
          goto="/produtos"
        />
        <SideBarItem
          text="Área de Membros"
          icon={<GraduationCapIcon />}
          goto="/membros"
        />
        <SideBarItem
          text="Marktplace"
          icon={<MarktplaceIcon />}
          goto="/marktplace"
        />
        <SideBarItem
          text="Meus afiliados"
          icon={<BsFillPersonFill size={23} />}
          goto="/afiliados"
        />
        <SideBarItem text="Vendas" icon={<StockUpIcon />} goto="/vendas" />
        <SideBarItem
          text="Assinaturas"
          icon={<CircleArrow />}
          goto="/assinaturas"
        />
        <SideBarItem
          text="Financeiro"
          icon={<HiCreditCard size={24} />}
          goto="/financeiro"
        />
        <SideBarItem
          text="Relatórios"
          icon={<ReportChartIcon />}
          goto="/relatorios"
        />
        <SideBarItem
          text="Colaboradores"
          icon={<HiUserGroup size={22} />}
          goto="/colaboradores"
        />
        <SideBarItem text="Apps" icon={<AppIcon />} goto="/aplicacoes" />
        <SideBarItem
          text="Indique & Ganha "
          icon={<IndicateIcon />}
          goto="/indicacao"
        />
        <SideBarItem text="Ajuda" icon={<HelpIcon />} goto="/ajuda" />
        <div className="border-t-2 border-gray-600"></div>
      </div>
    </div>
  );
}

import NavBar from "@components/NavBar/NavBar";
import { FaAddressBook } from "react-icons/fa";

export default function Relatorios() {
  return (
    <>
      <div className="flex justify-between items-center py-4 px-6">
        <h1 className="text-2xl font-bold">Relatórios</h1>
      </div>
      <div className="flex flex-row gap-5">
        <Card icon={<FaAddressBook />} label="Receita de co-produção" />
        <Card icon={<FaAddressBook />} label="Receita por produto" />
        <Card icon={<FaAddressBook />} label="Vendas abandonadas" />
      </div>
      <div className="flex flex-row gap-5">
        <Card icon={<FaAddressBook />} label="Engajamento dos alunos" />
        <Card icon={<FaAddressBook />} label="Receita por afiliado" />
        <Card icon={<FaAddressBook />} label="Saldo a receber" />
      </div>
    </>
  );
}

interface Props {
  icon: React.ReactElement;
  label: string;
}

const Card: React.FC<Props> = ({ icon, label }) => {
  return (
    <div className="bg-white p-4 flex items-center space-x-2 w-full">
      {icon}
      <p className="text-gray-800">{label}</p>
    </div>
  );
};

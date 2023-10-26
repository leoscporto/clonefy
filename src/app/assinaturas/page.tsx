import LearnMoreAbout from "@components/LearnMoreAbout/LearnMoreAbout";
import { FaFilter, FaSearch } from "react-icons/fa";

export default function Assinaturas() {
  return (
    <>
      <div className="flex justify-between items-center py-4 px-6">
        <h1 className="text-2xl font-bold">Assinaturas</h1>
        <button className="flex items-center justify-center space-x-2 px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600">
          <FaSearch className="w-5 h-5" />
          <span>Exportar</span>
        </button>
      </div>
      <div>
        <div className="border flex items-center rounded-lg bg-white shadow-sm">
          <div className="px-4 py-2">
            <FaSearch className="h-5 w-5 text-gray-400" />
          </div>
          <input className="rounded-l p-2 w-full" />
          <button className="border text-gray-800 py-3 px-4 h-full flex flex-row items-center gap-2">
            <FaFilter /> Filtros
          </button>
        </div>
      </div>
      <div className="flex flex-row flex-grow-0 w-full gap-5">
        <Card header="Assinaturas ativas" label="0" />
        <Card header="Faturamento recorrente mensal" label="R$ 0,00" />
      </div>
      <div className="bg-white">
        <div className="flex justify-start py-2 px-6">
          <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded mr-2">
            Aprovadas
          </button>
          <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded mr-2">
            Canceladas
          </button>
          <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded mr-2">
            Todas
          </button>
        </div>

        <div className="border-t-2 border-gray-200"></div>
      </div>
      <LearnMoreAbout
        normalText="Aprenda mais sobre as "
        underlinedText="assinaturas"
      />
    </>
  );
}

interface Props {
  header: string;
  label: string;
}

const Card: React.FC<Props> = ({ header, label }) => {
  return (
    <div className="bg-white shadow-md rounded-md p-4 flex flex-col space-x-2 w-full">
      <h1>{header}</h1>
      <p className="text-gray-800 font-bold">{label}</p>
    </div>
  );
};

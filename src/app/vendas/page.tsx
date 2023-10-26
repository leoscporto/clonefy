"use client";
import VendaListingHandler from "@components/ItemListing/VendaListingHandler";
import LearnMoreAbout from "@components/LearnMoreAbout/LearnMoreAbout";
import { Venda, generateRandomVendas } from "@data/vendas";
import { faker } from "@faker-js/faker";
import {
  parseCommaDecimalNumber,
  parseCommaDecimalNumber2,
} from "@utils/numberProcessing";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { HiAdjustments, HiDocumentDownload } from "react-icons/hi";

interface VendaSummary {
  vendasEncontradas: number;
  valorLiquido: number;
}

export default function Vendas() {
  const [vendaSummary, setVendaSummary] = useState<VendaSummary>({
    vendasEncontradas: 0,
    valorLiquido: 0,
  });
  const [vendas, setVendas] = useState<Venda[]>([]);

  useEffect(() => {
    faker.seed(1381231273);
    const [valorLiquido, currentVendas] = generateRandomVendas();
    setVendas(currentVendas);

    setVendaSummary({
      vendasEncontradas: currentVendas.length,
      valorLiquido: valorLiquido,
    });
  }, []);

  return (
    <div className="container mx-auto sm:px-6 md:px-16 py-10 lg:py-12 relative w-full 2xl:w-9/12 flex flex-col gap-3 animate-fadein">
      <div className="flex justify-between items-center py-4">
        <h1 className="text-2xl font-bold">Vendas</h1>
        <button className="flex items-center justify-center space-x-3 px-4 py-2 bg-white rounded-md hover:bg-gray-200 border border-gray-300 drop-shadow">
          <HiDocumentDownload className="w-5 h-5" size={22} />
          <span>Exportar</span>
        </button>
      </div>
      <div>
        <div className="border flex items-center rounded-lg py-2 bg-white shadow-sm">
          <div className="ml-6 px-3 py-1 my-3 rounded-l-lg w-full border flex items-center border-gray-300 border-r-0">
            <button>
              <FaSearch className="text-gray-400 " />
            </button>
            <input className="ml-3 w-full focus:outline-none" />
          </div>

          <button className="border text-gray-800 px-4 mr-2 h-[34px] flex flex-row items-center gap-2 bg-gray-50 border-gray-400 rounded-r-lg text-sm">
            <HiAdjustments className="fill-gray-500" size={19} /> Filtros
          </button>
        </div>
      </div>
      <div className="flex flex-col xl:flex-row flex-grow-0 w-full gap-2 lg:gap-5">
        <Card
          header="Vendas encontradas"
          label={parseCommaDecimalNumber2(vendaSummary.vendasEncontradas)}
        />
        <Card
          header="Valor líquido"
          label={`R$ ${parseCommaDecimalNumber(vendaSummary.valorLiquido)}`}
        />
      </div>
      <VendaListingHandler items={vendas} />
      <LearnMoreAbout
        normalText="Aprenda mais sobre as "
        underlinedText="vendas"
      />
    </div>
  );
}

interface Props {
  header: string;
  label: string;
}

const Card: React.FC<Props> = ({ header, label }) => {
  return (
    <div className="bg-white shadow rounded-md p-4 flex flex-col w-full font-medium text-gray-500">
      <h1 className="pb-1">{header}</h1>
      <h2 className="text-gray-700 font-medium text-2xl">{label}</h2>
    </div>
  );
};

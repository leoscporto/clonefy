"use client";
import PageHandler from "@components/PageDisplay/PageHandler";
import VendaListing from "./VendaListing";
import { Venda } from "@data/vendas";
import { useState } from "react";

const MAX_VENDAS_PER_PAGE = 10;

interface VendaListingProps {
  items: Venda[];
}

enum FiltragemVendas {
  Aprovadas,
  Todas,
}

const VendaListingHandler: React.FC<VendaListingProps> = ({ items }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentFilter, setCurrentFilter] = useState<FiltragemVendas>(
    FiltragemVendas.Aprovadas
  );

  const filterChangedHandler = (value: FiltragemVendas) => {
    setCurrentFilter(value);
  };

  const pageChangedHandler = (page: number) => {
    setCurrentPage(page);
  };

  let filteredVendas: Venda[] = [];

  if (currentFilter === FiltragemVendas.Aprovadas) {
    filteredVendas = items.filter((value) => value.status === "Pago");
  } else {
    filteredVendas = items;
  }

  const getSliceOfVendas = (vendas: Venda[]) => {
    let sliceStart = (currentPage - 1) * MAX_VENDAS_PER_PAGE;
    let sliceEnd = sliceStart + MAX_VENDAS_PER_PAGE;

    if (sliceEnd > items.length) {
      return vendas.slice(sliceStart);
    } else {
      return vendas.slice(sliceStart, sliceEnd);
    }
  };

  return (
    <div className="bg-white rounded-t-md rounded-b-md">
      <div className="flex justify-start pt-5 pl-6">
        <button
          onClick={() => filterChangedHandler(FiltragemVendas.Aprovadas)}
          className={`${
            currentFilter === FiltragemVendas.Aprovadas
              ? "bg-indigo-100 text-indigo-800/75"
              : "bg-white"
          } text-gray-700 py-1 px-3 rounded-md mr-2 text-sm font-medium`}
        >
          Aprovadas
        </button>
        <button
          onClick={() => filterChangedHandler(FiltragemVendas.Todas)}
          className={`${
            currentFilter === FiltragemVendas.Todas
              ? "bg-indigo-100 text-indigo-800/75"
              : "bg-white"
          } text-gray-8800 py-1 px-3 rounded mr-2 text-sm font-medium`}
        >
          Todas
        </button>
      </div>
      <VendaListing items={getSliceOfVendas(filteredVendas)} />
      <PageHandler
        currentPage={currentPage}
        totalNumberPages={Math.max(
          Math.ceil(filteredVendas.length / MAX_VENDAS_PER_PAGE),
          1
        )}
        onPageChanged={pageChangedHandler}
      />
    </div>
  );
};

export default VendaListingHandler;

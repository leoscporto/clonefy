"use client";
import PageHandler from "@components/PageDisplay/PageHandler";
import SaqueListing from "./SaqueListing";
import { Saque } from "@data/saques";
import { useEffect, useState } from "react";

const MAX_SAQUES_PER_PAGE = 10;

interface SaqueListingProps {
  items: Saque[];
}

enum CurrentTab {
  Saques,
  DadosBancarios,
  Taxas,
  Identidade,
}

const SaqueListingHandler: React.FC<SaqueListingProps> = ({ items }) => {
  const [saques, setSaques] = useState<Saque[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentTab, setCurrentTab] = useState<CurrentTab>(CurrentTab.Saques);

  const tabChangedHandler = (value: CurrentTab) => {
    setCurrentTab(value);
  };

  const pageChangedHandler = (page: number) => {
    setCurrentPage(page);

    let sliceStart = (page - 1) * MAX_SAQUES_PER_PAGE;
    let sliceEnd = sliceStart + MAX_SAQUES_PER_PAGE;

    if (sliceEnd > items.length) {
      setSaques(items.slice(sliceStart));
    } else {
      setSaques(items.slice(sliceStart, sliceEnd));
    }
  };

  useEffect(() => {
    if (items.length !== 0) {
      if (items.length < MAX_SAQUES_PER_PAGE) {
        setSaques(items.slice());
      } else {
        setSaques(items.slice(0, 10));
      }
    }
  }, [items]);

  return (
    <div className="bg-white rounded-t-md rounded-b-md">
      <div className="flex flex-col lg:flex-row justify-start pt-5 pb-6 px-6 gap-4 lg:gap-2 bg-gray-50 pl-8">
        <button
          onClick={() => tabChangedHandler(CurrentTab.Saques)}
          className={`${
            currentTab === CurrentTab.Saques ? "bg-indigo-100 text-indigo-800/75" : "bg-white"
          } hover:bg-indigo-200 text-gray-700 py-1 px-4 rounded mr-2 text-sm font-medium`}
        >
          Saques
        </button>
        <button
          onClick={() => tabChangedHandler(CurrentTab.DadosBancarios)}
          className={`${
            currentTab === CurrentTab.DadosBancarios
              ? "bg-indigo-100 text-indigo-800/75"
              : "bg-white"
          } text-gray-700 py-1 px-4 rounded mr-2 text-sm font-medium`}
        >
          Dados bancários
        </button>
        <button
          onClick={() => tabChangedHandler(CurrentTab.Taxas)}
          className={`${
            currentTab === CurrentTab.Taxas ? "bg-indigo-100 text-indigo-800/75" : "bg-white"
          }  text-gray-700 py-1 px-4 rounded mr-2 text-sm font-medium`}
        >
          Taxas
        </button>
        <button
          onClick={() => tabChangedHandler(CurrentTab.Identidade)}
          className={`${
            currentTab === CurrentTab.Identidade ? "bg-indigo-100 text-indigo-800/75" : "bg-white"
          } text-gray-700 py-1 px-4 rounded mr-2 text-sm font-medium`}
        >
          Identidade
        </button>
      </div>
      <SaqueListing items={saques} />
      <PageHandler
        currentPage={currentPage}
        totalNumberPages={Math.max(
          Math.ceil(items.length / MAX_SAQUES_PER_PAGE),
          1
        )}
        onPageChanged={pageChangedHandler}
      />
    </div>
  );
};

export default SaqueListingHandler;

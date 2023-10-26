"use client";
import SaqueListingHandler from "@components/ItemListing/SaqueListingHandler";
import LearnMoreAbout from "@components/LearnMoreAbout/LearnMoreAbout";
import Show from "@components/UI/Show";
import { Saque, generateRandomSaques } from "@data/saques";
import { faker } from "@faker-js/faker";
import { parseCommaDecimalNumber } from "@utils/numberProcessing";
import { useEffect, useState } from "react";
import SaqueModal from "./SaqueModal";
import {IoIosArrowDown, IoIosArrowUp} from "react-icons/io"

interface FinanceiroSumario {
  saldoDisponivel: number;
  saldoPendente: number;
}

export default function Financeiro() {
  const [financeiroSumary, setFinanceiroSummary] = useState<FinanceiroSumario>({
    saldoDisponivel: 0,
    saldoPendente: 0,
  });
  const [saques, setSaques] = useState<Saque[]>([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    faker.seed(1381231273);
    const [saldoPendente, currentSaques] = generateRandomSaques();
    setSaques(currentSaques);

    setFinanceiroSummary({
      saldoDisponivel: faker.datatype.number({
        min: 1231,
        max: 2599,
      }),
      saldoPendente: saldoPendente,
    });
  }, []);

  const showModalHandler = () => {
    setShowModal((previous) => !previous);
  };

  return (
    <>
      <Show when={showModal}>
        <SaqueModal
          close={showModalHandler}
          saldoDisponivel={financeiroSumary.saldoDisponivel}
        />
      </Show>
      <div className="container mx-auto px-6 py-10 lg:py-12 relative w-full 2xl:w-9/12 animate-fadein">
        <div className="flex justify-between items-center pb-10">
          <h1 className="text-2xl font-bold">Financeiro</h1>
          <button className=" bg-white rounded border border-gray-300 w-[70px] h-10 text-left drop-shadow-sm text-sm flex items-center justify-around">
            V2
            <div>
              <IoIosArrowUp className="fill-gray-500"/>
              <IoIosArrowDown className="fill-gray-500"/>
            </div>
          </button>
        </div>

        <div className="flex flex-col lg:flex-row w-full gap-2 md:gap-5">
          <AvailableBalance
            borderColor="border-emerald-400"
            firstText="Saldo disponivel"
            secondText={`R$ ${parseCommaDecimalNumber(
              financeiroSumary.saldoDisponivel
            )}`}
          />
          <AvailableBalance
            borderColor="border-amber-600/75"
            firstText="Saldo pendente"
            secondText={`R$ ${parseCommaDecimalNumber(
              financeiroSumary.saldoPendente
            )}`}
          />
        </div>
        <div className="flex justify-end">
          <button
            className="bg-indigo-600 px-3 py-2 rounded-md text-white my-10 text-sm font-semibold"
            onClick={showModalHandler}
          >
            Efetuar saque
          </button>
        </div>
        <SaqueListingHandler items={saques} />
        <LearnMoreAbout
          normalText="Aprenda mais sobre as "
          underlinedText="assinaturas"
        />
      </div>
    </>
  );
}

interface Props {
  borderColor: string;
  firstText: string;
  secondText: string;
}

const AvailableBalance = ({ borderColor, firstText, secondText }: Props) => {
  return (
    <div
      className={`flex justify-start items-center border-l-8 ${borderColor} px-4 py-2 w-full h-24 bg-white`}
    >
      <div className=" ml-2 space-y-1">
        <p className="text-gray-600 text-sm">{firstText}</p>
        <p className="text-gray-600 font-medium text-3xl">{secondText}</p>
      </div>
    </div>
  );
};

"use client";
import HelpIcon2 from "@components/Icons/HelpIcon2";
import LoadingIcon from "@components/LoadingIcon/LoadingIcon";
import Modal from "@components/UI/Modal";
import Show from "@components/UI/Show";
import { sleep } from "@utils/await";
import { parseCommaDecimalNumber } from "@utils/numberProcessing";
import { useEffect, useState } from "react";

interface SaqueModalProps {
  close: () => void;
  saldoDisponivel: number;
}

const INPUT_PREFIX = "R$";

export default function SaqueModal({
  close,
  saldoDisponivel,
}: SaqueModalProps) {
  const [loading, setLoading] = useState(true);
  const [valorSacar, setValorSacar] = useState(0.0)

  useEffect(() => {
    const waitFunction = async () => {
      await sleep(1);
      setLoading(false);
    };

    waitFunction();
  });

  return (
    <Modal className="items-center justify-center content-center flex bg-gray-700/75 border">
      <div className="bg-white rounded-lg flex flex-col gap-8 w-11/12 md:w-6/12 lg:w-4/12 2xl:w-3/12 border">
        <div className="flex justify-between bg-gray-100 p-3 border-lg rounded">
          <div>
            <h1 className=" font-semibold text-gray-700">Realizar saque</h1>
            <h2 className="text-sm text-gray-500">
              O dinheiro cairá na sua conta em até 1 dia útil
            </h2>
          </div>
          <button className="text-gray-700" onClick={close}>
            X
          </button>
        </div>
        <div className="flex flex-col gap-2 pl-5">
          <h1 className="font-semibold text-sm text-gray-600">Valor do saque</h1>
          <div className="border border-gray-300 rounded w-4/12 py-2 px-2 text-gray-600 flex gap-3 text-sm">
            <label>{INPUT_PREFIX}</label>
            <input type="number" className="w-full focus:outline-none" value={valorSacar.toFixed(2)} />
          </div>
          <p className="text-xs text-gray-500">
            Disponível: R$ {parseCommaDecimalNumber(saldoDisponivel)}
          </p>
        </div>
        <Show
          when={!loading}
          fallback={
            <center className="my-4">
              <LoadingIcon height={"h-8"} width={"w-8"} />
            </center>
          }
        >
          <div className="ml-6 bg-gray-50 mr-10 p-5 rounded">
            <p className="text-sm text-gray-600">
              <a className="font-semibold">Chave Pix:</a> 45526582000182
            </p>
            <p className="text-sm text-gray-600">
              <a className="font-semibold">Titular:</a> LCP NEGOCIOS DIGITAIS
              LTDA
            </p>
            <p className="text-sm text-gray-600">
              <a className="font-semibold">CNPJ:</a> 45.526.582/0001-82
            </p>
            <p className="text-sm text-gray-600">
              <a className="font-semibold">Instituição:</a> BPP Instituição de
              Pagamento S.A.
            </p>
          </div>
        </Show>
        <div className="flex justify-start items-center border-l-8 border-indigo-400 px-4 py-2 h-16 bg-indigo-50 mx-5">
          <div className="mr-4">
            <p className="text-gray-700 text-sm flex items-center gap-3">
              <HelpIcon2 />
              Nós cobramos uma taxa de R$3,67 por saque.
            </p>
          </div>
        </div>
        <div className="flex justify-end gap-3 bg-gray-50 h-16 py-3 pr-3 border-lg rounded">
          <button
            className="border px-3 py-1 rounded text-xs font-semibold"
            onClick={close}
          >
            Cancelar
          </button>
          <button className="border px-3 py-1 rounded bg-indigo-500 text-white text-xs font-semibold">
            Confirmar
          </button>
        </div>
      </div>
    </Modal>
  );
}

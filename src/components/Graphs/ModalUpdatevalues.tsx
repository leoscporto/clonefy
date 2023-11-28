"use client";
import { FormEvent, useRef, useState } from "react";
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PocketBase from "pocketbase";
import { formatDate2 } from "@utils/dateProcessing";

import ptBr from "date-fns/locale/pt-BR";
import { databaseIP } from "@data/database";
import LoadingIcon from "@components/LoadingIcon/LoadingIcon";
import Show from "@components/UI/Show";

registerLocale("pt-Br", ptBr);
setDefaultLocale("pt-Br");

const pb = new PocketBase(databaseIP);

export default function ModalUpdateValues() {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [loading, setLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const numVendasInput = useRef<HTMLInputElement>(null);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!startDate) {
      return;
    }

    setLoading(true);

    const date: Date = startDate;
    date.setMinutes(0);
    date.setSeconds(0);

    const numVendas = numVendasInput.current?.value;

    const dateFormatted = formatDate2(date, isChecked);

    try {
      const record = await pb
        .collection("datesCloneFy")
        .getFirstListItem(`date="${dateFormatted}"`);

      await pb.collection("datesCloneFy").update(record.id, {
        date: dateFormatted,
        numVendas: numVendas,
      });
      setStartDate(null);
      setIsChecked(false);
    } catch (e) {
      const newRecord = await pb.collection("datesCloneFy").create({
        date: dateFormatted,
        numVendas: numVendas,
      });
    }

    try {
      const record = await pb
        .collection("vendasTotaisCloneFy")
        .getFirstListItem(
          `start="${formatDate2(date, false)}" && end="${dateFormatted}"`
        );

      await pb.collection("vendasTotaisCloneFy").update(record.id, {
        vendas: numVendas,
        start: dateFormatted,
        end: dateFormatted,
      });
    } catch (e) {
      const newRecord = await pb.collection("vendasTotaisCloneFy").create({
        vendas: numVendas,
        start: dateFormatted,
        end: dateFormatted,
      });
    }
    setLoading(false);
  };

  const handleOnChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className="flex justify-center items-center bg-gray-200/50">
      <form
        onSubmit={onSubmit}
        className="bg-white p-5 rounded flex flex-col gap-2 border"
      >
        <h1>Escolha a data</h1>
        <DatePicker
          className="border"
          showTimeSelect
					dateFormat={"dd/MM/yyyy"}
          selected={startDate}
          onChange={(date: Date) => setStartDate(date)}
          required
          locale="pt-BR"
        />
        <h1>Salvar horário também</h1>
        <input type="checkbox" checked={isChecked} onChange={handleOnChange} />
        <h1>Número de vendas</h1>
        <input className="border" type="number" ref={numVendasInput} />
        <button type="submit" className="bg-blue-300 p-1 rounded w-full">
          <Show
            when={!loading}
            fallback={
              <div>
                <LoadingIcon />
              </div>
            }
          >
            Enviar
          </Show>
        </button>
      </form>
    </div>
  );
}

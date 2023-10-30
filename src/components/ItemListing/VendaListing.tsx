import { Venda } from "@data/vendas";
import { formatDate2 } from "@utils/dateProcessing";
import { parseCommaDecimalNumber } from "@utils/numberProcessing";

interface VendaListingProps {
  items?: Venda[];
}

interface ListItemProps {
  venda: Venda 
  index: number
}

const ListItem: React.FC<ListItemProps> = ({
  index,
  venda
}) => {
  let statusBgColor = "bg-emerald-100";
  let statusTextColor = "text-emerald-800";

  if (venda.status === "Cancelado") {
    statusBgColor = "bg-red-100";
    statusTextColor = "text-red-800";
  } else if (venda.status === "Aguardando pagamento") {
    statusBgColor = "bg-yellow-100";
    statusTextColor = "text-yellow-800";
  }

  return (
    <button className={`border-b relative border-gray-200 hover:bg-indigo-50 w-full text-left text-sm ${index % 2 === 0 ? "bg-white" : "bg-gray-50" }`}>
      <div className="py-2 flex lg:items-center flex-row px-8 lg:h-24 w-full">
        <div className="xl:w-[232px] md:w-[170px]">
          <p className="text-gray-900/50">{formatDate2(venda.date)}</p>
        </div>
        <div className="2xl:w-[235px] xl:w-[200px] md:w-[150px] pr-10">
          <p className="text-gray-600 text-sm truncate">{venda.product}</p>
        </div>
        <div className="flex flex-col 2xl:w-[234px] xl:w-[245px] pr-16 md:w-[170px] ">
          <p className="text-gray-800 font-medium text-sm truncate">{venda.clientName}</p>
          <p className="text-gray-600 truncate text-sm">{venda.clientEmail}</p>
        </div>
        <div className="flex-col xl:w-[185px] md:w-[170px] sm:px-10">
          <div className={`${statusBgColor} w-min px-2 rounded-xl mb-1 flex justify-center items-center`}>
            <p className={`${statusTextColor} text-sm`}>
              {venda.status}
            </p>
          </div>

          <p className="text-gray-500 text-[14px]">{venda.paymentMethod}</p>
        </div>
        <div className="w-fit">
          <p className="text-black">{`R$ ${parseCommaDecimalNumber(
            venda.price
          )}`}</p>
        </div>
      </div>
    </button>
  );
};

const VendaListing: React.FC<VendaListingProps> = ({ items }) => {
  return (
    <div className="bg-white py-4 w-full">
      <div className="block">
        <div className="flex items-center flex-row w-full py-6 h-6 text-gray-900/50 bg-gray-50 border-b uppercase text-sm">
          <div className="md:ml-6 md:mr-14 w-1/12 lg:w-2/12">
            <p className="font-medium">Data</p>
          </div>
          <div className="w-2/12 md:mr-12">
            <p className="font-medium">Produto</p>
          </div>
          <div className="w-2/12 md:mr-12">
            <p className="font-medium">Cliente</p>
          </div>
          <div className="w-2/12">
            <p className="font-medium">Status</p>
          </div>
          <div>
            <p className="font-medium">Valor líquido</p>
          </div>
        </div>
      </div>

      {items !== undefined &&
        items.map((item, index) => <ListItem key={index} venda={item} index={index} />)}
    </div>
  );
};

export default VendaListing;

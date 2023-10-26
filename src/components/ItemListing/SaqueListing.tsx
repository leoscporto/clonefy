import { Saque } from "@data/saques";
import { formatDate2 } from "@utils/dateProcessing";
import { parseCommaDecimalNumber } from "@utils/numberProcessing";

interface SaqueListingProps {
  items?: Saque[];
}

const ListItem: React.FC<Saque> = ({ date, price, status }) => {
  let statusColor = "bg-green-100";
  let textColor = "text-green-800/75"

  if (status === "Falhou") {
    statusColor = "bg-red-100";
    textColor = "text-red-800"
  } else if (status === "Pendente") {
    statusColor = "bg-yellow-100";
    textColor = "text-yellow-800"
  }

  return (
    <div className="border-b-[1px] border-gray-200">
      <div className="rounded-md px-7 py-2 flex items-center space-x-2 lg:h-[4rem]">
        <div className="w-4/12">
          <p className="text-gray-800/50 font-medium text-sm">{formatDate2(date, false)}</p>
        </div>
        <div className="w-4/12">
          <p className="text-left text-gray-500 font-bold text-sm">R$ {parseCommaDecimalNumber(price)}</p>
        </div>
        <div>
          <p
            className={`${textColor} ${statusColor} w-fit p-1 rounded-2xl text-sm font-medium`}
          >
            {status}
          </p>
        </div>
      </div>
    </div>
  );
};

const SaqueListing: React.FC<SaqueListingProps> = ({ items }) => {
  return (
    <div className="bg-gray-50 py-2 pb-4 w-full [&>*:nth-child(odd)]:bg-gray-50 [&>*:nth-child(even)]:bg-white">
      <div className="flex px-7 items-center w-full text-gray-500/75 border-b pb-2 text-sm">
        <div className="w-4/12">
          <p className="font-medium">DATA</p>
        </div>
        <div className="w-4/12">
          <p className="font-medium">VALOR</p>
        </div>
        <div className="w-4/12">
          <p className="font-medium">STATUS</p>
        </div>
      </div>

      {items !== undefined &&
        items.map((item, index) => <ListItem key={index} {...item} />)}
    </div>
  );
};

export default SaqueListing;

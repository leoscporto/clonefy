import { FaSearch } from "react-icons/fa";
export default function SearchBar() {
  return (
    <div className="relative">
      <input
        className="block w-full py-2 pl-10 pr-3 leading-5 text-gray-900 placeholder-gray-500 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        type="text"
        placeholder="Buscar..."
      />
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        <FaSearch className="w-5 h-5 text-gray-400" aria-hidden="true" />
      </div>
    </div>
  );
}

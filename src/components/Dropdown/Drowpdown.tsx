"use client";
import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const options = [
    "Todos",
    "Ativo",
    "Em análise",
    "Recusado",
    "Rascunho",
    "Deletado",
  ];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        className="inline-flex justify-between w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        onClick={toggleDropdown}
      >
        {options[0]}
        {isOpen ? (
          <FaChevronUp
            className="w-5 h-5 ml-2 -mr-1 text-gray-400"
            aria-hidden="true"
          />
        ) : (
          <FaChevronDown
            className="w-5 h-5 ml-2 -mr-1 text-gray-400"
            aria-hidden="true"
          />
        )}
      </button>
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } absolute z-10 mt-1 py-1 w-full bg-white rounded-md shadow-lg`}
      >
        {options.map((option, index) => (
          <a
            key={index}
            href="#"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            {option}
          </a>
        ))}
      </div>
    </div>
  );
};

export default Dropdown;

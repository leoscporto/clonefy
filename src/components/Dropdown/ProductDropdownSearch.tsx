"use client";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Product, generateFakeProducts } from "@data/products";
import DownArrow from "@components/Icons/DownArrow";

interface ProductDropdownSearchProps {
  onValueSelected: (value: string) => void;
}

export default function ProductDropdownSearch({
  onValueSelected,
}: ProductDropdownSearchProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("Todos os produtos");
  const [inputText, setInputText] = useState("");

  const ref = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOptionClicked = (option: string) => {
    setSelectedValue(option);
    setIsOpen(false);
    onValueSelected(option);
  };

  const handleInputTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputText(value);
  };

  return (
    <div ref={ref}>
      {isOpen && (
        <div className="fixed z-10 bg-white p-2 rounded shadow-lg border sm:w-80">
          <input
            value={inputText}
            className={`border rounded ring-2 shadow-lg py-1 transition-all duration-150 ease-in-out ${
              isOpen ? "md:w-80 sm:w-72" : "md:w-48"
            }`}
            onChange={handleInputTextChange}
          />
          <div className="pt-3 text-xs flex flex-col items-start">
            <button
              className="hover:bg-gray-200 w-full text-start py-1 px-1"
              onClick={() => handleOptionClicked("Todos os produtos")}
            >
              Todos os produtos
            </button>
            {generateFakeProducts().map((value: Product) => (
              <button
                onClick={() => handleOptionClicked(value.label)}
                key={value.id}
                className="hover:bg-gray-200 w-full text-start py-1 px-1"
              >
                {value.label}
              </button>
            ))}
          </div>
        </div>
      )}
      <button
        onClick={(event) => setIsOpen(!isOpen)}
        className="flex flex-row justify-between py-2 px-5 md:w-80 h-full sm:w-full bg-white items-center rounded-lg border border-gray-300 text-sm"
      >
        {selectedValue}
        <DownArrow />
      </button>
    </div>
  );
}

"use client";

import { useState } from "react";
import { GoChevronDown } from "react-icons/go";
import { BsCheck2 } from "react-icons/bs";
import Image from "next/image";

interface Option {
  value: string;
  label: string;
}

const options: Option[] = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
];

const AccountDropdown = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const buttonHandler = () => {
    setShowDropdown((value) => !value);
  };

  return (
    <>
      <button
        onClick={buttonHandler}
        className="inline-flex items-center px-2 py-2 my-2 w-64 bg-primary rounded-md focus:outline-none sm:text-sm transition-colors duration-300 hover:bg-emerald-600 text-white drop-shadow-sm"
      >
        <Image
          src="/image/green-icon.jpg"
          width={40}
          height={40}
          alt="kiw"
        />
        <p className="pl-2">LCP NEGOCIOS DI...</p>
        <GoChevronDown className="ml-4" />
      </button>
      <div
        className={`${
          showDropdown ? "block" : "hidden"
        } absolute z-10 mt-1 bg-gray-100 shadow-lg max-h-56 rounded text-base overflow-auto sm:text-sm top-16 w-56 px-4 py-4 h-16 flex flex-row gap-2 `}
      >
        <BsCheck2 className="text-blue-500 stroke-1" />
        <div className="flex flex-col justify-center">
          <h1 className="text-xs text-blue-500">leo@emailfake.gmail.com</h1>
          <p className="text-xs font-light">(Sua conta)</p>
        </div>
      </div>
    </>
  );
};

export default AccountDropdown;

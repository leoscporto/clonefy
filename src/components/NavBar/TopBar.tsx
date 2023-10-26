"use client";
import ProfileButton from "@components/Button/IconButton/ProfileButton";
import { HiMenuAlt2 } from "react-icons/hi";
import { faker } from "@faker-js/faker";
import { useEffect } from "react";
import Image from "next/image";

interface TopBarProps {
  onClick: Function;
}

export default function TopBar({ onClick }: TopBarProps) {
  return (
    <div className="flex items-center justify-between md:justify-end bg-primary w-full h-16 shadow">
      <button
        className="md:hidden flex items-start h-full pt-5 pl-4"
        onClick={() => {
          onClick();
        }}
      >
        <HiMenuAlt2 className="fill-white" size={24} />
      </button>
      <div className="flex flex-row items-center">
        <EmeraldMoneyBarFill />
        <div className="rounded-full bg-gray-100 mx-4 w-8 h-8 flex items-center justify-center">
          <ProfileButton />
        </div>
      </div>
    </div>
  );
}

function EmeraldMoneyBarFill() {
  let width = 3;
  useEffect(() => {
    width = faker.datatype.number({ min: 2, max: 11 });
  }, []);

  return (
    <button className="flex flex-col justify-center transition-colors duration-150 hover:bg-emerald-600 p-2 rounded">
      <h1 className="text-white text-sm font-bold leading-none w-full text-right">
        R$ 2.9M / R$ 10M
      </h1>
      <div className="flex flex-row items-center justify-center">
        <Image src="/image/gemstone.svg" width={24} height={24} alt="gems" />
        <div className="ml-2 w-48 h-2 bg-white rounded-full">
          <div className={`h-2 bg-emerald-800 rounded w-4/12`}></div>
        </div>
      </div>
    </button>
  );
}
"use client";
import QuitButton from "@components/Icons/QuitButton";
import { useEffect, useRef, useState } from "react";
import { BiPlus } from "react-icons/bi";
import { BsFillPersonFill } from "react-icons/bs";
import { MdPerson } from "react-icons/md";
import {
  RiPieChartFill,
  RiAwardLine,
  RiLogoutBoxLine,
  RiProfileFill,
} from "react-icons/ri";

interface ProfileButtonInterface {
  className?: string;
}

const ProfileButton: React.FC<ProfileButtonInterface> = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleButtonClick = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

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

  return (
    <div className={`relative ${className}`} ref={ref}>
      <button
        type="button"
        className="inline-flex items-center justify-center w-10 h-10 text-gray-400 transition-colors duration-150 rounded-full focus:outline-none hover:text-gray-700"
        onClick={handleButtonClick}
      >
        <MdPerson className="fill-gray-300" size={24} />
      </button>
      {isOpen && (
        <div className="absolute right-2 z-10 w-48 mt-2 bg-white rounded-lg border-gray-300 border shadow-xl flex flex-col pt-3 pb-1">
          <div className="px-5 pb-2">
            <h1>LCP NEGOCIOS DI...</h1>
          </div>
          <div className="border-t-2 border-gray-50 pt-1"></div>
          <IconButtonOption
            icon={<BiPlus size={18} className="fill-gray-500/75" />}
            label="Criar conta de produtor"
          />
          <IconButtonOption
            icon={<BsFillPersonFill size={18} className="fill-gray-500/75" />}
            label="Meu perfil"
          />
          <IconButtonOption icon={<QuitButton />} label="Sair" />
        </div>
      )}
    </div>
  );
};

export default ProfileButton;

interface IconButtonOptionProps {
  icon: React.ReactNode;
  label: string;
}

function IconButtonOption({ icon, label }: IconButtonOptionProps) {
  return (
    <div className="flex items-center px-4 py-2 hover:bg-gray-200 w-full">
      <span className="w-5 h-5 mr-2 text-gray-600">{icon}</span>

      <button className="focus:outline-none text-start text-gray-700">
        {label}
      </button>
    </div>
  );
}

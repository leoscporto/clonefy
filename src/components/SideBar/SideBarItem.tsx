"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
interface SideBarItemProps {
  text: string;
  goto: string;
  icon: any;
}

export default function SideBarItem(props: SideBarItemProps) {
  const pathname = usePathname();
  return (
    <Link href={props.goto}>
      <button
        className={`font-medium cursor-pointer rounded-md text-gray-200 leading-5 p-2 gap-3 flex flex-row items-center justify-start hover:scale-105 transition duration-300 ease-in-out w-full text-start text-sm ${
          pathname === props.goto ? "bg-gray-900 text-white" : "hover:bg-gray-700 text-gray-200"
        }`}
      >
        <span className="text-gray-400">{props.icon}</span>
        {props.text}
      </button>
    </Link>
  );
}

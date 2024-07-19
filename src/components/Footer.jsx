import React from "react";
import { Github } from "lucide-react";
import Link from "next/link";
function Footer() {
  return (
    <div className="w-full h-32 flex items-center justify-between px-6 bg-black text-white">
      <div className="flex text-left flex-col space-y-2">
        <h1 className="font-primary font-semibold text-base">
          👋 Welcome to WATCHOPIA
        </h1>
        <p className="font-secondary font-normal text-xs">
          Created with<span className="text-[#FFD700]"> &#10084;</span> by Rod
          Cotines
        </p>
        <p className="font-secondary font-normal text-xs">
          Copyright <span className="text-[#FFD700]"> © </span> WATCHOPIA 2024
        </p>
      </div>
      <div>
        <p className="hover:scale-105 hover:text-[#FFD700] transition ease-in-out duration-300">
          <Link href="https://github.com/rodcotines/watchopia">
            <Github />
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Footer;

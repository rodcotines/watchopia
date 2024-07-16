import React from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Menu } from "lucide-react";
import { Navlinks } from "@/constants";
import Link from "next/link";

function Nav() {
  return (
    <div className="flex w-full p-4 items-center justify-between bg-transparent absolute">
      <h1 className="font-primary text-2xl font-black text-[#FFD700]">
        WATCHOPIA
      </h1>
      <Popover>
        <PopoverTrigger asChild>
          <Menu className="text-white" />
        </PopoverTrigger>
        <PopoverContent className="w-80 bg-black  text-white p-4 font-primary">
          <div className="grid gap-4">
            <nav className="grid gap-2">
              {Navlinks.map((item, i) => (
                <div key={i} className="flex items-center justify-start pb-2">
                  <Link
                    href={item.link}
                    className="text-md font-medium text-white hover:text-[#FFD700] transition-colors duration-300"
                  >
                    {item.text}
                  </Link>
                </div>
              ))}
            </nav>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default Nav;

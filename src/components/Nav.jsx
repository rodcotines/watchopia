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
    <div className="flex w-full px-6 py-4 items-center justify-between bg-black/80 backdrop-blur-md border-b border-white/10">
      <Link href="/">
        <h1 className="font-primary text-2xl font-black bg-gradient-to-r from-[#FFD700] to-[#FFA500] bg-clip-text text-transparent">
          WATCHOPIA
        </h1>
      </Link>
      <div className="flex items-center gap-8">
        <nav className="hidden md:flex items-center gap-6">
          {Navlinks.map((item, i) => (
            <Link
              key={i}
              href={item.link}
              className="text-sm font-medium text-white/70 hover:text-[#FFD700] transition-colors duration-200"
            >
              {item.text}
            </Link>
          ))}
        </nav>
        <div className="md:hidden">
          <Popover>
            <PopoverTrigger asChild>
              <button className="p-2 rounded-lg hover:bg-white/10 transition-colors">
                <Menu className="text-white" size={20} />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-52 bg-black/90 backdrop-blur-md border border-white/10 text-white p-3 font-primary">
              <nav className="grid gap-1">
                {Navlinks.map((item, i) => (
                  <Link
                    key={i}
                    href={item.link}
                    className="flex items-center px-3 py-2 rounded-lg text-sm font-medium text-white/80 hover:text-[#FFD700] hover:bg-white/5 transition-all duration-200"
                  >
                    {item.text}
                  </Link>
                ))}
              </nav>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
}

export default Nav;

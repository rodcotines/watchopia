import React from "react";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

function Footer() {
  return (
    <div className="w-full border-t border-white/10 bg-[#0a0a0a] text-white">
      <div className="max-w-7xl mx-auto px-8 py-8 flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h2 className="font-primary font-black text-lg bg-gradient-to-r from-[#FFD700] to-[#FFA500] bg-clip-text text-transparent">
            WATCHOPIA
          </h2>
          <p className="font-secondary text-xs text-white/50">
            Created with <span className="text-[#FFD700]">♥</span> by Rod Cotines
          </p>
          <p className="font-secondary text-xs text-white/30">
            © WATCHOPIA 2024
          </p>
        </div>
        <Link
          href="https://github.com/rodcotines/watchopia"
          className="p-2 rounded-lg hover:bg-white/10 text-white/50 hover:text-[#FFD700] transition-all duration-200"
        >
          <ExternalLink size={20} />
        </Link>
      </div>
    </div>
  );
}

export default Footer;

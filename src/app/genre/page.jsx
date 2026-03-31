import React from "react";
import Link from "next/link";
import { genres } from "@/utils";

const genreStyles = {
  28:    { gradient: "from-orange-600 to-red-700",      label: "Action" },
  12:    { gradient: "from-emerald-500 to-teal-700",    label: "Adventure" },
  16:    { gradient: "from-purple-500 to-violet-700",   label: "Animation" },
  35:    { gradient: "from-yellow-400 to-amber-600",    label: "Comedy" },
  80:    { gradient: "from-red-800 to-rose-950",        label: "Crime" },
  99:    { gradient: "from-slate-500 to-slate-700",     label: "Documentary" },
  18:    { gradient: "from-indigo-600 to-purple-800",   label: "Drama" },
  10751: { gradient: "from-pink-400 to-rose-600",       label: "Family" },
  14:    { gradient: "from-cyan-500 to-blue-700",       label: "Fantasy" },
  36:    { gradient: "from-amber-600 to-yellow-800",    label: "History" },
  27:    { gradient: "from-red-900 to-gray-950",        label: "Horror" },
  10402: { gradient: "from-fuchsia-500 to-pink-700",    label: "Music" },
  9648:  { gradient: "from-gray-600 to-gray-900",       label: "Mystery" },
  10749: { gradient: "from-rose-400 to-pink-700",       label: "Romance" },
  878:   { gradient: "from-blue-500 to-cyan-800",       label: "Sci-Fi" },
  10770: { gradient: "from-slate-400 to-slate-700",     label: "TV Movie" },
  53:    { gradient: "from-red-700 to-gray-900",        label: "Thriller" },
  10752: { gradient: "from-green-700 to-green-950",     label: "War" },
  37:    { gradient: "from-orange-700 to-amber-900",    label: "Western" },
};

export default function GenrePage() {
  return (
    <div className="min-h-screen bg-[#141414] pt-24 pb-16 px-8">
      {/* Header */}
      <div className="mb-10">
        <p className="font-secondary text-xs uppercase tracking-[0.3em] text-[#FFD700] font-semibold mb-2">
          Browse by
        </p>
        <h1 className="font-primary text-4xl font-black text-white">
          Movie Genres
        </h1>
        <p className="font-secondary text-white/40 text-sm mt-2">
          {genres.length} genres · Click any to explore movies
        </p>
      </div>

      {/* Genre grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
        {genres.map((genre) => {
          const style = genreStyles[genre.id];
          const gradient = style?.gradient ?? "from-gray-600 to-gray-800";

          return (
            <Link
              key={genre.id}
              href={`/genre/${genre.id}`}
              className={`group relative h-24 rounded-xl overflow-hidden bg-gradient-to-br ${gradient} cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-black/60`}
            >
              {/* Dark overlay that lifts on hover */}
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-300" />
              {/* Subtle noise texture */}
              <div className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
                  backgroundSize: "200px 200px",
                }}
              />
              {/* Genre name */}
              <div className="relative h-full flex items-end p-3">
                <h3 className="text-white font-primary font-bold text-sm leading-tight drop-shadow-md">
                  {genre.name}
                </h3>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

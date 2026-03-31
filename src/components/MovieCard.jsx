"use client";

import React from "react";
import { Star, Play } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getGenreNames } from "@/utils";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export function MovieCard({ movie, className }) {
  const router = useRouter();
  const genres = movie.genre_ids
    ? getGenreNames(movie.genre_ids).split(", ").filter(Boolean)
    : [];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div
          className={cn(
            "relative rounded-xl overflow-hidden cursor-pointer group transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-black/70",
            className
          )}
        >
          {/* Poster */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
            style={{
              backgroundImage: `url('https://image.tmdb.org/t/p/w500${movie.poster_path}')`,
            }}
          />
          {/* Bottom gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />
          {/* Info overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-3">
            <h3 className="text-white text-xs font-semibold leading-tight line-clamp-2 mb-1.5">
              {movie.title}
            </h3>
            <div className="flex items-center justify-between">
              <span className="text-white/45 text-xs">
                {movie.release_date?.substring(0, 4)}
              </span>
              <span className="flex items-center gap-1 text-[#FFD700] text-xs font-bold">
                <Star size={9} className="fill-[#FFD700]" />
                {movie.vote_average.toFixed(1)}
              </span>
            </div>
          </div>
        </div>
      </DialogTrigger>

      {/* Modal */}
      <DialogContent className="bg-[#1c1c1c] p-0 gap-0 max-w-[420px] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
        {/* Backdrop section */}
        <div className="relative h-44 flex-shrink-0">
          {/* Backdrop image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('https://image.tmdb.org/t/p/w780${movie.backdrop_path}')`,
            }}
          />
          {/* Gradient fades backdrop into card bg */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1c1c1c] via-[#1c1c1c]/20 to-transparent" />
          {/* Rating badge */}
          <div className="absolute bottom-3 right-4 flex items-center gap-1 bg-black/60 backdrop-blur-sm text-[#FFD700] px-2.5 py-1 rounded-full text-xs font-bold font-secondary">
            <Star size={10} className="fill-[#FFD700]" />
            {movie.vote_average.toFixed(1)}
          </div>
          {/* Poster thumbnail overlapping the seam */}
          <div
            className="absolute left-5 bottom-[-2.5rem] w-[4.5rem] h-[6.75rem] rounded-xl bg-cover bg-center ring-[3px] ring-[#1c1c1c] shadow-xl flex-shrink-0"
            style={{
              backgroundImage: `url('https://image.tmdb.org/t/p/w500${movie.poster_path}')`,
            }}
          />
        </div>

        {/* Info section */}
        <div className="px-5 pt-14 pb-6">
          {/* Title */}
          <DialogTitle className="text-white font-primary font-bold text-lg leading-snug mb-1">
            {movie.title}
          </DialogTitle>
          {/* Year */}
          <p className="text-white/35 text-xs font-secondary mb-3">
            {movie.release_date?.substring(0, 4)}
          </p>

          {/* Genre pills */}
          {genres.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {genres.map((genre, i) => (
                <span
                  key={i}
                  className="px-2.5 py-0.5 rounded-full text-xs font-secondary bg-white/8 text-white/55 border border-white/10"
                >
                  {genre}
                </span>
              ))}
            </div>
          )}

          {/* Overview */}
          <DialogDescription className="text-white/60 font-secondary text-sm leading-relaxed line-clamp-3 mb-5">
            {movie.overview}
          </DialogDescription>

          {/* CTA */}
          <button
            onClick={() => router.push(`/movie/${movie.id}`)}
            className="w-full flex items-center justify-center gap-2 bg-white hover:bg-white/90 text-black font-bold py-2.5 rounded-xl text-sm font-primary transition-all duration-200"
          >
            <Play size={14} className="fill-black" />
            View Details
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

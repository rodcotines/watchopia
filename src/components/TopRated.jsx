"use client";

import React, { useEffect, useState } from "react";
import { getRated } from "@/service";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { MovieCard } from "./MovieCard";

function TopRated() {
  const [movieList, setMovieList] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopRatedMovies = async () => {
      try {
        const movies = await getRated();
        setMovieList(movies);
      } catch (error) {
        setError("Failed to fetch top rated movies");
      }
    };
    fetchTopRatedMovies();
  }, []);

  if (error) return <p className="p-4 text-red-400 font-secondary">{error}</p>;

  return (
    <section className="py-10 bg-[#1a1a1a]">
      <div className="flex items-center justify-between px-8 pb-5">
        <div className="flex items-center gap-3">
          <div className="w-1 h-6 bg-[#FFD700] rounded-full flex-shrink-0" />
          <h2 className="text-xl font-primary font-semibold text-white tracking-wide">
            Top Rated
          </h2>
        </div>
        <Link
          href="/browse"
          className="flex items-center gap-1 text-sm text-white/40 hover:text-[#FFD700] transition-colors font-secondary"
        >
          See all <ChevronRight size={14} />
        </Link>
      </div>
      <div className="flex overflow-x-auto gap-4 px-8 pb-4 scrollbar-hide">
        {movieList.map((movie) => (
          <div key={movie.id} className="flex-shrink-0 w-48">
            <MovieCard movie={movie} className="h-72 w-48" />
          </div>
        ))}
      </div>
    </section>
  );
}

export default TopRated;

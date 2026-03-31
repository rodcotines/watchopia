"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import React, { useEffect, useState, useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import { Play, Info } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { getTrending } from "@/service";
import { useRouter } from "next/navigation";

function Slider() {
  const [progress, setProgress] = useState(33);
  const plugin = useRef(Autoplay({ delay: 5000, stopOnInteraction: false }));
  const [movieList, setMovieList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [api, setApi] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!api) return;
    api.on("select", () => setCurrentIndex(api.selectedScrollSnap()));
  }, [api]);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const movies = await getTrending();
        setMovieList(movies);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch trending movies");
        setLoading(false);
      }
    };
    fetchTrendingMovies();
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-[#141414] space-y-4">
        <h1 className="font-primary text-5xl font-black bg-gradient-to-r from-[#FFD700] to-[#FFA500] bg-clip-text text-transparent">
          WATCHOPIA
        </h1>
        <Progress value={progress} className="w-[30%]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#141414]">
        <p className="text-red-400 font-secondary">{error}</p>
      </div>
    );
  }

  const currentMovie = movieList[currentIndex];

  return (
    <div className="relative">
      {/* Backdrop carousel */}
      <Carousel
        className="w-full"
        plugins={[plugin.current]}
        setApi={setApi}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {movieList.map((movie, index) => (
            <CarouselItem key={index}>
              <div className="relative h-[92vh] overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center scale-105 transition-transform duration-700"
                  style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
                  }}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-[#141414]/75 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-[#141414]/40" />

      {/* Featured movie info */}
      {currentMovie && (
        <div className="absolute inset-0 flex items-end pb-28 px-8 lg:px-16">
          <div className="max-w-xl">
            <p className="font-secondary text-xs uppercase tracking-[0.3em] text-[#FFD700] font-semibold mb-3">
              Trending Now
            </p>
            <h1 className="font-primary text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-3">
              {currentMovie.title}
            </h1>
            <div className="flex items-center gap-4 mb-4 text-sm font-secondary">
              <span className="text-[#FFD700] font-bold text-base">
                ★ {currentMovie.vote_average.toFixed(1)}
              </span>
              <span className="text-white/50">
                {currentMovie.release_date?.substring(0, 4)}
              </span>
            </div>
            <p className="font-secondary text-sm md:text-base text-white/65 leading-relaxed mb-8 line-clamp-3">
              {currentMovie.overview}
            </p>
            <div className="flex items-center gap-3">
              <button
                className="flex items-center gap-2 px-7 py-3 bg-white hover:bg-white/90 text-black font-semibold rounded-lg transition-all duration-200 font-primary text-sm shadow-lg"
                onClick={() => router.push(`/movie/${currentMovie.id}`)}
              >
                <Play size={16} className="fill-black" />
                Watch Now
              </button>
              <button
                className="flex items-center gap-2 px-7 py-3 bg-white/15 hover:bg-white/25 backdrop-blur-sm text-white font-semibold rounded-lg transition-all duration-200 border border-white/20 font-primary text-sm"
                onClick={() => router.push(`/movie/${currentMovie.id}`)}
              >
                <Info size={16} />
                More Info
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Slide indicators */}
      <div className="absolute bottom-14 right-8 lg:right-16 flex items-center gap-1.5">
        {movieList.slice(0, 8).map((_, i) => (
          <div
            key={i}
            className={`h-0.5 rounded-full transition-all duration-500 ${
              i === currentIndex
                ? "w-6 bg-[#FFD700]"
                : "w-2 bg-white/25"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default Slider;

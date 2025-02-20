"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import React, { useEffect, useState, useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronsDown } from "lucide-react";

import SparklesText from "@/components/magicui/sparkles-text";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";

import { getTrending } from "@/service";
import Link from "next/link";

function Slider() {
  const [progress, setProgress] = useState(33);

  const plugin = useRef(Autoplay({ delay: 4000, stopOnInteraction: false }));
  const [movieList, setMovieList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(55), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const trendingMovies = await getTrending();
        setMovieList(trendingMovies);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching trending movies:", error);
        setError("Failed to fetch trending movies");
        setLoading(false);
      }
    };

    fetchTrendingMovies();
  }, []);
  if (loading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center mx-auto space-y-4 bg-pri">
        <h1 className="font-primary text-5xl font-black text-black">
          WATCHOPIA
        </h1>
        <Progress value={progress} className="w-[30%] " />
      </div>
    ); // Placeholder for loading state
  }

  if (error) {
    return <p>{error}</p>; // Placeholder for error state
  }

  return (
    <div className="relative">
      <Carousel
        className="w-full max-w-screen"
        plugins={[plugin.current]}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {movieList.map((movie, index) => (
            <CarouselItem key={index}>
              <div className="relative h-screen overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
                  }}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="absolute inset-0 bg-black bg-opacity-20 bg-gradient-to-b from-transparent to-black flex items-center justify-center">
        <div className="text-white text-center p-5 z-10 max-w-[1240px]">
          <h1 className="font-primary text-4xl md:text-5xl lg:text-6xl font-semibold mb-6">
            Discover a premier alternative to{" "}
            <span className="relative inline-block">
              <SparklesText
                className="text-[#FFD700] text-5xl md:text-6xl"
                text="TMDB"
              />
            </span>{" "}
            for exploring a vast collection of movies and TV shows.
          </h1>
          <p className="font-secondary text-lg md:text-xl">
            Explore and discuss your favorite entertainment content like never
            before.
          </p>

          <motion.p
            animate={{
              y: [0, 15, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "loop",
            }}
            className="flex items-center justify-center "
          >
            <Link href="#popular">
              <ChevronsDown size={30} className="mt-5" />
            </Link>
          </motion.p>
        </div>
      </div>
    </div>
  );
}

export default Slider;

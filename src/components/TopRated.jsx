"use client";

import React, { useEffect, useState } from "react";
import { getRated } from "@/service";
import { getGenreNames } from "@/utils";
import { Star } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation"; // Import the router
import { Button } from "./ui/button";

function TopRated() {
  const [movieList, setMovieList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const router = useRouter(); // Initialize the router

  useEffect(() => {
    const fetchTopRatedMovies = async () => {
      try {
        const trendingMovies = await getRated();
        setMovieList(trendingMovies);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching trending movies:", error);
        setError("Failed to fetch trending movies");
        setLoading(false);
      }
    };

    fetchTopRatedMovies();
  }, []);

  if (loading) {
    return <p>Loading...</p>; // Placeholder for loading state
  }

  if (error) {
    return <p>{error}</p>; // Placeholder for error state
  }

  const handleViewMore = (movieId) => {
    router.push(`/movie/${movieId}`); // Navigate to the movie detail page
  };

  return (
    <div className="p-4 bg-black text-white">
      <div className="flex w-full px-4 py-2 text-2xl font-primary">
        <h1>Top Rated</h1>
      </div>
      <div className="flex overflow-x-auto space-x-4 px-4 py-2">
        {movieList.map((movie, i) => (
          <div key={i} className="h-96 rounded-md duration-300">
            <Dialog>
              <DialogTrigger asChild>
                <div
                  className="h-3/4 w-48 cursor-pointer transition-all  hover:scale-105 relative"
                  onClick={() => setSelectedMovie(movie)}
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center rounded-md"
                    style={{
                      backgroundImage: `url('https://image.tmdb.org/t/p/w500${movie.poster_path}')`,
                    }}
                  ></div>
                </div>
              </DialogTrigger>
              <DialogContent className="bg-transparent p-0 max-w-screen-md">
                <div className="relative h-96">
                  <div
                    className="absolute inset-0 bg-cover bg-center rounded-md"
                    style={{
                      backgroundImage: `url('https://image.tmdb.org/t/p/original${selectedMovie?.backdrop_path}')`,
                    }}
                  ></div>
                  <div className="relative p-4 bg-black bg-opacity-70 rounded-md text-white h-96">
                    <div className="flex flex-col items-start justify-start max-w-xl">
                      <DialogHeader>
                        <DialogTitle className="py-6 text-3xl font-primary text-left">
                          <span>{selectedMovie?.title}</span>
                          <span className="ml-2 text-xl text-gray-400">
                            {selectedMovie?.release_date.substring(0, 4)}
                          </span>
                        </DialogTitle>
                      </DialogHeader>
                      <DialogDescription className="text-justify">
                        <p className="font-secondary text-[#FFD700] mb-2 text-xl font-medium">
                          {selectedMovie &&
                            getGenreNames(selectedMovie.genre_ids)}
                        </p>
                        <p className="text-white font-secondary">
                          {selectedMovie?.overview}
                        </p>
                        <Button
                          variant="outline"
                          onClick={() => handleViewMore(selectedMovie.id)}
                          className="mt-4"
                        >
                          {" "}
                          View More
                        </Button>
                      </DialogDescription>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            <div className="py-4">
              <div className="flex flex-col justify-between h-16">
                <h1 className="text-white hover:text-primary-dark block cursor-pointer text-sm font-semibold transition-colors duration-300 hover:text-danger">
                  {movie.title.length > 30
                    ? `${movie.title.substring(0, 27)}...`
                    : movie.title}
                </h1>
                <div className="flex justify-between items-center mt-1">
                  <p className="text-sm text-gray-400 font-secondary">
                    {movie.release_date.substring(0, 4)}
                  </p>
                  <p className="flex items-center text-sm text-gray-400 font-secondary">
                    <Star size={20} className="mr-1 fill-[#FFD700]" />
                    {movie.vote_average}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TopRated;

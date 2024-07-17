"use client";
import React, { useState, useEffect } from "react";
import { handleSearch, getTrending } from "@/service";
import { Input } from "@/components/ui/input";
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

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const router = useRouter();

  useEffect(() => {
    const fetchRecommendations = async () => {
      setLoading(true);
      setError(null);
      try {
        const recommendations = await getTrending();
        setResults(recommendations);
      } catch (error) {
        setError("Error fetching recommendations.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [query]);

  useEffect(() => {
    const fetchResults = async () => {
      if (debouncedQuery) {
        setLoading(true);
        setError(null);
        try {
          const searchResults = await handleSearch(debouncedQuery);
          setResults(searchResults);
        } catch (error) {
          setError("Error fetching search results.");
        } finally {
          setLoading(false);
        }
      } else {
        const fetchRecommendations = async () => {
          setLoading(true);
          setError(null);
          try {
            const recommendations = await getTrending();
            setResults(recommendations);
          } catch (error) {
            setError("Error fetching recommendations.");
          } finally {
            setLoading(false);
          }
        };

        fetchRecommendations();
      }
    };

    fetchResults();
  }, [debouncedQuery]);

  const handleViewMore = (movieId) => {
    router.push(`/movie/${movieId}`);
  };

  return (
    <div className="bg-black relative min-h-screen pt-28">
      <form
        onSubmit={(e) => e.preventDefault()} // Prevent form submission
        className="flex w-full items-center  justify-center pb-4"
      >
        <Input
          type="text"
          placeholder="Type here to search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="p-2 border border-gray-300 rounded mr-2 w-[1120px] font-primary h-11 "
        />
      </form>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid xl:grid-cols-7 lg:grid-cols-5 md:grid-cols-3 gap-4 p-4">
        {results.map((movie, i) => (
          <div key={i} className="rounded-md duration-300 flex flex-col h-96 ">
            <Dialog>
              <DialogTrigger asChild>
                <div
                  className="h-full w-full cursor-pointer transition-all hover:scale-105 relative"
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
                  <div className="relative p-4 bg-black bg-opacity-20 bg-gradient-to-b from-transparent to-black rounded-md text-white h-96">
                    <div className="flex flex-col items-start justify-start max-w-xl">
                      <DialogHeader>
                        <DialogTitle className="py-6 text-3xl font-primary text-left">
                          <span>{selectedMovie?.title}</span>
                          <span className="ml-2 text-xl text-white">
                            {selectedMovie?.release_date.substring(0, 4)}
                          </span>
                        </DialogTitle>
                      </DialogHeader>
                      <DialogDescription className="text-justify">
                        <p className=" font-secondary text-[#FFD700] mb-2 text-xl font-medium ">
                          {selectedMovie &&
                            getGenreNames(selectedMovie.genre_ids)}
                        </p>
                        <p className="text-white font-secondary ">
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
            {/* <div className="h-full w-full cursor-pointer transition-all hover:scale-105 relative">
              <div
                className="absolute inset-0 bg-cover bg-center rounded-md"
                style={{
                  backgroundImage: `url('https://image.tmdb.org/t/p/w500${movie.poster_path}')`,
                }}
              ></div>
            </div> */}
            <div className="flex flex-col justify-between pt-4">
              <h1 className="text-white hover:text-primary-dark block cursor-pointer text-sm font-semibold transition-colors duration-300">
                {movie.title.length > 30
                  ? `${movie.title.substring(0, 27)}...`
                  : movie.title}
              </h1>
              <div className="flex justify-between items-center mt-1">
                <p className="text-sm text-gray-400 font-secondary">
                  {movie.release_date?.substring(0, 4)}
                </p>
                <p className="text-sm text-gray-400 font-secondary flex items-center">
                  <span className="mr-1"></span>
                  <Star size={20} className="mr-1 fill-[#FFD700]" />
                  {movie.vote_average}%
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
